goog.provide('sm.lSchool.bMap.Map');

goog.require('goog.dom');
goog.require('goog.dom.dataset');
goog.require('goog.object');
goog.require('goog.array');
goog.require('sm.lSchool.bMap.MapPin');

sm.lSchool.bMap.Map = function(root) {

    /**
    *   @private
    */
    this.root_ = goog.dom.getElementByClass(
        sm.lSchool.bMap.Map.CssClass.ROOT,
        root
    );

    /**
    *   @private
    */
    this.wrap_ = goog.dom.getElementByClass(
        sm.lSchool.bMap.Map.CssClass.WRAP,
        this.root_
    );

    /**
    *   @private
    */
    this.ymaps_ = undefined;
    /**
    *   @private
    */
    this.id_ = JSON.parse(goog.dom.dataset.get(root, 'params'));
};

goog.scope(function () {
    var Map = sm.lSchool.bMap.Map;

    Map.CssClass = {
        ROOT: 'b-map',
        WRAP: 'b-map__wrapper'
    };

    // Map.dataObj = JSON.parse(goog.dom.dataset.get(root, 'params')) || {};

    Map.prototype.itemToPinArray_ = function(item) {
        return item.coords.map(function (coord) {
            var pinData = {};
            goog.object.extend(
                pinData,
                item,
                {
                    coords: coord,
                    isCurrent: (item.id === this.id_)
                }
            );

            return new sm.lSchool.bMap.MapPin(pinData);
        });
    };

    Map.prototype.dataToPlacemarks_ = function (data) {
        var that = this;
        if (!Array.isArray(data)) {
            data = [data];
        }
        return goog.array.flatten(
            data.map(
                function (item) {
                    var pins = that.itemToPinArray_(item);
                    return pins.map(function(pin) {
                        return pin.createPlacemark();
                    });
                }
            )
        );
    };

    Map.prototype.placePlacemarks_ = function (data) {
        var that = this;

        var placemarks = this.dataToPlacemarks_(data);
        placemarks.forEach(
            function(item) {that.ymaps_.geoObjects.add(item);}
        );

        var geoObject = that.ymaps_.geoObjects.get(0);
        if (geoObject) {
            geoObject.balloon.open();
        }
    };

    Map.prototype.init = function(data) {
        var that = this;
        ymaps.ready(function () {
            that.ymaps_ = new ymaps.Map(
                that.wrap_,
                {
                    'center': [55.755768, 37.617671],
                    'zoom': 11,
                    controls: []
                }
            );
            that.placePlacemarks_(data);
        });
    };
});
