
const logger
    = require('../../app/components/logger/logger.js').getLogger('app');

type PromiseMethods = {
    queue?(createPromise: Function, data: any[]): Promise<any>
};
export const promiseMethods: PromiseMethods = {};

promiseMethods.queue = function(
    createPromise: Function,
    data: any[]
): Promise<any> {
    let start: Promise<any> = Promise.resolve();
    // stupid linter !!!! for let i in circle
    /* tslint:disable */
    for (let i = 0, l = data.length; i < l; i++) {
        /* tslint:enable */
        start = start.then(async function() {
            return await createPromise(data[i]);
        });
    }
    // start.catch(e => logger.critical(e));
    return start;
};