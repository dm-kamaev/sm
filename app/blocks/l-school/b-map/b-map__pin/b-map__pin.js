/**
 * @fileoverview A constructor for Yandex Maps placemarks
 * @author Nikita Gubchenko
 */

goog.provide('sm.lSchool.bMap.MapPin');
goog.require('sm.lSchool.bMap.PinTemplate');

/**
 * @constructor
 * @param object
 */
sm.lSchool.bMap.MapPin = function(data) {
    /**
     *   Coordinates of a point where a plaсemark should be placed
     *   @private
     *   @type [{number}]
     */
    this.coords_ = data.coords;

    /**
     *   Contents of a hint popping on hover
     *   @private
     *   @type string
     */
    this.hintContent_ = data.hintContent;

    /**
     *   A layout for the balloon, a part of ymaps API
     *   @private
     */
    this.balloonLayout_ = this.generateBalloonLayout_(data);

    /**
     *   Settings for choosing appropriate placemark icon based on provided data
     *   @private
     *   @type {a}
     */
    this.iconSettings_ = this.generateIcon_(data);
};


goog.scope(function() {

    var MapPin = sm.lSchool.bMap.MapPin;

    /**
    * A path to icons directory
    */
    MapPin.ICON_PATH = '/images/l-school/b-map/b-map-pin/icons/';

    /**
    * Config for icons that mark coordinates of a school,
    * the current page belongs to
    */
    MapPin.CurrentSchoolIcon = {
        IMAGE_SIZE: [30, 30],
        IMAGE_OFFSET: [-15, -30],
        HIGH_RATING: 'map-pin-green-th.png',
        MEDIUM_RATING: 'map-pin-yellow-th.png',
        LOW_RATING: 'map-pin-red-th.png',
        NO_RATING: 'map-pin-th.png'
    };

    /**
    * Config for icons that mark all other schools which are not current
    */
    MapPin.OtherSchoolIcon = {
        IMAGE_SIZE: [],
        IMAGE_OFFSET: [],
        HIGH_RATING: '',
        MEDIUM_RATING: '',
        LOW_RATING: '',
        NO_RATING: ''
    };

    /**
     * A placemark factory
     * @public
     * @returns object
     */
    MapPin.prototype.createPlacemark = function() {
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

    /**
     * Sets a layout for the balloon, required by ymaps API
     * @private
     * @param object
     * @returns object
     */
    MapPin.prototype.generateBalloonLayout_ = function(data) {
        var balloonContent = sm.lSchool.bMap.PinTemplate.pin({
            params: data
        }).content;
        return ymaps.templateLayoutFactory.createClass(balloonContent);
    };

    /**
     * Sets settings for a custom placemark icon
     * @private
     * @param object
     * @returns object
     */
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
            MapPin.CurrentSchoolIcon : MapPin.OtherSchoolIcon;
        return {
            iconHref: MapPin.ICON_PATH + iconObj[ratingFactor],
            iconSize: iconObj.IMAGE_SIZE,
            iconOffset: iconObj.IMAGE_OFFSET
        };
    };
});
