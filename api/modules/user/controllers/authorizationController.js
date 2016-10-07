'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await'),
    axios = require('axios');

const soy = require('../../../../app/components/soy'),
    services = require('../../../../app/components/services').all;

/**
 * @api {get} /authorize/:type
 * @apiVersion 0.0.0
 * @apiGroup User
 * @apiName authorize
 * @apiSuccess {object} user
 * @apiParamExample {json} Request-Example:
 *     {
 *         "type": "vk",
 *         "code": "46543215486521"
 *     }
 */
exports.authorize = async(function(req, res) {
    let result;
    try {
        let user = await(services.user.getUserByCode(
            {
                code: req.query.code,
                type: req.params.type
            },
            req.baseUrl
        ));

        await(new Promise(function(resolve, reject) {
            req.logIn(user, function(err) {
                err ? reject(err) : req.session.save(resolve);
            });
        }));

        result = soy.render('sm.bAuthorizationModal.Template.complete');
    } catch (error) {
        console.log(error); // TODO: change to logger
        result = soy.render('sm.bAuthorizationModal.Template.error');
    } finally {
        res.header('Content-Type', 'text/html; charset=utf-8');
        res.header('Access-Control-Allow-Origin', '*');
        res.end(result);
    }
});


/**
 * @api {get} /unauthorize
 * @apiVersion 0.0.0
 * @apiGroup User
 * @apiName unauthorize
 * @apiParamExample {json} Request-Example:
 * {
 *     "origin": "schools/"
 * }
 */
exports.unauthorize = async(function(req, res) {
    let origin = req.query.origin;

    await(new Promise(function(resolve, reject) {
        req.session.destroy(resolve);
    }));

    if (origin) {
        res.redirect(origin);
    } else {
        res.redirect('/');
    }
});


/**
 * @api {get} /oauth/:type
 * @apiName GetAuthUrl
 * @apiGroup Authorization
 *
 * @apiParam {string} type Type of social net [vk, fb]
 *
 * @apiSuccess (Success 201) {Header} Location
 *     Absolute reference to authoriozation
 */
exports.getLink = async(function(req, res) {
    let result;
    try {
        let socialLink = services.auth.getSocialLink(
                req.params.type,
                req.baseUrl
            ),
            authUrlResponse = await(axios.get(socialLink)),
            authUrl = authUrlResponse.headers.location;
        res.redirect(authUrl);
    } catch (error) {
        console.log(error); // TODO: change to logger
        result = JSON.stringify(error);
        res.end(result);
    }
});
