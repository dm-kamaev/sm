goog.provide('sm.lSchool.bMap.MapPin');
goog.require('sm.lSchool.bMap.PinTemplate');


sm.lSchool.bMap.MapPin = function() {
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
     *   @private
     */
    this.pinObj_ = undefined;

    /**
     *   @private
     */
    this.balloonContentString_ = undefined;
};

sm.lSchool.bMap.MapPin.ICON_CONFIG = {
    layout: 'default#image',
    imageHref: '/images/l-school/b-map/b-map-pin/geotag.png',
    imageSize: [30, 30],
    imageOffset: [-30, -30]
};

sm.lSchool.bMap.MapPin.prototype.setCoords = function(lat, lng) {
    this.coords_.lat = lat;
    this.coords_.lng = lng;
};

sm.lSchool.bMap.MapPin.prototype.setHint = function(str) {
    (typeof str !== 'undefined') ?
        this.hintContent_ = str : this.hintContent_ = '';
};

sm.lSchool.bMap.MapPin.prototype.setBalloonTemplateString = function(template,
                                                                     params) {
    this.balloonContentString_ = template(params).content;
};

sm.lSchool.bMap.MapPin.prototype.setPinData = function(config) {
    console.log(config.coords.lat + ' ' + config.coords.lng + ' ' + config.hint);
    this.setCoords(config.coords.lat, config.coords.lng);
    this.setHint(config.hint);
};

sm.lSchool.bMap.MapPin.prototype.setBalloonLayout = function() {
    console.log(this.balloonContentString_);
    this.balloonLayoutClass_ = ymaps.templateLayoutFactory
                                        .createClass(this.balloonContentString_);
};

sm.lSchool.bMap.MapPin.init = function () {
    return new sm.lSchool.bMap.MapPin();
};

sm.lSchool.bMap.MapPin.prototype.setPin = function(config) {
    this.setPinData(config);
    this.setBalloonTemplateString(
        sm.lSchool.bMap.PinTemplate.pin,
        {
            params: {
                type: config.type,
                name: config.name,
                rating: config.rating,
                url: config.url,
                isCurrent: config.isCurrent
            }
        }
    );
    this.setBalloonLayout();
    return new ymaps.Placemark(
        [this.coords_.lat, this.coords_.lng], {
            hintContent: this.hintContent_
        }, {
            balloonContentLayout: this.balloonLayoutClass_,
            balloonPanelMaxMapArea: 0,
            balloonCloseButton: false,
            iconLayout: sm.lSchool.bMap.MapPin.ICON_CONFIG.layout,
            iconImageHref: sm.lSchool.bMap.MapPin.ICON_CONFIG.imageHref,
            iconImageSize: sm.lSchool.bMap.MapPin.ICON_CONFIG.imageSize,
            iconImageOffset: sm.lSchool.bMap.MapPin.ICON_CONFIG.imageOffset
        }
    );
};
