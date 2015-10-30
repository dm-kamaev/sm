goog.provide('sm.lSchool.bMap.MapPin');
goog.require('sm.lSchool.bMap.PinTemplate');


sm.lSchool.bMap.MapPin = function(data) {
    /**
     *   @private
     */
    this.coords_ = data.coords;

    /**
     *   @private
     */
    this.hintContent_ = data.hintContent;

    /**
     *   @private
     */
    this.balloonLayout_ = this.generateBalloonLayout_(data);

    /**
     *   @private
     */
    this.iconSettings_ = this.generateIcon_(data);
};


goog.scope(function() {
    var MapPin = sm.lSchool.bMap.MapPin;

    MapPin.ICON_PATH = '/images/l-school/b-map/b-map-pin/icons/';

    MapPin.CurrentSchoolIcon = {
        IMAGE_SIZE: [30, 30],
        IMAGE_OFFSET: [-15, -30],
        HIGH_RATING: 'map-pin-green-th.png',
        MEDIUM_RATING: 'map-pin-yellow-th.png',
        LOW_RATING: 'map-pin-red-th.png',
        NO_RATING: 'map-pin-th.png'
    };

    MapPin.OtherSchoolIcon = {
        IMAGE_SIZE: [],
        IMAGE_OFFSET: [],
        HIGH_RATING: '',
        MEDIUM_RATING: '',
        LOW_RATING: '',
        NO_RATING: ''
    };

    MapPin.prototype.createPlacemark = function() {
        console.log(this.coords_);
        return new ymaps.Placemark(
            [this.coords_.lat, this.coords_.lng], {
                hintContent: this.hintContent_
            }, {
                balloonContentLayout: this.balloonLayout_,
                balloonPanelMaxMapArea: 0,
                balloonCloseButton: false,
                iconLayout: 'default#image',
                iconImageHref: this.iconSettings_.iconHref,
                iconImageSize: this.iconSettings_.iconSize,
                iconImageOffset: this.iconSettings_.iconOffset
            }
        );
    };

    MapPin.prototype.generateBalloonLayout_ = function(data) {
        var balloonContent = sm.lSchool.bMap.PinTemplate.pin({params: data}).content;
        return ymaps.templateLayoutFactory.createClass(balloonContent);
    };

    MapPin.prototype.generateIcon_ = function(data) {
        var ratingFactor = 'NO_RATING';

        if (data.totalScore >= 4) {
            ratingFactor = 'HIGH_RATING';
        } else if (data.totalScore >= 3) {
            ratingFactor = 'MEDIUM_RATING';
        } else if (data.totalScore > 0) {
            ratingFactor = 'LOW_RATING';
        }
        var iconObj = data.isCurrent ?
            MapPin.CurrentSchoolIcon : MapPin.OtherSchoolIcon
        return {
            iconHref: MapPin.ICON_PATH + iconObj[ratingFactor],
            iconSize: iconObj.IMAGE_SIZE,
            iconOffset: iconObj.IMAGE_OFFSET
        };
    };
});
