/**
 * @fileoverview Class for transform given string designation of size to it
 * values
 */
goog.provide('sm.iMedia.Media');


/**
 * Viewport size enum
 * @enum {number}
 */
const ViewportSize = {
    'XXS': 350,
    'XS': 670,
    'S': 790,
    'M': 980,
    'L': 1100,
    'XL': 1280,
    'DEFAULT': 1281
};

/**
 * Media
 * @constructor
 */
sm.iMedia.Media = function() {};

goog.scope(function() {
    var Media = sm.iMedia.Media;

    /**
     * @param {{
     *     sources: Array<{
     *         url: string,
     *         size: string
     *     }>,
     *     size: string
     * }} params
     * @return {string}
     */
    Media.getMediaString = function(params) {
        var size = params.size;
        var sources = params.sources;
        var mediaString;

        if (sources.length == 1) {
            mediaString = '(min-width: 0px)';
        } else {
            mediaString = Media.getMediaStringByArray(sources, size);
        }

        return mediaString;
    };


    /**
     * @param {Array<{
     *     url: string,
     *     size: string
     * }>} sources
     * @param {string} size
     * @return {string}
     */
    Media.getMediaStringByArray = function(sources, size) {
        var mediaString;

        var prevSize = Media.getPrevSize(sources, size);
        var nextSize = Media.getNextSize(sources, size);

        if (prevSize && nextSize) {
            mediaString = Media.getRange(prevSize, size);
        } else if (prevSize) {
            mediaString = Media.getMax(prevSize);
        } else if (nextSize) {
            mediaString = Media.getMin(size);
        } else {
            mediaString = '(min-width: 0px)';
        }

        return mediaString;
    };


    /**
     * @param {Array<{
     *     url: string,
     *     size: string
     * }>} sources
     * @param {string} size
     * @return {string|undefinded}
     */
    Media.getPrevSize = function(sources, size) {
        var copiedSources = sources.slice();

        copiedSources.sort(function(a, b) {
            return Media.viewportSizeBySizeString(a.size) -
                Media.viewportSizeBySizeString(b.size);
        });

        for (var i = 0; i < copiedSources.length; i++) {
            if (copiedSources[i].size == size) {
                var index = i;
                break;
            }
        }

        return copiedSources[index - 1] ?
            copiedSources[index - 1].size : undefined;
    };


    /**
     * @param {Array<{
     *     url: string,
     *     size: string
     * }>} sources
     * @param {string} size
     * @return {string|undefinded}
     */
    Media.getNextSize = function(sources, size) {
        var copiedSources = sources.slice();

        copiedSources.sort(function(a, b) {
            return Media.viewportSizeBySizeString(a.size) -
                Media.viewportSizeBySizeString(b.size);
        });

        for (var i = 0; i < copiedSources.length; i++) {
            if (copiedSources[i].size == size) {
                var index = i;
                break;
            }
        }

        return copiedSources[index + 1] ?
            copiedSources[index + 1].size : undefined;
    };


    /**
     * @param {string} size
     * @return {string}
     */
    Media.getMax = function(size) {
        var px = Media.viewportSizeBySizeString(size) + 1;

        return '(min-width: ' + px + 'px)';
    };


    /**
     * @param {string} size
     * @return {string}
     */
    Media.getMin = function(size) {
        var px = Media.viewportSizeBySizeString(size);

        return '(max-width: ' + px + 'px)';
    };


    /**
     * @param {string} prevSize
     * @param {string} size
     * @return {string}
     */
    Media.getRange = function(prevSize, size) {
        var minPx = Media.viewportSizeBySizeString(prevSize) + 1;
        var maxPx = Media.viewportSizeBySizeString(size);

        return '(min-width: ' + minPx + 'px) and (max-width: ' + maxPx + 'px)';
    };


    /**
     * Return viewport size in pixels by given size
     * @param {string} sizeString
     * @return {number}
     * @public
     */
    Media.viewportSizeBySizeString = function(sizeString) {
        var result = ViewportSize[sizeString.toUpperCase()];

        if (!result) {
            throw new Error('Unknown viewport size');
        }

        return result;
    };
});  // goog.scope
