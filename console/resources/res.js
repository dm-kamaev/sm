/**
 * @enum
 * {Number}
 */
exports.ColumnNames = {
    GOVERMENT_KEY_INDEX: 2,
    NAME_INDEX: 6,
    FULL_NAME_INDEX: 5,
    DIRECTOR_INDEX: 13,
    PHONES_INDEX: 15,
    SITE_INDEX: 17,
    AREAS_INDEX: 19,
    ADDRESSES_INDEX: 20,
    EDU_PROGRAMM_INDEX: 21,
    SUBJECT_INDEX: 37,
    GIA_COUNT_INDEX: 38,
    GIA_RESULTS_INDEX: 39,
    OLIMP_TYPE_INDEX: 30,
    OLIMP_STAGE_INDEX: 31,
    OLIMP_CLASS_INDEX: 32,
    OLIMP_SUBJECT_INDEX: 33,
    OLIMP_STATUS_INDEX: 34,
    OLIMP_YEAR_INDEX: 35
    };
/**
 * returns array from table cell
 * @param {Number} row
 * @param {Number} index index of cell in row
 */
exports.getArray = (row, index) => {
    return row[index] ?
        row[index]
            .split(';')
            .map(item => item.trim()) :
        [];
};

