import {bSmButtonLink} from '../b-sm-button-link/params';

export namespace bSmBanner {
    /*
     * sm.bSmBanner.Template.Params
     */
    export namespace Params {
        /*
         * sm.bSmBanner.Template.Params.Data
         */
        export interface Data {
            header: string;
            description: string;
            buttonLink: bSmButtonLink.Params;
        }

        /*
         * sm.bSmBanner.Template.Params.Config
         */
        export interface Config {
            theme: string;
        }
    }

    /*
     * sm.bSmBanner.Params
     */
    export interface Params {
        data?: Params.Data;
        config?: Params.Config;
    }
}

