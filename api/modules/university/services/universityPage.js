"use strict";
// author: dm-kamaev
// university page for relation between university and page
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const services = require('../../../../app/components/services').all;
const entityTypies = require('../../entity/enums/entityType.js');
const sequelize = require('../../../../app/components/db.js');
const logger = require('../../../../app/components/logger/logger').getLogger('app');
const UniversityPage_1 = require("../models/UniversityPage");
const pageModel = require('../../entity/models/page').Model;
const page_1 = require("../../entity/services/page");
const index_1 = require("./exceptions/index");
class UniversityPageService {
    create(data, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UniversityPage_1.Model.create({
                universityId: data.universityId,
                pageId: data.pageId
            }, transaction);
        });
    }
    // create page for university and realtionship between tables university
    // and page via university_page
    createPage(university) {
        return __awaiter(this, void 0, void 0, function* () {
            const self = this;
            const universityName = university.name;
            if (!universityName) {
                throw new index_1.UniversityNameIsEmptyException(universityName);
            }
            const alias = services.urls.stringToURL(universityName.trim());
            const universityId = university.id;
            const UNIVERSITY = entityTypies.UNIVERSITY;
            const data = {
                entityId: universityId,
                entityType: UNIVERSITY,
                alias,
            };
            const duplicate = yield page_1.service.searchDuplicateAlias(data);
            if (duplicate) {
                throw new index_1.UniversityAliasDuplicateException(alias, duplicate);
            }
            yield page_1.service.create({
                entityId: universityId,
                entityType: UNIVERSITY,
                alias,
                views: 0
            }).then(function (page) {
                const pageId = page.id;
                return self.create({
                    universityId,
                    pageId
                });
            });
        });
    }
    // update alias for url in table page (for university)
    updatePage(university) {
        return __awaiter(this, void 0, void 0, function* () {
            const self = this;
            const universityName = university.name;
            if (!universityName) {
                throw new index_1.UniversityNameIsEmptyException(universityName);
            }
            const alias = services.urls.stringToURL(universityName.trim());
            const universityId = university.id;
            const UNIVERSITY = entityTypies.UNIVERSITY;
            let page = yield page_1.service.getOne(universityId, UNIVERSITY);
            if (!page) {
                yield self.createPage(university);
                page = yield page_1.service.getOne(universityId, UNIVERSITY);
            }
            const data = {
                entityId: universityId,
                entityType: UNIVERSITY,
                alias,
            };
            const duplicate = yield page_1.service.searchDuplicateAlias(data);
            if (duplicate) {
                throw new index_1.UniversityAliasDuplicateException(alias, duplicate);
                // if new university name
            }
            else if (page.alias !== alias) {
                yield page_1.service.update({ id: page.id }, data);
            }
        });
    }
    // remove page for university from table page
    removePage(university) {
        return __awaiter(this, void 0, void 0, function* () {
            const universityName = university.name, universityId = university.id;
            yield page_1.service.delete(universityId, entityTypies.UNIVERSITY);
        });
    }
    getByAlias(alias) {
        return __awaiter(this, void 0, void 0, function* () {
            const universityPage = yield UniversityPage_1.Model.findOne({
                include: [{
                        model: pageModel,
                        as: 'page',
                        where: {
                            alias: alias
                        }
                    }]
            });
            if (!universityPage) {
                throw new index_1.UniversityAliasNotFoundException(alias);
            }
            return universityPage;
        });
    }
}
exports.service = new UniversityPageService();
