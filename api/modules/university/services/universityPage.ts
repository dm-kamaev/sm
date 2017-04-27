
// author: dm-kamaev
// university page for relation between university and page

import {UniversityInstance} from '../models/University';
const services = require('../../../../app/components/services').all;
const entityTypies = require('../../entity/enums/entityType.js');
const sequelize = require('../../../../app/components/db.js');
import * as Sequelize from 'sequelize/v3';
const logger =
    require('../../../../app/components/logger/logger').getLogger('app');

import {
    Model as UniversityPageModel,
    UniversityPageInstance
} from '../models/UniversityPage';
const pageModel = require('../../entity/models/page').Model;

import {service as universityService} from '../services/university';
import {service as pageServices} from '../../entity/services/page';
import {
    UniversityNameIsEmptyException,
    UniversityAliasDuplicateException,
    UniversityAliasNotFoundException,
} from './exceptions/index';

type pageData = {
    entityId: number;
    entityType: string;
    alias: string;
};

class UniversityPageService {
    public async create(data: {
        universityId: number,
        pageId: number,
    }, transaction?: {
        transaction: Sequelize.Transaction
    }): Promise<UniversityPageInstance> {
        return await UniversityPageModel.create({
            universityId: data.universityId,
            pageId: data.pageId
        }, transaction);
    }


    // create page for university and realtionship between tables university
    // and page via university_page
    public async createPage(university: UniversityInstance): Promise<void> {
        const self: this = this;
        const universityName: string = university.name;
        if (!universityName) {
            throw new UniversityNameIsEmptyException(universityName);
        }
        const alias: string = services.urls.stringToURL(universityName.trim());
        const universityId: number = university.id;
        const UNIVERSITY: string = entityTypies.UNIVERSITY;
        const data: pageData = {
            entityId: universityId,
            entityType: UNIVERSITY,
            alias,
        };
        const duplicate = await pageServices.searchDuplicateAlias(data);
        if (duplicate) {
            throw new UniversityAliasDuplicateException(alias, duplicate);
        }
        await pageServices.create({
            entityId: universityId,
            entityType: UNIVERSITY,
            alias,
            views: 0
        }).then(function(page) {
            const pageId: number = page.id;
            return self.create({
                universityId,
                pageId
            });
        });
    }

    // update alias for url in table page (for university)
    public async updatePage(university: UniversityInstance): Promise<void> {
        const self: this = this;
        const universityName: string = university.name;
        if (!universityName) {
            throw new UniversityNameIsEmptyException(universityName);
        }
        const alias: string = services.urls.stringToURL(universityName.trim());
        const universityId: number = university.id;
        const UNIVERSITY: string = entityTypies.UNIVERSITY;
        let page = await pageServices.getOne(universityId, UNIVERSITY);
        if (!page) {
            await self.createPage(university);
            page = await pageServices.getOne(universityId, UNIVERSITY);
        }
        const data: pageData = {
            entityId: universityId,
            entityType: UNIVERSITY,
            alias,
        };
        const duplicate = await pageServices.searchDuplicateAlias(data);
        if (duplicate) {
            throw new UniversityAliasDuplicateException(alias, duplicate);
        // if new university name
        } else if (page.alias !== alias) {
            await pageServices.update({ id: page.id }, data);
        }
    }

    // remove page for university from table page
    public async removePage(university: UniversityInstance): Promise<void> {
        const universityName: string = university.name,
        universityId: number = university.id;
        await pageServices.delete(universityId, entityTypies.UNIVERSITY);
    }

    public async getByAlias(alias: string): Promise<UniversityInstance> {
        const universityPage = await UniversityPageModel.findOne({
            include: [{
                model: pageModel,
                as: 'page',
                where: {
                    alias: alias
                }
            }]
        });

        if (!universityPage) {
            throw new UniversityAliasNotFoundException(alias);
        }

        return universityPage;
    }
}

export const service = new UniversityPageService();
