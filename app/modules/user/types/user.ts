export type BackendUser = {
    id: number;
    facebookId: string;
    vkId: string;
    okId: string;
    googleId: string;
    twitterId: string;
    firstName: string;
    lastName: string;
    gender: string;
    phone: string;
    email: string;
    photoUrl: string;
    status: string;
    birthDate: string;
    created_at: Date;
    updated_at: Date;
};

export interface UserData {
    firstName: string;
    lastName: string;
    photoUrl?: string;
};
