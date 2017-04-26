/**
 * @fileOverview
 * theme: ('thin'|'light')
 */

export namespace gInputStendhal {
    /*
     * sm.gInputStendhal.Params
     */
    export namespace Params {
        /*
         * sm.gInputStendhal.Params.Data
         */
        export interface Data {
            placeholder?: (string|undefined),
            value?: (string|number),
            name?: (string|undefined),
            maxLength?: (number|undefined),
            type?: string
        }

        /*
         * sm.gInputStendhal.Params.Config
         */
        export interface Config {
            stylizationModifier?: string,
            validations?: (Array<string>|undefined),
            theme?: (string|undefined)
        }
    }
}
