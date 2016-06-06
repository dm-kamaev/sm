/**
 * @fileoverview A constructor for a Yandex Maps map
 */
goog.provide('sm.bMap.Map');

goog.require('goog.Promise');
goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.dom.dataset');
goog.require('goog.events');
goog.require('goog.net.XhrIo');
goog.require('goog.object');
goog.require('goog.style');
goog.require('goog.ui.Component');
goog.require('sm.bMap.Template');
goog.require('sm.lSchool.iViewport.Viewport');



/**
 * @param {Object=} opt_params
 * @extends {goog.ui.Component}
 * @constructor
 */
sm.bMap.Map = function(opt_params) {
    goog.base(this);


    /**
     * Object of map state on initialization
     * @type {{
     *     schoolGroups: Array.<{
     *         type: string,
     *         schools: Array.<Object>
     *     }>
     *     mapCenter: ?Array.<number>
     * }}
     * @private
     */
    this.params_ = opt_params;


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


    /**
     * @type {Object}
     * @private
     */
    this.config_ = null;
};
goog.inherits(sm.bMap.Map, goog.ui.Component);


goog.scope(function() {
    var Map = sm.bMap.Map;
    var Viewport = sm.lSchool.iViewport.Viewport;


    /**
     * Icon directory
     * @type {string}
     */
    Map.ICON_DIR = '/images/b-map/b-map__pin/icons/';


    /**
     * A config object with DOM class names
     * @enum {string}
     */
    Map.CssClass = {
        ROOT: 'b-map',
        BALLOON: 'b-map__balloon',
        CLOSE_BALLOON: 'b-map__balloon-close'
    };


    /**
     * Possible events
     * @enum {string}
     */
    Map.Event = {
      READY: 'ready'
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
        DEFAULT: '',
        POINT: 'point'
    };


    /**
     * Preset type options
     * @enum {Object}
     */
    Map.PresetTypeOptions = {
        DEFAULT: {
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
        METRO: 15,
        DEFAULT: 15
    };


    /**
     * Possible type of positioning of map
     * @enum {string}
     */
    Map.PositionType = {
        CITY_CENTER: 'cityCenter',
        AREA: 'area',
        METRO: 'metro'
    };


    /**
     * Zoom
     * @type {Object}
     */
    Map.ZOOM = {
        top: '20px',
        left: '10px'
    };


    /**
     * @override
     */
    Map.prototype.createDom = function() {
        goog.base(this, 'createDom');
        var element = sm.bMap.Template();
        this.decorateInternal(element);
    };


    /**
     * @override
     */
    Map.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initParams_(element);

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
     * @param {{
     *     center: Array.<number>,
     *     type: string
     * }=} opt_position
     * @public
     */
    Map.prototype.center = function(opt_position) {
        var position = opt_position || {};
        if (position['center']) {
            this.setMapCenterCoords_(position);
        }
        else {
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
     * @param {string} positionType
     * @return {number}
     * @private
     */
    Map.prototype.generateScale_ = function(positionType) {
        var scale = Map.Scale.DEFAULT;
        if (positionType == Map.PositionType.METRO) {
            scale = Map.Scale.METRO;
        } else if (positionType == Map.PositionType.CITY_CENTER) {
            scale = Map.Scale.CITY_CENTER;
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

            this.resizeListenerKey_ = Viewport.getInstance().listen(
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
     * Handling map appearance
     * @private
     */
    Map.prototype.onShown_ = function() {
        Viewport.getInstance().unlistenByKey(this.resizeListenerKey_);
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
                this.generateBalloonLayout_(this.params_),
            'geoObjectPane': 'balloon',
            'geoObjectBalloonZIndex': 1040
        });
        this.ymaps_.geoObjects.add(this.objectManager_);
    };


    /**
     * Parameters initialization
     * @param {Element} element
     * @private
     */
    Map.prototype.initParams_ = function(element) {
        var dataset = goog.dom.dataset.get(element, 'params'),
            parsedDataset = JSON.parse(dataset);

        if (!this.params_) {
            this.params_ = parsedDataset['data'];
        }
        if (!this.config_) {
            this.config_ = parsedDataset['config'];
        }
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
     * Sets a layout for the balloon, required by ymaps API
     * @return {ymaps.Layout}
     * @private
     */
    Map.prototype.generateBalloonLayout_ = function() {
        var that = this;
        var balloonContent = sm.bMap.Template.balloon().content;
        var MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
            balloonContent,
            {
                build: function() {
                    this.constructor.superclass.build.call(this);
                    this._$element = jQuery(
                        '.' + Map.CssClass.BALLOON,
                        this.getParentElement()
                    );
                    this.applyElementOffset();
                    this.closeButton_ = jQuery(
                        '.' + Map.CssClass.CLOSE_BALLOON,
                        this._$element[0]
                    );
                    this.closeButton_.on(
                        'click',
                        jQuery.proxy(this.onCloseClick, this)
                    );
                },
                clear: function() {
                    this.closeButton_.off('click');
                    this.constructor.superclass.clear.call(this);
                },
                onSublayoutSizeChange: function() {
                    MyBalloonLayout.superclass.onSublayoutSizeChange.apply(
                        this,
                        arguments
                    );

                    if (this._isElement(this._$element)) {
                        this.applyElementOffset();
                        this.events.fire('shapechange');
                    }
                },
                applyElementOffset: function() {
                    this._$element.css({
                        left: -(this._$element[0].offsetWidth / 2),
                        top: -(this._$element[0].offsetHeight)
                    });
                },
                onCloseClick: function(e) {
                    e.preventDefault();
                    that.removeActiveStateFromSelectedPlacemark_();
                    this.events.fire('userclose');
                },
                'getShape': function() {
                    if (!this._isElement(this._$element)) {
                        return MyBalloonLayout.superclass['getShape']
                            .call(this);
                    }

                    var position = this._$element.position();

                    return new ymaps.shape.Rectangle(
                        new ymaps.geometry.pixel.Rectangle([
                            [position.left, position.top], [
                                position.left + this._$element[0].offsetWidth,
                                position.top + this._$element[0].offsetHeight
                            ]
                        ])
                    );
                },
                _isElement: function(element) {
                    return element && element[0];
                }
            }
        );

        return MyBalloonLayout;
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

        for (var i = 0, id, address; address = addresses[i]; i++) {
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
                            'stages': address['stages']
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
            this.getMapParams_()
        );

        if (this.config_['enableScrollZoom']) {
            this.ymaps_.behaviors.enable('scrollZoom');
        } else {
            this.ymaps_.behaviors.disable('scrollZoom');
        }
        this.ymaps_.setZoom(Math.floor(this.ymaps_.getZoom()));
        this.ymaps_.controls.add(
            new ymaps.control.ZoomControl({
                options: {
                    position: {
                        left: 10,
                        top: 15
                    }
                }
            }),
            Map.ZOOM
        );
    };


    /**
     * Getter for map parameters
     * @return {Object}
     * @private
     */
    Map.prototype.getMapParams_ = function() {
        var ymapsParams = {
            controls: []
        };

        ymapsParams['center'] = Map.defaultPosition.COORDS;
        ymapsParams['zoom'] = Map.Scale.DEFAULT;

        return ymapsParams;
    };
});  // goog.scope
