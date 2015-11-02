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

        ymaps.ready(function() {
            this.ymaps_ = new ymaps.Map(
                element, {
                    'center': Map.defaultPosition.COORDS,
                    'zoom': Map.defaultPosition.ZOOM,
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
