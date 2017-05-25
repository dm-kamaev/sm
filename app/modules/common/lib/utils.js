"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    getImageUrl(urlPattern, size) {
        const IMAGE_WIDTH_PATTERN = /{width}/;
        const width = size[0];
        return urlPattern ?
            urlPattern.replace(IMAGE_WIDTH_PATTERN, String(width)) :
            null;
    }
}
exports.utils = new Utils();
