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
            options: Array<{
                label: string;
                value?: string;
                isChecked?: (boolean|undefined);
            }>
        }

        /**
         * sm.lSearch.bFilter.Params.Config
         */
        export interface Config {
            type?: string;
            optionsToShow?: boolean;
            cannotBeHidden?: boolean;
            isShowed?: boolean;
            showMoreButtonText?: number;
            theme?: string;
            align?: string;
            customClasses?: Array<string>;
            stylizationModifier?: string;
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
