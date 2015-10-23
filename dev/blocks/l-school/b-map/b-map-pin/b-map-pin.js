'use strict';

goog.provide('sm.lSchool.bMap.bPin.Pin');
goog.require('sm.lSchool.bMap.bPin.Template');
goog.require('goog.soy');

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
    // /**
    //  *   @static
    //  *   Offset is calculated as [balloon's width * -0.2, balloon's height * -0.1]
    //  */
    // this.balloonOffset = [-40, -11.6];
    /**
     *   @static
     */
    this.contents = undefined;
    /**
     *   @static
     */
    this.balloonTemplate = goog.soy.renderAsElement(sm.lSchool.bMap.bPin.Template.pin);
    // '<div class="b-map-pin__balloon">' +
    //     '<div class="b-map-pin__school-info">' +
    //     '<span class="b-map-pin__school-type">' +
    //     'Центр образования' +
    //     '</span>' +
    //     '<br/>' +
    //     '<span class="b-map-pin__school-name">' +
    //     '№548 "Царицыно"' +
    //     '</span>' +
    //     '<span class="b-map-pin__rating"> ' +
    //     '3,75' +
    //     '</span>' +
    //     '</div>' +
    //     '</div>';
    /**
     *   @static
     */
    this.pinIconConfig = {
        layout: 'default#image',
        imageHref: '/images/l-school/b-map/b-map-pin/geotag.png',
        imageSize: [30, 30]
    };
    // /**
    //  *   @static
    //  *   Sets a class' name which will be used for styling our custom balloon.
    //  */
    // this.newBalloonTailElClass = 'b-map-pin__balloon-pin';
};
// sm.lSchool.bMap.MapPin
sm.lSchool.bMap.bPin.Pin.prototype.setCoords = function(lat, lng) {
    this.coords_.lat = lat;
    this.coords_.lng = lng;
};

sm.lSchool.bMap.bPin.Pin.prototype.setHint = function(str) {
    this.hintContent_ = str;
};

sm.lSchool.bMap.bPin.Pin.prototype.setBalloon = function(str) {
    this.balloonContent_ = str;
};

sm.lSchool.bMap.bPin.Pin.prototype.setPinData = function(config) {
    this.setCoords(config.coords.lat, config.coords.lng);
    this.setHint(config.hint);
    this.setBalloon(config.balloon);
};

sm.lSchool.bMap.bPin.Pin.prototype.setBalloonLayout = function() {
    // var that = this;
    this.balloonLayoutClass_ = ymaps.templateLayoutFactory.createClass(this.balloonTemplate, {
        build: function() {
            // We use this method to replace the default balloon tail with our pin icon.
            this.constructor.superclass.build.call(this);
            //Don't forget to set class name in the constructor.
            // if (!that.newBalloonTailElClass) return;
            //
            // var generatedWrapper = this.getParentElement();
            // var balloonParentEl = generatedWrapper.parentNode.parentNode;
            //
            // // Setting a new DOM element for the balloon's tail.
            // var tailEl = balloonParentEl.nextSibling;
            // var newEl = document.createElement('div');
            // newEl.setAttribute('class', that.newBalloonTailElClass);
            // var parentEl = tailEl.parentNode;
            // parentEl.replaceChild(newEl, tailEl);
        }
    });
};

sm.lSchool.bMap.bPin.Pin.prototype.init = function(config) {
    this.setPinData(config);
    this.setBalloonLayout();
    this.contents = new ymaps.Placemark(
        [this.coords_.lat, this.coords_.lng], {
            hintContent: this.hintContent_,
            balloonContent: this.balloonContent_
        }, {
            balloonContentLayout: this.balloonLayoutClass_,
            balloonPanelMaxMapArea: 0,
            // balloonOffset: this.balloonOffset,
            balloonCloseButton: false,
            iconLayout: this.pinIconConfig.layout,
            iconImageHref: this.pinIconConfig.imageHref,
            iconImageSize: this.pinIconConfig.imageSize
        }
    );
};
