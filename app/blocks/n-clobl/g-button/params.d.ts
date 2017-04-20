/**
 * @fileOverview
 * theme: ('dark'|'thin')
 * size: ('s'|'m'|'xl')
 * borderRoundSize: ('xl')
 */

type IconType = 'png' | 'svg';
type IconPosition = 'left' | 'right';

export namespace gButtonStendhal {
    /*
     * sm.gButtonStendhal.Params
     */
    export namespace Params {
        /*
         * sm.gButtonStendhal.Params.Data
         */
        export interface Data {
            content?: string;
            icon?: {
                name: string;
                type: IconType;
                position: IconPosition;
            };
        }

        /*
         * sm.gButtonStendhal.Params.Config
         */
        export interface Config {
            theme?: string;
            isDisabled?: boolean;
            size?: string;
            disableHover?: boolean;
            borderRoundSize?: string;
        }
    }

    /*
     * sm.gButtonStendhal.Params
     */
    export interface Params {
        data: Params.Data;
        config: Params.Config;
    }
}