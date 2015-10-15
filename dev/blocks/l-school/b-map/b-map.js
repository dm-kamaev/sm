'use strict';

var sm = {
    lSchool: {
        bMap: {}
    }
};

sm.lSchool.bMap.Map = function() {
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
    /**
    *   @private
    */
    this.markArr_ = [];
    /**
    *   @static
    */
    this.config = {
        initZoom: 11,
        initCoords: {
            lng: 37.64,
            lat: 55.76
        },
        // Must be a DOM element!
        mapContainer: document.querySelector('.b-map__wrapper')
    };
    /**
    *   @static
    */
    this.markDataArr = [
        {
            coords: {lat: 55.731488, lng: 37.638394},
            hint: 'Мы здесь',
            balloon: 'По версии Яндекса'
        },
        {
            coords: {lat: 55.703819, lng: 37.625587},
            hint: 'А на самом деле',
            balloon: 'Тут'
        }
    ];
    /**
    *   @static
    */
};

sm.lSchool.bMap.Map.prototype.setMapContainer = function(domEl) {
    this.mapContainer_ = domEl;
};

sm.lSchool.bMap.Map.prototype.setConfig = function (obj) {
    this.config = obj;
};

sm.lSchool.bMap.Map.prototype.setZoom = function(zoom) {
    this.zoom_ = zoom;
};

sm.lSchool.bMap.Map.prototype.setCoords = function(lat, lng) {
    this.coords_.lat = lat;
    this.coords_.lng = lng;
};

sm.lSchool.bMap.Map.prototype.setInit = function() {
    this.setMapContainer(this.config.mapContainer);
    this.setZoom(this.config.initZoom);
    this.setCoords(this.config.initCoords.lat, this.config.initCoords.lng);
};

sm.lSchool.bMap.Map.prototype.markFactory = function (config) {
    var mark = new sm.lSchool.bMap.bMark.Mark();
    mark.init(config);
    return mark.contents;
};

sm.lSchool.bMap.Map.prototype.setMarkArr = function () {
    var that = this;
    this.markArr_ = this.markDataArr.map(
        function (item) {
            return that.markFactory(item);
        }
    );
};

sm.lSchool.bMap.Map.prototype.placeMarks = function () {
    if (this.markArr_.length === 0) {
        console.log('No marks!');
        return;
    }
    console.log(this.markArr_.length + ' marks should be on the map');
    var that = this;
    this.markArr_.forEach(
        function(item) {that.ymaps_.geoObjects.add(item);}
    );
};

sm.lSchool.bMap.Map.prototype.init = function() {
    this.setInit();
    this.ymaps_ = new ymaps.Map(
        this.mapContainer_,
        {
            'center': [this.coords_.lat, this.coords_.lng],
            'zoom': this.zoom_
        }
    );
    this.setMarkArr();
    this.placeMarks();
};

var map = new sm.lSchool.bMap.Map();
ymaps.ready(map.init.bind(map));
