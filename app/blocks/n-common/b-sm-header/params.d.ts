export namespace bSmHeader {
    /*
     * sm.bSmHeader.Params
     */
    export namespace Params {
        /*
         * sm.bSmHeader.Params.Data
         */
        export interface Data {
            menuItems?: Array<{
                name: string,
                url: string,
                type: string,
                isSelected: boolean
            }>,
            contacts?: any
        }

        /*
         * sm.bSmHeader.Params.Config
         */
        export interface Config {
            theme?: string,
            customClasses?: Array<string>
        }
    }

    /*
     * sm.bSmHeader.Params
     */
    export interface Params {
        data: Params.Data,
        config: Params.Config
    }
}
