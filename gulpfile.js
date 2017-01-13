'use strict';

const async = require('asyncawait/async');
const await = require('asyncawait/await');
const gulp = require('gulp');
const path = require('path');
const concat = require('gulp-concat');
const util = require('gulp-util');
const babel = require('gulp-babel');
const apidoc = require('gulp-apidoc');
const exec = require('child_process').exec;
const eslint = require('gulp-eslint');
const minimist = require('minimist');

const migrationWrapper = require('./app/components/migrationWrapper');

const MAX_BILD_FILE_AMOUNT = 20;

process.stdout.setMaxListeners(MAX_BILD_FILE_AMOUNT);

const config = require('./config.json');
const gulpConfig = require('./app/config/base/config.json');
const production = !!util.env.production;
const ROOT_DIR = './';
const BLOCKS_DIR = '/app/blocks';
const SHARED_STATIC_DIR = '/public/shared/static';

const ENV = util.env.env ? util.env.env : 'dev';

const gulpHelper =
    require('./node_modules/clobl/gulp-helper.js')
        .use(gulp)
        .setPath({
            root: __dirname,
            blocks: path.join(__dirname, BLOCKS_DIR)
        })
        .setSoyPath({
            root: 'build'
        });

const gulpTasks = require('./gulp')(gulpHelper);

gulp.task('doc', function() {
    apidoc({
        src: './api/modules/',
        dest: './public/doc'
    }, function() {
    });
});

gulp.task('lint', function() {
    return gulpHelper.js.lint({
        ignore: config
            .lintIgnore
            .map(ignoreItem => path.resolve(__dirname, ignoreItem))
    });
});

gulp.task('migrate', async(function() {
    await(migrationWrapper.migrate());
}));

gulp.task('rollback', async(function() {
    let params = minimist(process.argv.slice(2)),
        count = parseInt(params.count) || 1;
    await(migrationWrapper.rollback(count));
}));

gulp.task('appES5', function() {
    return gulp.src('app.js')
        .pipe(babel())
        .pipe(concat('appES5.js'))
        .pipe(gulp.dest(''));
});

gulp.task('soy', function() {
    return gulpHelper.soy.build([]);
});

gulp.task('styles', ['svgSprite', 'sprite'], function() {
    return gulpHelper.css.build({
        outputFiles: [{
            src: [
                path.join(__dirname, 'build', '/**/*.scss'),
                path.join(__dirname, BLOCKS_DIR, '/**/*.scss'),
                path.join(__dirname, BLOCKS_DIR, '/**/*.css'),
                path.join(__dirname, '/node_modules/css-reset/reset.css')
            ],
            fileName: 'styles.css'
        }],
        dest: path.join(__dirname, SHARED_STATIC_DIR),
        minify: production
    });
});

gulp.task('sprite', function() {
    return gulpHelper.sprite.build([{
        src: path.join(
            __dirname,
            BLOCKS_DIR,
            '/n-clobl/g-icon/g-icon_img/*.png'
        ),
        retina: {
            filters: [path.join(
                __dirname,
                BLOCKS_DIR,
                '/n-clobl/g-icon/g-icon_img/*@2x.png'
            )],
            imgPath: gulpConfig.lastBuildTimestamp ?
                '/static/images/g-icon_auto-sprite@2x.png' + '?' +
                    gulpConfig.lastBuildTimestamp :
                '/static/images/g-icon_auto-sprite@2x.png'
        },
        pngDest: path.join(__dirname, SHARED_STATIC_DIR, '/images'),
        imgDir: ('./'),
        imgPath: gulpConfig.lastBuildTimestamp ?
            '/static/images/g-icon_auto-sprite.png' + '?' +
                gulpConfig.lastBuildTimestamp :
            '/static/images/g-icon_auto-sprite.png'
    }]);
});

gulp.task('images', function() {
    var src = ['png', 'ico', 'svg', 'gif', 'jpg', 'jpeg']
            .map(ext => '**/*.' + ext)
            .map(mask => path.join(__dirname, BLOCKS_DIR, mask)),
        dest = path.join(__dirname, SHARED_STATIC_DIR, '/images');

    return gulp.src(src)
        .pipe(gulp.dest(dest));
});

gulp.task('watch', function() {
    gulp.watch(
        [path.join(__dirname, BLOCKS_DIR, '/**/*.soy')],
        ['scripts']
    );
    gulp.watch(
        [path.join(__dirname, BLOCKS_DIR, '/**/*.js')],
        ['scripts']
    );
    gulp.watch(
        [path.join(__dirname, ROOT_DIR, '/**/*.ts')],
        ['tsCompile']
    );
    gulp.watch([
        path.join(__dirname, BLOCKS_DIR, '/**/*.scss'),
        path.join(__dirname, BLOCKS_DIR, '/**/*.css')
    ], ['styles']);
});

gulp.task('fonts', function() {
    return gulp.src(path.join(__dirname, '/assets/fonts/**/*.*'))
        .pipe(gulp.dest(path.join(__dirname, SHARED_STATIC_DIR, '/fonts')));
});

gulp.task('copySchools', function() {
    return gulp.src([
        path.join(__dirname, '/assets/schools/*.*')
    ], {base: 'assets/'})
        .pipe(gulp.dest('public/'));
});

gulp.task('copyCourses', ['copySchools'], function() {
    return gulp.src([
        path.join(__dirname, '/assets/courses/*.*')
    ], {base: 'assets/'})
        .pipe(gulp.dest('public/'));
});

gulp.task('localConfig', function() {
    return new Promise(function(resolve, reject) {
        exec('node ./console/buildLocalConfig ' + ENV + ' ../app/config',
            function() {
                resolve();
            }
        );
    });
});

gulp.task('backendLint', function() {
    return gulp.src([
        'api/**/*.js',
        'app/modules/**/*.js',
        'app/components/**/*.js',
        'app/middleware/**/*.js',
        '!app/modules/doc/**',
        'gulp/*.js',
        './*.js'])
        .pipe(eslint({
            config: path.join(__dirname, 'node_modules/nodules/.eslintrc')
        }))
        .pipe(eslint.format())
        .pipe(eslint.results(result => {
            if (result.errorCount) {
                throw new Error('Error count: ' + result.errorCount +
                    '. Linter check failed!');
            }
        }));
});

const tasks = function(bool) {
    return bool ?
    [
        'createTimestamp',
        'soy',
        'compile',
        'tsCompile',
        'svgSprite',
        'sprite',
        'images',
        'fonts',
        'styles',
        'copySchools',
        'copyCourses',
        'localConfig'
    ] :
    [
        'watch',
        'soy',
        'scripts',
        'tsCompile',
        'svgSprite',
        'sprite',
        'images',
        'fonts',
        'styles',
        'copySchools',
        'copyCourses',
        'localConfig',
        'backendLint'
    ];
};

gulp.task('build', tasks(true));
gulp.task('default', tasks(production));


gulp.task('scripts', ['soy', 'lint'], gulpTasks.scripts);
gulp.task('debug', ['soy'], gulpTasks.debug);
gulp.task('compile', ['soy'], gulpTasks.compile);

gulp.task('createTimestamp', gulpTasks.createTimestamp);
gulp.task('svgSprite', gulpTasks.svgSprite);
gulp.task('tsCompile', gulpTasks.tsCompile);
gulp.task('backendBuild', ['watch', 'localConfig', 'tsCompile', 'backendLint']);
