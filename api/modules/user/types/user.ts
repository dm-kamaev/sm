export type UserAttributes = {
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

export interface CommentUser {
    name: string;
    socialId: string;
    socialType: string;
}

export interface DefaultRender {
    id: number;
    firstName: string;
    lastName: string;
}

export interface SchoolRender extends DefaultRender{
    isCommented: boolean;
}
