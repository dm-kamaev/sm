module.exports = function(values) {
    var result = 'false';
    if (values.length === 1) {
        result = values[0].data;
    }
    return result;
};
