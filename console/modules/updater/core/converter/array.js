module.exports = function(values) {
    var result = '';
    result += '{';
    var extractedData = values.map(value => value.data);
    values = [];
    extractedData.forEach(
        data => {
            data.forEach(
                item => {
                    values.push('"' + item + '"');
                }
            );
        }
    );
    result += values.join(', ');
    result += '}';
    return result;
}
