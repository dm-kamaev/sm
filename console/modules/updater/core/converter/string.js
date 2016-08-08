module.exports = function(values) {
    var result = '';
    if (values.length === 1) {
        result = values[0].data;
    } else if (values.length > 1) {
        result = values.map(value => value.data).join('; ');
    }
    return result;
}
