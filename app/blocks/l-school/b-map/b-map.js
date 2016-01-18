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
     * Current pin id
     * @type {number}
     * @private
     */
    this.currentId_ = 0;
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
        BALLOON_ARROW: 'b-map__balloon-triangle',
        CLOSE_BALLOON: 'b-map__balloon-close'
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

        this.getParams_(element);

        var ymapsParams = this.getMapParams_(this.params_.coords);

        ymaps.ready(jQuery.proxy(function() {

            //presets initialize
            this.initPresets_();

            //maps initialize
            this.ymaps_ = new ymaps.Map(element, ymapsParams);
            this.ymaps_.setZoom(Math.floor(this.ymaps_.getZoom()));
            this.initControls_();

            //object manager initialize
            this.objectManager_ = new ymaps.ObjectManager({
                geoObjectBalloonAutoPan: true,
                geoObjectHideIconOnBalloonOpen: true,
                geoObjectBalloonPanelMaxMapArea: 0,
                geoObjectBalloonCloseButton: true,
                geoObjectBalloonOffset: [0, 0],
                geoObjectBalloonLayout:
                    this.generateBalloonLayout_(this.params_),
                geoObjectPane: 'balloon',
                geoObjectBalloonZIndex: 1000
            });
            this.ymaps_.geoObjects.add(this.objectManager_);

            //placemarks
            this.addPlacemarkToMap_(this.params_);
            this.getAllSchools_();
        }, this));
    };


    /**
     * Parameters initialization
     * @param {Element} element
     * @private
     */
    Map.prototype.getParams_ = function(element) {
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
        ymaps.option.presetStorage.add(
            'default#icon',
            {
                iconImageHref: '/images/l-school/b-map/' +
                'b-map__pin/icons/map-pin-th.png',
                iconImageSize: [38, 40],
                iconImageOffset: [-13, -39],
                iconLayout: 'default#image',
                zIndex: 230
            }
        );

        ymaps.option.presetStorage.add(
            'green#icon',
            {
                iconImageHref: '/images/l-school/b-map/' +
                'b-map__pin/icons/map-pin-green-th.png',
                iconImageSize: [38, 40],
                iconImageOffset: [-13, -39],
                iconLayout: 'default#image',
                zIndex: 230
            }
        );

        ymaps.option.presetStorage.add(
            'yellow#icon',
            {
                iconImageHref: '/images/l-school/b-map/' +
                'b-map__pin/icons/map-pin-yellow-th.png',
                iconImageSize: [38, 40],
                iconImageOffset: [-13, -39],
                iconLayout: 'default#image',
                zIndex: 230
            }
        );

        ymaps.option.presetStorage.add(
            'red#icon',
            {
                iconImageHref: '/images/l-school/b-map/' +
                'b-map__pin/icons/map-pin-red-th.png',
                iconImageSize: [38, 40],
                iconImageOffset: [-13, -39],
                iconLayout: 'default#image',
                zIndex: 230
            }
        );

        /*points*/

        ymaps.option.presetStorage.add(
            'point-default#icon',
            {
                iconImageHref: '/images/l-school/b-map/' +
                'b-map__pin/icons/map-point-pin-th.png',
                iconImageSize: [13, 13],
                iconImageOffset: [-6, -6],
                iconLayout: 'default#image',
                zIndex: 210
            }
        );

        ymaps.option.presetStorage.add(
            'point-green#icon',
            {
                iconImageHref: '/images/l-school/b-map/' +
                'b-map__pin/icons/map-point-pin-green-th.png',
                iconImageSize: [13, 13],
                iconImageOffset: [-6, -6],
                iconLayout: 'default#image',
                zIndex: 210
            }
        );

        ymaps.option.presetStorage.add(
            'point-yellow#icon',
            {
                iconImageHref: '/images/l-school/b-map/' +
                'b-map__pin/icons/map-point-pin-yellow-th.png',
                iconImageSize: [13, 13],
                iconImageOffset: [-6, -6],
                iconLayout: 'default#image',
                zIndex: 210
            }
        );

        ymaps.option.presetStorage.add(
            'point-red#icon',
            {
                iconImageHref: '/images/l-school/b-map/' +
                'b-map__pin/icons/map-point-pin-red-th.png',
                iconImageSize: [13, 13],
                iconImageOffset: [-6, -6],
                iconLayout: 'default#image',
                zIndex: 210
            }
        );
    };


    /**
     * Sets a layout for the balloon, required by ymaps API
     * @param {Object} data
     * @return {ymaps.Layout}
     * @private
     */
    Map.prototype.generateBalloonLayout_ = function(data) {
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
                    this.closeButton_ = jQuery(
                        '.' + Map.CssClass.CLOSE_BALLOON,
                        this._$element[0]
                    );
                    this.arrow_ = jQuery(
                        '.' + Map.CssClass.BALLOON_ARROW,
                        this._$element[0]
                    );
                    this.applyElementOffset();
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

                    if (!this._isElement(this._$element)) {
                        return;
                    }

                    this.applyElementOffset();
                    this.events.fire('shapechange');
                },
                applyElementOffset: function() {
                    this._$element.css({
                        left: -(this._$element[0].offsetWidth / 2),
                        top: -(this._$element[0].offsetHeight +
                            this.arrow_[0].offsetHeight / 2)
                    });
                },
                onCloseClick: function(e) {
                    e.preventDefault();

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
                                (position.top + this._$element[0].offsetHeight +
                                    this.arrow_[0].offsetHeight / 2)
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
                that.addPointPlacemarkToMap_(item);
            }
        });
    };


    /**
     * Add point placemark to map
     * @param {Object} data
     * @private
     */
    Map.prototype.addPointPlacemarkToMap_ = function(data) {
        for (var i = 0, id; i < data.coords.length; i++) {
            id = this.currentId_++;

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
                    'url': data.url,
                    'totalScore': data.totalScore ?
                        parseFloat(data.totalScore).toFixed(1) : undefined
                }
            }));

            if (data.totalScore >= 4) {
                this.objectManager_.objects.setObjectOptions(id, {
                    preset: 'point-green#icon'
                });
            } else if (data.totalScore >= 3) {
                this.objectManager_.objects.setObjectOptions(id, {
                    preset: 'point-yellow#icon'
                });
            } else if (data.totalScore > 0) {
                this.objectManager_.objects.setObjectOptions(id, {
                    preset: 'point-red#icon'
                });
            } else {
                this.objectManager_.objects.setObjectOptions(id, {
                    preset: 'point-default#icon'
                });
            }
        }
    };

    /**
     * Add placemark to map
     * @param {Object} data
     * @private
     */
    Map.prototype.addPlacemarkToMap_ = function(data) {
        for (var i = 0, id; i < data.coords.length; i++) {
            id = this.currentId_++;

            this.objectManager_.add(JSON.stringify({
                'type': 'Feature',
                'id': id,
                'geometry': {
                    'type': 'Point',
                    'coordinates': [data.coords[i].lat, data.coords[i].lng]
                },
                'properties': {
                    'name': data.name,
                    'totalScore': data.totalScore ?
                        parseFloat(data.totalScore).toFixed(1) : undefined
                }
            }));

            if (data.totalScore >= 4) {
                this.objectManager_.objects.setObjectOptions(id, {
                    preset: 'green#icon'
                });
            } else if (data.totalScore >= 3) {
                this.objectManager_.objects.setObjectOptions(id, {
                    preset: 'yellow#icon'
                });
            } else if (data.totalScore > 0) {
                this.objectManager_.objects.setObjectOptions(id, {
                    preset: 'red#icon'
                });
            } else {
                this.objectManager_.objects.setObjectOptions(id, {
                    preset: 'default#icon',
                    'options': {
                        iconZIndexActive: 900,
                        zIndexActive: 900
                    }
                });
            }
        }
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
