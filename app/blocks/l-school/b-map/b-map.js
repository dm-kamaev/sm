/**
 * @fileoverview A constructor for a Yandex Maps map
 * @author Nikita Gubchenko
 */
goog.provide('sm.lSchool.bMap.Map');

goog.require('goog.Promise');
goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.dom.dataset');
goog.require('goog.events');
goog.require('goog.net.XhrIo');
goog.require('goog.object');
goog.require('goog.style');
goog.require('goog.ui.Component');
goog.require('sm.lSchool.bMap.Template');
goog.require('sm.lSchool.iViewport.Viewport');


/**
 * @param {Object=} opt_params
 * @extends {goog.ui.Component}
 * @constructor
 */
sm.lSchool.bMap.Map = function(opt_params) {
    goog.base(this);

    /**
     *   The ymaps object
     *   @type {Object=}
     *   @private
     */
    this.ymaps_ = undefined;

    /**
     *   An ID of a current school
     *   @type {Number}
     *   @private
     */
    this.params_ = opt_params;

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
     * Placemarks of all schools
     * @type {Array}
     * @private
     */
    this.placemarks_ = [];
};
goog.inherits(sm.lSchool.bMap.Map, goog.ui.Component);

goog.scope(function() {
    var Map = sm.lSchool.bMap.Map;
    var Viewport = sm.lSchool.iViewport.Viewport;


    /**
     * Icon directory
     * @type {string}
     */
    Map.ICON_DIR = '/images/l-school/b-map/b-map__pin/icons/';


    /**
     * A config object with DOM class names
     * @enum {String}
     */
    Map.CssClass = {
        ROOT: 'b-map',
        BALLOON: 'b-map__balloon',
        CLOSE_BALLOON: 'b-map__balloon-close'
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
        COORDS: [55.755768, 37.617671],
        ZOOM: 16
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
        var element = sm.lSchool.bMap.Template();
        this.decorateInternal(element);
    };


    /**
     * @override
     */
    Map.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initParams_(element);

        var viewportPromise = this.getViewportPromise_(),
            dataPromise = this.getDataPromise_(),
            ymapsPromise = this.getYmapsPromise_();

        viewportPromise.then(this.onShown_.bind(this));

        goog.Promise.all([
            viewportPromise,
            ymapsPromise
        ]).then(this.onReady_.bind(this, dataPromise));
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
     * Waitng for schools data
     * @return {Promise}
     * @private
     */
    Map.prototype.getDataPromise_ = function() {
        return jQuery.ajax({
            url: '/api/address/list',
            type: 'POST',
            data: ''
        });
    };


    /**
     * Waitong for yandex-map readiness
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
     * @param {function} callback
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
     * Handling schools data
     * @param {string} data
     * @private
     */
    Map.prototype.onDataLoaded_ = function(data) {
        this.setCurrentPresets_(Map.PresetType.POINT);
        this.objectManager_.add(
            this.getAllPlacemarkCollection_(data)
        );
    };


    /**
     * Handling all conditions readiness
     * @param {goog.Promise} dataPromise
     * @private
     */
    Map.prototype.onReady_ = function(dataPromise) {
        //presets initialize
        this.initPresets_();

        //maps initialization
        this.initMap_();

        //object manager initialization
        this.initObjectManager_();

        //placemarks
        //default placemarks
        this.setCurrentPresets_(Map.PresetType.DEFAULT);
        this.objectManager_.add(
            this.getSchoolPlacemarks_(this.params_)
        );

        // click event handling
        this.objectManager_.objects.events.add(
            'click',
            this.onPlacemarkClick_,
            this
        );

        //point placemarks
        dataPromise.done(this.onDataLoaded_.bind(this));
    };

    /**
     * Object manager initialization
     * @private
     */
    Map.prototype.initObjectManager_ = function() {
        this.objectManager_ = new ymaps.ObjectManager({
            geoObjectBalloonAutoPan: true,
            geoObjectHideIconOnBalloonOpen: false,
            geoObjectBalloonPanelMaxMapArea: 0,
            geoObjectBalloonCloseButton: true,
            geoObjectBalloonLayout:
                this.generateBalloonLayout_(this.params_),
            geoObjectPane: 'balloon',
            geoObjectBalloonZIndex: 1040
        });
        this.ymaps_.geoObjects.add(this.objectManager_);
    };


    /**
     * Parameters initialization
     * @param {Element} element
     * @private
     */
    Map.prototype.initParams_ = function(element) {
        if (!this.params_) {
            var dataset = goog.dom.dataset.get(element, 'params');
            this.params_ = JSON.parse(dataset);
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
                balloonOffset: typeOption.balloonOffset,
                iconImageHref: imageHref,
                iconImageSize: typeOption.iconImageSize,
                iconImageOffset: typeOption.iconImageOffset,
                iconLayout: 'default#image',
                zIndex: typeOption.zIndex + stateOption.zIndex,
                zIndexHover: typeOption.zIndex + 100 +
                    stateOption.zIndex
            };
        };


    /**
     * Sets a layout for the balloon, required by ymaps API
     * @return {ymaps.Layout}
     * @private
     */
    Map.prototype.generateBalloonLayout_ = function() {
        var that = this;
        var balloonContent = sm.lSchool.bMap.Template.balloon().content;
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
                getShape: function() {
                    if (!this._isElement(this._$element)) {
                        return MyBalloonLayout.superclass.getShape.call(this);
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
     * Success on getting all schools
     * @param {Array.<Object>} responseData
     * @return {Array<Object>}
     * @private
     */
    Map.prototype.getAllPlacemarkCollection_ = function(responseData) {
        var that = this,
            data = JSON.parse(responseData),
            result = [];

        data.forEach(function(item) {
            if (item.id != that.params_.id) {
                result.push.apply(
                    result,
                    that.getSchoolPlacemarks_(item)
                );
            }
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
     * Add placemarks to map
     * @param {Object} data
     * @return {Array<Object>}
     * @private
     */
    Map.prototype.getSchoolPlacemarks_ = function(data) {
        var totalScore = data.totalScore,
            presetKey = Map.PresetName.DEFAULT,
            addressLength = data.addresses.length,
            result = [];

        if (totalScore >= 4) {
            presetKey = Map.PresetName.GREEN;
        } else if (totalScore >= 3) {
            presetKey = Map.PresetName.YELLOW;
        } else if (totalScore > 0) {
            presetKey = Map.PresetName.RED;
        }

        var preset = this.currentPlacemarkPresetOptions_[presetKey];

        for (var i = 0, id, address; i < addressLength; i++) {
            id = this.currentPlacemarkId_++;
            address = data.addresses[i];

            result.push({
                'type': 'Feature',
                'id': id,
                'geometry': {
                    'type': 'Point',
                    'coordinates': [address.lat, address.lng]
                },
                'properties': {
                    'id': data.id,
                    'name': data.name,
                    'url': data.url,
                    'description': data.description,
                    'address': {
                        'name': address.name,
                        'stages': address.stages
                    }
                },
                'options': {
                    'preset': preset
                }
            });
        }
        return result;
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
            this.getMapParams_(this.params_.addresses)
        );
        this.ymaps_.setZoom(Math.floor(this.ymaps_.getZoom()));
        this.ymaps_.behaviors.enable('scrollZoom');
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
     * @param {Array.<Object>} coords
     * @return {Object}
     * @private
     */
    Map.prototype.getMapParams_ = function(coords) {
        var ymapsParams = {
            controls: []
        };

        if (coords.length > 1) {
            ymapsParams['bounds'] = this.getBounds_(coords);
        } else if (coords.length == 1) {
            ymapsParams['center'] = this.coordToArray_(coords[0]);
            ymapsParams['zoom'] = Map.defaultPosition.ZOOM;
        } else {
            ymapsParams['center'] = Map.defaultPosition.CENTER;
            ymapsParams['zoom'] = Map.defaultPosition.ZOOM;
        }

        return ymapsParams;
    };


    /**
     * Converts coord object to array
     * @param {Object} coordObject
     * @return {Array<number>}
     * @private
     */
    Map.prototype.coordToArray_ = function(coordObject) {
        var coord = [];
        coord.push(coordObject.lat);
        coord.push(coordObject.lng);
        return coord;
    };


    /**
     * Setter for bounds
     * @param {Object} coords
     * @return {Array.<Array.<number>>}
     * @private
     */
    Map.prototype.getBounds_ = function(coords) {
        return this.correctBounds_(this.calculateBounds_(coords), {
            lat: coords[0].lat,
            lon: coords[0].lng
        });
    };


    /**
     * Calculate map bounds
     * @param {Object} coords
     * @return {Object}
     * @private
     */
    Map.prototype.calculateBounds_ = function(coords) {
        var south, west, east, north;
        east = north = 0;
        south = west = 90;

        for (var i = 0, point; point = coords[i]; i++) {
            var latitude = point.lat,
                longitude = point.lng;

            north = latitude > north ? latitude : north;
            south = latitude < south ? latitude : south;
            east = longitude > east ? longitude : east;
            west = longitude < west ? longitude : west;
        }

        return {
            north: north,
            west: west,
            south: south,
            east: east
        };
    };


    /**
     * Recalculate map bounds
     * @param {Object} border
     * @param {Object} newCenter
     * @return {Array<Array<number>>}
     * @private
     */
    Map.prototype.correctBounds_ = function(border, newCenter) {
        var center = {
            lat: (border.north + border.south) / 2,
            lon: (border.west + border.east) / 2
        };

        if (newCenter.lat > center.lat)
            border.north = border.south + (newCenter.lat - border.south) * 2;
        else
            border.south = border.north - (border.north - newCenter.lat) * 2;

        if (newCenter.lon > center.lon)
            border.east = border.west + (newCenter.lon - border.west) * 2;
        else
            border.west = border.east - (border.east - newCenter.lon) * 2;

        var correction = 0.5 * Math.abs(border.north - border.south);
        border.north += correction;
        border.south -= correction;
        border.east += correction;
        border.west -= correction;

        return [[border.north, border.west], [border.south, border.east]];
    };
});
