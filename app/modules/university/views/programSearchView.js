"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FormatUtils_1 = require("../../common/lib/FormatUtils");
const programRenderSearchView_1 = require("./programRenderSearchView");
const programView_1 = require("./programView");
class ProgramSearchView {
    renderList(data) {
        const headerText = programRenderSearchView_1.programRenderSearchView.generateHeaderText(data.programCount, data.universityCount);
        const items = programView_1.programView.list(data.programs);
        const countResults = data.programCount;
        return {
            list: { headerText, items, countResults }
        };
    }
    initSearchParams(queryParams, filtersData) {
        const formatUtils = new FormatUtils_1.FormatUtils();
        return {
            cities: formatUtils.transformToArray(queryParams.cities),
            egeSubjects: formatUtils.transformToArray(queryParams.egeSubjects),
            payType: formatUtils.transformToArray(queryParams.payType),
            egeResults: this.initEgeResults(queryParams.egeResults),
            majors: formatUtils.transformToArray(queryParams.majors),
            maxPrice: formatUtils.transformToArray(queryParams.maxPrice),
            features: formatUtils.transformToArray(queryParams.features),
            page: queryParams.page || 0,
            sortType: queryParams.sortType || 0
        };
    }
    ;
    renderCityResult(cities) {
        return {
            cities: cities
        };
    }
    initEgeResults(query) {
        return query ?
            JSON.parse(query) :
            [];
    }
}
exports.programSearchView = new ProgramSearchView();
