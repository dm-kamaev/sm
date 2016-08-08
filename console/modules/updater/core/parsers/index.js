const EmptyParser = require('./EmptyParser');

const ArrayParser = require('./ArrayParser');
const ArrayOfPairsParser = require('./ArrayOfPairsParser');
const ArrayOfIntArraysParser = require('./ArrayOfIntArraysParser');
const BoolParser = require('./BoolParser');
const BaseListParser = require('./BaseListParser');
const StringParser = require('./StringParser');
const ProfilesParser = require('./ProfilesParser');

module.exports = {
    EmptyParser: EmptyParser,
    ArrayParser: ArrayParser,
    ArrayOfIntArraysParser: ArrayOfIntArraysParser,
    ArrayOfPairsParser: ArrayOfPairsParser,
    BoolParser: BoolParser,
    BaseListParser: BaseListParser,
    StringParser: StringParser,
    ProfilesParser: ProfilesParser,
};
