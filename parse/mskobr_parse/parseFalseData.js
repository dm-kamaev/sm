var xlsx = require('node-xlsx');
var fs = require('fs');
var colors = require('colors');

var path = {
    mskobrBdFull: '../../tmp/compare-addresses-full.xlsx',
    mskobrBdFalse: '../../tmp/parse-address-v5-false-reviewed.xlsx',
    compare: './base/compareFULL.json'
};

var fullBD = {
        ADDRESS_INDEX: 0,
        ADDRESS_COMPARE_INDEX: 1,
        DEPARTMENT_NAME_INDEX: 2,
        ABBREVIATION_INDEX: 3,
        STAGE_INDEX: 4,
        COMPARE_INDEX: 5
    };


var falseBD = {
        ADDRESS_INDEX: 0,
        ADDRESS_COMPARE_INDEX: 1,
        ABBREVIATION_INDEX: 3,
        STAGE_INDEX: 4,
        ADDRESS_BD: 6
    };

function appendFile_(path, content) {
    fs.appendFileSync(path, content, 'utf8');
    console.log('The content is appended.');
}

function readFile_(path) {
    return fs.readFileSync(path, 'utf8');
}

function saveFile_(path, content) {
    fs.writeFileSync(path, content, 'utf8');
    console.log('The file is saved.');
}

function mainParse() {
    var fullData = getFullData_(path.mskobrBdFull),
        falseData = getFalseData_(path.mskobrBdFalse);
    var resultData = [];

    falseData.forEach(function(falseElem) {
        var address = falseElem.address,
            adressCompare = falseElem.addressCompare,
            abbreviation = falseElem.abbreviation,
            stage = falseElem.stage,
            addressBD = falseElem.addressBD ? falseElem.addressBD : address;
        console.log('Parse:', abbreviation);


        fullData.forEach(function(fullElem) {
            if (String(fullElem.compare) == 'true') {

            }
            else if (adressCompare == fullElem.addressCompare) {
                var paramsFalse = {
                        address: addressBD,
                        addressCompare: convertAddress(addressBD),
                        departmentName: fullElem.departmentName,
                        abbreviation: abbreviation,
                        stage: stage,
                        compare: false,
                    };
                resultData.push(paramsFalse);
            }
        });
    });


    fullData.forEach(function(fullElem) {
        if (String(fullElem.compare) == 'true') {
            var paramsFull = {
                    address: fullElem.address,
                    addressCompare: fullElem.addressCompare,
                    departmentName: fullElem.departmentName,
                    abbreviation: fullElem.abbreviation,
                    stage: fullElem.stage,
                    compare: fullElem.compare
                };
            resultData.push(paramsFull);
        }
    });

    saveFile_(path.compare, JSON.stringify(resultData));
}


// Get file with compare address info
function getFullData_(path) {
    var parsed = xlsx.parse(path),
        fullData = parsed[0].data,
        data = fullData.map(parseFullRow_);
    return data;
}


// Parse address data
function parseFullRow_(row) {
    return {
        address: row[fullBD.ADDRESS_INDEX],
        addressCompare: row[fullBD.ADDRESS_COMPARE_INDEX],
        departmentName: row[fullBD.DEPARTMENT_NAME_INDEX],
        abbreviation: row[fullBD.ABBREVIATION_INDEX],
        stage: row[fullBD.STAGE_INDEX],
        compare: row[fullBD.COMPARE_INDEX]
    };
}


// Get file with compare address info
function getFalseData_(path) {
    var parsed = xlsx.parse(path),
        fullData = parsed[0].data,
        data = fullData.map(parseFalseRow_);
    return data;
}


// Parse address data
function parseFalseRow_(row) {
    return {
        address: row[falseBD.ADDRESS_INDEX],
        addressCompare: row[falseBD.ADDRESS_COMPARE_INDEX],
        abbreviation: row[falseBD.ABBREVIATION_INDEX],
        stage: row[falseBD.STAGE_INDEX],
        addressBD: row[falseBD.ADDRESS_BD]
    };
}


function convertAddress(address) {
    if (address !== undefined) {
        var updateAddress = address.toUpperCase();

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

console.log('In process...');
mainParse();