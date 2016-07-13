module.exports = function(values) {
    var result = '';
    result += '{';
    var extractedData = values.map(value => value.data);
    values = [];
    extractedData.forEach(
        data => {
            data.forEach(
                item => {
                    var result = '{"' + item.first +
                        '", "' + item.second + '"}';
                    values.push(result);
                }
            );
        }
    );
    result += values.join(', ');
    result += '}';
    return result;
}
