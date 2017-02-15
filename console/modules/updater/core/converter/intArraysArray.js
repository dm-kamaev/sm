module.exports = function(values) {
    var result = '';
    result += '{';
    var extractedData = values.map(value => value.data);
    values = [];
    extractedData.forEach(
        data => {
            data.forEach(
                item => {
                    var result = '{' + item.join(', ') + '}';
                    values.push(result);
                }
            );
        }
    );
    result += values.join(', ');
    result += '}';
    console.log(result);
    return result;
};
