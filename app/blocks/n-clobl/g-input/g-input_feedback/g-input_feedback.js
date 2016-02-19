goog.provide('sm.gInputFeedback.InputFeedback');

goog.require('cl.gInput.Input');
goog.require('sm.gInputFeedback.View');

/**
 * Input control
 * @param {Object=} view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.gInput.Input}
 */
sm.gInputFeedback.InputFeedback = function(view, opt_params, opt_domHelper) {
    goog.base(this, view, opt_params, opt_domHelper);
};
goog.inherits(sm.gInputFeedback.InputFeedback, cl.gInput.Input);


goog.scope(function() {
    var InputFeedback = sm.gInputFeedback.InputFeedback;


    /**
     * Event enum
     * @enum
     */
    InputFeedback.Event = {
        FOCUS: sm.gInputFeedback.View.Event.FOCUS
    };

    /**
     * @override
     */
    InputFeedback.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.autoDispatch(
            sm.gInputFeedback.View.Event.FOCUS,
            function(event) {
                event['type'] = InputFeedback.Event.FOCUS;
            }
        );
    };
});
