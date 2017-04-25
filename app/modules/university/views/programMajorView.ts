import {BackendProgramMajor} from '../types/programMajor';
import {Option} from '../../common/types/filterPanel';

class ProgramMajorView {
    public filtersRender(programMajor: BackendProgramMajor): Option {
        return {
            value: programMajor.id,
            label: programMajor.name
        };
    }

    public filtersListRender(programMajors: BackendProgramMajor[]): Option[] {
        return programMajors.map(this.filtersRender);
    }
}

export const programMajorView = new ProgramMajorView();
