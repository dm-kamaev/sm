const gulp = require('gulp');
const gulpHelper = require('./node_modules/frobl/gulp-helper.js').use(gulp);
const path = require('path');
const concat = require('gulp-concat');
const util = require('gulp-util');
const babel = require('gulp-babel');
const apidoc = require('gulp-apidoc');
const soynode = require('gulp-soynode');
var glob = require("glob");
var exec = require('child_process').exec;
var Q = require('q');
var fs = require('fs-extra'),
    foreach = require('gulp-foreach'),
    SoyExtend = require('./soy-extend'),
    clean = require('gulp-clean');
const config = require('./config.json');


const production = !!util.env.production;

const BLOCKS_DIR = '/app/blocks';


gulp.task('doc', function () {
    apidoc({
        src: "./api/modules/",
        dest: "./doc"
    }, function() {
    });
});

gulp.task('lint', function() {
    var pathArray = ['./app/blocks/**/*.js'],
        ignore = config.lintIgnore,
        ignorePath;

    for (var i = 0; i < ignore.length; i++) {
        ignorePath = '!' + path.resolve(__dirname, ignore[i]);
        pathArray.push(ignorePath);
    }

    return gulpHelper.lint(pathArray, false);
});


gulp.task('migrate', function () {
        var deferred = Q.defer();

        var migrations = glob.sync('api/**/migrations/*.js', {
            cwd: __dirname
        });


        migrations.forEach(function (file) {
            var fileName = path.basename(file);
            fs.copySync(file, path.resolve(__dirname, 'tmp/migrations', fileName));
        });

        var sequelizePath = path.resolve(__dirname,'node_modules/.bin/sequelize');
        exec(
            sequelizePath + ' db:migrate', function (error, stdout, stderr) {
                console.log(stdout);

                if (error) {
                    console.log(error);
                }

                fs.remove(path.resolve(__dirname, 'tmp/migrations'));

                deferred.resolve();
            });

        return deferred.promise;

});


gulp.task('appES5', function () {
    return gulp.src('app.js')
        .pipe(babel())
        .pipe(concat('appES5.js'))
        .pipe(gulp.dest(''));
});


gulp.task('soy', ['preSoy'], function (cb) {
    //return gulpHelper.soy([
    //    path.join(__dirname, BLOCKS_DIR, '/**/*.soy')
    //]);
    gulp.task('_build', function(){
        return gulp.src([
            path.join('./build/soy/**/*.soy'),
            path.join(__dirname, '/node_modules/frobl/blocks', '/**/*.soy')
        ])
            .pipe(soynode({
                outputDir: path.join(__dirname, '/node_modules/frobl', '/tmp/soy'),
                loadCompiledTemplates: false,
                useClosureStyle: true,
                contextJsPaths: [
                    path.join(__dirname, '/node_modules/google-closure-library/closure/goog/base.js')
                ]
            }));
    });

    gulp.task('_clean', function(){
        return gulp.src('./build',{read: false})
            .pipe(clean());
    });

    return gulpHelper.runSequence('_build', '_clean', cb);
});



gulp.task('preSoy', function(cb) {
    var extender = new SoyExtend({
        blocksDir: path.join(__dirname, BLOCKS_DIR)
    });

    gulp.task('_preClean', function(){
        return gulp.src('./build',{read: false})
            .pipe(clean());
    });

    gulp.task('_copy', function () {
        return gulp.src(
                path.join(__dirname, BLOCKS_DIR, '/**/*.soy')
            )
            .pipe(gulp.dest('./build/soy'));
    });

    gulp.task('_extend', function () {
        return gulp.src('./build/soy/**/*.soy')
            .pipe(foreach(function (stream, file) {
                extender.proceed(file.path);
                return stream;
            }));
    });

    return gulpHelper.runSequence('_preClean', '_copy', '_extend', cb);
});


gulp.task('scripts', ['lint', 'soy'], function () {
    return gulpHelper.buildJs(
        [
            path.join(__dirname, BLOCKS_DIR, '/**/*.js')
        ],
        'script.js',
        'sm.lDoc.Doc',
        path.join(__dirname, '/public'),
        production
    );
});


gulp.task('styles', function () {
    return gulpHelper.buildCss([{
        src: [
            path.join(__dirname, BLOCKS_DIR, '/**/*.scss'),
            path.join(__dirname, BLOCKS_DIR, '/**/*.css')
        ],
        fileName: 'styles.css'
    }], production, path.join(__dirname, '/public'));
});


gulp.task('images', function () {
    return gulp.src(path.join(__dirname + BLOCKS_DIR + '/**/*.png'))
        .pipe(gulp.dest(path.join(__dirname + '/public/images')));
});


gulp.task('watch', function () {
    gulp.watch([
        path.join(__dirname + BLOCKS_DIR + '/**/*.soy'),
        path.join(__dirname + BLOCKS_DIR + '/**/*.js')
    ], ['scripts']);
    gulp.watch([
        path.join(__dirname + BLOCKS_DIR + '/**/*.scss'),
        path.join(__dirname + BLOCKS_DIR + '/**/*.css')
    ], ['styles']);
});


gulp.task('fonts', function () {
    return gulp.src(path.join(__dirname + '/assets/**/*.*'))
        .pipe(gulp.dest(path.join(__dirname + '/public/fonts')));
});


const tasks = function (bool) {
    return bool ?
        ['soy', 'scripts', 'images', 'fonts', 'styles'] :
        ['watch', 'soy', 'scripts', 'images', 'fonts','styles'];
};

gulp.task('default', tasks(production));
