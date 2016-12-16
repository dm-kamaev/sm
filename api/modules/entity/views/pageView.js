'use strict';

const lodash = require('lodash');

let view = {};

/**
 * @param  {Array<Object>} entities
 * @param  {Array<Object>} aliases
 * @param  {{
 *     outputField: ?string,
 *     inputId: ?string
 * }} opt_fieldAlias=
 * @return {Array<Object>}
 */
view.joinAliases = function(entities, aliases, opt_fieldAlias) {
    let fieldAlias = opt_fieldAlias || {},
        alias = fieldAlias.outputField || 'alias',
        id = fieldAlias.inputId || 'id',
        aliasesDictionary = this.transformAliases(aliases);

    return lodash.clone(entities).map(entity => {
        entity[alias] = aliasesDictionary[entity[id]];
        return entity;
    });
};

/**
 * @param  {Array<Object>} aliases
 * @return {Object}
 */
view.transformAliases = function(aliases) {
    let result = {};
    aliases.map(alias => {
        result[alias.entityId] = alias.alias;
    });
    return result;
};

/**
 * @param  {Array<Object>} entities
 * @return {Array<number>}
 */
view.uniqueIds = function(entities) {
    return lodash.uniq(entities.map(entity => entity.id));
};

module.exports = view;
