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
var fs = require('fs-extra');


const production = !!util.env.production;

const BLOCKS_DIR = '/app/blocks';


gulp.task('doc', function () {
    apidoc({
        src: "./api/modules/",
        dest: "./doc"
    }, function() {
    });
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


gulp.task('soy', function () {
    //return gulpHelper.soy([
    //    path.join(__dirname, BLOCKS_DIR, '/**/*.soy')
    //]);

    return gulp.src([
            path.join(__dirname, BLOCKS_DIR, '/**/*.soy'),
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


gulp.task('scripts', ['soy'], function () {
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


const tasks = function (bool) {
    return bool ?
        ['soy', 'scripts', 'images', 'styles'] :
        ['watch', 'soy', 'scripts', 'images', 'styles'];
};

gulp.task('default', tasks(production));
