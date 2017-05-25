"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash = require("lodash");
const programSearchData_1 = require("../../../api/modules/university/services/programSearchData");
const SearchType_1 = require("../../../api/modules/university/constants/SearchType");
const PayType_1 = require("../../../api/modules/university/constants/PayType");
const ProgramFeature_1 = require("../../../api/modules/university/constants/ProgramFeature");
class ProgramActualizer {
    constructor(program, programSearchData) {
        this.program_ = program;
        this.programSearchData_ = programSearchData;
    }
    actualize() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all([
                this.actualizeCity_(),
                this.actualizeEge_(),
                this.actualizeMajor_(),
                this.actualizeDiscount_(),
                this.actualizeFeatures_(),
                this.actualizePaidType_()
            ]);
        });
    }
    actualizeCity_() {
        return __awaiter(this, void 0, void 0, function* () {
            const cityId = this.program_.university.cityId;
            this.actualizeData_([cityId], SearchType_1.SearchType.CITY);
        });
    }
    actualizeEge_() {
        return __awaiter(this, void 0, void 0, function* () {
            const egeIds = this.program_.programEgeExams.map(programEgeExam => programEgeExam.subjectId);
            this.actualizeData_(egeIds, SearchType_1.SearchType.EGE);
        });
    }
    actualizeMajor_() {
        return __awaiter(this, void 0, void 0, function* () {
            const programMajorId = this.program_.programMajorId;
            this.actualizeData_([programMajorId], SearchType_1.SearchType.MAJOR);
        });
    }
    actualizeDiscount_() {
        return __awaiter(this, void 0, void 0, function* () {
            const entranceStatisticLast = this.getLastStatistic_();
            const discount = entranceStatisticLast &&
                entranceStatisticLast.discount;
            const discountData = this.formatToBooleanData_(discount);
            this.actualizeData_(discountData, SearchType_1.SearchType.DISCOUNT);
        });
    }
    actualizeFeatures_() {
        return __awaiter(this, void 0, void 0, function* () {
            const features = [];
            const exchangeProgram = this.program_.exchangeProgram;
            const militaryDepartment = this.program_.university.militaryDepartment;
            const dormitory = this.program_.university.dormitory;
            if (exchangeProgram) {
                features.push(ProgramFeature_1.ProgramFeature.EXCHANGE_PROGRAM);
            }
            if (militaryDepartment) {
                features.push(ProgramFeature_1.ProgramFeature.MILITARY_DEPARTMENT);
            }
            if (dormitory) {
                features.push(ProgramFeature_1.ProgramFeature.DORMITORY);
            }
            this.actualizeData_(features, SearchType_1.SearchType.FEATURES);
        });
    }
    actualizePaidType_() {
        return __awaiter(this, void 0, void 0, function* () {
            const entranceStatistic = this.getLastStatistic_();
            let payType = [];
            if (entranceStatistic) {
                payType = this.getPayType_(entranceStatistic);
            }
            this.actualizeData_(payType, SearchType_1.SearchType.PAY_TYPE);
        });
    }
    getPayType_(entranceStatistic) {
        const payType = [];
        if (entranceStatistic.egePassScore || entranceStatistic.budgetPlaces) {
            payType.push(PayType_1.PayType.BUDGET);
        }
        if (entranceStatistic.cost || entranceStatistic.commercialPlaces) {
            payType.push(PayType_1.PayType.COMMERCIAL);
        }
        return payType;
    }
    formatToBooleanData_(value) {
        return value ? [1] : [0];
    }
    getLastStatistic_() {
        const entranceStatistics = this.program_.entranceStatistics;
        return entranceStatistics && entranceStatistics[0];
    }
    actualizeData_(values, type) {
        return __awaiter(this, void 0, void 0, function* () {
            if (values && values.length) {
                const searchData = this.getSearchData_(type);
                if (!searchData) {
                    programSearchData_1.service.create({
                        programId: this.program_.id,
                        values: values,
                        type: type
                    });
                }
                else if (!lodash.isEqual(values, searchData.values)) {
                    programSearchData_1.service.update(searchData.id, { values });
                }
            }
        });
    }
    getSearchData_(type) {
        return this.programSearchData_.find(searchItem => searchItem.type === type &&
            searchItem.programId === this.program_.id);
    }
}
exports.ProgramActualizer = ProgramActualizer;
