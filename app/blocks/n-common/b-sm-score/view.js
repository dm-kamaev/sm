goog.provide('sm.bSmScore.View');

goog.require('cl.iControl.View');
goog.require('goog.array');



goog.scope(function() {
    /**
     * View for Score block
     *
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {string=} opt_modifier
     * @constructor
     * @extends {cl.iControl.View}
     */
     sm.bSmScore.View = function(opt_params, opt_type, opt_modifier) {
         sm.bSmScore.View.base(
             this, 'constructor', opt_params, opt_type, opt_modifier
         );
    };
    goog.inherits(sm.bSmScore.View, cl.iControl.View);
    var View = sm.bSmScore.View;


    /**
    * List of CSS classes
    * @enum {string}
    * @const
    */
    View.CssClass = {
        ROOT: 'b-sm-score'
    };


    /**
     * @typedef {{
     *     data: {
     *         marks: {
     *             primary: {
     *                 name: string,
     *                 value: number
     *             },
     *             secondary: Array<{
     *                 name: string,
     *                 value: number
     *             }>
     *         }
     *     },
     *     config: {
     *         isActive: boolean,
     *         theme: string
     *     }
     * }}
     */
    sm.bSmScore.View.RenderParams;


    /**
     * Transform raw params to compressed ones
     * @param {Object<string, Object>} rawParams
     * @return {sm.bSmScore.View.RenderParams}
     */
    View.getRenderParams = function(rawParams) {
        return {
            data: {
                marks: {
                    primary: View.getMarkRenderParams(
                        rawParams['data']['marks']['primary']
                    ),
                    secondary: goog.array.map(
                        rawParams['data']['marks']['secondary'],
                        View.getMarkRenderParams
                    )
                }
            },
            config: {
                isActive: rawParams['config']['isActive'],
                theme: rawParams['config']['theme']
            }
        };
    };


    /**
     * Transform raw params for each mark to compressed ones
     * @param {Object<string, (string|number)>} rawMarkParams
     * @return {{
     *     name: string,
     *     value: number
     * }}
     */
    View.getMarkRenderParams = function(rawMarkParams) {
        return {
            name: rawMarkParams['name'],
            value: rawMarkParams['value']
        };
    };
});  // goog.scope
