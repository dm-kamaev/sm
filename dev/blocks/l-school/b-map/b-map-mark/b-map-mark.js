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
    /**
    *   @private
    */
    this.balloonLayoutClass_ = undefined;
    /**
    *   @static
    */
    this.contents = undefined;
    /**
    *   @static
    */
    this.balloonTemplate = '<div class="b-map-mark__balloon">'+
                                '<div class="b-map-mark__school-info">'+
                                    '<span class="b-map-mark__school-type">'+
                                        'Центр образования'+
                                    '</span>'+
                                    '<br/>'+
                                    '<span class="b-map-mark__school-name">'+
                                        '№548 "Царицыно"'+
                                    '</span>'+
                                '</div>'+
                                '<div class="b-map-mark__rating"> '+
                                    '3,75'+
                                '</div>'+
                                '<div class="arrow">'+
                                '</div>'+
                            '</div>';
    /**
    *   @static
    */
    this.hintTemplate;
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

sm.lSchool.bMap.bMark.Mark.prototype.setBalloonLayoutClass = function() {
    this.balloonLayoutClass_ = ymaps.templateLayoutFactory.createClass(this.balloonTemplate, {
        build: function () {
            this.constructor.superclass.build.call(this);
            // var parentEl = this.getParentElement();
            // console.log(parentEl);
            // parentEl.style.width = '200px';
        }
    });
};

// sm.lSchool.bMap.bMark.Mark.prototype.createBalloon = function (map) {
//     return new Balloon(map, this.balloonTemplate, {
//         maxWidth: 150
//     });
// };

sm.lSchool.bMap.bMark.Mark.prototype.init = function (config) {
    this.setMarkData(config);
    this.setBalloonLayoutClass();
    this.contents = new ymaps.Placemark(
        [this.coords_.lat, this.coords_.lng],
        {
            hintContent: this.hintContent_,
            balloonContent: this.balloonContent_
        },
        {
            balloonContentLayout: this.balloonLayoutClass_,
            balloonPanelMaxMapArea: 0,
            balloonOffset: [-55,0],
            balloonCloseButton: false
        }
    );
};
