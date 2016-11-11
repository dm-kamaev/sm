'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await'),
    lodash = require('lodash');

const logger = require('../../../components/logger/logger').getLogger('app');

const soy = require('../../../components/soy');
const services = require('../../../components/services').all;
const schoolView = require('../../../../api/modules/school/views/schoolView');
const searchView = require('../../../../api/modules/school/views/searchView');
const seoView = require('../../../../api/modules/school/views/seoView');

const userView = require('../../../../api/modules/user/views/user');
const entityType = require('../../../../api/modules/entity/enums/entityType');

const PageNotFoundError = require('../../error/lib/PageNotFoundError');

const config = require('../../../config').config;

const ANALYTICS_ID = config.schools.analyticsId,
    YANDEX_METRIKA_ID = config.schools.yandexMetrikaId,
    DOMAIN = config.schools.host,
    FB_CLIENT_ID = config.facebookClientId,
    CARROTQUEST_ID = config.carrotquestId,
    MODIFIER = 'stendhal';


exports.createComment = async(function(req, res) {
    var result = '';
    try {
        var schoolId = req.params.id,
            params = req.body;
        result = await(services.school.comment(schoolId, params));
    } catch (e) {
        logger.error(e);
        result = JSON.stringify(e);
    } finally {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(result);
    }
});


exports.search = async(function(req, res, next) {
    res.status(301);
    res.header('Location', '/school');
    res.end();
});


exports.list = async(function(req, res, next) {
    try {
        var searchParams = {},
            searchText = '',
            seoData = {},
            user = req.user || {};

        if (req.params &&
            req.params.listType &&
            lodash.isEmpty(req.query)) {
            var seoPromises = {
                schoolList: services.seoSchoolList.getByType(
                    req.params
                ),
                schoolListsForLinks: services.seoSchoolList.getByListType(
                    req.params.listType
                )
            };

            var seoResults = await(seoPromises);

            if (!seoResults.schoolList) {
                throw new PageNotFoundError();
            }

            var storedParams =
                seoView.searchParams(seoResults.schoolList);

            searchParams = storedParams.searchParams;
            searchText = storedParams.searchText;
            seoData = seoView.seoListData(
                seoResults.schoolList,
                seoResults.schoolListsForLinks
            );
        } else {
            searchParams =
                await(services.schoolSearch.initSearchParams(req.query));
            searchText = req.query.name || '';
        }

        var favorites = await(services.favorite.getByUserId(user.id)),
            favoriteIds = services.favorite.getEntityIdsFiltredByType(
                favorites,
                entityType.SCHOOL
            );

        var promises = {
            schools: services.school.list(
                searchParams,
                {
                    limitResults: 10
                }
            ),
            filtersData: services.school.searchFiltersData(searchParams),
            mapPosition: services.schoolSearch.getMapPositionParams(
                searchParams
            ),
            authSocialLinks: services.auth.getAuthSocialUrl(),
            favorites: {
                items: services.school.getByIdsWithGeoData(favoriteIds),
                itemUrls: services.page.getAliases(
                    favoriteIds,
                    entityType.SCHOOL
                )
            },
            seoLinks: services.seoSchoolList.getByTypes()
        };

        var results = await(promises);

        var schoolAliases = await(services.page.getAliases(
                schoolView.uniqueIds(results.schools),
                entityType.SCHOOL
            )),
            schools = schoolView.joinAliases(results.schools, schoolAliases),
            schoolsWithFavoriteMark = schoolView.listWithFavorites(
                schools,
                favorites
            );

        var schoolsList = schoolView.list(schoolsWithFavoriteMark),
            map = schoolView.listMap(results.schools, results.mapPosition),
            filters = searchView.filters(results.filtersData, searchParams);

        var params = {
            params: {
                data: {
                    schools: schoolsList.schools,
                    filters: filters,
                    authSocialLinks: results.authSocialLinks,
                    user: userView.default(user),
                    seo: seoData,
                    favorites: {
                        schools: schoolView.listCompact(results.favorites)
                    },
                    seoLinks: seoView.linksList(
                        results.seoLinks,
                        (!req.params.geoType) ? req.params.listType : null
                    )
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
                    analyticsId: ANALYTICS_ID,
                    yandexMetrikaId: YANDEX_METRIKA_ID,
                    carrotquestId: CARROTQUEST_ID,
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
        next(error);
    }
});


exports.view = async(function(req, res, next) {
    try {
        var alias = services.urls.stringToURL(req.params.name),
            page = await(services.page.getByAlias(
                alias,
                entityType.SCHOOL
            ));

        if (!page) {
            throw new PageNotFoundError();
        } else if (!page.entityId) {
            next();
        } else {
            var schoolInstance = await(services.urls.getEntityByUrl(
                alias,
                entityType.SCHOOL
            ));
            if (!schoolInstance) {
                throw new PageNotFoundError();
            } else if (alias != schoolInstance.alias) {
                res.redirect(schoolInstance.alias);
            } else {
                var user = req.user || {};

                var favorites = await(services.favorite.getByUserId(user.id)),
                    favoriteIds = services.favorite.getEntityIdsFiltredByType(
                        favorites,
                        entityType.SCHOOL
                    );

                var promises = {
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
                    specializedClassTypes:
                        services.specializedClasses.getAllTypes(),
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
                    },
                    seoLinks: services.seoSchoolList.getByTypes()
                };
                var dataFromPromises = await(promises);

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
                            data: schoolView.default(
                                school,
                                dataFromPromises,
                                user
                            ),
                            config: {
                                staticVersion: config.lastBuildTimestamp,
                                year: new Date().getFullYear(),
                                analyticsId: ANALYTICS_ID,
                                yandexMetrikaId: YANDEX_METRIKA_ID,
                                carrotquestId: CARROTQUEST_ID,
                                csrf: req.csrfToken(),
                                domain: DOMAIN,
                                fbClientId: FB_CLIENT_ID
                            }
                        }
                    }));
            }
        }
    } catch (error) {
        res.status(error.code || 500);
        next(error);
    }
});

exports.home = async(function(req, res) {
    var user = req.user || {};

    var favorites = await(services.favorite.getByUserId(user.id)),
        favoriteIds = services.favorite.getEntityIdsFiltredByType(
            favorites,
            entityType.SCHOOL
        );

    var dataPromises = {
            popularSchools: services.school.getRandomPopularSchools(3),
            amountSchools: services.school.getSchoolsCount(),
            authSocialLinks: services.auth.getAuthSocialUrl(),
            favorites: {
                items: services.school.getByIdsWithGeoData(favoriteIds),
                itemUrls: services.page.getAliases(
                    favoriteIds,
                    entityType.SCHOOL
                )
            },
            seoLinks: services.seoSchoolList.getByTypes()
        },
        data = await(dataPromises);

    var schoolAliases = await(services.page.getAliases(
            data.popularSchools.map(school => school.id),
            entityType.SCHOOL
        ));

    data.popularSchools =
        schoolView.joinAliases(data.popularSchools, schoolAliases);

    var html = soy.render('sm.lSchoolHome.Template.base', {
        params: {
            data: {
                authSocialLinks: data.authSocialLinks,
                user: userView.default(user),
                favorites: {
                    schools: schoolView.listCompact(data.favorites)
                },
                seoLinks: seoView.linksList(data.seoLinks)
            },
            popularSchools: schoolView.popular(data.popularSchools),
            dataLinks: schoolView.dataLinks(),
            amountSchools: data.amountSchools,
            config: {
                staticVersion: config.lastBuildTimestamp,
                year: new Date().getFullYear(),
                analyticsId: ANALYTICS_ID,
                yandexMetrikaId: YANDEX_METRIKA_ID,
                carrotquestId: CARROTQUEST_ID,
                csrf: req.csrfToken(),
                domain: DOMAIN,
                fbClientId: FB_CLIENT_ID
            }
        }
    });

    res.header('Content-Type', 'text/html; charset=utf-8');
    res.end(html);
});


exports.newSearch = async(function(req, res, next) {
    try {
        let authSocialLinks = services.auth.getAuthSocialUrl(),
            user = req.user || {},
            searchParams = {};

        let data = await({
                favorites: services.favorite.getFavoriteEntities(user.id),
                schools: services.school.list(searchParams, {limitResults: 10}),
                mapSchools: [],
                mapPosition: services.map.getPositionParams(searchParams),
                filtersData: {},
                seoParams: {}
            }),
            aliases = await({
                schools: services.page.getAliases(
                    schoolView.uniqueIds(data.schools),
                    entityType.SCHOOL
                ),
                map: services.page.getAliases(
                    schoolView.uniqueIds(data.mapSchools),
                    entityType.SCHOOL
                )
            });


        let templateData = searchView.render({
            user: user,
            fbClientId: FB_CLIENT_ID,
            favorites: data.favorites,
            authSocialLinks: authSocialLinks,
            countResults: 0,
            schoolsList: data.schools,
            mapSchools: {},
            mapPosition: data.mapPosition,
            searchParams: searchParams,
            filtersData: data.filtersData,
            enabledFilters: null,
            seoParams: data.seoParams,
        });

        let html = soy.render(
            'sm.lSearch.Template.search', {
                params: {
                    data: templateData,
                    config: {
                        entityType: entityType.SCHOOL,
                        page: 'search',
                        modifier: MODIFIER,
                        staticVersion: config.lastBuildTimestamp,
                        year: new Date().getFullYear(),
                        analyticsId: ANALYTICS_ID,
                        yandexMetrikaId: YANDEX_METRIKA_ID,
                        carrotquestId: CARROTQUEST_ID,
                        csrf: req.csrfToken(),
                        domain: DOMAIN,
                        fbClientId: FB_CLIENT_ID
                    }
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


exports.catalog = async(function(req, res, next) {
    try {
        var user = req.user || {};
        var seoCatalogData = await(
            services.seoSchoolList.getAll()
        );

        var favorites = await(services.favorite.getByUserId(user.id)),
            favoriteIds = services.favorite.getEntityIdsFiltredByType(
                favorites,
                entityType.SCHOOL
            );

        var promises = {
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

        var data = seoView.catalog({
            entityType: entityType.SCHOOL,
            user: userView.default(user),
            favorites: schoolView.listCompact(results.favorites),
            authSocialLinks: results.authSocialLinks,
            listsCatalog: seoView.listsCatalog(seoCatalogData)
        });

        var params = {
            params: {
                data: data,
                config: {
                    modifier: 'stendhal',
                    staticVersion: config.lastBuildTimestamp,
                    year: new Date().getFullYear(),
                    analyticsId: ANALYTICS_ID,
                    yandexMetrikaId: YANDEX_METRIKA_ID,
                    carrotquestId: CARROTQUEST_ID,
                    csrf: req.csrfToken(),
                    domain: DOMAIN,
                    fbClientId: FB_CLIENT_ID
                }
            }
        };

        var html = soy.render('sm.lCatalog.Template.catalog', params);

        res.header('Content-Type', 'text/html; charset=utf-8');
        res.end(html);
    } catch (error) {
        res.status(error.code || 500);
        next(error);
    }
});
