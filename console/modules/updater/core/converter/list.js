var escapeWithDoubleQuotes = function(value) {
    return '"' + value + '"';
}

module.exports = function(values) {
    var result = '{';
    values.map(
        value => {
            var item = value.data[0];
            var data = [];
            if (typeof item === 'string') {
                data = value.data;
                result +=
                    data.map(escapeWithDoubleQuotes).join(', ');
            }
        }
    );
    result += '}';
    return result;
}
