import {
    SchoolSpecializedClassAttribute
} from '../../../api/modules/school/models/schoolSpecializedClass';

const schoolService = require('../../../api/modules/school/services/school');

class SchoolSpecClassExtractor {
    public async extract() {
        const schools = await schoolService.listInstances();
        const schoolSpecializedClasses =
            this.getSchoolSpecializedClasses(schools);
        return schoolSpecializedClasses;
    }

    private getSchoolSpecializedClasses(schools):
            Array<SchoolSpecializedClassAttribute> {
        return schools.reduce((previous, current) => {
            const schoolSpecializedClasses =
                this.formatSchoolSpecializedClasses(
                    current.specializedClasses,
                    current.id
                );

            return schoolSpecializedClasses ?
                previous.concat(schoolSpecializedClasses) :
                previous;
        }, []);
    }

    private formatSchoolSpecializedClasses(
                specializedClasses: Array<[number, number] | null>,
                schoolId: number
            ): Array<SchoolSpecializedClassAttribute> | null {

        let result;
        if (!specializedClasses) {
            result = null;
        } else {
            result = specializedClasses.map(specializedClass => {
                const formattedSpecializedClass =
                    this.formatSchoolSpecializedClass(specializedClass);
                formattedSpecializedClass.schoolId = schoolId;
                return formattedSpecializedClass;
            });
        }
        return result;
    }

    private formatSchoolSpecializedClass(
                specializedClass: [number, number]
            ): SchoolSpecializedClassAttribute {
        const classPosition = 0;
        const specializedClassTypePosition = 1;
        return {
            specializedClassTypeId:
                specializedClass[specializedClassTypePosition],
            class: specializedClass[classPosition]
        };
    }
}

export {SchoolSpecClassExtractor};
