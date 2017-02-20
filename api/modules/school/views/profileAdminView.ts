'use strict';

// author: dm-kamaev
// view profile class admin for school

import {
    SchoolSpecializedClassInstance
} from '../models/schoolSpecializedClass';

type adminProfile = {
    id: number;
    classNumber: number;
    profile: {
      id: number;
      name: string;
    };
};

type adminProfileList = Array<adminProfile>;


class View {
    public render(schoolSpecializedClass: SchoolSpecializedClassInstance):
            adminProfile {
        const profileId = schoolSpecializedClass.specializedClassType.id;
        const profileName = schoolSpecializedClass.specializedClassType.name;
        return {
            id: schoolSpecializedClass.id,
            classNumber: schoolSpecializedClass.class,
            profile: {
                id: profileId,
                name: profileName
            }
        };
    }

    public listProfile(
        specializedClasses: number[][],
        hashClassType: {[key: string]: string}
    ): adminProfile[] | Array<undefined> {
        if (!specializedClasses.length) {
            return [];
        }
        return specializedClasses.map((specializedClass: number[], i) => {
            const specializedClassId: number = specializedClass[1];
            const profileName: string = hashClassType[specializedClassId] || '';
            return this.oneProfile_(specializedClass, i + 1, profileName);
        });
    }


    public oneProfile(
        index: number,
        specializedClass: number[],
        hashClassType: {[key: string]: string}
    ): adminProfile | {} {
        if (!specializedClass.length) {
            return {};
        }
        const specializedClassId: number = specializedClass[1];
        const profileName: string = hashClassType[specializedClassId] || '';
        return this.oneProfile_(specializedClass, index, profileName);
    }


    private oneProfile_(
        specializedClass: number[],
        index: number,
        profileName: string
    ) {
        const specializedClassId: number = specializedClass[1];
        const classNumber: number = specializedClass[0];
        const id: number = specializedClass[1];
        return {
            id: index,
            classNumber: classNumber,
            profile: {
                id: specializedClassId,
                name: profileName
            }
        };
    }
};
export const view = new View();
