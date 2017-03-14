'use strict';

const soy = require.main.require('./app/components/soy');
const services = require('../../../../app/components/services').all;
const logger = require('../../../components/logger/logger').getLogger('app');

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const errorView = require('../../../../api/modules/error/views/errorView'),
    configView = require('../../common/views/configView');

const entityTypeEnum =
        require('../../../../api/modules/entity/enums/entityType');
const pageName = require('../../common/enums/pageName');


const config = require('../../../config').config;

let controller = {};


controller.generalError = async(function(req, res, next, entityType) {
    let html;

    try {
        let authSocialLinks = services.auth.getAuthSocialUrl(),
            user = req.user || {};

        let data = await({
            favorites: services.favorite.getFavoriteEntities(user.id),
            popularEntities: entityType == entityTypeEnum.SCHOOL ?
                services.school.getRandomPopularSchools(5) : null,
            numberEntities: entityType == entityTypeEnum.SCHOOL ?
                services.school.getSchoolsCount() : null,
        });

        let aliasesPopular = data.popularEntities ?
            await(services.page.getAliases(
                data.popularEntities.map(entity => entity.id),
                entityType
            )) :
            null;

        let errorText;

        if (/(\/error)$/.test(req.path)) {
            res.status(500);
            errorText = 'Что-то пошло не&nbsp;так';
        } else {
            res.status(404);
        }

        let templateData = errorView.render({
            entityType: entityType,
            user: user,
            favorites: data.favorites,
            popularEntities: data.popularEntities,
            numberEntities: data.numberEntities,
            aliasesPopular: aliasesPopular,
            authSocialLinks: authSocialLinks,
            errorText: errorText,
            config: config
        });

        let templateConfig = configView.render({
            entityType: entityType,
            pageName: pageName.ERROR_NOT_FOUND,
            query: req.query,
            csrf: req.csrfToken(),
            config: config
        });

        html = soy.render('sm.lErrorNotFound.Template.errorNotFound', {
            params: {
                data: templateData,
                config: templateConfig
            }
        });
    } catch (error) {
        logger.error(error);

        res.status(error.code || 500);
        next(error);
    } finally {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(html);
    }
});

module.exports = controller;
