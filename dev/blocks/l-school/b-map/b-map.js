goog.provide('sm.lSchool.bMap.Map');

goog.require('sm.lSchool.bMap.MapPin');

sm.lSchool.bMap.Map = function(domEl) {
    /**
    *   @private
    */
    this.zoom_ = undefined;
    /**
    *   @private
    */
    this.coords_ = {};
    /**
    *   @private
    */
    this.pinArr_ = [];
    /**
    *   @private
    */
    this.root_ = domEl;
};

sm.lSchool.bMap.Map.MAP_CONFIG = {
    initZoom: 11,
    initCoords: {
        lng: 37.64,
        lat: 55.76
    }
};

sm.lSchool.bMap.Map.PIN_DATA = [
    {
        type: 'ГБОУ',
        name: 'Лицей №1535',
        rating: 4.9,
        coords: {lat: 55.724186, lng: 37.556252},
        url: '#',
        isCurrent: true
    },
    {
        type: 'ГОУ',
        name: 'СОШ №1247',
        coords: {lat: 55.755768, lng: 37.617671},
        url: '#',
        isCurrent: false
    }
];

sm.lSchool.bMap.Map.prototype.setZoom = function(zoom) {
    this.zoom_ = zoom;
};

sm.lSchool.bMap.Map.prototype.setCoords = function(lat, lng) {
    this.coords_.lat = lat;
    this.coords_.lng = lng;
};

sm.lSchool.bMap.Map.prototype.setInit = function() {
    this.setZoom(sm.lSchool.bMap.Map.MAP_CONFIG.initZoom);
    this.setCoords(
        sm.lSchool.bMap.Map.MAP_CONFIG.initCoords.lat,
        sm.lSchool.bMap.Map.MAP_CONFIG.initCoords.lng
    );
};

sm.lSchool.bMap.Map.prototype.pinFactory = function (config) {
    return sm.lSchool.bMap.MapPin.init().setPin(config);
};

sm.lSchool.bMap.Map.prototype.setPinArr = function () {
    var that = this;
    this.pinArr_ = sm.lSchool.bMap.Map.PIN_DATA.map(
        function (item) {
            return that.pinFactory(item);
        }
    );
};

sm.lSchool.bMap.Map.prototype.placePins = function () {
    if (this.pinArr_.length === 0) {
        console.log('No pins!');
        return;
    }
    console.log(this.pinArr_.length + ' pins should be on the map');
    var that = this;
    this.pinArr_.forEach(
        function(item) {that.ymaps_.geoObjects.add(item);}
    );
};

sm.lSchool.bMap.Map.prototype.init = function() {
    console.log('Initializing ymaps...');
    var that = this;
    ymaps.ready(function () {
        console.log('Hello, Yandex!');
        that.setInit();
        that.ymaps_ = new ymaps.Map(
            that.root_,
            {
                'center': [that.coords_.lat, that.coords_.lng],
                'zoom': that.zoom_,
                controls: []
            }
        );
        that.setPinArr();
        that.placePins();
    });
};

console.log('Map script.');
var map = new sm.lSchool.bMap.Map(document.querySelector('.b-map__wrapper'));
map.init();
