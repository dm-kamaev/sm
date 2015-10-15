'use strict';

var sm = {
    lSchool: {
        bMap: {
            bMark: {}
        }
    }
};

// myPlacemark = new ymaps.Placemark([55.76, 37.64], {
//             hintContent: 'Москва!',
//             balloonContent: 'Столица России'
//         });

sm.lSchool.bMap.bMark.Mark = function() {
    /**
    *   @static
    */
    this.contents = undefined;
    /**
    *   @private
    */
    this.coords_ = {};
    /**
    *   @private
    */
    this.hintContent_ = undefined;
    /**
    *   @private
    */
    this.balloonContent_ = undefined;
};

sm.lSchool.bMap.bMark.Mark.prototype.setCoords = function(lat, lng) {
    this.coords_.lat = lat;
    this.coords_.lng = lng;
};

sm.lSchool.bMap.bMark.Mark.prototype.setHint = function (str) {
    this.hintContent_ = str;
};

sm.lSchool.bMap.bMark.Mark.prototype.setBalloon = function (str) {
    this.balloonContent_ = str;
};

sm.lSchool.bMap.bMark.Mark.prototype.setMarkData = function (config) {
    this.setCoords(config.coords.lat, config.coords.lng);
    this.setHint(config.hint);
    this.setBalloon(config.balloon);
};

sm.lSchool.bMap.bMark.Mark.prototype.init = function (config) {
    this.setMarkData(config);
    this.contents = new ymaps.Placemark(
        [this.coords_.lat, this.coords_.lng], {
            hintContent: this.hintContent_,
            balloonContent: this.balloonContent_
        }
    );
};
