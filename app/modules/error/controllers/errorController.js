'use strict';

const soy = require.main.require('./app/components/soy');
const services = require('../../../../app/components/services').all;
const logger = require('../../../components/logger/logger').getLogger('app');

const contentExperiment =
        require('../../../components/contentExperiment/contentExperiment');

const errorView = require('../../../../api/modules/error/views/errorView');

const config = require('../../../config').config;

const FB_CLIENT_ID = config.facebookClientId,
    CARROTQUEST_ID = config.carrotquestId;

var async = require('asyncawait/async');
var await = require('asyncawait/await');

let controller = {};

controller.generalError = async(function(
    req, res, next, entityType, subdomain
) {
    let html;
    try {
        let authSocialLinks = services.auth.getAuthSocialUrl(),
            user = req.user || {};

        let factory = contentExperiment.getFactoryByQuery(req.query);

        let data = await({
            favorites: services.favorite.getFavoriteEntities(user.id)
        });

        let errorText;

        if (/(\/error)$/.test(req.path)) {
            res.status(500);
            errorText = 'Что-то пошло не так';
        } else {
            res.status(404);
        }

        let templateData = errorView.render({
            entityType: entityType,
            user: user,
            favorites: data.favorites,
            authSocialLinks: authSocialLinks,
            errorText: errorText,
            config: config
        });

        html = soy.render('sm.lErrorNotFound.Template.errorNotFound', {
            params: {
                data: templateData,
                config: {
                    page: 'error-not-found',
                    staticVersion: config.lastBuildTimestamp,
                    entityType: entityType,
                    modifier: factory,
                    analyticsId: config[subdomain].analyticsId,
                    experimentId: config[subdomain].experimentId,
                    yandexMetrikaId: config[subdomain].yandexMetrikaId,
                    carrotquestId: CARROTQUEST_ID,
                    csrf: req.csrfToken(),
                    fbClientId: FB_CLIENT_ID,
                    domain: config[subdomain].host
                }
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
