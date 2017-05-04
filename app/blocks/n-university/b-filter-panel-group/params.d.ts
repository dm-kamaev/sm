import {gButtonStendhal} from '../../n-clobl/g-button/params';
import {bFilterPanel} from '../../n-common/l-search/b-filter-panel/params';
import {gDropdownListLinks}
    from '../../n-clobl/g-dropdown/g-dropdown_list-links/params';



export namespace bFilterPanelGroup {
    /**
     * sm.bFilterPanelGroup.Params
     */
    export namespace Params {
        /**
         * sm.bFilterPanelGroup.Params.Data
         */
        export interface Data {
            filterPanel: bFilterPanel.Params;
            dependentFilterPanel: bFilterPanel.Params;
            button: gButtonStendhal.Params;
            sortController?: gDropdownListLinks.Params.Data;
        }

        /**
         * sm.bFilterPanelGroup.Params.Config
         */
        export interface Config {
        }
    }


    /**
     * sm.lSearch.ParamsUniversity
     */
    export interface Params {
        data: Params.Data;
        config: Params.Config;
    }
}

