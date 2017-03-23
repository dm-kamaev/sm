import {gInput} from '../../n-clobl/g-input/params';

export namespace bSmSubscribeBoard {
    /*
     * sm.bSmSubscribeBoard.Template.Params
     */
    export namespace Params {
        /*
         * sm.bSmSubscribeBoard.Template.Params.Data
         */
        export interface Data {
            entityId: number;
            entityType: string;
        }

        /*
         * sm.bSmSubscribeBoard.Template.Params.Config
         */
        export interface Config {
            stylizationModifier?: string;
            customClasses?: Array<string>;
            theme?: string;
            showLine?: boolean;
            countShownItems?: number;
        }
    }

    /*
     * sm.bSmSubscribeBoard.Template.Params
     */
    export interface Params {
        data: Params.Data;
        config?: Params.Config;
    }
}
