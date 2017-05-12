import {gDropdownSelect} from '../g-dropdown_select/params';

export namespace gDropdownListLinks {
    /*
     * sm.gDropdownListLinks.Params
     */
    export namespace Params {
        /*
         * sm.gDropdownListLinks.Params.Data
         */
        export interface Data extends gDropdownSelect.Params.Data {
        }

        /*
         * sm.gDropdownListLinks.Params.Config
         */
        export interface Config extends gDropdownSelect.Params.Config {
            openerSize?: (string|undefined);
            openerTheme?: (string|undefined);
            contentSize?: (string|undefined);
        }
    }

    /*
     * sm.gDropdownListLinks.Params
     */
    export interface Params {
        data: Params.Data;
        config?: Params.Config;
    }
}
