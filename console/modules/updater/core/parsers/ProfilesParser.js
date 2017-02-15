'use strict';

const BaseListParser = require('./BaseListParser');


class ProfilesParser extends BaseListParser {
    /**
     * @return {object}
     */
    parse() {
        var data = BaseListParser.splitByNewLine(this.rawData_);
        data = data.map((item, i) => {
            var result = null;
            var isProfiles = (i % 2) === 0;
            if (isProfiles) {
                result = BaseListParser
                    .splitBySemicolon(item)
                    .map(profile => [data[i + 1], profile]);
            }
            return result;
        }).filter(item => item);
        var result = [];
        data.forEach(item => {
            result = result.concat(item);
        });
        return {
            columnName: this.columnName,
            dataType: 'PROFILEDATA',
            data: result,
        };
    }
}

module.exports = ProfilesParser;
