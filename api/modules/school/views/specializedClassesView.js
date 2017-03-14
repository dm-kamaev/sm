'use strict';

var specializedClassesView = {};

/**
 * @param {Array<({
 *     schoolId: number,
 *     specializedClassTypeId: number,
 *     class: number
 * }|models.SchoolSpecializedClass)>} schoolSpecializedClasses
 * @param {Array<models.SpecializedClassType>} specializedClassTypes
 * @return {{
 *     data: {
 *        name: string,
 *        items: Array<Object>,
 *     },
 *     config: {
 *         type: string
 *     }
 * }}
 */
specializedClassesView.list = function(
    schoolSpecializedClasses, specializedClassTypes
) {
    var steps = ['Начальная школа', 'Средняя школа', 'Старшая школа'],
        specializedClasses = specializedClassesView.withTypeName(
            schoolSpecializedClasses, specializedClassTypes
        );
    const itemsData =
        specializedClassesView.getListClasses_(specializedClasses);
    var items = itemsData
            .map((data, index) => {
                var step = steps[index];
                return data.length ?
                    specializedClassesView.listParams_(data, step) :
                    null;
            })
            .filter(item => item != null);

    return specializedClassesView.listParams_(items);
};


/**
 * Combine school specialized classes an their type name by type id
 * @param {Array<Array<number>>} schoolSpecializedClasses
 * @param {Array<models.SpecializedClassType>} specializedClassTypes
 * @return {Array<Array<(string|number)>>}
 */
specializedClassesView.withTypeName = function(
    schoolSpecializedClasses, specializedClassTypes
) {
    return schoolSpecializedClasses ?
        schoolSpecializedClasses.map(schoolSpecializedClass => {
            var typeId = schoolSpecializedClass.specializedClassTypeId,
                type = specializedClassTypes.find(type => {
                    return type.id == typeId;
                });

            return [schoolSpecializedClass.class, type.name];
        }) : null;
};


/**
 * creates an array of the profile classes
 * @param {Array<Array<(string|number)>>} specializedClasses
 * [ [ 9, 'Социально-экономический' ] ]
 * @return {Array<string>} [ [], [ 'Социально-экономический' ], [ 'Физ-мат' ] ]
 */
specializedClassesView.getListClasses_ = function(specializedClasses) {
    const juniorSchool = [], middleSchool = [], highSchool = [];
    const res = [juniorSchool, middleSchool, highSchool];
    for (let i = 0, l = specializedClasses.length; i < l; i++) {
        const specializedClass = specializedClasses[i];
        const classNumber = specializedClass[0];
        const className = specializedClass[1];
        if (classNumber >= 0 && classNumber <= 4) {
            juniorSchool.push(className);
        } else if (classNumber >= 5 && classNumber <= 9) {
            middleSchool.push(className);
        } else if (classNumber >= 9 && classNumber <= 11) {
            highSchool.push(className);
        }
    }
    return res;
};

/**
 * @param {Array<string|Object>} items
 * @param {string=} opt_name
 * @return {{
 *     data: {
 *        name: string,
 *        items: Array<(string|Object)>,
 *     },
 *     config: {
 *         type: string
 *     }
 * }}
 */
specializedClassesView.listParams_ = function(items, opt_name) {
    return {
        data: {
            name: opt_name || '',
            items: items
        },
        config: {
            type: 'unfolded'
        }
    };
};


/**
 * Create filters from given specialized classes types
 * @param {Array<models.SpecializedClassType>} specializedClassTypes
 * @return {Array<{
 *     label: string,
 *     value: number
 * }>}
 */
specializedClassesView.typeFilters = function(specializedClassTypes) {
    return specializedClassTypes.map(type => {
        return {
            id: type.id,
            label: type.name,
            value: type.id
        };
    });
};

module.exports = specializedClassesView;
