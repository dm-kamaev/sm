'use strict';

const EmptyParser = require('../../core/parsers/EmptyParser');

const BoolParser = require('../../core/parsers/BoolParser');
const IntParser = require('../../core/parsers/IntParser');
const StringParser = require('../../core/parsers/StringParser');
const BaseListParser = require('../../core/parsers/BaseListParser');
const ArrayParser = require('../../core/parsers/ArrayParser');
const ArrayOfPairsParser = 
    require('../../core/parsers/ArrayOfPairsParser');
const ArrayOfIntArraysParser = 
    require('../../core/parsers/ArrayOfIntArraysParser');

module.exports = {
    'Полное название': {
        columnName: 'full_name',
        parser: StringParser,
    },
    'Красивое название': {
        columnName: 'name',
        parser: StringParser,
    },
    'Сайты школы': {
        columnName: 'links',
        parser: ArrayOfPairsParser,
    },
    'Социальные сети': {
        columnName: 'links',
        parser: ArrayOfPairsParser,
    },
    'Профили (fixed)': {
        columnName: 'specialized_classes',
        parser: ArrayParser,
    },
    'Краткое описание (около 112 знаков)': {
        columnName: 'description',
        parser: StringParser,
    },
    'Особенности': {
        columnName: 'features',
        parser: BaseListParser,
    },
    'Наличие и стоимость продлёнки': {
        columnName: 'extended_day_cost',
        parser: StringParser,
    },
    'Наличие формы': {
        columnName: 'dress_code',
        parser: BoolParser,
    },
    'Тип школы': {
        columnName: 'school_type',
        parser: StringParser,
    },
    'Наличие интерната': {
        columnName: 'boarding',
        parser: BoolParser,
    },
    'Адреса зданий ОУ / Административный округ': {
        columnName: 'district',
        parser: ArrayParser,
    },
    'Адреса зданий ОУ / Район': {
        columnName: 'area',
        parser: ArrayParser,
    },
    'Адреса зданий ОУ / Адрес': {
        columnName: 'address',
        parser: ArrayParser,
    },
    'Образовательные программы': {
        columnName: 'educational_grades',
        parser: ArrayOfIntArraysParser,
    },
    'телефон': {
        columnName: 'phones',
        parser: BaseListParser,
    },
    'ФИО директора': {
        columnName: 'director',
        parser: StringParser,
    },
    'Старое название на сайте': {
        columnName: 'old_name',
        parser: StringParser,
    },
    'id школы в ВК': {
        columnName: 'links',
        parser: IntParser,
        additionalHandler: function(data) {
            //console.log(data);
            return data;
        }
    }
    //: EmptyParser,
};
