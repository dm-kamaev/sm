'use strict';

const BaseListParser = require('./BaseListParser');

class ArrayOfPairsParser extends BaseListParser {
    /**
     * @return {object}
     */
    parse() {
        var data;
        var result;
        result = super.parse();
        data = result.data;
        data = data.map(
            item => {
                var pair = BaseListParser.splitByComma(item);
                return [
                    pair[1],
                    pair[0],
                ];
            }
        );
        return {
            columnName: this.columnName,
            dataType: 'PAIRSARRAY',
            data: data,
        };
    }
}

module.exports = ArrayOfPairsParser;
