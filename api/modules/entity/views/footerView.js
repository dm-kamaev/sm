'use strict';

const footerView = {};

/**
 * Footer view
 * @param {Array<{
 *     content: string,
 *     url: string
 * }>} seoLinks
 * @return {Object<string, (string|Array<Object<string, string>>)>}
 */
footerView.render = function(seoLinks) {
    let year = new Date().getFullYear();

    return {
        copyright: `© Маркет Мела ${year}`,
        contactLinks: footerView.contactLinks(),
        seoLinks: seoLinks
    };
};


/**
 * Generate contact links
 * @return {Array<Object<string, string>>}
 */
footerView.contactLinks = function() {
    return [{
        content: 'Сотрудничество',
        url: 'mailto:vs@mel.fm'
    }, {
        content: 'Пользовательское соглашение',
        url: 'http://mel.fm/terms-of-use'
    }];
};

module.exports = footerView;
