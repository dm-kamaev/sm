var userView = {};


/**
 * Default view for user
 * @param {{
 *     id: number,
 *     firstName: (string||undefined),
 *     lastName: (string||undefined)
 * }} user
 * @return {{
 *     id: number
 *     firstName: string
 *     lastName: string
 * }}
 */
userView.default = function(user) {
    return {
        id: user.id || undefined,
        firstName: user.firstName || '',
        lastName: user.lastName || ''
    };
};


/**
 * Default view for user
 * @param {{
 *     id: (number|undefined),
 *     firstName: (string|undefined),
 *     lastName: (string|undefined)
 * }} user
 * @param isCommented {boolean}
 * @return {{
 *     id: (number|undefined),
 *     firstName: string,
 *     lastName: string
 * }}
 */
userView.school = function(user, isCommented) {
    return {
        id: user.id || undefined,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        isCommented: isCommented
    };
};


module.exports = userView;
