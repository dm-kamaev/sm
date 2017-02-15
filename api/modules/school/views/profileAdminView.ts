'use strict';

// author: dm-kamaev
// view profile class admin for school

type profileGetList = {
    id: number;
    classNumber: number;
    profile: {
      id: number;
      name: string;
    };
};


class View {

    public listProfile(
        specializedClasses: number[][],
        hashClassType: {[key: string]: string}
    ): profileGetList[] | Array<undefined> {
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
    ): profileGetList | {} {
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
