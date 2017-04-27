
export namespace bSmCheckbox {
    /**
     * sm.bSmCheckbox.Params
     */
    export namespace Params {
        /**
         * sm.bSmCheckbox.Params.Data
         */
        export interface Data {
            id?: (string|number);
            name?: (string|number);
            label: string;
            value?: (string|number);
            isChecked?: boolean;
        }

        /**
         * sm.bSmCheckbox.Params.Config
         */
        export interface Config {
            theme?: string;
            customClasses?: Array<string>;
            stylizationModifier?: string;
            customIcon?: {
                check: string;
                uncheck: string;
            };
        }
    }


    /**
     * sm.bSmCheckbox.Params
     */
    export interface Params {
        data: Params.Data;
        config?: Params.Config;
    }
}
