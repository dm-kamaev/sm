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
    const breakHtml = '<br>';

    letterBody += `Имя отправителя: ${params.name}${breakHtml}`;
    letterBody += `email отправителя: ${params.email}${breakHtml}`;
    letterBody += `Тема: ${params.theme}${breakHtml}`;

    if (params.url) {
        letterBody += `<p>Url: ${params.url}</p>`;
    }

    letterBody += `Сообщение: ${params.text}`;

    return letterBody;
};

module.exports = feedbackView;
