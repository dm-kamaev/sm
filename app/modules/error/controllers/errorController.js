var soy = require.main.require('./app/components/soy');
var services = require('../../../../app/components/services').all;
const schoolView = require('../../../../api/modules/school/views/schoolView');

const config = require('../../../config').config;
const analyticsId = config.analyticsId;
const yandexMetrikaId = config.yandexMetrikaId;

var async = require('asyncawait/async');
var await = require('asyncawait/await');

exports.notFound = async(function(req, res) {

    var dataPromises = {
        popularSchools: services.school.getRandomPopularSchools(5),
        amountSchools: services.school.getSchoolsCount(),
        authSocialLinks: services.auth.getAuthSocialUrl()
    };

    var data = await(dataPromises);
        searchUrl = '/search?name=';

    var html = soy.render('sm.lErrorNotFound.Template.base', {
          params: {
              errorText: 'Страница, которую вы искали, не найдена',
              popularSchools: schoolView.popular(data.popularSchools),
              dataLinks : schoolView.dataLinks(),
              amountSchools: data.amountSchools,
              config: {
                  staticVersion: new Date().getTime(),
                  year: new Date().getFullYear(),
                  analyticsId: analyticsId,
                  yandexMetrikaId: yandexMetrikaId,
                  csrf: req.csrfToken()
              }
          }
    });

    res.end(html);
});
