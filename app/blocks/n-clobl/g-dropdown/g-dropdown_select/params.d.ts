import {gDropdownStendhal} from '../params';

export namespace gDropdownSelect {
    /*
     * sm.gDropdownSelect.Params
     */
    export namespace Params {
        /*
         * sm.gDropdownSelect.Params.Data
         */
        export interface Data extends gDropdownStendhal.Params.Data {
            opener?: string;
            defaultOpenerText?: string;
            name?: (string|undefined);
            content?: any;
            contentConfig?: any;
        }

        /*
         * sm.gDropdownSelect.Params.Config
         */
        export interface Config extends gDropdownStendhal.Params.Config {
        }
    }

    /*
     * sm.gDropdownSelect.Params
     */
    export interface Params {
        data: Params.Data;
        config: Params.Config;
    }
}
