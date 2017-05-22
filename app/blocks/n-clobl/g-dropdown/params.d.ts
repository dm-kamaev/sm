export namespace gDropdownStendhal {
    /*
     * sm.gDropdownStendhal.Params
     */
    export namespace Params {
        /*
         * sm.gDropdownStendhal.Params.Data
         */
        export interface Data {
            opener?: string;
            content?: string;
        }

        /*
         * sm.gDropdownStendhal.Params.Config
         */
        export interface Config {
            stylizationModifier?: string;
            theme?: string;
            openerArrowIcon?: {
                up?: Types.Icon;
                down: Types.Icon;
            };
            openerTextIcon?: Types.Icon;
        }
    }

    /*
     * sm.gDropdownStendhal.Params
     */
    export interface Params {
        data?: Params.Data;
        config?: Params.Config;
    }

    /*
     * sm.gDropdownStendhal.Types
     */
    export namespace Types {

        /*
         * sm.gDropdownStendhal.Types.Icon
         */
        export interface Icon {
            default: {
                iconName: string;
                iconType?: string;
            },
            hover?: {
                iconName: string;
                iconType?: string;
            }
        }
    }
}
