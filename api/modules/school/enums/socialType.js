'use strict';

const Enum = require('../../../components/enum');

let socialType = new Enum('socialType', {
    VKONTAKTE: 'vk',
    FACEBOOK: 'facebook',
});

module.exports = socialType;
