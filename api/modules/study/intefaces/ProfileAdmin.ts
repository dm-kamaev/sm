export interface ProfileGetList {
    id: number;
    classNumber: number;
    profile: {
      id: number;
      name: string;
    };
}


export interface ProfileData {
    classNumber: number;
    profileId: number;
}
