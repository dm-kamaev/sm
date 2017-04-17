/**
 * @fileoverview Utils for views
 */
import {ImageSize} from '../types/image';

class Utils {
    public getImageUrl(
            urlPattern: string | undefined, size: ImageSize): string | null {
        const IMAGE_WIDTH_PATTERN = /{width}/;
        const width = size[0];

        return urlPattern ?
            urlPattern.replace(IMAGE_WIDTH_PATTERN, String(width)) :
            null;
    }
}

export const utils = new Utils();
