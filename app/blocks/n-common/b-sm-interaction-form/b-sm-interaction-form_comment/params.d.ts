import {bSmInteractionForm} from '../params';
import {
    gDropdownSelect
} from '../../../n-clobl/g-dropdown/g-dropdown_select/params';
import {gInputStendhal} from '../../../n-clobl/g-input/params';


export namespace bSmInteractionFormComment {
    /*
     * sm.bSmInteractionFormComment.Params
     */
    export namespace Params {
        /*
         * sm.bSmInteractionFormComment.Params.Data
         */
        export interface Data extends bSmInteractionForm.Params.Data {
            userFields: {
                userType: {
                    data: gDropdownSelect.Params.Data,
                    config: gDropdownSelect.Params.Config,
                    controlName: string
                },
                yearGraduate: {
                    data: gInputStendhal.Params.Data,
                    config: gInputStendhal.Params.Config,
                    controlName: string
                },
                grade: {
                    data: gDropdownSelect.Params.Data,
                    config: gDropdownSelect.Params.Config,
                    controlName: string
                }
            },
            evaluations: {
                title: string,
                items: Array<{
                   name: string,
                   description: string,
                   selectedAmount: (number|undefined)
                }>
            }
        }

        /*
         * sm.bSmInteractionFormComment.Params.Config
         */
        export interface Config extends bSmInteractionForm.Params.Config {
        }
    }

    /*
     * sm.bSmInteractionFormComment.Params
     */
    export interface Params {
        data: Params.Data,
        config: Params.Config
    }
}

