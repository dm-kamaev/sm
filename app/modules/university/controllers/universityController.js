'use strict';

const async = require('asyncawait/async');
// await = require('asyncawait/await');

const soy = require('../../../components/soy'),
    services = require('../../../components/services').all;

const logger = require('../../../components/logger/logger').getLogger('app');

const configView = require('../../common/views/configView'),
    informationView = require('../views/informationView');

const pageName = require('../../common/enums/pageName'),
    entityType = require('../../../../api/modules/entity/enums/entityType.js');

const config = require('../../../config').config;

let controller = {};

controller.information = async(function(req, res, next) {
    try {
        let authSocialLinks = services.auth.getAuthSocialUrl(),
            user = req.user || {};

        let templateData = informationView.render({
            user: user,
            entityData: {
                id: 1,
                name: `Национальный исследовательский университет –
                    Высшая школа экономики (НИУ–ВШЭ)`,
                subunitType: 'Специальность',
                subunitName: 'Менеджемент',
                description: `Программа для тех, кто хочет стать профессионалом
                    в сфере маркетинга, управления персонала, 
                    бизнес–планирования и проектирования, тех, кто хочет 
                    построить свою карьеру в управлении бизнесом. Учебный
                    процесс сочетает в себе как фундаментальное изучение
                    экономики и финансов, права, социологии и психологии,
                    так и овладение общеменеджериальными и специальными
                    дисциплинами. Получив на первых двух курсах фундаментальную
                    подготовку, на третьем–четвертом курсе студенты могут выбрать
                    направление для углубленной специализации.
                    Длительность обучения: 4 года.`
            },
            authSocialLinks: authSocialLinks,
            entityType: entityType.UNIVERSITY,
            config: config
        });

        let templateConfig = configView.render({
            entityType: entityType.UNIVERSITY,
            pageName: pageName.INFORMATION,
            query: req.query,
            csrf: req.csrfToken(),
            config: config
        });

        let html = soy.render(
            'sm.lUniversity.Template.university', {
                params: {
                    data: templateData,
                    config: templateConfig
                }
            }
        );

        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(html);
    } catch (error) {
        logger.error(error);

        res.status(error.code || 500);
        next(error);
    }
});

module.exports = controller;
