export namespace gTextareaStendhal {
    /*
     * sm.gTextareaStendhal.Params
     */
    export namespace Params {
        /*
         * sm.gTextareaStendhal.Params.Data
         */
        export interface Data {
            placeholder?: string,
            value?: (string|number),
            name?: string,
            maxLength?: number
        }

        /*
         * sm.gTextareaStendhal.Params.Config
         */
        export interface Config {
            stylizationModifier?: string,
            autoHeight?: boolean,
            showCounter?: boolean,
            minHeight?: string,
            theme?: (string|undefined)
        }
    }

    /*
     * sm.gTextareaStendhal.Params
     */
    export interface Params {
        data: Params.Data,
        config: Params.Config
    }
}
