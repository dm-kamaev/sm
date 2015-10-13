'use strict';

// var map = new ymaps.Map("map", {
//     center: [37.60, 55.75],
//     zoom: 11
// });

schools.bMap.Map = function() {
    this.ymaps_ = undefined;
    this.INIT_ZOOM = undefined;
}

schools.bMap.Map.prototype.setMapContainer = function(domSel) {
    this.mapContainer = domSel;
}

schools.bMap.Map.prototype.setInitZoom = function(zoom) {
    (typeof zoom !== Number) ? new Error('Initial zoom parameter must be a number!') : this.initZoom = integer;
}

schools.bMap.Map.prototype.setInitCoords = function(lat, lng) {
    if (typeof lat !== Number || typeof lng !== Number) {
        throw new Error('Initial coords parameters must be numbers!')
    }
    this.initCoords.lat = lat;
    this.initCoords.lng = lng;
}

schools.bMap.Map.prototype.initMap = function() {
    var container = this.mapContainer,
        zoom = this.initZoom,
        lat = this.initCoords.lat,
        lng = this.initCoords.lng;

    this.ymaps_ = new ymaps.Map(container, {'center': [lat, lng], 'zoom': zoom});
}
