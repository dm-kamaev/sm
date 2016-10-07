goog.provide('sm.gModal.Event.EnrollmentSuccess');

goog.require('goog.events.Event');

goog.scope(function() {



    /**
     * Enrollment success event
     * @param {Object} data
     * @param {goog.events.EventTarget=} opt_target
     * @constructor
     * @extends {goog.events.Event}
     */
    sm.gModal.Event.EnrollmentSuccess = function(data, opt_target) {
        goog.base(
            this, sm.gModal.Event.EnrollmentSuccess.Type, opt_target
        );


        /**
         * @typedef {{
         *     enrollmentId: number,
         *     optionCost: (string|undefined)
         * }}
         */
        sm.gModal.Event.EnrollmentSuccess.Data;


        /**
         * Enrollment data
         * @type {sm.gModal.Event.EnrollmentSuccess.Data}
         */
        this.data = data;
    };
    goog.inherits(sm.gModal.Event.EnrollmentSuccess, goog.events.Event);
    var EnrollmentSuccess = sm.gModal.Event.EnrollmentSuccess;


    /**
     * Type of event
     * @type {string}
     */
    EnrollmentSuccess.Type = goog.events.getUniqueId('enrollment-success');
});  // goog.scope
