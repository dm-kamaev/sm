var userView = {};


/**
 * Default view for user
 * @param {{
 *     id: number,
 *     firstName: (string|undefined),
 *     lastName: (string|undefined)
 * }} user
 * @return {{
 *     id: number,
 *     firstName: string,
 *     lastName: string
 * }} | null
 */
userView.default = function(user) {
    var result = {
        id: user.id || undefined,
        firstName: user.firstName || '',
        lastName: user.lastName || ''
    };

    return user.id ? result : null;
};


/**
 * Default view for user
 * @param {{
 *     id: (number|undefined),
 *     firstName: (string|undefined),
 *     lastName: (string|undefined)
 * }} user
 * @param {boolean} isCommented
 * @return {?{
 *     id: (number|undefined),
 *     firstName: string,
 *     lastName: string
 * }}
 */
userView.school = function(user, isCommented) {
    var result = {
        id: user.id,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        isCommented: isCommented
    };
    return user.id ? result : null;
};


module.exports = userView;
