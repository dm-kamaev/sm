'use strict';

// var map = new ymaps.Map("map", {
//     center: [37.60, 55.75],
//     zoom: 11
// });
var sm = {
    lSchools: {
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

sm.lSchools.bMap.Map = function() {
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

sm.lSchools.bMap.Map.prototype.setYmapsURL = function(url) {
    this.ymapsURL = url;
};

sm.lSchools.bMap.Map.prototype.setYmaps = function() {
    if (typeof ymaps === undefined) {
        var req = new XMLHttpRequest(),
            ymapsURL = this.ymapsURL;
        req.addEventListener('error', function(err) {throw new Error(err);});
        req.open('GET', ymapsURL);
        req.onreadystatechange = function() {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    ymaps = req.responseText;
                } else {
                    throw new Error('Cannot get ymaps!');
                }
            }
        };
    }
};

sm.lSchools.bMap.Map.prototype.setMapContainer = function(domEl) {
    this.mapContainer_ = domEl;
};

sm.lSchools.bMap.Map.prototype.setZoom = function(zoom) {
    if (typeof zoom !== Number) {
        throw new Error('Initial zoom parameter must be a number!');
    }
    this.zoom_ = zoom;
};

sm.lSchools.bMap.Map.prototype.setCoords = function(lat, lng) {
    if (typeof lat !== Number || typeof lng !== Number) {
        throw new Error('Initial coords parameters must be numbers!');
    }
    this.coords_.lat = lat;
    this.coords_.lng = lng;
};

sm.lSchools.bMap.Map.prototype.setInit = function(settingsObj) {
    this.setmapContainer(settingsObj.domEl);
    this.setZoom(settingsObj.zoom);
    this.setCoords(settingsObj.coords.lat, settingsObj.coords.lng);
};

sm.lSchools.bMap.Map.prototype.init = function() {
    this.setYmapsURL(CONFIG.ymapsURL);
    console.log(this.ymapsURL);
    this.setYmaps();
    this.setZoom(CONFIG.initZoom);
    console.log(this.zoom_);
    this.setCoords(CONFIG.initCoords);
    console.log(this.coords_.lat, this.coords_.lng);
    this.setMapContainer(CONFIG.mapContainer);
    ymaps.ready(function() {
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

sm.lSchools.bMap.Map.init();
