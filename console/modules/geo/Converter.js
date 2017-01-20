'use strict';

class Converter {

    /**
     * Address converter
     * @public
     * @param {string} address
     * @return {string}
     */
    static convertAddress(address) {
        if (address !== undefined) {
            /* eslint-disable no-useless-escape */
            var updateAddress = address.toUpperCase()
                .replace(/Ё/ig, 'Е')
                .replace(/[0-9]{6}|[0-9]{5}/ig, ' ')
                .replace(/ГОРОД|Г\.| Г |^Г /ig, ' ')
                .replace(/РОССИЯ/ig, ' ')
                .replace(/МОСКВА/ig, ' ')
                .replace(new RegExp('НАБЕРЕЖНАЯ,*| НАБ\.| ' +
                    'НАБ(?=[0-9]|,| )|^НАБ\.* ', 'ig'), ' ')
                .replace(new RegExp('БУЛЬВАР,*| БУЛЬВ\.| БУЛЬВ(?=[0-9]|,| )|' +
                    ' Б-Р(?=[0-9]|,| )|^БУЛЬВ\.*|^Б-Р ', 'ig'), ' ')
                .replace(/ШОССЕ,*|Ш\.| Ш(?=[0-9]|,| )|^Ш\.* /ig, ' ')
                .replace(/ПЕРЕУЛОК,*| ПЕР\.| ПЕР(?=[0-9]|,| )|^ПЕР\.* /ig, ' ')
                .replace(/-АЯ|-Я|-ОЙ|-Й|-ТИ|-*ЛЕТИЯ |-*ЛЕТ /ig, ' ')
                .replace(/УЛИЦА,*|УЛ\.| УЛ(?=[0-9]|,| )|^УЛ\.* /ig, ' ')
                .replace(/ПРОЕЗД,*| ПР-Д(?=[0-9]|,| )|^ПР-Д /ig, ' ')
                .replace(new RegExp('ПР*ОСПЕКТ,*| ПРОСП\.| ПРОСП(?=[0-9]|,| ' +
                    ')|^ПРОСП\.* | ПР-Т(?=[0-9]|,| )|^ПР-Т| ПР\.| ПР(?=[0-9]|' +
                    ',| )|^ПР\.* ', 'ig'), ' ')
                .replace(/ ДОМ(?=[0-9]|,| )|Д\.| Д(?=[0-9]| )/ig, ' ')
                .replace(/ ВЛАДЕНИЕ,*/ig, ' ')
                .replace(/ ДОМОВЛАДЕНИЕ,*/ig, ' ')
                .replace(new RegExp(' КОРПУС|КОРП\.| КОРП(?=[0-9]| )|КОР\.|' +
                    ' КОР(?=[0-9]| )|К\.| К |К(?=[0-9])', 'ig'), '-')
                .replace(
                    / СТРОЕНИЕ|СТР\.| СТР(?=[0-9]| )|С\.|С(?=[0-9])/ig,
                    '-'
                )
                .replace(/;*/ig, '')
                .replace(/\.*/ig, '')
                .replace(/,*/ig, '')
                .replace(/ */ig, '')
                .replace(/\(№[0-9]{4}-[0-9]\)/ig, '')
                .replace(/\+7\([0-9]{3}\)[0-9]{7}/ig, '');
            /* eslint-enable no-useless-escape */
            return updateAddress;
        }
    }
}

module.exports = Converter;
