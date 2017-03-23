/**
 * @fileOverview contentName: ('smInteractionForm'|'smInteractionFormComment')
 */

import {
    bSmInteractionForm
} from '../../../n-common/b-sm-interaction-form/params';

import {bSmInteractionFormComment} from
'../../../n-common/b-sm-interaction-form/b-sm-interaction-form_comment/params';
import {gButtonStendhal} from '../../g-button/params';

export namespace gModalInteraction {
    /*
     * sm.gModalInteraction.Params
     */
    export namespace Params {
        /*
         * sm.gModalInteraction.Params.Data
         */
        export interface Data {
            id?: (number|string),
            api: string,
            header?: ({
                text?: string
            }|undefined),
            content: (
                bSmInteractionForm.Params.Data|
                bSmInteractionFormComment.Params.Data
            ),
            contentName: string,
            button: {
                data: gButtonStendhal.Params.Data,
                config: gButtonStendhal.Params.Config
            },
            errors?: (Array<string>|undefined),
            closer?: ({
                iconName?: string,
                iconType?: string
            }|undefined)
        }

        /*
         * sm.gModalInteraction.Params.Config
         */
        export interface Config {
            theme?: string,
            customClasses?: Array<string>,
            stylizationModifier?: string
        }
    }

    /*
     * sm.gModalInteraction.Params
     */
    export interface Params {
        data: Params.Data,
        config: Params.Config
    }
}
