module.exports = function(gulpHelper) {
    return {
        compile: require('./taskCompile')(gulpHelper),
        debug: require('./taskDebug')(gulpHelper),
        scripts: require('./taskScripts')(gulpHelper)
    };
};
