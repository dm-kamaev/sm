'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await'),
    axios = require('axios'),
    url = require('url');

const serviceConfig = require('../../../../app/config/services');

let service = {
    name: 'image'
};

/**
 * @param  Array<{{
 *     fieldname: string,
 *     originalname: string,
 *     encoding: string,
 *     mimetype: string,
 *     buffer: Buffer,
 *     size: number
 * }}> images,
 * @param  {Array<Array<string, ?string>>} defaultSizes
 * @return {{
 *     id: string,
 *     extension: string
 * }}
 */
service.upload = async(function(images, defaultSizes) {
    let defaultPreviews = defaultSizes
        .map(size => size.join('x'))
        .join(),
        imageUploadUrl =
            `${serviceConfig.image}?defaultPreviews=${defaultPreviews}`;

    return images.map(image => {
        let response;
        try {
            response = await(axios.post(
                imageUploadUrl,
                image.buffer, {
                    headers: {
                        'Content-Length': image.size,
                        'Content-Type': image.mimetype,
                        'Content-Transfer-Encoding': image.encoding
                    }
                }
            ));
        } catch (error) {
            throw error;
        }
        return response.data.image.urlTemplate;
    });
});

/**
 * @param  {strign} imageUrl
 */
service.delete = async(function(imageUrl) {
    let urlPath = url.parse(imageUrl).path,
        // urlPath example: /i/l/lXGUSbmKYz/%7Bwidth%7D.jpg
        imageId = urlPath.split('/')[3];

    axios.delete(`${serviceConfig.image}/${imageId}`);
});

module.exports = service;
