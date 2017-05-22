import {bSmPicture} from '../b-sm-picture/params';
import {gButtonStendhal} from '../../n-clobl/g-button/params';



export namespace bSmSketch {
    /*
     * sm.bSmSketch.Params
     */
    export namespace Params {
        /*
         * sm.bSmSketch.Params.Data
         */
        export interface Data {
            description: string;
            picture: bSmPicture.Params.Data;
            button: gButtonStendhal.Params;
        }

        /*
         * sm.bSmSketch.Params.Config
         */
        export interface Config {
            theme?: string;
        }
    }

    /*
     * sm.bSmSketch.Params
     */
    export interface Params {
        data: Params.Data;
        config?: Params.Config;
    }
}
