/**
 * @fileoverview Component with yandex map
 * It initializes yandex map and manipulate points on map: replace or add
 */
goog.provide('sm.bSmMap.SmMap');

goog.require('cl.iControl.Control');
goog.require('goog.Promise');
goog.require('sm.bSmBalloon.SmBalloon');
goog.require('sm.bSmMap.IPresetGenerator');
goog.require('sm.bSmMap.Template');
goog.require('sm.bSmMap.View');
goog.require('sm.iCloblFactory.FactoryStendhal');
goog.require('sm.iSmViewport.SmViewport');


goog.scope(function() {
    var Viewport = sm.iSmViewport.SmViewport;
    var PresetGenerator = sm.bSmMap.IPresetGenerator;



    /**
     * @param {cl.iControl.View} view
     * @param {goog.dom.DomHelper=} opt_domHelper
     * @constructor
     * @extends {cl.iControl.Control}
     */
    sm.bSmMap.SmMap = function(view, opt_domHelper) {
        sm.bSmMap.SmMap.base(this, 'constructor', view, opt_domHelper);


        /**
         * Map parameters
         * @type {sm.bSmMap.SmMap.Params}
         */
        this.params = null;


        /**
         *   The yandex maps object
         *   @type {?ymaps.Map}
         *   @private
         */
        this.ymaps_ = null;


        /**
         * Object manager of yandex maps
         * @type {ymaps.ObjectManager}
         * @private
         */
        this.objectManager_ = null;


        /**
         * Preset creator instance
         * @type {sm.bSmMap.IPresetGenerator}
         * @private
         */
        this.presetGenerator_ = null;


        /**
         * Balloon component instance
         * @type {sm.bSmBalloon.SmBalloon}
         * @private
         */
        this.balloon_ = null;


        /**
         * Current placemark id
         * @type {number}
         * @private
         */
        this.geoObjectsAmount_ = 0;


        /**
         * Current object id
         * @type {number}
         * @private
         */
        this.selectedPlacemarkId_ = null;
    };
    goog.inherits(sm.bSmMap.SmMap, cl.iControl.Control);
    var Map = sm.bSmMap.SmMap,
        View = sm.bSmMap.View;

    /**
     * Name of this element in factory
     */
    Map.NAME = sm.bSmMap.Template.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(Map.NAME, {
        control: Map,
        view: View
    });

    /**
     * Possible events
     * @enum {string}
     */
    Map.Event = {
        READY: 'ready',
        BALLOON_OPEN: sm.bSmBalloon.SmBalloon.Event.OPEN
    };


    /**
    * These params are necessary for initializing ymaps,
    * represent center of Moscow
    * @type {Object}
    */
    Map.defaultPosition = {
        COORDS: [55.755768, 37.617671]
    };


    /**
     * Possible scales for map
     * @enum {number}
     */
    Map.Scale = {
        CITY_CENTER: 13,
        DISTRICT: 12,
        METRO: 15,
        DEFAULT: 15
    };


    /**
     * Possible type of positioning of map
     * @enum {string}
     */
    Map.PositionType = {
        CITY_CENTER: 'cityCenter',
        DISTRICT: 'district',
        AREA: 'area',
        METRO: 'metro'
    };


    /**
     * Position of zoom control
     * @type {Object}
     */
    Map.zoomControlPozition = {
        TOP: '20px',
        RIGHT: '10px',
        LEFT: '10px'
    };


    /**
     * Geo object to add it to map via yandex maps objectManager
     * @typedef {{
     *     type: string,
     *     id: number,
     *     addressId: number,
     *     geometry: {
     *         type: string,
     *         coordinates: Array<number>
     *     },
     *     properties: {
     *         title: {
     *             id: number,
     *             text: string,
     *             url: ?string
     *         },
     *         subtitle: string,
     *         items: Array<{
     *             id: number,
     *             content: string,
     *             url: ?string
     *         }>,
     *         description: string
     *     }
     * }}
     */
    Map.GeoObject;


    /**
     * Address item, sended from backend
     * @typedef {{
     *     addressId: number,
     *     addressName: string,
     *     coordinates: Array<number>,
     *     score: number,
     *     title: {
     *         id: number,
     *         text: string,
     *         url: ?string
     *     },
     *     subtitle: string,
     *     items: Array<{
     *         id: number,
     *         content: string,
     *         url: ?string
     *     }>
     * }}
     */
    Map.AddressItem;


    /**
     * @typedef {sm.bSmMap.View.PositionParams}
     */
    Map.PositionParams;


    /**
     * @public
     * @override
     */
    Map.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);
        this.initPresetGenerator_();

        var viewportPromise = this.getViewportPromise_();
        var ymapsPromise = this.getYmapsPromise_();

        viewportPromise.then(this.onShown_.bind(this));

        goog.Promise.all([
            viewportPromise,
            ymapsPromise
        ]).then(this.onReady_.bind(this));
    };


    /**
     * If item groups exists, add each item group to map
     * @param {Array<{
     *     viewType: sm.bSmMap.IPresetGenerator.PresetType,
     *     items: Array<sm.bSmMap.AddressItem>
     * }>} itemGroups
     * @public
     */
    Map.prototype.addItems = function(itemGroups) {
        if (this.objectManager_ && itemGroups.length > 0) {
            itemGroups.forEach(this.addItemGroup_.bind(this));
        }
    };


    /**
     * Clear map, then add item groups
     * @param {Array<{
     *     viewType: sm.bSmMap.IPresetGenerator.PresetType,
     *     items: Array<sm.bSmMap.AddressItem>
     * }>} itemGroups
     * @public
     */
    Map.prototype.replaceItems = function(itemGroups) {
        this.clear();
        this.addItems(itemGroups);
    };


    /**
     * Deletes all current placemarks, reset selected placemark,
     * reset placemarks id
     * @public
     */
    Map.prototype.clear = function() {
        if (this.objectManager_) {
            this.clearMapObjectsListeners_();
            this.objectManager_.removeAll();
        }
        this.geoObjectsAmount_ = 0;
        this.selectedPlacemarkId_ = null;
    };


    /**
     * Center map in according to given position object or
     * in according to objects on map otherwise
     * @param {sm.bSmMap.SmMap.PositionParams=} opt_positionParams
     * @public
     */
    Map.prototype.center = function(opt_positionParams) {
        var positionParams = opt_positionParams || {};
        if (positionParams['center']) {
            this.setMapCenterCoordinates_(positionParams);
        } else {
            this.setMapCenterObjects_();
        }
    };


    /**
     * Create ballon with giv params and set it to field
     * @param {Object} params
     * @param {Element} balloonElement element balloon render to
     * @private
     */
    Map.prototype.createBalloonComponent_ = function(params, balloonElement) {
        var renderParams = sm.bSmBalloon.SmBalloon.getRenderParams(params);

        this.setBalloon_(
            this.renderChild(
                sm.bSmBalloon.SmBalloon.NAME,
                balloonElement,
                renderParams
            )
        );
    };


    /**
     * Balloon setter
     * @param {sm.bSmBalloon.SmBalloon} balloonInstance
     * @private
     */
    Map.prototype.setBalloon_ = function(balloonInstance) {
        this.balloon_ = balloonInstance;
    };


    /**
     * Balloon getter
     * @return {sm.bSmBalloon.SmBalloon}
     * @private
     */
    Map.prototype.getBalloon_ = function() {
        return this.balloon_;
    };


    /**
     * Add each item group to map, with view type, given from it
     * @param {{
     *     viewType: sm.bSmMap.IPresetGenerator.PresetType,
     *     items: Array<sm.bSmMap.AddressItem>
     * }} itemGroup
     * @private
     */
    Map.prototype.addItemGroup_ = function(itemGroup) {
        this.addMapObjects_(itemGroup['viewType'], itemGroup.items);
        this.clearMapObjectsListeners_();
        this.initMapObjectsListeners_();
    };


    /**
     * Generate map object from entity address
     * @param {sm.bSmMap.IPresetGenerator.PresetType} viewType
     * @param {sm.bSmMap.SmMap.AddressItem} item
     * @return {sm.bSmMap.SmMap.GeoObject}
     * @private
     */
    Map.prototype.generateGeoObject_ = function(
        viewType, item) {
        var id = this.geoObjectsAmount_++;
        var preset = this.generatePreset_(item, viewType);
        return {
            'type': 'Feature',
            'id': id,
            'addressId': item['addressId'],
            'geometry': {
                'type': 'Point',
                'coordinates': item['coordinates']
            },
            'properties': item,
            'options': {
                'preset': preset
            }
        };
    };


    /**
     * Add given items to map with given view type
     * @param {sm.bSmMap.IPresetGenerator.PresetType} viewType
     * @param {Array<sm.bSmMap.AddressItem>} items
     * @private
     */
    Map.prototype.addMapObjects_ = function(viewType, items) {
        goog.array.forEach(items, this.addMapObject_.bind(this, viewType));
    };


    /**
     * Add given items to map with given view type
     * It check if given address allready on map and in this case
     * just extend existing geo object by their items and viewType (if PIN)
     * or create new geo object otherwise
     * @param {sm.bSmMap.IPresetGenerator.PresetType} viewType
     * @param {sm.bSmMap.AddressItem} addressItem
     * @private
     */
    Map.prototype.addMapObject_ = function(viewType, addressItem) {
        var geoObject = this.find_(addressItem),
            hasItems = addressItem['items'] && addressItem['items'].length;

        if (goog.isDefAndNotNull(geoObject)) {
            if (hasItems) {
                this.updateViewType_(geoObject, viewType);
                this.extendGeoObject_(geoObject, addressItem);
            }
        } else {
            this.objectManager_.add(this.generateGeoObject_(
                viewType,
                addressItem
            ));
        }
    };


    /**
     * If given viewtype is PIN, generate new preset and
     * update it on given map object
     * @param {sm.bSmMap.SmMap.GeoObject} geoObject
     * @param {sm.bSmMap.IPresetGenerator.PresetType} viewType
     * @private
     */
    Map.prototype.updateViewType_ = function(geoObject, viewType) {
        if (viewType == PresetGenerator.PresetType.PIN) {
            var preset =
                this.generatePreset_(geoObject['properties'], viewType);

            geoObject['options']['preset'] = preset;
        }
    };



    /**
     * Extends geo object with items given from address item
     * @param {sm.bSmMap.SmMap.GeoObject} geoObject
     * @param {sm.bSmMap.SmMap.AddressItem} addressItem
     * @private
     */
    Map.prototype.extendGeoObject_ = function(geoObject, addressItem) {
        var extendedItems = goog.array.concat(
            geoObject['properties']['items'],
            addressItem['items']
        );

        goog.array.removeDuplicates(
            extendedItems,
            null,
            function(item) {
                return item['id'];
        });

        geoObject['properties']['items'] = extendedItems;
    };


    /**
     * Generate preset for given object oan viewtype
     * @param {sm.bSmMap.SmMap.AddressItem} addressItem
     * @param {sm.bSmMap.IPresetGenerator.PresetType} viewType
     * @return {string}
     * @private
     */
    Map.prototype.generatePreset_ = function(addressItem, viewType) {
        var score = addressItem['score'];

        return this.presetGenerator_.generatePresetNameByEntityParameters(
            score, viewType
        );
    };


    /**
     * Clear listeners from all map objects
     * @private
     */
    Map.prototype.clearMapObjectsListeners_ = function() {
        this.objectManager_.objects.events.remove(
            'click',
            this.onPlacemarkClick_,
            this
        );
    };


    /**
     * Initialize event listeners on map objects
     * @private
     */
    Map.prototype.initMapObjectsListeners_ = function() {
        this.objectManager_.objects.events.add(
            'click',
            this.onPlacemarkClick_,
            this
        );
    };


    /**
     * Check whether given geo object is already on map
     * @param {sm.bSmMap.SmMap.AddressItem} addressItem
     * @return {sm.bSmMap.SmMap.GeoObject}
     * @private
     */
    Map.prototype.find_ = function(addressItem) {
        var geoObjects = this.objectManager_.objects.getAll();
        return goog.array.find(geoObjects, function(geoObject) {
            return geoObject['addressId'] == addressItem['addressId'];
        });
    };


    /**
     * Center map in according of given positon object
     * @param {sm.bSmMap.SmMap.PositionParams} position
     * @private
     */
    Map.prototype.setMapCenterCoordinates_ = function(position) {
        var coordinates = position['center'],
            scale = this.generateScale_(position['type']);

        if (this.ymaps_) {
            this.ymaps_.setCenter(
                coordinates,
                scale,
                {
                    'checkZoomRange': true,
                    'duration': 400
                }
            );
        }
    };


    /**
     * Generate map scale depends of given centering type
     * @param {sm.bSmMap.SmMap.PositionType} positionType
     * @return {number}
     * @private
     */
    Map.prototype.generateScale_ = function(positionType) {
        var scale;

        switch (positionType) {
            case Map.PositionType.METRO:
                scale = Map.Scale.METRO;
                break;
            case Map.PositionType.CITY_CENTER:
                scale = Map.Scale.CITY_CENTER;
                break;
            case Map.PositionType.DISTRICT:
                scale = Map.Scale.DISTRICT;
                break;
            default:
                scale = Map.Scale.DEFAULT;
        }

        return scale;
    };


    /**
     * Center map in according to objects on map
     * @private
     */
    Map.prototype.setMapCenterObjects_ = function() {
        if (this.objectManager_) {
            var bounds = this.objectManager_.getBounds();

            if (bounds && this.ymaps_) {
                this.ymaps_.setBounds(
                    bounds,
                    {
                        'duration': 400,
                        'checkZoomRange': true,
                        'zoomMargin': 35
                    }
                ).then(this.checkZoom_.bind(this));
            }
        }
    };


    /**
     * Check if the zoom of map is too small, the increase zoom
     * @private
     */
    Map.prototype.checkZoom_ = function() {
        if (this.ymaps_.getZoom() > 16) {
            this.ymaps_.setZoom(16);
        }
    };


    /**
     * Waiting for right viewport size
     * @return {goog.Promise}
     * @private
     */
    Map.prototype.getViewportPromise_ = function() {
        return new goog.Promise(function(resolve, reject) {
            this.onResize_.call(this, resolve);

            this.getHandler().listen(
                Viewport.getInstance(),
                Viewport.Event.RESIZE,
                this.onResize_.bind(this, resolve)
            );
        }, this);
    };


    /**
     * Waiting for yandex-map readiness
     * @return {goog.Promise}
     * @private
     */
    Map.prototype.getYmapsPromise_ = function() {
        return new goog.Promise(function(resolve, reject) {
            ymaps.ready(resolve);
        }, this);
    };


    /**
     * Handling viewport resizing
     * @param {Function} callback
     * @private
     */
    Map.prototype.onResize_ = function(callback) {
        var size = this.params['config']['sizeViewportShow'] || 'M',
            viewportSize = size.toUpperCase();

        if (Viewport.getInstance().getSize() > Viewport.Size[viewportSize]) {
            callback();
        }
    };


    /**
     * If map is shown there is no need to listen resize events from Viewport
     * @private
     */
    Map.prototype.onShown_ = function() {
        this.getHandler().unlisten(
            Viewport.getInstance(),
            Viewport.Event.RESIZE
        );
    };


    /**
     * Handling all conditions readiness
     * @private
     */
    Map.prototype.onReady_ = function() {
        this.initPresets_();
        this.initMap_();
        this.initObjectManager_();

        var itemGroups = this.params['data']['itemGroups'];
        this.addItems(itemGroups);

        var position = this.params['data']['position'];
        this.center(position);

        this.dispatchEvent(Map.Event.READY);
    };


    /**
     * Object manager initialization
     * @private
     */
    Map.prototype.initObjectManager_ = function() {
        this.objectManager_ = new ymaps.ObjectManager({
            'geoObjectBalloonAutoPan': true,
            'geoObjectHideIconOnBalloonOpen': false,
            'geoObjectBalloonPanelMaxMapArea': 0,
            'geoObjectBalloonCloseButton': true,
            'geoObjectBalloonLayout':
                this.generateBalloonLayout_(),
            'geoObjectPane': 'balloon',
            'geoObjectBalloonZIndex': 1040
        });
        this.ymaps_.geoObjects.add(this.objectManager_);
    };


    /**
     * Create a layout for the balloon, required by yandex map API
     * @return {ymaps.Layout}
     * @private
     */
    Map.prototype.generateBalloonLayout_ = function() {
        var mapInstance = this;
        var balloonContent = this.getView().generateBalloonHtmlContent();

        var CustomBalloonLayout = ymaps.templateLayoutFactory.createClass(
            balloonContent,
            {
                'build': function() {
                    this.constructor.superclass.build.call(this);
                    this.initDom_();
                    this.initBalloon_();
                    this.addEventListeners_();
                    this.setBalloonOffset_();
                },
                'clear': function() {
                    this.removeEventListeners_();
                    this.disposeBalloon_();
                    this.constructor.superclass.clear.call(this);
                },
                'onSublayoutSizeChange': function() {
                    CustomBalloonLayout.superclass.onSublayoutSizeChange.apply(
                        this,
                        arguments
                    );

                    if (this.element_) {
                        mapInstance.getView().setBalloonOffset(this.element_);
                        this.events.fire('shapechange');
                    }
                },
                'getShape': function() {
                    if (!this.element_) {
                        return CustomBalloonLayout.superclass.getShape
                            .call(this);
                    }
                    var position = goog.style.getPosition(this.element_);
                    return new ymaps.shape.Rectangle(
                        new ymaps.geometry.pixel.Rectangle([
                            [position.x, position.y], [
                                position.y + this.element_.offsetWidth,
                                position.x + this.element_.offsetHeight
                            ]
                        ])
                    );
                },
                initDom_: function() {
                    this.element_ = mapInstance.getView().initBalloonDomElement(
                        this.getParentElement()
                    );
                },
                initBalloon_: function() {
                    var params = this.getData().object.properties;
                    mapInstance.createBalloonComponent_(params, this.element_);
                },
                disposeBalloon_: function() {
                    mapInstance.getBalloon_().dispose();
                    mapInstance.setBalloon_(null);
                },
                addEventListeners_: function() {
                    mapInstance.getHandler().listen(
                        mapInstance.getBalloon_(),
                        sm.bSmBalloon.SmBalloon.Event.CLOSE_BUTTON_CLICK,
                        mapInstance.onBalloonCloseClick_.bind(mapInstance, this)
                    ).listen(
                        mapInstance.getBalloon_(),
                        sm.bSmBalloon.SmBalloon.Event.LIST_PAGE_CHANGE,
                        mapInstance.onBalloonListPageChange_.bind(
                            mapInstance, this)
                    );
                },
                removeEventListeners_: function() {
                    mapInstance.getHandler().unlisten(
                        mapInstance.getBalloon_(),
                        sm.bSmBalloon.SmBalloon.Event.CLOSE_BUTTON_CLICK
                    ).unlisten(
                        mapInstance.getBalloon_(),
                        sm.bSmBalloon.SmBalloon.Event.LIST_PAGE_CHANGE
                    );
                },
                setBalloonOffset_: function() {
                    mapInstance.getView().setBalloonOffset(this.element_);
                }
            }
        );

        return CustomBalloonLayout;
    };


    /**
     * Placemark click handler
     * Remove active state from already selected placemark (if exists) and
     * set active state to clicked placemark
     * @param {Object} event
     * @private
     */
    Map.prototype.onPlacemarkClick_ = function(event) {
        var clickedPlacemarkId = event.get('objectId');

        if (this.selectedPlacemarkId_ != clickedPlacemarkId) {
            if (goog.isDefAndNotNull(this.selectedPlacemarkId_)) {
                this.setPlacemarkDefaultState_(this.selectedPlacemarkId_);
            }
            this.setPlacemarkActiveState_(clickedPlacemarkId);
            this.selectedPlacemarkId_ = clickedPlacemarkId;
        }
    };


    /**
     * Balloon close button click handler
     * Close already opened balooon and fire event about it
     * @param  {Object} balloonInstance
     * @param  {Object} event
     * @private
     */
    Map.prototype.onBalloonCloseClick_ = function(balloonInstance, event) {
        event.preventDefault();
        this.setPlacemarkDefaultState_(this.selectedPlacemarkId_);
        this.selectedPlacemarkId_ = null;
        balloonInstance.events.fire('userclose');
    };


    /**
     * Handler for event of changing page of paged list in balloon. In this case
     * is possible to change shape of ballon
     * @param {Object} balloonInstance
     * @private
     */
    Map.prototype.onBalloonListPageChange_ = function(balloonInstance) {
        var balloonElement = balloonInstance.element_;
        this.getView().setBalloonOffset(balloonElement);
        balloonInstance.events.fire('shapechange');
    };


    /**
     * Removing of active state from placemark with given id
     * @param {number} placemarkId
     * @private
     */
    Map.prototype.setPlacemarkDefaultState_ = function(placemarkId) {
        var currentPlacemarkPreset = this.getPlacemarkPreset_(placemarkId);
        var newPlacemarkPreset =
            this.presetGenerator_.generateDefaultStatePresetName(
                currentPlacemarkPreset
            );
        this.setPlacemarkPreset_(placemarkId, newPlacemarkPreset);
    };


    /**
     * Add active state to placemark with given id
     * @param {number} placemarkId
     * @private
     */
    Map.prototype.setPlacemarkActiveState_ = function(placemarkId) {
        var currentPlacemarkPreset = this.getPlacemarkPreset_(placemarkId);
        var newPlacemarkPreset =
            this.presetGenerator_.generateActiveStatePresetName(
                currentPlacemarkPreset
            );
        this.setPlacemarkPreset_(placemarkId, newPlacemarkPreset);
    };


    /**
     * Get placemark preset by their id
     * @param {number} placemarkId
     * @return {string}
     * @private
     */
    Map.prototype.getPlacemarkPreset_ = function(placemarkId) {
        var placemark = this.objectManager_.objects.getById(placemarkId);
        return placemark ? placemark.options.preset : null;
    };

    /**
     * Set placemark preset by their id
     * @param {number} placemarkId
     * @param {string} preset
     * @private
     */
    Map.prototype.setPlacemarkPreset_ = function(placemarkId, preset) {
        this.objectManager_.objects.setObjectOptions(
            placemarkId,
            {
                preset: preset
            }
        );
    };


    /**
     * Preset creator initialization
     * @private
     */
    Map.prototype.initPresetGenerator_ = function() {
        this.presetGenerator_ = new PresetGenerator();
    };


    /**
     * Presets initialization
     * @private
     */
    Map.prototype.initPresets_ = function() {
        var presets = this.presetGenerator_.generate();

        this.addPresetsToMap_(presets);
    };


    /**
     * Add presets to map
     * @param {Array<sm.bSmMap.SmMap.Preset>} presets
     * @private
     */
    Map.prototype.addPresetsToMap_ = function(presets) {
        presets.forEach(this.addPresetToMap_);
    };


    /**
     * Add each preset to map
     * @param {sm.bSmMap.SmMap.Preset} preset
     * @private
     */
    Map.prototype.addPresetToMap_ = function(preset) {
        ymaps.option.presetStorage.add(
            preset.name,
            preset.settings
        );
    };


    /**
     * Create map instance with state, generated from data params and add zoom
     * controls to it
     * @private
     */
    Map.prototype.initMap_ = function() {
        this.ymaps_ = new ymaps.Map(
            this.getElement(),
            this.generateMapState_()
        );

        this.addZoomControl_();
    };


    /**
     * Add zoom control to map at default position
     * @private
     */
    Map.prototype.addZoomControl_ = function() {
        var position = this.getZoomPosition_();

        var zoomControl = new ymaps.control.ZoomControl({
            options: {
                position: position
            }
        });

        this.ymaps_.controls.add(zoomControl);
    };


    /**
     * Get position for zoom control
     * @return {{
     *     top: string,
     *     left: (string|undefined),
     *     right: (string|undefined)
     * }}
     * @private
     */
    Map.prototype.getZoomPosition_ = function() {
        var position = {
            top: Map.zoomControlPozition.TOP
        };

        if (this.params['config']['alignZoomControl'] == 'right') {
            position.right = Map.zoomControlPozition.RIGHT;
        } else {
            position.left = Map.zoomControlPozition.LEFT;
        }

        return position;
    };


    /**
     * Map state generator
     * @return {{
     *     behaviors: Array<string>,
     *     controls: Array<string>,
     *     center: Array<number>,
     *     zoom: number
     * }}
     * @private
     */
    Map.prototype.generateMapState_ = function() {
        var positionParams = this.generatePositionParameters_();

        return {
            'behaviors': this.generateBehaviors_(),
            'controls': [],
            'center': positionParams.center,
            'zoom': positionParams.zoom
        };
    };


    /**
     * Generate behaviors for yandex map initialization
     * @return {Array<string>}
     * @private
     */
    Map.prototype.generateBehaviors_ = function() {
        var behaviors = [
            'dblClickZoom',
            'drag',
            'multiTouch',
            'rightMouseButtonMagnifier'
        ];

        var enableScrollZoom = this.params['config']['enableScrollZoom'];
        if (enableScrollZoom) {
            behaviors.push('scrollZoom');
        }
        return behaviors;
    };


    /**
     * Generate position parameters for initialization of yandex map
     * @return {{
     *     zoom: number,
     *     center: Array<number>
     * }}
     * @private
     */
    Map.prototype.generatePositionParameters_ = function() {
        var positionType;
        var centerCoordinates;

        if (this.params['data']['position']) {
            positionType = this.params['data']['position']['type'];
            centerCoordinates = this.params['data']['position']['center'] ?
                this.params['data']['position']['center'] :
                Map.defaultPosition.COORDS;
        } else {
            positionType = Map.PositionType.DEFAULT;
            centerCoordinates = Map.defaultPosition.COORDS;
        }

        return {
            zoom: this.generateScale_(positionType),
            center: centerCoordinates
        };
    };
});  // goog.scope
