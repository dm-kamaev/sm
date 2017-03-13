export namespace gDropdownSelect {
    /*
     * sm.gDropdownSelect.Params
     */
    export namespace Params {
        /*
         * sm.gDropdownSelect.Params.Data
         */
        export interface Data {
            opener: (string|undefined),
            defaultOpenerText: (string|undefined),
            name: (string|undefined),
            content: any,
            contentConfig: (any|undefined)
        }

        /*
         * sm.gDropdownSelect.Params.Config
         */
        export interface Config {
            stylizationModifier: string,
            iconName: (string|undefined),
            iconType: (string|undefined),
            customClasses: (Array<string>|undefined),
            theme: (string|undefined)
        }
    }
}
