goog.provide('sm.lCourse.bDepartment.Event.EnrollButtonClick');

goog.require('goog.events.Event');

goog.scope(function() {



    /**
     * Enrollment button option click event
     * @param {Object} data
     * @param {goog.events.EventTarget=} opt_target
     * @constructor
     * @extends {goog.events.Event}
     */
    sm.lCourse.bDepartment.Event.EnrollButtonClick = function(data,
        opt_target) {

        goog.base(
            this, sm.lCourse.bDepartment.Event.EnrollButtonClick.Type,
            opt_target
        );


        /**
         * @typedef {{
         *     name: string,
         *     metros: Array<string>,
         *     options: {
         *         title: {
         *             name: string,
         *             value: string,
         *             key: string
         *         },
         *         features: {
         *             name: string,
         *             value: string,
         *             key: string
         *         },
         *         cost: {
         *             name: string,
         *             value: string,
         *             key: string
         *         }
         *     }
         * }}
         */
         sm.lCourse.bDepartment.Event.EnrollButtonClick.Data;


        /**
         * Option data
         * @type {sm.lCourse.bDepartment.Event.EnrollButtonClick.Data}
         */
        this.data = data;
    };
    goog.inherits(
        sm.lCourse.bDepartment.Event.EnrollButtonClick,
        goog.events.Event
    );
    var EnrollButtonClick = sm.lCourse.bDepartment.Event.EnrollButtonClick;


    /**
     * Type of event
     * @type {string}
     */
    EnrollButtonClick.Type = goog.events.getUniqueId('enroll-button-click');
});  // goog.scope
