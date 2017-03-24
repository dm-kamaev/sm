export namespace bSmComment {

    export namespace Params {
        /*
         * sm.bSmComment.Params.Data
         */
        export interface Data {
            author: {
                photoUrl?: string,
                name: string,
                status: string
            },
            score?: number,
            text: Array<{
                header: string,
                description: string
            }>
        }

        /*
         * sm.bSmComment.Params.Config
         */
        export interface Config {}
    }


    /*
     * sm.bSmComment.Params
     */
    export interface Params {
        data: Params.Data,
        config: Params.Config
    }
}
