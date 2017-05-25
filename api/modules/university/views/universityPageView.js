"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UniversityPageView {
    renderUniversityId(universityPage) {
        const universityId = universityPage.universityId;
        return { universityId };
    }
}
exports.universityPageView = new UniversityPageView();
