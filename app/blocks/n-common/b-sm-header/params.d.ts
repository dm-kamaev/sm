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
            contacts?: any,
            user?: {
                firstName: string,
                lastName: string,
                photoUrl?: string
            }
        }

        /*
         * sm.bSmHeader.Params.Config
         */
        export interface Config {
            entityType?: string,
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
