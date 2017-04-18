/**
 * @fileOverview
 * theme: ('dark'|'thin')
 * size: ('s'|'m'|'xl')
 * borderRoundSize: ('xl')
 */

export namespace gButtonStendhal {
    /*
     * sm.gButtonStendhal.Params
     */
    export namespace Params {
        /*
         * sm.gButtonStendhal.Params.Data
         */
        export interface Data {
            content?: string
        }

        /*
         * sm.gButtonStendhal.Params.Config
         */
        export interface Config {
            theme?: string,
            isDisabled?: boolean,
            size?: string,
            disableHover?: boolean,
            borderRoundSize?: string
        }
    }

    /*
     * sm.gButtonStendhal.Params
     */
    export interface Params {
        data: Params.Data,
        config: Params.Config
    }
}