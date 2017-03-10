import {UniversityPageInstance} from '../models/UniversityPage';

type UniversityId = {
    universityId: number
};

class UniversityPageView {
    public renderUniversityId(
            universityPage: UniversityPageInstance): UniversityId {
        const universityId = universityPage.universityId;
        return {universityId};
    }
}

export const universityPageView = new UniversityPageView();
