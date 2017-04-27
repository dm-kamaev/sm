import * as Sequelize from 'sequelize/v3';

export interface CourseTypeAttribute {
    name: string;
    popularity?: number;
    categoryId?: number;
}

export interface CourseTypeInstance extends
        Sequelize.Instance<CourseTypeAttribute>, CourseTypeAttribute {
    id: number;
    createdAt: string;
    updatedAt: string;
}
