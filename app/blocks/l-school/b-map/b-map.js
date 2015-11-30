/**
 * @fileoverview A constructor for a Yandex Maps map
 * @author Nikita Gubchenko
 */
goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.dom.dataset');
goog.require('goog.object');
goog.require('goog.ui.Component');
goog.provide('sm.lSchool.bMap.Map');
goog.require('sm.lSchool.bMap.MapPin');
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
};
goog.inherits(sm.lSchool.bMap.Map, goog.ui.Component);

goog.scope(function() {
    var Map = sm.lSchool.bMap.Map;

    /**
     * A config object with DOM class names
     * @enum {String}
     */
    Map.CssClass = {
        ROOT: 'b-map'
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
    * @override
    */
    Map.prototype.createDom = function() {
        var element = sm.lSchool.bMap.Template();
        this.decorateInternal(element);
    };


    /**
    * @override
    */
    Map.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);
        if (!this.params_) {
            var dataset = goog.dom.dataset.get(element, 'params');
            this.params_ = JSON.parse(dataset);
        }

        var coords = this.params_.coords;
        if (coords.length > 1) {
            var borderArr = this.calculateBorder_(coords),
                newCenter = {
                    lat: coords[0].lat,
                    lon: coords[0].lng
                };
            borderArr = this.correctBorder_(borderArr, newCenter);
            var ymapsParams =
            {
                'bounds': borderArr,
                controls: []
            };
        } else if (coords.length == 1) {
            var ymapsParams = {
                'center': this.coordToArray_(coords[0]),
                'zoom': Map.defaultPosition.ZOOM,
                controls: []
            };
        } else {
            var ymapsParams = {
                'center': Map.defaultPosition.CENTER,
                'zoom': Map.defaultPosition.ZOOM,
                controls: []
            };
        }

        ymaps.ready(jQuery.proxy(function() {
            this.ymaps_ = new ymaps.Map(element, ymapsParams);
            this.placePlacemarks_(this.params_);
        }, this));
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
     * Creates an array of placemark objects from provided data
     * @param {Object} item
     * @return {Array<ymaps.Placemark>}
     * @private
     */
    Map.prototype.itemToPlacemarks_ = function(item) {
        return goog.array.map(item.coords, jQuery.proxy(function(coord) {
            var pinData = {};
            goog.object.extend(
                pinData,
                item, {
                    rating: item.totalScore,
                    coords: coord,
                    isCurrent: (item.id === this.params_.id)
                }
            );

            var pin = new sm.lSchool.bMap.MapPin(pinData);
            return pin.createPlacemark();
        }, this));
    };

    /**
     * Initializes a placemark before placing on the map
     * @param {(Object|Array<Object>)} data
     * @return {Array<ymaps.Placemark>}
     * @private
     */
    Map.prototype.dataToPlacemarks_ = function(data) {
        if (!(data instanceof Array)) {
            data = [data];
        }

        var res = [];

        for (var i = 0, item, placemarks; item = data[i]; i++) {
            placemarks = this.itemToPlacemarks_(item);
            for (var j = 0, placemark; placemark = placemarks[j]; j++) {
                res.push(placemark);
            }
        }

        return res;
    };


    /**
     * Calculate map border
     * @param {Object} coords
     * @return {Object}
     * @private
     */
    Map.prototype.calculateBorder_ = function(coords) {
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
     * Recalculate map border
     * @param {Object} border
     * @param {Object} newCenter
     * @return {Array<Array<number>>}
     * @private
     */
    Map.prototype.correctBorder_ = function(border, newCenter) {
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


    /**
     * Appends generated placemarks to the map
     * @param {Object} data
     * @private
     */
    Map.prototype.placePlacemarks_ = function(data) {
        var placemarks = this.dataToPlacemarks_(data);

        for (var i = 0, item; item = placemarks[i]; i++) {
            this.ymaps_.geoObjects.add(item);
        }

        var i = 0;
        this.ymaps_.geoObjects.each(function(obj) {
            if (!i) {
                obj.balloon.open();
            }
            i++;
        });
    };
});
