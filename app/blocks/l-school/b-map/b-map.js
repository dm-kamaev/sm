/**
 * @fileoverview A constructor for a Yandex Maps map
 * @author Nikita Gubchenko
 */
goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.dom.dataset');
goog.require('goog.events');
goog.require('goog.object');
goog.require('goog.ui.Component');
goog.provide('sm.lSchool.bMap.Map');
goog.require('sm.lSchool.bMap.Template');

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
    this.currentPlacemarkPresets_ = {};
};
goog.inherits(sm.lSchool.bMap.Map, goog.ui.Component);

goog.scope(function() {
    var Map = sm.lSchool.bMap.Map;


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
    Map.PresetsNames = {
        DEFAULT: 'default',
        GREEN: 'green',
        YELLOW: 'yellow',
        RED: 'red'
    };


    /**
     * Map presets types enum
     * @enum {string}
     */
    Map.PresetsTypes = {
        DEFAULT: '',
        POINT: 'point'
    };


    /**
     * Map presets states enum
     * @enum {string}
     */
    Map.PresetsStates = {
        DEFAULT: '',
        ACTIVE: 'active'
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

        var ymapsParams = this.getMapParams_(this.params_.coords);

        ymaps.ready(jQuery.proxy(function() {

            //presets initialize
            this.initPresets_();

            //maps initialize
            this.ymaps_ = new ymaps.Map(element, ymapsParams);
            this.ymaps_.setZoom(Math.floor(this.ymaps_.getZoom()));
            this.initControls_();

            //object manager initialization
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

            //placemarks
            this.setCurrentPresets_(Map.PresetsTypes.DEFAULT);
            this.addPlacemarkToMap_(this.params_, true);

            this.setCurrentPresets_(Map.PresetsTypes.POINT);
            this.getAllSchools_();
        }, this));
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
        var path = '/images/l-school/b-map/b-map__pin/icons/';
        var names = [
            Map.PresetsNames.DEFAULT,
            Map.PresetsNames.GREEN,
            Map.PresetsNames.YELLOW,
            Map.PresetsNames.RED
        ];
        var types = [
            {
                prefix: Map.PresetsTypes.DEFAULT,
                iconImageSize: [38, 40],
                iconImageOffset: [-12, -39],
                balloonOffset: [0, -30],
                zIndex: 230
            },
            {
                prefix: Map.PresetsTypes.POINT,
                iconImageSize: [13, 13],
                iconImageOffset: [-6, -6],
                balloonOffset: [0, -1],
                zIndex: 210
            }
        ];
        var states = [
            {
                postfix: Map.PresetsStates.DEFAULT,
                zIndex: 0
            },
            {
                postfix: Map.PresetsStates.ACTIVE,
                zIndex: 1200
            }
        ];

        for (var j = 0, prefix; j < types.length; j++) {
            prefix = types[j].prefix != '' ? types[j].prefix + '-' : '';
            for (var k = 0, postfix; k < states.length; k++) {
                postfix = states[k].postfix != '' ?
                    '-' + states[k].postfix : '';
                for (var i = 0; i < names.length; i++) {
                    var hName = names[i] == 'default' ? '' : '-' + names[i];
                    var href = path + 'map-' + prefix + 'pin' + hName +
                        '-th.png';
                    ymaps.option.presetStorage.add(
                        prefix + names[i] + postfix,
                        {
                            balloonOffset: types[j].balloonOffset,
                            iconImageHref: href,
                            iconImageSize: types[j].iconImageSize,
                            iconImageOffset: types[j].iconImageOffset,
                            iconLayout: 'default#image',
                            zIndex: types[j].zIndex + states[k].zIndex,
                            zIndexHover:
                                types[j].zIndex + 100 + states[k].zIndex
                        }
                    );
                }
            }
        }
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
     * Get all schools
     * @private
     */
    Map.prototype.getAllSchools_ = function() {
        jQuery.ajax({
            url: '/api/address/list',
            type: 'POST',
            data: '',
            success: this.getAllSchoolsSuccess_.bind(this)
        });
    };


    /**
     * Success on getting all schools
     * @param {Array.<Object>} responseData
     * @private
     */
    Map.prototype.getAllSchoolsSuccess_ = function(responseData) {
        var that = this;
        var data = JSON.parse(responseData);

        data.forEach(function(item) {
            if (item.id != that.params_.id) {
                that.addPlacemarkToMap_(item);
            }
        });

        this.objectManager_.objects.events.add(
            'click',
            this.onPlacemarkClick_,
            this
        );
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
                    Map.PresetsStates.ACTIVE
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
                        .replace('-' + Map.PresetsStates.ACTIVE, '')
            }
        );
    };


    /**
     * Add placemark to map
     * @param {Object} data
     * @param {bool=} opt_isCurrent
     * @private
     */
    Map.prototype.addPlacemarkToMap_ = function(data, opt_isCurrent) {
        for (var i = 0, id, presetKey, totScore; i < data.coords.length; i++) {
            id = this.currentPlacemarkId_++;
            totScore = data.totalScore;

            if (totScore >= 4) {
                presetKey = Map.PresetsNames.GREEN;
            } else if (totScore >= 3) {
                presetKey = Map.PresetsNames.YELLOW;
            } else if (totScore > 0) {
                presetKey = Map.PresetsNames.RED;
            } else {
                presetKey = Map.PresetsNames.DEFAULT;
            }

            this.objectManager_.add(JSON.stringify({
                'type': 'Feature',
                'id': id,
                'geometry': {
                    'type': 'Point',
                    'coordinates': [data.coords[i].lat, data.coords[i].lng]
                },
                'properties': {
                    'id': data.id,
                    'name': data.name,
                    'notCurrent': !opt_isCurrent,
                    'totalScore': data.totalScore ?
                        parseFloat(data.totalScore).toFixed(1) : undefined
                },
                'options': {
                    'preset': this.currentPlacemarkPresets_[presetKey]
                }
            }));
        }
    };


    /**
     * Setter for current presets
     * @param {string} type
     * @private
     */
    Map.prototype.setCurrentPresets_ = function(type) {
        var presets = {};
        var prefix = type != '' ? type + '-' : '';

        for (var key in Map.PresetsNames) {
            presets[Map.PresetsNames[key]] = prefix + Map.PresetsNames[key];
        }

        this.currentPlacemarkPresets_ = presets;
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
     * Control initialization
     * @private
     */
    Map.prototype.initControls_ = function() {
        this.ymaps_.behaviors.enable('scrollZoom');
        this.ymaps_.controls.add(
            new ymaps.control.ZoomControl(),
            Map.ZOOM
        );
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
