import {bSmLink} from '../b-sm-link/params';
import {bSmButtonLink} from '../b-sm-button-link/params';


export namespace bSmInformationCard {
    /*
     * sm.bSmInformationCard.Params
     */
    export namespace Params {
        /*
         * sm.bSmInformationCard.Params.Data
         */
        export interface Data {
            id: number;
            type: string;
            name: (string|bSmLink.Params);
            link: bSmLink.Params;
            buttonLink?: bSmButtonLink.Params;
            logo?: {
                url: string;
            }
        }

        /*
         * sm.bSmInformationCard.Params.Config
         */
        export interface Config {
            theme?: string;
        }
    }

    /*
     * sm.bSmInformationCard.Params
     */
    export interface Params {
        data: Params.Data,
        config?: Params.Config
    }
}
