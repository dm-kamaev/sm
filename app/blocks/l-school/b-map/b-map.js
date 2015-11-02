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
goog.require('sm.lSchool.bMap.MapPin');

/**
 * @constructor
 * @param DOM element containing layout
 * @extends {goog.ui.Component}
 */
sm.lSchool.bMap.Map = function(root) {

    goog.base(this);

    /**
     *   A root element of the component
     *   @private
     *   @type DOM element
     */
    this.root_ = goog.dom.getElementByClass(
        sm.lSchool.bMap.Map.CssClass.ROOT,
        root
    );

    /**
     *   An element which wraps the map
     *   @private
     *   @type DOM element
     */
    this.wrap_ = goog.dom.getElementByClass(
        sm.lSchool.bMap.Map.CssClass.WRAP,
        this.root_
    );

    /**
     *   The ymaps object
     *   @private
     *   @type object
     */
    this.ymaps_ = undefined;

    /**
     *   An ID of a current school
     *   @private
     *   @type number
     */
    this.id_ = JSON.parse(goog.dom.dataset.get(root, 'params'));
};

goog.inherits(sm.lSchool.bMap.Map, goog.ui.Component);

goog.scope(function() {
    var Map = sm.lSchool.bMap.Map;

    /**
     * A config object with DOM class names
     */
    Map.CssClass = {
        ROOT: 'b-map',
        WRAP: 'b-map__wrapper'
    };

    /**
    * These params are necessary for initializing ymaps,
    * represent center of Moscow
    */
    Map.defaultPosition = {
        coords: [55.755768, 37.617671],
        zoom: 11
    };
    
    // Map.dataObj = JSON.parse(goog.dom.dataset.get(root, 'params')) || {};

    /**
     * Creates an array of placemark objects from provided data
     * @private
     * @param object
     * @returns [object]
     */
    Map.prototype.itemToPinArray_ = function(item) {
        return item.coords.map(function(coord) {
            var pinData = {};
            goog.object.extend(
                pinData,
                item, {
                    coords: coord,
                    isCurrent: (item.id === this.id_)
                }
            );

            return new sm.lSchool.bMap.MapPin(pinData);
        });
    };

    /**
     * Initializes a placemark before placing on the map
     * @private
     * @param object || [object]
     * @returns [object]
     */
    Map.prototype.dataToPlacemarks_ = function(data) {
        if (!Array.isArray(data)) {
            data = [data];
        }
        return goog.array.flatten(
            data.map(
                function(item) {
                    var pins = this.itemToPinArray_(item);
                    return pins.map(function(pin) {
                        return pin.createPlacemark();
                    });
                }.bind(this)
            )
        );
    };

    /**
     * Appends generated placemarks to the map
     * @private
     * @param object
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

    /**
     * A factory for creating a map
     * @public
     * @param object
     */
    Map.prototype.init = function(data) {
        ymaps.ready(function() {
            this.ymaps_ = new ymaps.Map(
                this.wrap_, {
                    'center': Map.defaultPosition.coords,
                    'zoom': Map.defaultPosition.zoom,
                    controls: []
                }
            );
            this.placePlacemarks_(data);
        }.bind(this));
    };
});
