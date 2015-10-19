'use strict';

var sm = {
    lSchool: {
        bMap: {
            bPin: {}
        }
    }
};

sm.lSchool.bMap.bPin.Pin = function() {
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
    this.balloonTemplate = '<div class="b-map-pin__balloon">'+
                                '<div class="b-map-pin__school-info">'+
                                    '<span class="b-map-pin__school-type">'+
                                        'Центр образования'+
                                    '</span>'+
                                    '<br/>'+
                                    '<span class="b-map-pin__school-name">'+
                                        '№548 "Царицыно"'+
                                    '</span>'+
                                '</div>'+
                                '<div class="b-map-pin__rating"> '+
                                    '3,75'+
                                '</div>'+
                                '<div class="arrow">'+
                                '</div>'+
                            '</div>';
    /**
    *   @static
    */
    this.pinIconConfig = {
        layout: 'default#image',
        imageHref: '/images/l-school/b-map/b-map-pin/geotag.png',
        imageSize: [30, 42]
    };
    // /**
    // *   @static
    // */
    // this.hintTemplate;
};

sm.lSchool.bMap.bPin.Pin.prototype.setCoords = function(lat, lng) {
    this.coords_.lat = lat;
    this.coords_.lng = lng;
};

sm.lSchool.bMap.bPin.Pin.prototype.setHint = function (str) {
    this.hintContent_ = str;
};

sm.lSchool.bMap.bPin.Pin.prototype.setBalloon = function (str) {
    this.balloonContent_ = str;
};

sm.lSchool.bMap.bPin.Pin.prototype.setPinData = function (config) {
    this.setCoords(config.coords.lat, config.coords.lng);
    this.setHint(config.hint);
    this.setBalloon(config.balloon);
};

sm.lSchool.bMap.bPin.Pin.prototype.setBalloonLayoutClass = function() {
    this.balloonLayoutClass_ = ymaps.templateLayoutFactory.createClass(this.balloonTemplate, {
        build: function () {
            this.constructor.superclass.build.call(this);
            // var parentEl = this.getParentElement();
            // console.log(parentEl);
            // parentEl.style.width = '200px';
        }
    });
};

sm.lSchool.bMap.bPin.Pin.prototype.init = function (config) {
    this.setPinData(config);
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
            balloonCloseButton: false,
            iconLayout: this.pinIconConfig.layout,
            iconImageHref: this.pinIconConfig.imageHref,
            iconImageSize: this.pinIconConfig.imageSize
        }
    );
};
