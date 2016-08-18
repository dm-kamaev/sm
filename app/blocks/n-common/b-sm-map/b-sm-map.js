
/**
 * @fileoverview Component with yandex map
 *
 * It can manipulate with points on map (replace or add)
 */
goog.provide('sm.bSmMap.SmMap');

goog.require('goog.Promise');
goog.require('goog.dom');
goog.require('goog.style');
goog.require('sm.iSmViewport.SmViewport');


goog.scope(function() {
    var Viewport = sm.lSchool.iViewport.Viewport;



    /**
     * @param {cl.iControl.View} view
     * @param {goog.dom.DomHelper=} opt_domHelper
     * @constructor
     * @extends {cl.iControl.Control}
     */
    sm.bSmMap.SmMap = function(view, opt_domHelper) {
        sm.bSmMap.SmMap.base(this, 'constructor');


        /**
         *   The ymaps object
         *   @type {Object=}
         *   @private
         */
        this.ymaps_ = undefined;


        /**
         * Object manager of ymaps
         * @type {Object}
         * @private
         */
        this.objectManager_ = null;


        /**
         * Current placemark id
         * @type {number}
         * @private
         */
        this.currentPlacemarkId_ = 0;


        /**
         * Current object id
         * @type {number}
         * @private
         */
        this.selectedPlacemarkId_ = null;


        /**
         * Current presets for placemarks
         * @type {Object}
         * @private
         */
        this.currentPlacemarkPresetOptions_ = {};
    };
    goog.inherits(sm.bSmMap.SmMap, goog.ui.Component);
    var Map = sm.bSmMap.SmMap;


    /**
     * Icon directory
     * @type {string}
     */
    Map.ICON_DIR = '/images/n-school/b-map/b-map__pin/icons/';


    /**
     * A config object with DOM class names
     * @enum {string}
     */
    Map.CssClass = {
        ROOT: 'b-map',
        ITEM_NAME: 'b-map__href',
        BALLOON: 'b-map__balloon',
        CLOSE_BALLOON_BUTTON: 'b-map__balloon-close'
    };


    /**
     * Possible events
     * @enum {string}
     */
    Map.Event = {
      READY: 'ready',
      ITEM_NAME_CLICK: 'item-name-click'
    };


    /**
     * Map presets names enum
     * @enum {string}
     */
    Map.PresetName = {
        DEFAULT: 'default',
        GREEN: 'green',
        YELLOW: 'yellow',
        RED: 'red'
    };


    /**
     * Map presets types enum
     * @enum {string}
     */
    Map.PresetType = {
        PIN: 'pin',
        POINT: 'point'
    };


    /**
     * Preset type options
     * @enum {Object}
     */
    Map.PresetTypeOptions = {
        PIN: {
            prefix: Map.PresetType.DEFAULT,
            iconImageSize: [38, 40],
            iconImageOffset: [-12, -39],
            balloonOffset: [0, -30],
            zIndex: 230
        },
        POINT: {
            prefix: Map.PresetType.POINT,
            iconImageSize: [13, 13],
            iconImageOffset: [-6, -6],
            balloonOffset: [0, -1],
            zIndex: 210
        }
    };


    /**
     * Map presets states enum
     * @enum {string}
     */
    Map.PresetState = {
        DEFAULT: '',
        ACTIVE: 'active'
    };


    /**
     * Preset state options
     * @enum {Object}
     */
    Map.PresetStateOptions = {
        DEFAULT: {
            postfix: Map.PresetState.DEFAULT,
            zIndex: 0
        },
        ACTIVE: {
            postfix: Map.PresetState.ACTIVE,
            zIndex: 1200
        }
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
     * POsition of zoom control
     * @type {Object}
     */
    Map.ZOOM_CONTROL_POSITION = {
        top: '20px',
        left: '10px'
    };


    /**
     * @typedef {sm.bSmMap.View.PositionParams}
     */
    Map.PositionParams;


    /**
     * @override
     */
    Map.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        var viewportPromise = this.getViewportPromise_(),
            ymapsPromise = this.getYmapsPromise_();

        viewportPromise.then(this.onShown_.bind(this));

        goog.Promise.all([
            viewportPromise,
            ymapsPromise
        ]).then(this.onReady_.bind(this));
    };


    /**
     * Clear map, create placemarks from given data, add it to map as big pins
     * @param {Array.<Object.<string, Array|string|number>>} schools
     * @public
     */
    Map.prototype.replaceItems = function(schools) {
        this.clear();
        if (schools.length) {
            this.setCurrentPresets_(Map.PresetType.DEFAULT);
            this.addPlacemarks_(schools);
        }
    };


    /**
     * Create placemarks from given data and add it to map as point pins
     * @param {Array.<Object.<string, Array|string|number>>} schools
     * @public
     */
    Map.prototype.addItems = function(schools) {
        if (schools.length) {
            this.setCurrentPresets_(Map.PresetType.POINT);
            this.addPlacemarks_(schools);
        }
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
            this.setMapCenterCoords_(positionParams);
        } else {
            this.setMapCenterObjects_();
        }
    };


    /**
     * Add placemarks to map and event listeners to it
     * @param {Array.<Object>} mapSchools
     * @private
     */
    Map.prototype.addPlacemarks_ = function(mapSchools) {
        if (this.objectManager_) {
            this.objectManager_.add(
                this.createPlacemarkCollection_(mapSchools)
            );

            // click event handling
            this.objectManager_.objects.events.add(
                'click',
                this.onPlacemarkClick_,
                this
            );
        }
    };


    /**
     * Center map in according of given positon object
     * @param {{
     *     center: Array.<number>,
     *     type: string
     * }} position
     * @private
     */
    Map.prototype.setMapCenterCoords_ = function(position) {
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
     * Generate scale depends of given centering type
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
        this.replaceItems(this.params_['schools']);
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
     * Presets initialization
     * @private
     */
    Map.prototype.initPresets_ = function() {
        var names = [
            Map.PresetName.DEFAULT,
            Map.PresetName.GREEN,
            Map.PresetName.YELLOW,
            Map.PresetName.RED
        ];
        var typeOptions = [
            Map.PresetTypeOptions.DEFAULT,
            Map.PresetTypeOptions.POINT
        ];
        var stateOptions = [
            Map.PresetStateOptions.DEFAULT,
            Map.PresetStateOptions.ACTIVE
        ];
        var typeOptionsLength = typeOptions.length;
        var stateOptionsLength = stateOptions.length;
        var namesLength = names.length;

        for (var j = 0, prefix, typeOption; j < typeOptionsLength; j++) {
            typeOption = typeOptions[j];
            prefix = typeOption.prefix;

            for (var k = 0, postfix, stateOption; k < stateOptionsLength; k++) {
                stateOption = stateOptions[k];
                postfix = stateOption.postfix;

                for (var i = 0, name, href; i < namesLength; i++) {
                    name = names[i];
                    href = this.getPresetImageHref_(name, prefix);

                    ymaps.option.presetStorage.add(
                        this.getPresetName_(name, prefix, postfix),
                        this.getPresetOptions_(href, typeOption, stateOption)
                    );
                }
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
     * Getter for preset image href
     * @param {string} name
     * @param {string} prefix
     * @return {string}
     * @private
     */
    Map.prototype.getPresetImageHref_ = function(name, prefix) {
        var hrefPrefix = prefix != '' ? prefix + '-' : '',
            hrefName = name == 'default' ? '' : '-' + name;

        return Map.ICON_DIR + 'map-' + hrefPrefix + 'pin' + hrefName +
            '-th.png';
    };


    /**
     * Getter for preset name
     * @param {string} name
     * @param {string} prefix
     * @param {string} postfix
     * @return {string}
     * @private
     */
    Map.prototype.getPresetName_ = function(name, prefix, postfix) {
        var namePrefix = prefix != '' ? prefix + '-' : '',
            namePostfix = postfix != '' ? '-' + postfix : '';

        return namePrefix + name + namePostfix;
    };


    /**
     *
     * @param {string} imageHref
     * @param {Object} typeOption
     * @param {Object} stateOption
     * @return {Object}
     * @private
     */
    Map.prototype.getPresetOptions_ =
        function(imageHref, typeOption, stateOption) {
            return {
                'balloonOffset': typeOption.balloonOffset,
                'iconImageHref': imageHref,
                'iconImageSize': typeOption.iconImageSize,
                'iconImageOffset': typeOption.iconImageOffset,
                'iconLayout': 'default#image',
                'zIndex': typeOption.zIndex + stateOption.zIndex,
                'zIndexHover': typeOption.zIndex + 100 + stateOption.zIndex
            };
        };


    /**
     * Create a layout for the balloon, required by ymaps API
     * @return {ymaps.Layout}
     * @private
     */
    Map.prototype.generateBalloonLayout_ = function() {
        var mapInstance = this;
        var balloonContent = sm.bMap.Template.balloon().content;

        var CustomBaloonLayout = ymaps.templateLayoutFactory.createClass(
            balloonContent,
            {
                build: function() {
                    this.constructor.superclass.build.call(this);
                    this.initDom_();
                    this.addEventListeners_();
                    mapInstance.setBalloonOffset_(this.element_);
                },
                clear: function() {
                    this.removeEventListeners_();
                    this.constructor.superclass.clear.call(this);
                },
                onSublayoutSizeChange: function() {
                    CustomBaloonLayout.superclass.onSublayoutSizeChange.apply(
                        this,
                        arguments
                    );

                    if (this.element_) {
                        this.applyElementOffset();
                        this.events.fire('shapechange');
                    }
                },
                getShape: function() {
                    if (!this.element_) {
                        return CustomBaloonLayout.superclass['getShape']
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
                    this.element_ = goog.dom.getElementByClass(
                        Map.CssClass.BALLOON,
                        this.getParentElement()
                    );
                    this.closeButton_ = goog.dom.getElementByClass(
                        Map.CssClass.CLOSE_BALLOON,
                        this.element_
                    );
                    this.itemName_ = goog.dom.getElementByClass(
                        Map.CssClass.ITEM_NAME,
                        this.element_
                    );
                }
            }
        );

        return CustomBaloonLayout;
    };


    /**
     * Align baloon relative to point or pin.
     * It center baloon vertically and lift it horizontally
     * @param  {Element} balloonElement
     * @private
     */
    Map.prototype.setBalloonOffset_ = function(balloonElement) {
        var elementSize = goog.style.getSize(balloonElement);
        var leftCoordinate = - (elementSize.width / 2);
        var topCoordinate = - elementSize.height;

        goog.style.setPosition(
            balloonElement,
            leftCoordinate,
            topCoordinate
        );
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
     * Create placemark collection from given schools,
     * checking whether addresses of school not in map already
     * @param {Array.<Object>} schools
     * @return {Array.<Object>}
     * @private
     */
    Map.prototype.createPlacemarkCollection_ = function(schools) {
        var that = this,
            result = [];
        schools.forEach(function(school) {
            result.push.apply(
                result,
                that.generatePlacemarksFromSchool_(school)
            );
        });

        return result;
    };


    /**
     * On placemark click actions
     * @param {Object} event
     * @private
     */
    Map.prototype.onPlacemarkClick_ = function(event) {
        var id = event.get('objectId');

        if (this.selectedPlacemarkId_ != id) {
            var currentSelectedPlacemarkPreset =
                this.objectManager_.objects.getById(id).options.preset;

            this.objectManager_.objects.setObjectOptions(id, {
                preset: currentSelectedPlacemarkPreset + '-' +
                    Map.PresetState.ACTIVE
            });

            if (this.selectedPlacemarkId_ != null) {
                this.removeActiveStateFromSelectedPlacemark_();
            }
            this.selectedPlacemarkId_ = id;
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
        var lastSelectedPlacemarkPreset =
            this.objectManager_.objects.getById(
                this.selectedPlacemarkId_
            ).options.preset;

        this.objectManager_.objects.setObjectOptions(
            this.selectedPlacemarkId_,
            {
                preset: lastSelectedPlacemarkPreset
                        .replace('-' + Map.PresetState.ACTIVE, '')
            }
        );
    };


    /**
     * Align baloon relative to point or pin.
     * It center baloon vertically and lift it horizontally
     * @param  {Element} baloonElement
     * @private
     */
    Map.prototype.alignBaloon_ = function(baloonElement) {
        var elementSize = goog.style.getSize(baloonElement);

        var leftCoordinate = - elementSize.width / 2;
        var topCoordinate = - elementSize.height;

        goog.style.setPosition(leftCoordinate, topCoordinate);
    };

    /**
     * Generate array of placemarks from one school
     * @param {Object} data
     * @return {Array.<Object>}
     * @private
     */
    Map.prototype.generatePlacemarksFromSchool_ = function(data) {
        var totalScore = data['totalScore'],
            presetKey = this.generatePresest_(totalScore),
            addresses = data['addresses'],
            result = [];

        var preset = this.currentPlacemarkPresetOptions_[presetKey];

        var addressesAmount = addresses.length;
        for (var i = 0, id, address; i < addressesAmount; i++) {
            address = addresses[i];
            id = this.currentPlacemarkId_++;
            if (!this.isAlreadyAdded_(address)) {
                result.push({
                    'type': 'Feature',
                    'id': id,
                    'addressId': address['id'],
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [address['lat'], address['lng']]
                    },
                    'properties': {
                        'id': data['id'],
                        'name': data['name'],
                        'alias': data['alias'],
                        'description': data['description'],
                        'address': {
                            'name': address['name'],
                            'stages': address['stages'] === 'Другие адреса' ?
                                '' : address['stages']
                        }
                    },
                    'options': {
                        'preset': preset
                    }
                });
            }
        }

        return result;
    };


    /**
     * Generate preset name for placemark depends of given school score
     * @param {number} score
     * @return {Map.PresetName|string}
     * @private
     */
    Map.prototype.generatePresest_ = function(score) {
        var presetName = Map.PresetName.DEFAULT;

        if (score >= 4) {
            presetName = Map.PresetName.GREEN;
        } else if (score >= 3) {
            presetName = Map.PresetName.YELLOW;
        } else if (score > 0) {
            presetName = Map.PresetName.RED;
        }

        return presetName;
    };


    /**
     * Check whether address is already on map
     * @param {Object} address
     * @return {boolean}
     * @private
     */
    Map.prototype.isAlreadyAdded_ = function(address) {
        var addedAddresses = this.objectManager_.objects.getAll();
        return goog.array.find(addedAddresses, function(addedAddress) {
            return addedAddress['addressId'] == address.id;
        });
    };


    /**
     * Setter for current presets
     * @param {string} type
     * @private
     */
    Map.prototype.setCurrentPresets_ = function(type) {
        var presets = {};
        var prefix = type != '' ? type + '-' : '';

        for (var key in Map.PresetName) {
            presets[Map.PresetName[key]] = prefix + Map.PresetName[key];
        }

        this.currentPlacemarkPresetOptions_ = presets;
    };


    /**
     * Map initialization
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
     * Add zoom control to map at default positon
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
        var positionParams = this.generatePositonParameters_();

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
     * Generate position parameters for initialization yandex map
     * @return {{
     *     zoom: number,
     *     center: Array<number>
     * }}
     * @private
     */
    Map.prototype.generatePositonParameters_ = function() {
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
