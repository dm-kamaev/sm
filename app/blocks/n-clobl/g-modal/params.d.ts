export namespace gModalStendhal {
    /*
     * sm.gModalStendhal.Params
     */
    export namespace Params {
        /*
         * sm.gModalStendhal.Params.Data
         */
        export interface Data {
            content?: (string|any),
            closer?: {
                iconName?: string,
                iconType?: string
            }
        }

        /*
         * sm.gModalStendhal.Params.Config
         */
        export interface Config {
            stylizationModifier?: string,
            size?: string
        }
    }

    /*
     * sm.gModalStendhal.Params
     */
    export interface Params {
        data?: Params.Data,
        config?: Params.Config
    }
}
