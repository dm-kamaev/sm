export namespace gDropdownListLinks {
    /*
     * sm.gDropdownListLinks.Params
     */
    export namespace Params {
        /*
         * sm.gDropdownListLinks.Params.Data
         */
        export interface Data {
            opener?: (string|undefined),
            defaultOpenerText?: (string|undefined),
            content?: any
        }

        /*
         * sm.gDropdownListLinks.Params.Config
         */
        export interface Config {
            stylizationModifier?: string,
            openerSize?: (string|undefined),
            openerTheme?: (string|undefined),
            iconName?: (string|undefined),
            iconType?: (string|undefined)
            contentSize?: (string|undefined),
            theme?: (string|undefined)
        }
    }

    /*
     * sm.gDropdownListLinks.Params
     */
    export interface Params {
        data: Params.Data,
        config?: Params.Config
    }
}
