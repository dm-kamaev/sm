'use strict';

// var map = new ymaps.Map("map", {
//     center: [37.60, 55.75],
//     zoom: 11
// });
var sm = {
    lSchool: {
        bMap: {}
    }
};

var ymaps;

var CONFIG = {
    ymapsURL: 'https://api-maps.yandex.ru/2.1/?lang=ru_RU',
    initZoom: 11,
    initCoords: {
        lat: 37.60,
        lng: 55.75
    },
    // Must be a DOM element
    mapContainer: document.querySelector('.b-map__wrapper')
};

sm.lSchool.bMap.Map = function() {
    /**
    *   @private
    */
    this.ymaps_ = undefined;
    /**
    *   @private
    */
    this.zoom_ = undefined;
    /**
    *   @private
    */
    this.mapContainer_ = undefined;
    /**
    *   @private
    */
    this.coords_ = {};
};

sm.lSchool.bMap.Map.prototype.setYmapsURL = function(url) {
    this.ymapsURL = url;
};

sm.lSchool.bMap.Map.prototype.setYmaps = function(cb) {
    if (typeof ymaps === 'undefined') {
        var req = new XMLHttpRequest(),
            ymapsURL = this.ymapsURL;
        req.addEventListener('error', function(err) {throw new Error(err);});
        req.open('GET', ymapsURL);
        req.send();
        console.log('Request: ' + JSON.stringify(req));
        req.onreadystatechange = function() {
            if (req.readyState === 1) {console.log('Connecting...');}
            if (req.readyState === 4) {
                console.log('Connection established');
                if (req.status === 200) {
                    ymaps = req.responseText;
                    console.log('Ymaps loaded successfully!');
                    cb()
                } else {
                    throw new Error('Cannot get ymaps!');
                }
            }
        };
    } else console.log(ymaps);
};

sm.lSchool.bMap.Map.prototype.setMapContainer = function(domEl) {
    this.mapContainer_ = domEl;
};

sm.lSchool.bMap.Map.prototype.setZoom = function(zoom) {
    if (typeof zoom !== 'number') {
        throw new Error('Zoom parameter must be a number!');
    }
    this.zoom_ = zoom;
};

sm.lSchool.bMap.Map.prototype.setCoords = function(lat, lng) {
    if (typeof lat !== 'number' || typeof lng !== 'number') {
        throw new Error('Coords parameters must be numbers!');
    }
    this.coords_.lat = lat;
    this.coords_.lng = lng;
};

sm.lSchool.bMap.Map.prototype.setInit = function(settingsObj) {
    this.setmapContainer(settingsObj.domEl);
    this.setZoom(settingsObj.zoom);
    this.setCoords(settingsObj.coords.lat, settingsObj.coords.lng);
};

sm.lSchool.bMap.Map.prototype.init = function() {
    this.setYmapsURL(CONFIG.ymapsURL);
    console.log(this.ymapsURL);
    this.setZoom(CONFIG.initZoom);
    console.log(this.zoom_);
    this.setCoords(CONFIG.initCoords.lat, CONFIG.initCoords.lng);
    console.log(this.coords_.lat, this.coords_.lng);
    this.setMapContainer(CONFIG.mapContainer);
    console.log(CONFIG.mapContainer);
    this.setYmaps(function() {
        console.log('YMaps ready!');
        this.ymaps_ = new ymaps.Map(
            this.mapContainer_,
            {
                'center': [this.coords_.lat, this.coords_.lng],
                'zoom':this.zoom_
            }
        );
    });
};

console.log('Hello, Yandex!');
var Map = new sm.lSchool.bMap.Map();
Map.init();
