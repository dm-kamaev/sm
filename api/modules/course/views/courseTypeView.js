const courseTypeView = {};

/**
 * Create filters from given specialized classes types
 * @param {Array<models.courseType>} courseTypes
 * @return {Array<{
 *     id: number,
 *     label: string,
 *     value: number
 * }>}
 */
courseTypeView.typeFilters = function(courseTypes) {
    return courseTypes.map(type => {
        return {
            id: type.id,
            label: type.name,
            value: type.id
        };
    });
};

module.exports = courseTypeView;
