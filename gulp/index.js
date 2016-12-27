module.exports = function(gulpHelper) {
    return {
        compile: require('./taskCompile')(gulpHelper),
        createTimestamp: require('./taskCreateTimestamp')(gulpHelper),
        debug: require('./taskDebug')(gulpHelper),
        scripts: require('./taskScripts')(gulpHelper),
        svgSprite: require('./taskSvgSprite'),
        tsCompile: require('./taskTsCompile')
    };
};
