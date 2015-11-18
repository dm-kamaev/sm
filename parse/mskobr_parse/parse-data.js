var xlsx = require('node-xlsx');
var fs = require('fs');

var path = {
    schoolFromBd: '../../tmp/schools.xlsx',
    parseHtml: './base/parse-html-data.json',
    compareAddresses: './base/compare-addresses.json'
};

var ABBREVIATED_INDEX = 6,
    SITE_INDEX = 17,
    ADDRESS_INDEX = 20;

var notFoundSchools = [];

function appendFile_(path, content) {
    fs.appendFileSync(path, content, 'utf8');
    console.log('The content is appended:' + path);
}

function readFile_(path) {
    return fs.readFileSync(path, 'utf8');
}

function saveFile_(path, content) {
    fs.writeFileSync(path, content, 'utf8');
    console.log('The file is saved:' + path);
}

// Get file with compare address info
function getSummaryData_(pathBd) {
    var parsed = xlsx.parse(pathBd),
        dataBD = parsed[0].data,
        data = dataBD.map(parseAddressData_);
    var compare = [];

    for (var c = 0; c < data.length; c++) {
        if (data[c] !== undefined) {
            for (var ac = 0; ac < data[c].length; ac++) {
                var addressData = data[c][ac];
                if (addressData.length == 1) {
                    compare.push(addressData[0]);
                }
                else if (addressData.length > 1) {
                    for (var i = 0; i < addressData.length; i++) {
                        compare.push(addressData[i]);
                    }
                }
            }
        }
    }
    saveFile_(path.compareAddresses, JSON.stringify(compare));
}

// Parse address data
function parseAddressData_(row) {
    if (row[ABBREVIATED_INDEX] === undefined) {
        return;
    }

    var dataHtml = JSON.parse(readFile_(path.parseHtml));
    var siteBD = row[SITE_INDEX],
        abbreviatedBD = row[ABBREVIATED_INDEX],
        addressBD = row[ADDRESS_INDEX];
    var addressBD_convert = [],
        compareAddress = [];

    console.log('create data:', abbreviatedBD);

    if (addressBD !== undefined) {
        addressBDList = addressBD.split(';'+"\r\r\n");
        for (var ad = 0; ad < addressBDList.length; ad++) {
            addressBD_convert.push(convertAddress(addressBDList[ad].toUpperCase()));
        }
        addressBD_convert = addressBD_convert.join(';' + "\r\n");
    }

    if (dataHtml.length >= 0) {
        for (var i = 0; i < dataHtml.length; i++) {
            if (siteBD == dataHtml[i].sitePath) {
                var preSchool = dataHtml[i].stepData.preschool,
                    elemSchool = dataHtml[i].stepData.elementary,
                    midSchool = dataHtml[i].stepData.middle_high;

                var data = {
                    abbreviatedBD: abbreviatedBD,
                    convertedAddressBD: addressBD_convert,
                    addressBD: addressBD
                };

                if (Object.keys(preSchool).length !== 0) {
                    data.step = {};
                    data.step = preSchool;
                    compareAddress.push(getStepData(data));

                }

                if (Object.keys(elemSchool).length !== 0) {
                    data.step = {};
                    data.step = elemSchool;
                    compareAddress.push(getStepData(data));
                }

                if (Object.keys(midSchool).length !== 0) {
                    data.step = {};
                    data.step = midSchool;
                    compareAddress.push(getStepData(data));
                }
            }
            else {
                notFoundSchools.push(abbreviatedBD);
            }
        }
    }
    return compareAddress;
}

// Getter for step info
function getStepData(data) {
    var step = data.step,
        abbreviatedBD = data.abbreviatedBD,
        convertedAddressBD = data.convertedAddressBD,
        addressBD = data.addressBD;
    var result = [];

    for (var s = 0; s < step.addresses.length; s++) {
        if (Object.keys(step.addresses[s]).length !== 0) {
            var addressesData = step.addresses[s];
            var address = addressesData.address;
            var title_convert = convertTitle(addressesData.title);

            if (/;[ А-ЯЁа-яё0-9]/.test(address)) {
                var addressesList = address.split(';');

                for (var i = 0; i < addressesList.length; i++) {
                    var address_convert = convertAddress(addressesList[i]).
                            toUpperCase();
                    result.push({
                        'Адрес': addressesList[i],
                        'Преобразованный адрес': address_convert,
                        'Наименование здания': title_convert,
                        'Школа, к которой относится': abbreviatedBD,
                        'Ступень': step.title,
                        'Есть ли совпадение с адресами в БД': convertedAddressBD.search(address_convert) >= 0,
                        'Адреса из БД': addressBD,
                        'Преобразованные адреса из БД': convertedAddressBD
                    });
                }
            }
            else {
            var address_convert = convertAddress(address).toUpperCase();
                result.push({
                    'Адрес': address,
                    'Преобразованный адрес': address_convert,
                    'Наименование здания': title_convert,
                    'Школа, к которой относится': abbreviatedBD,
                    'Ступень': step.title,
                    'Есть ли совпадение с адресами в БД': convertedAddressBD.search(address_convert) >= 0,
                    'Адреса из БД': addressBD,
                    'Преобразованные адреса из БД': convertedAddressBD
                });
            }

        }
    }
    return result;
}

// Address converter
function convertAddress(address) {
    if (address !== undefined) {
        var updateAddress = address;

        updateAddress = updateAddress.replace(
            /Ё/ig, 'Е');
        updateAddress = updateAddress.replace(
            /[0-9]{6}|[0-9]{5}/ig, ' ');
        updateAddress = updateAddress.replace(
            /ГОРОД|Г\.| Г |^Г /ig, ' ');
        updateAddress = updateAddress.replace(
            /РОССИЯ/ig, ' ');
        updateAddress = updateAddress.replace(
            /МОСКВА/ig, ' ');
        updateAddress = updateAddress.replace(
            /НАБЕРЕЖНАЯ,*| НАБ\.| НАБ(?=[0-9]|,| )|^НАБ\.* /ig, ' ');
        updateAddress = updateAddress.replace(
            /БУЛЬВАР,*| БУЛЬВ\.| БУЛЬВ(?=[0-9]|,| )| Б-Р(?=[0-9]|,| )|^БУЛЬВ\.*|^Б-Р /ig, ' ');
        updateAddress = updateAddress.replace(
            /ШОССЕ,*|Ш\.| Ш(?=[0-9]|,| )|^Ш\.* /ig, ' ');
        updateAddress = updateAddress.replace(
            /ПЕРЕУЛОК,*| ПЕР\.| ПЕР(?=[0-9]|,| )|^ПЕР\.* /ig, ' ');
        updateAddress = updateAddress.replace(
            /-АЯ|-Я|-ОЙ|-Й|-ТИ|-*ЛЕТИЯ |-*ЛЕТ /ig, ' ');
        updateAddress = updateAddress.replace(
            /УЛИЦА,*|УЛ\.| УЛ(?=[0-9]|,| )|^УЛ\.* /ig, ' ');
        updateAddress = updateAddress.replace(
            /ПРОЕЗД,*| ПР-Д(?=[0-9]|,| )|^ПР-Д /ig, ' ');
        updateAddress = updateAddress.replace(
            /ПР*ОСПЕКТ,*| ПРОСП\.| ПРОСП(?=[0-9]|,| )|^ПРОСП\.* | ПР-Т(?=[0-9]|,| )|^ПР-Т| ПР\.| ПР(?=[0-9]|,| )|^ПР\.* /ig, ' ');
        updateAddress = updateAddress.replace(
            / ДОМ(?=[0-9]|,| )|Д\.| Д(?=[0-9]| )/ig, ' ');
        updateAddress = updateAddress.replace(
            / ВЛАДЕНИЕ,*/ig, ' ');
        updateAddress = updateAddress.replace(
            / ДОМОВЛАДЕНИЕ,*/ig, ' ');
        updateAddress = updateAddress.replace(
            / КОРПУС|КОРП\.| КОРП(?=[0-9]| )|КОР\.| КОР(?=[0-9]| )|К\.| К |К(?=[0-9])/ig, '-');
        updateAddress = updateAddress.replace(
            / СТРОЕНИЕ|СТР\.| СТР(?=[0-9]| )|С\.|С(?=[0-9])/ig, '-');
        updateAddress = updateAddress.replace(
            /;*/ig, '');
        updateAddress = updateAddress.replace(
            /\.*/ig, '');
        updateAddress = updateAddress.replace(
            /,*/ig, '');
        updateAddress = updateAddress.replace(
            / */ig, '');
        updateAddress = updateAddress.replace(
            /\(№[0-9]{4}-[0-9]\)/ig, '');
        updateAddress = updateAddress.replace(
            /\+7\([0-9]{3}\)[0-9]{7}/ig, '');


        return updateAddress;
    }
}

// Title converter
function convertTitle(title) {
    var updateTitle = title.replace(/^ +/ig, '');

    if (updateTitle !== undefined && updateTitle !== '') {

        updateTitle = updateTitle.toLowerCase();

        updateTitle = updateTitle.replace(
            /^шо /ig, 'ШО ');
        updateTitle = updateTitle.replace(
            / шо /ig, ' ШО ');
        updateTitle = updateTitle.replace(
            /^до /ig, 'ДО ');
        updateTitle = updateTitle.replace(
            / до /ig, ' ДО ');
        updateTitle = updateTitle.replace(
            /^сп /ig, 'СП ');
        updateTitle = updateTitle.replace(
            / сп /ig, ' СП ');
        updateTitle = updateTitle.replace(
            /^гбоу /ig, 'ГБОУ ');
        updateTitle = updateTitle.replace(
            / гбоу /ig, ' ГБОУ ');
        updateTitle = updateTitle.replace(
            /^сош /ig, 'СОШ ');
        updateTitle = updateTitle.replace(
            / сош /ig, ' СОШ ');
        updateTitle = updateTitle.replace(
            /^скош /ig, 'СКОШ ');
        updateTitle = updateTitle.replace(
            / скош /ig, ' СКОШ ');

        updateTitle = updateTitle[0].toUpperCase() + updateTitle.slice(1);
    }
    return updateTitle;
}

getSummaryData_(path.schoolFromBd);