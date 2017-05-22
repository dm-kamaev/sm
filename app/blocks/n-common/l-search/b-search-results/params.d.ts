import {bSmLink} from '../../b-sm-link/params';
import {bSmSwitch} from '../../b-sm-switch/params';
import {
    gDropdownSelect
} from '../../../n-clobl/g-dropdown/g-dropdown_select/params';
import {bSmItemList} from '../../b-sm-item-list/params';

export namespace bSearchResults {
    /**
     * sm.lSearch.bSearchResults.Template.Params
     */
    export namespace Params {
        interface DeclensionParams {
            nom: string;
            gen: string;
            plu: string;
        }

        interface HeaderTextEntry {
            number?: number;
            text?: string | DeclensionParams;
            select?: string;
        }

        /**
         * sm.lSearch.bSearchResults.Template.Params.Data
         */
        export interface Data {
            title?: string;
            description?: string;
            linksTitle?: string;
            links?: bSmLink.Params.Data[];
            sort: bSmSwitch.Params.Data | gDropdownSelect.Params.Data;
            entityList: bSmItemList.Params.Data;
            countResults: number;
            headerText: HeaderTextEntry[];
            placeholder?: {
                title?: string;
                text?: Array<string>;
            }
        }

        /**
         * sm.lSearch.bSearchResults.Template.Params.Config
         */
        export interface Config {
            sortController: string;
            listTheme: string;
        }
    }


    /**
     * sm.lSearch.bFilter.Params
     */
    export interface Params {
        data: Params.Data;
        config?: Params.Config;
    }
}
