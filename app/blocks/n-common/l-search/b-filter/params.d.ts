import {bSmCheckbox} from '../../b-sm-checkbox/params';

export namespace bFilter {
    /**
     * sm.lSearch.bFilter.Params
     */
    export namespace Params {
        /**
         * sm.lSearch.bFilter.Params.Data
         */
        export interface Data {
            name: string;
            header?: ({
                title: string;
                tooltip?: string;
            });
            options: bSmCheckbox.Params.Data[]
        }

        /**
         * sm.lSearch.bFilter.Params.Config
         */
        export interface Config {
            type?: string;
            optionsToShow?: number;
            cannotBeHidden?: boolean;
            isShowed?: boolean;
            showMoreButtonText?: string;
            theme?: string;
            align?: string;
            customClasses?: Array<string>;
            stylizationModifier?: string;
            filterArrowIcon?: {
                up?: string;
                down?: string;
            };
            inline?: boolean;
            optionsTheme?: string;
            customIcon?: {
                check: string;
                uncheck: string;
            };
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
