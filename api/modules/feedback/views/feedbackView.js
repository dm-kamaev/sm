var feedbackView = {};

/**
 * @param {{
 *     type: string
 * }} params
 * @return {string}
 */
feedbackView.getLetterTheme = function(params) {
    var letterTheme = '';

    switch (params.type) {
    case 'opinion':
        letterTheme = 'Ваше мнение';
        break;
    case 'mistake':
        letterTheme = 'Сообщить о неточности';
        break;
    }

    return letterTheme;
};

/**
 * Send recieved feedback message to email
 * @param {{
 *     name: string,
 *     email: string,
 *     theme: string,
 *     text: string,
 *     url: ?string
 * }} params
 * @type {{name: string}}
 * @return {string}
 */
feedbackView.getLetterBody = function(params) {
    var letterBody = '';

    letterBody += 'Имя отправителя: ' + params.name + '\n';
    letterBody += 'email отправителя: ' + params.email + '\n';
    letterBody += 'Тема: ' + params.theme + '\n';

    if (params.url) {
        letterBody += 'Url: ' + params.url + '\n';
    }

    letterBody += 'Сообщение: ' + params.text + '\n';

    return letterBody;
};

module.exports = feedbackView;
