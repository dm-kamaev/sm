import {gInputStendhal} from '../../n-clobl/g-input/params';
import {gTextareaStendhal} from '../../n-clobl/g-textarea/params';


export namespace bSmInteractionForm {
    /*
     * sm.bSmInteractionForm.Params
     */
    export namespace Params {
        /*
         * sm.bSmInteractionForm.Params.Data
         */
        export interface Data {
            fields: Array<{
                data: (
                    gTextareaStendhal.Params.Data|
                    gInputStendhal.Params.Data
                );
                config: (
                    gTextareaStendhal.Params.Config|
                    gInputStendhal.Params.Config
                );
                controlName: string
            }>
        }

        /*
         * sm.bSmInteractionForm.Params.Config
         */
        export interface Config {
            theme?: string,
            customClasses?: Array<string>,
            stylizationModifier?: string
        }
    }

    /*
     * sm.bSmInteractionForm.Params
     */
    export interface Params {
        data: Params.Data,
        config: Params.Config
    }
}
