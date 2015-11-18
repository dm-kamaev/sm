/**
 * @fileoverview A constructor for a Yandex Maps map
 * @author Nikita Gubchenko
 */

goog.provide('sm.lSchool.bMap.Map');

goog.require('goog.dom');
goog.require('goog.dom.dataset');
goog.require('goog.ui.Component');
goog.require('goog.object');
goog.require('goog.array');
goog.require('sm.lSchool.bMap.Template');
goog.require('sm.lSchool.bMap.MapPin');

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
        ZOOM: 11
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
		var borderArr = this.calculateBorder_(this.params_.coords),
			newCenter = {
				lat: this.params_.coords[0].lat,
				lon: this.params_.coords[0].lng
			}; 
		borderArr = this.correctBorder_(borderArr, newCenter);
        ymaps.ready(function() {
            this.ymaps_ = new ymaps.Map(
                element, {
					'bounds': borderArr,
                    controls: []
                }
            );
            this.placePlacemarks_(this.params_);
        }.bind(this));
    };

    /**
     * Creates an array of placemark objects from provided data
     * @param {Object}
     * @return {Array<ymaps.Placemark>}
     * @private
     */
    Map.prototype.itemToPlacemarks_ = function(item) {
        return item.coords.map(function(coord) {
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
        }.bind(this));
    };

    /**
     * Initializes a placemark before placing on the map
     * @param {(Object|Array<Object>)}
     * @return {Array<ymaps.Placemark>}
     * @private
     */
    Map.prototype.dataToPlacemarks_ = function(data) {
        if (!Array.isArray(data)) {
            data = [data];
        }
        return goog.array.flatten(
            data.map(
                function(item) {
                    return this.itemToPlacemarks_(item);
                }.bind(this)
            )
        );
    };


    /**
     * Calculate map border
     * @param {Object} data
	 * @return {Object}
     * @private
     */
    Map.prototype.calculateBorder_ = function(coords) {
		var south, west, east, north;
		east = north = 0;
		south = west = 90;
		coords.forEach(
			function(point) {
				var latitude = point.lat,
				longitude = point.lng;
				north = latitude > north ? latitude : north;
				south = latitude < south ? latitude : south;
				east = longitude > east ? longitude : east;
				west = longitude < west ? longitude : west;
			}
		);
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
			lat : (border.north + border.south) / 2,
			lon : (border.west + border.east) / 2
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
     * @param {Object}
     * @private
     */
    Map.prototype.placePlacemarks_ = function(data) {
        var placemarks = this.dataToPlacemarks_(data);
        placemarks.forEach(
            function(item) {
                this.ymaps_.geoObjects.add(item);
            }.bind(this)
        );

        var geoObject = this.ymaps_.geoObjects.get(0);
        if (geoObject) {
            geoObject.balloon.open();
        }

		

    };
});
