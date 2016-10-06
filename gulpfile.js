const gulp = require('gulp');
const path = require('path');
const concat = require('gulp-concat');
const util = require('gulp-util');
const babel = require('gulp-babel');
const apidoc = require('gulp-apidoc');
const exec = require('child_process').exec;
const eslint = require('gulp-eslint');

const gulpHelper =
    require('./node_modules/clobl/gulp-helper.js')
        .use(gulp)
        .setPath({
            root: __dirname,
            blocks: path.join(__dirname, '/app/blocks')
        })
        .setSoyPath({
            root: 'build'
        });

const config = require('./config.json');
const production = !!util.env.production;
const BLOCKS_DIR = '/app/blocks';
const ENV = util.env.env ? util.env.env : 'dev';

const gulpTasks = require('./gulp')(gulpHelper);

gulp.task('doc', function() {
    apidoc({
        src: './api/modules/',
        dest: './doc'
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

gulp.task('migrate', function() {
    return gulpHelper.migrate.build({
        src: path.join(__dirname, 'api/**/migrations/*.js')
    });
});


gulp.task('appES5', function() {
    return gulp.src('app.js')
        .pipe(babel())
        .pipe(concat('appES5.js'))
        .pipe(gulp.dest(''));
});

gulp.task('soy', function() {
    return gulpHelper.soy.build();
});

gulp.task('styles', ['sprite'], function() {
    return gulpHelper.css.build({
        outputFiles: [{
            src: [
                path.join(__dirname, BLOCKS_DIR, '/**/*.scss'),
                path.join(__dirname, BLOCKS_DIR, '/**/*.css'),
                path.join(__dirname, '/node_modules/css-reset/reset.css')
            ],
            fileName: 'styles.css'
        }],
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
            )]
        }
    }]);
});

gulp.task('images', function() {
    var src = ['png', 'ico', 'svg', 'gif', 'jpg']
            .map(ext => '**/*.' + ext)
            .map(mask => path.join(__dirname, BLOCKS_DIR, mask)),
        dest = path.join(__dirname, 'public/images');

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
    gulp.watch([
        path.join(__dirname, BLOCKS_DIR, '/**/*.scss'),
        path.join(__dirname, BLOCKS_DIR, '/**/*.css')
    ], ['styles']);
});

gulp.task('fonts', function() {
    return gulp.src(path.join(__dirname, '/assets/fonts/**/*.*'))
        .pipe(gulp.dest(path.join(__dirname, '/public/fonts')));
});

gulp.task('copy', function() {
    return gulp.src([
        path.join(__dirname, '/assets/robots.txt'),
        path.join(__dirname, '/assets/google86acdf989d7328cf.html'),
        path.join(__dirname, '/assets/yandex_7cfaf013e2f3373d.html')
    ], {base: 'assets/'})
         .pipe(gulp.dest('public'));
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
        'app/modules/!(doc)**/*.js',
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
        ['createTimestamp', 'soy', 'compile', 'sprite', 'images', 'fonts',
            'styles', 'copy', 'localConfig'] :
        ['watch', 'soy', 'scripts', 'sprite', 'images', 'fonts', 'styles',
            'copy', 'localConfig', 'backendLint'];
};

gulp.task('build', tasks(true));
gulp.task('default', tasks(production));

gulp.task('scripts', ['soy', 'lint'], gulpTasks.scripts);
gulp.task('debug', ['soy'], gulpTasks.debug);
gulp.task('compile', ['soy'], gulpTasks.compile);

gulp.task('createTimestamp', gulpTasks.createTimestamp);