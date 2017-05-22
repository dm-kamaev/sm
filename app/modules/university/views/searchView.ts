import {
    BackendSuggestList,
    SuggestList
} from '../types/program';

class SearchView {
    public suggestList(suggestData: BackendSuggestList): SuggestList {
        const programs = suggestData.programs.map(program => {
            program.name =
                `${program.name} (${program.universityAbbreviation})`;
            return program;
        });
        const result: SuggestList = {programs};
        return result;
    }
}

export const searchView = new SearchView();
