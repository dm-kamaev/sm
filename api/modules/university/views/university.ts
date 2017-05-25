import {UniversityInstance} from '../models/University';
import {UniversityAdmin, UniversityAdminList} from '../types/university';

class UniversityView {
    public renderAll(programs, universityAlias: string) {
        const groupByMajorName = {};
        programs.forEach(program_ => {
            const program = program_ as any;
            const page = program.pages && program.pages[0] || {};
            const programMajor = program.programMajor || {};
            const programAlias: string = page.alias;
            const programMajorName: string = programMajor.name;
            // console.log('programMajor=', program.programMajor);
            // console.log('programId');
            // console.log('page.alias=', page.alias);
            if (!groupByMajorName[programMajorName]) {
                groupByMajorName[programMajorName] = {
                    programMajorName,
                    programs: [],
                };
            }
            groupByMajorName[programMajorName].programs.push({
                name: program.name,
                programAlias,
                universityAlias
            });
        });

        // console.log('programInfo=', programInfo);
        // console.log('groupByMajorName=', groupByMajorName);
        return Object.keys(groupByMajorName).map(key => {
            return groupByMajorName[key]
        });
    }
}

export const universityView = new UniversityView();

