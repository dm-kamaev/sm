var async = require('asyncawait/async');
var await = require('asyncawait/await');
var sequelize = require('../../app/components/db');
/**
 * @deprecated
 */
module.exports = async((func, args) => {
    return await(sequelize.transaction(function(t) {
        args.push(t);
        return new Promise(async(function(resolve, reject) {
            try {
                resolve(await(func.apply(this, args)));
            } catch (e) {
                reject(e);
            }
        }));
    }));
});
