export namespace bSmContacts {
    /*
     * sm.bSmContacts.Params
     */
    export namespace Params {
        /*
         * sm.bSmContacts.Params.Data
         */
        export interface Data {
            phone?: string,
            helper: {
                text: string,
                url?: string,
                theme?: string
            }
        }

        /*
         * sm.bSmContacts.Params.Config
         */
        export interface Config {
            theme?: string,
            customClasses?: Array<string>
        }
    }

    /*
     * sm.bSmContacts.Params
     */
    export interface Params {
        data: Params.Data,
        config?: Params.Config
    }
}
