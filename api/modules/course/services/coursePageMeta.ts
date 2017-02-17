/**
 * @fileOverview service for make CRUD operations on course page meta data
 */

import {
    PageMetaInformationAttributes,
    PageMetaInformationInstance
} from '../../entity/types/pageMetaInterfaces';

import {CourseInstance} from '../types/courseInterfaces';

import {PageMetaNotBelongToCourse}
    from './exceptions/PageMetaNotBelongToCourse';
import {CoursePageMetaAlreadyExists}
    from './exceptions/CoursePageMetaAlreadyExists';

const courseService = require('./course');
import {service as pageMetaService}
    from '../../entity/services/pageMetaInformation';

class CoursePageMetaService {
    public readonly name = 'coursePageMeta';

    public async create(
            courseId: number, data: PageMetaInformationAttributes
    ): Promise<PageMetaInformationInstance> {
        const course: CourseInstance = await courseService.getById(courseId);
        if (!this.checkIfPageMetaExist_(course)) {
            throw new CoursePageMetaAlreadyExists(course.id);
        }

        const pageMeta = await pageMetaService.create(data);
        await course.addPageMetaInformation([pageMeta]);

        return pageMeta;
    }

    public async update(
            courseId: number,
            pageMetaId: number,
            data: PageMetaInformationAttributes
    ): Promise<PageMetaInformationInstance> {
        const course: CourseInstance = await courseService.getById(courseId);
        const isBelongs =
            await this.checkIsPageMetaBelongs_(course, pageMetaId);
        if (!isBelongs) {
            throw new PageMetaNotBelongToCourse(courseId, pageMetaId);
        }

        return await pageMetaService.update(pageMetaId, data);
    }

    public async getOne(
            courseId: number, pageMetaId: number
    ): Promise<PageMetaInformationInstance> {
        const isBelongs =
            await this.checkIsPageMetaBelongs_(courseId, pageMetaId);
        if (!isBelongs) {
            throw new PageMetaNotBelongToCourse(courseId, pageMetaId);
        }

        return await pageMetaService.getOne(pageMetaId);
    }

    public async delete(
            courseId: number, pageMetaId: number): Promise<number> {
        const isBelongs =
            await this.checkIsPageMetaBelongs_(courseId, pageMetaId);
        if (!isBelongs) {
            throw new PageMetaNotBelongToCourse(courseId, pageMetaId);
        }

        return pageMetaService.delete(pageMetaId);
    }

    private async checkIsPageMetaBelongs_(
            course: CourseInstance | number, pageMetaId: number
    ): Promise<boolean> {
        let courseInstance;
        if (typeof course === 'number') {
            courseInstance = await courseService.getById(course);
        } else {
            courseInstance = course;
        }

        return await courseInstance.hasPageMetaInformation(pageMetaId);
    }

    private async checkIfPageMetaExist_(
            course: CourseInstance): Promise<boolean> {
        const pageMetaInformations = await course.getPageMetaInfromations();

        return pageMetaInformations.length > 0;
    }
}

export const service = new CoursePageMetaService();
