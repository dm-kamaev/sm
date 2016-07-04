const errors = require('../lib/errors');
const soy = require('../../../components/soy');
const services = require('../../../components/services').all;
const schoolView = require('../../../../api/modules/school/views/schoolView');
const searchView = require('../../../../api/modules/school/views/searchView');
const userView = require('../../../../api/modules/user/views/user');
const entityType = require('../../../../api/modules/entity/enums/entityType');

const config = require('../../../config').config;
const analyticsId = config.analyticsId;
const yandexMetrikaId = config.yandexMetrikaId;

const logger = require('../../../components/logger/logger').getLogger('app');

const DOMAIN = config.url.protocol + '://' + config.url.host;
const FB_CLIENT_ID = config.facebookClientId;

var async = require('asyncawait/async');
var await = require('asyncawait/await');


exports.createComment = async (function(req, res) {
    var result = '';
    try {
        var schoolId = req.params.id,
            params = req.body;
        result = await(services.school.comment(schoolId,params));
    } catch (e) {
        logger.error(e);
        result = JSON.stringify(e);
    } finally {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(result);
    }
});


exports.list = async (function(req, res, next) {
    try {
        var searchParams = {},
            searchText = '',
            user = req.user || {};

        if (req.params && req.params.listType) {
            var seoSchoolList = await(services.seoSchoolList.getByRequestParams(
                    req.params
                ));

            if (!seoSchoolList) {
                throw new errors.PageNotFoundError();
            }

            var seoSchoolListParams =
                searchView.seoSchoolListParams(seoSchoolList);

            searchParams = seoSchoolListParams.searchParams;
            searchText = seoSchoolListParams.searchText;
        } else {
            searchParams =
                await(services.search.initSearchParams(req.query));
            searchText = req.query.name || '';
        }

        var favoriteIds =
                await(services.favorite.getAllItemIdsByUserId(user.id)),
            promises = {
                schools: services.school.list(
                    searchParams,
                    {
                        limitResults: 10
                    }
                ),
                filters: services.school.searchFilters(),
                mapPosition: services.search.getMapPositionParams(searchParams),
                authSocialLinks: services.auth.getAuthSocialUrl(),
                favorites: {
                    items: services.school.getByIdsWithGeoData(favoriteIds),
                    itemUrls: services.page.getAliases(
                        favoriteIds,
                        entityType.SCHOOL
                    )
                }
            };
        var results = await(promises);

        var schoolAliases = await(services.page.getAliases(
                schoolView.listIds(results.schools),
                entityType.SCHOOL
            )),
            schools = schoolView.joinAliases(results.schools, schoolAliases),
            schoolsWithFavoriteMark = schoolView.listWithFavorites(
                schools, favoriteIds
            );

        var schoolsList = schoolView.list(schoolsWithFavoriteMark),
            map = schoolView.listMap(results.schools, results.mapPosition),
            filters = searchView.filters(results.filters, searchParams),
            favorites = schoolView.listCompact(results.favorites);

        var params = {
            params: {
                data: {
                    schools: schoolsList.schools,
                    filters: filters,
                    authSocialLinks: results.authSocialLinks,
                    user: userView.default(user),
                    favorites: {
                        schools: favorites
                    }
                },
                searchText: searchText,
                countResults: schoolsList.countResults,
                searchSettings: {
                    url: '/api/school/search',
                    method: 'GET',
                    searchParams: searchParams
                },
                map: map,
                config: {
                    staticVersion: config.lastBuildTimestamp,
                    year: new Date().getFullYear(),
                    analyticsId: analyticsId,
                    yandexMetrikaId: yandexMetrikaId,
                    csrf: req.csrfToken(),
                    domain: DOMAIN,
                    fbClientId: FB_CLIENT_ID
                }
            }
        };
        var html = soy.render('sm.lSearchResult.Template.list', params);

        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(html);
    } catch (error) {
        res.status(error.code || 500);
        next();
    }
});


exports.view = async (function(req, res, next) {
    try {
        var alias = services.urls.stringToURL(req.params.name),
            page = await(services.page.getByAlias(
                alias,
                entityType.SCHOOL
            ));

        if (!page) {
            throw new errors.PageNotFoundError();
        } else if (!page.entityId) {
            next();
        }

        var schoolInstance = await(services.urls.getSchoolByUrl(alias));
        if (!schoolInstance) {
            throw new errors.SchoolNotFoundError();
        } else if (alias != schoolInstance.alias) {
            res.redirect(schoolInstance.alias);
        } else {
            var user = req.user || {},
                favoriteIds = await(
                    services.favorite.getAllItemIdsByUserId(user.id)
                ),
                promises = {
                    ege: services.egeResult.getAllBySchoolId(
                        schoolInstance.id
                    ),
                    gia: services.giaResult.getAllBySchoolId(
                        schoolInstance.id
                    ),
                    olymp: services.olimpResult.getAllBySchoolId(
                        schoolInstance.id
                    ),
                    city: services.cityResult.getAll(),
                    page: services.page.getDescription(
                        schoolInstance.id,
                        entityType.SCHOOL
                    ),
                    authSocialLinks: services.auth.getAuthSocialUrl(),
                    popularSchools:
                        services.school.getRandomPopularSchools(6),
                    favorites: {
                        items: services.school.getByIdsWithGeoData(
                            favoriteIds
                        ),
                        itemUrls: services.page.getAliases(
                            favoriteIds,
                            entityType.SCHOOL
                        )
                    }
                },
                dataFromPromises = await(promises);

            var school = await(services.school.viewOne(schoolInstance.id));

            var schoolAliases = await(services.page.getAliases(
                dataFromPromises.popularSchools.map(school => school.id),
                entityType.SCHOOL
            ));
            dataFromPromises.popularSchools = schoolView.joinAliases(
                dataFromPromises.popularSchools,
                schoolAliases
            );


            var isUserCommented = typeof await(
                    services.userData.checkCredentials(
                        school.id,
                        req.user && req.user.id
                    )) !== 'undefined';

            user = userView.school(user, isUserCommented);

            res.header('Content-Type', 'text/html; charset=utf-8');
            res.end(
                soy.render('sm.lSchool.Template.school', {
                    params: {
                        data:
                            schoolView.default(
                                school,
                                dataFromPromises,
                                user
                            ),
                        config: {
                            staticVersion: config.lastBuildTimestamp,
                            year: new Date().getFullYear(),
                            analyticsId: analyticsId,
                            yandexMetrikaId: yandexMetrikaId,
                            csrf: req.csrfToken(),
                            domain: DOMAIN,
                            fbClientId: FB_CLIENT_ID
                        }
                    }
                }));
        }
    } catch (error) {
        res.status(error.code || 500);
        next();
    }
});

exports.search = async(function(req, res) {
    var user = req.user || {};
    var favoriteIds = await(services.favorite.getAllItemIdsByUserId(user.id)),
        dataPromises = {
            popularSchools: services.school.getRandomPopularSchools(3),
            amountSchools: services.school.getSchoolsCount(),
            authSocialLinks: services.auth.getAuthSocialUrl(),
            favorites: {
                items: services.school.getByIdsWithGeoData(favoriteIds),
                itemUrls: services.page.getAliases(
                    favoriteIds,
                    entityType.SCHOOL
                )
            }
        },
        data = await(dataPromises);

    var schoolAliases = await(services.page.getAliases(
            data.popularSchools.map(school => school.id),
            entityType.SCHOOL
        ));
    data.popularSchools =
        schoolView.joinAliases(data.popularSchools, schoolAliases);

    var html = soy.render('sm.lSearch.Template.base', {
        params: {
            data: {
                authSocialLinks: data.authSocialLinks,
                user: userView.default(user),
                favorites: {
                    schools: schoolView.listCompact(data.favorites)
                }
            },
            popularSchools: schoolView.popular(data.popularSchools),
            dataLinks : schoolView.dataLinks(),
            amountSchools: data.amountSchools,
            config: {
                staticVersion: config.lastBuildTimestamp,
                year: new Date().getFullYear(),
                analyticsId: analyticsId,
                yandexMetrikaId: yandexMetrikaId,
                csrf: req.csrfToken(),
                domain: DOMAIN,
                fbClientId: FB_CLIENT_ID
            }
        }
    });

    res.header('Content-Type', 'text/html; charset=utf-8');
    res.end(html);
});
