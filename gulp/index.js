module.exports = function(gulpHelper) {
    return {
        compile: require('./task-compile')(gulpHelper),
        scripts: require('./task-scripts')(gulpHelper)
    };
};
