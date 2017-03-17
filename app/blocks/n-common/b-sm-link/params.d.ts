export namespace bSmLink {
    /*
     * sm.bSmLink.Params
     */
    export namespace Params {
        /*
         * sm.bSmLink.Params.Data
         */
        export interface Data {
            id?: number,
            url?: (string|undefined),
            content?: (string|undefined)
        }

        /*
         * sm.bSmLink.Params.Config
         */
        export interface Config {
            target?: (string|undefined),
            disableHover?: boolean,
            size?: string,
            theme?: string,
            isSelected?: boolean
        }
    }

    /*
     * sm.bSmLink.Params
     */
    export interface Params {
        data: Params.Data,
        config?: Params.Config
    }
}
