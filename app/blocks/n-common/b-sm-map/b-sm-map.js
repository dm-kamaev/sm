
/**
 * @fileoverview Component with yandex map
 *
 * It can manipulate with points on map (replace or add)
 */
goog.provide('sm.bSmMap.SmMap');

goog.require('goog.Promise');
goog.require('sm.bSmMap.IPresetGenerator');
goog.require('sm.iSmViewport.SmViewport');


goog.scope(function() {
    var Viewport = sm.lSchool.iViewport.Viewport;
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
         *   The yandex maps object
         *   @type {ymaps.Map=}
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
        this.presetCreator_ = null;


        /**
         * Current placemark id
         * @type {number}
         * @private
         */
        this.mapObjectsAmount_ = 0;


        /**
         * Current object id
         * @type {number}
         * @private
         */
        this.selectedObjectId_ = null;
    };
    goog.inherits(sm.bSmMap.SmMap, goog.ui.Component);
    var Map = sm.bSmMap.SmMap;


    /**
     * Possible events
     * @enum {string}
     */
    Map.Event = {
      READY: 'ready',
      ITEM_NAME_CLICK: 'item-name-click'
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
    Map.ZOOM_CONTROL_POSITION = {
        top: '20px',
        left: '10px'
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
     *         id: number,
     *         name: string,
     *         alias: string,
     *         description: string,
     *         address: {
     *             name: string,
     *             stages: string
     *         }
     *     },
     *
     * }}
     */
    Map.GeoObject;


    /**
     * Address item, sended from backend
     * @typedef {{
     *     id: number,
     *     coordinates: Array<number>,
     *     title: {
     *         text: string,
     *         alias: string
     *     },
     *     description: string,
     *     link: {
     *         text: string,
     *         alias: string
     *     },
     *     score: number
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

        var viewportPromise = this.getViewportPromise_(),
            ymapsPromise = this.getYmapsPromise_();

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
     *     addresses: Array<sm.bSmMap.AddressItem>
     * }>} itemGroups
     * @public
     */
    Map.prototype.addItems = function(itemGroups) {
        if (itemGroups.length > 0) {
            itemGroups.forEach(this.addItemGroup_.bind(this));
        }
    };


    /**
     * Clear map, then add item groups
     * @param {Array<{
     *     viewType: sm.bSmMap.IPresetGenerator.PresetType,
     *     addresses: Array<sm.bSmMap.AddressItem>
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
            this.objectManager_.removeAll();
        }
        this.mapObjectsAmount_ = 0;
        this.selectedObjectId_ = null;
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
     * Add each item group to map, with view type, given from it
     * @param {{
     *     viewType: sm.bSmMap.IPresetGenerator.PresetType,
     *     addresses: Array<sm.bSmMap.AddressItem>
     * }} itemGroup
     * @private
     */
    Map.prototype.addItemGroup_ = function(itemGroup) {
        var mapObjects = this.generateMapObjects_(itemGroup);

        this.addMapObjects_(mapObjects);
    };


    /**
     * Generate map objects from given item group
     * @param {{
     *     viewType: sm.bSmMap.IPresetGenerator.PresetType,
     *     entities: Array<Object>
     * }} itemGroup
     * @return {Array<Object>}
     * @private
     */
    Map.prototype.generateMapObjects_ = function(itemGroup) {
        var addresses = itemGroup['addresses'];
        var viewType = itemGroup['viewType'];

        return addresses.map(this.generateAddressMapObject_.bind(
            this,
            viewType
        ));
    };

    /**
     * Generate map object from entity address
     * @param {string} viewType
     * @param {sm.bSmMap.SmMap.AddressItem} address
     * @return {sm.bSmMap.SmMap.GeoObject}
     * @private
     */
    Map.prototype.generateAddressMapObject_ = function(
        viewType, address) {
        var id = this.mapObjectsAmount_++;
        var score = address['score'];

        var preset = this.presetCreator_.generateNameByEntityScore(
            score, viewType
        );

        return {
            'type': 'Feature',
            'id': id,
            'addressId': address['id'],
            'geometry': {
                'type': 'Point',
                'coordinates': address['coordinates']
            },
            'properties': {
                'title': address['title']['text'],
                'name': address['name'],
                //TODO build href from alias here via url builder or smth
                'titleHref': address['title']['alias'] ?
                    address['title']['alias'] :
                    '',
                'linkText': address['link'] ? address['link']['text'] : null,
                //TODO build href from alias url builder or smth
                'linkHref': address['link'] ? address['link']['alias'] : null,
                'description': address['description'],
                'stages': address['stages'] ? address['stages'] : null
            },
            'options': {
                'preset': preset
            }
        };
    };


    /**
     * Add generated geo objects to map and event listeners to it possible
     * (map is visible)
     * @param {Array<sm.bSmMap.SmMap.GeoObject>} geoObjects
     * @private
     */
    Map.prototype.addMapObjects_ = function(geoObjects) {
        if (this.objectManager_) {
            this.objectManager_.add(geoObjects);

            this.objectManager_.objects.events.add(
                'click',
                this.onPlacemarkClick_,
                this
            );
        }
    };


    /**
     * Center map in according of given positon object
     * @param {sm.bSmMap.SmMap.PositionParams} position
     * @private
     */
    Map.prototype.setMapCenterCoordinates_ = function(position) {
        var coordinates = position['center'],
            scale = this.generateScale_(position['type']);

        this.ymaps_.setCenter(
            coordinates,
            scale,
            {
                checkZoomRange: true,
                duration: 400
            }
        );
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

            if (bounds) {
                this.ymaps_.setBounds(
                    bounds,
                    {
                        duration: 400,
                        checkZoomRange: true,
                        zoomMargin: 35
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
        if (Viewport.getInstance().getSize() > Viewport.Size.M) {
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
        //presets initialize
        this.initPresets_();

        //maps initialization
        this.initMap_();

        //object manager initialization
        this.initObjectManager_();

        /** Add points from data-params to map **/
        this.addItems(this.params_['items']);
        this.center(this.params_['position']);

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
                build: function() {
                    this.constructor.superclass.build.call(this);
                    this.initDom_();
                    this.addEventListeners_();
                    mapInstance.getView().setBalloonOffset(this.element_);
                },
                clear: function() {
                    this.removeEventListeners_();
                    this.constructor.superclass.clear.call(this);
                },
                onSublayoutSizeChange: function() {
                    CustomBalloonLayout.superclass.onSublayoutSizeChange.apply(
                        this,
                        arguments
                    );

                    if (this.element_) {
                        mapInstance.getView().setBalloonOffset(this.element_);
                        this.events.fire('shapechange');
                    }
                },
                getShape: function() {
                    if (!this.element_) {
                        return CustomBalloonLayout.superclass['getShape']
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
                addEventListeners_: function() {
                    this.closeButtonClickKey_ = goog.events.listen(
                        this.closeButton_,
                        goog.events.EventType.CLICK,
                        mapInstance.onBalloonCloseClick_.bind(mapInstance, this)
                    );
                    this.itemNameClickKey_ = goog.events.listen(
                        this.itemName_,
                        goog.events.EventType.CLICK,
                        mapInstance.onBalloonNameClick_.bind(mapInstance)
                    );
                },
                removeEventListeners_: function() {
                    goog.events.unlistenByKey(this.closeButtonClickKey_);
                    goog.events.unlistenByKey(this.itemNameClickKey_);
                },
                initDom_: function() {
                    var parentElement = this.getParentElement();
                    var domElements =
                        mapInstance.getView().initBalloonDomElements(
                            parentElement);

                    this.element_ = domElements.balloon;
                    this.closeButton_ = domElements.closeButton;
                    this.itemName_ = domElements.title;
                }
            }
        );

        return CustomBalloonLayout;
    };


    /**
     * Balloon entity name click handler
     * @param  {Object} event
     * @private
     */
    Map.prototype.onBalloonNameClick_ = function(event) {
        var balloonNameElement = event.target;
        var name = goog.dom.getTextContent(balloonNameElement);

        var params = JSON.parse(
                goog.dom.dataset.get(balloonNameElement, 'params')
            );

        this.dispatchEvent({
            'type': Map.Event.ITEM_NAME_CLICK,
            'data': {
                'name': name,
                'id': params['id']
            }
        });
    };


    /**
     * Ballon close button click handler
     * Fire event to close balloon
     * @param  {Object} balloonInstance
     * @param  {Object} event
     * @private
     */
    Map.prototype.onBalloonCloseClick_ = function(balloonInstance, event) {
        event.preventDefault();
        this.removeActiveStateFromSelectedPlacemark_();
        balloonInstance.events.fire('userclose');
    };


    /**
     * On placemark click actions
     * @param {Object} event
     * @private
     */
    Map.prototype.onPlacemarkClick_ = function(event) {
        var id = event.get('objectId');

        if (this.selectedObjectId_ != id) {
            var currentSelectedPlacemarkPreset =
                this.objectManager_.objects.getById(id).options.preset;

            this.objectManager_.objects.setObjectOptions(id, {
                preset: currentSelectedPlacemarkPreset + '-' +
                    Map.PresetState.ACTIVE
            });

            if (this.selectedObjectId_ != null) {
                this.removeActiveStateFromSelectedPlacemark_();
            }
            this.selectedObjectId_ = id;
        }
    };


    /**
     * Balloon name click handler
     * @param  {Object} event
     * @private
     */
    Map.prototype.onBalloonNameClick_ = function(event) {
        var balloonNameElement = event.target;
        var name = goog.dom.getTextContent(balloonNameElement);

        var params = JSON.parse(
                goog.dom.dataset.get(balloonNameElement, 'params')
            );

        this.dispatchEvent({
            'type': Map.Event.ITEM_NAME_CLICK,
            'data': {
                'name': name,
                'id': params['id']
            }
        });
    };


    /**
     * Ballon close button click handler
     * Close already opened balooon and fire event about it
     * @param  {Object} balloonInstance
     * @param  {Object} event
     * @private
     */
    Map.prototype.onBalloonCloseClick_ = function(balloonInstance, event) {
        event.preventDefault();
        this.removeActiveStateFromSelectedPlacemark_();
        balloonInstance.events.fire('userclose');
    };


    /**
     * Removing of active state from selected placemark
     * @private
     */
    Map.prototype.removeActiveStateFromSelectedPlacemark_ = function() {
        var selectedPlacemark = this.objectManager_.objects.getById(
            this.selectedObjectId_
        );
        var placemarkPreset = selectedPlacemark.options.preset;
        var newPlacemarkPreset =
            this.presetCreator_.generateUnactiveStatePresetName(
                placemarkPreset
            );

        this.objectManager_.objects.setObjectOptions(
            this.selectedObjectId_,
            {
                preset: newPlacemarkPreset
            }
        );
    };


    /**
     * Preset creator initialization
     * @private
     */
    Map.prototype.initPresetGenerator_ = function() {
        this.presetCreator_ = new PresetGenerator();
    };

    /**
     * Presets initialization
     * @private
     */
    Map.prototype.initPresets_ = function() {
        var presets = this.presetCreator_.generate();

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
        this.ymaps_.controls.add(
            'zoomControl',
            Map.ZOOM_CONTROL_POSITION
        );
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
        var behaviors = ['default'];

        var enableScrollZoom = this.params_['config']['enableScrollZoom'];
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

        if (this.params_['data']['position']) {
            positionType = this.params_['data']['position']['type'];
            centerCoordinates = this.params_['data']['position']['center'] ?
                this.params_['data']['position']['center'] :
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
