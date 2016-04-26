const gulp = require('gulp');
const path = require('path');
const concat = require('gulp-concat');
const util = require('gulp-util');
const babel = require('gulp-babel');
const apidoc = require('gulp-apidoc');
const fs = require('fs-extra');
const exec = require('child_process').exec;

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

gulp.task('doc', function () {
    apidoc({
        src: "./api/modules/",
        dest: "./doc"
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

gulp.task('migrate', function () {
    return gulpHelper.migrate.build({
        src: path.join(__dirname, 'api/**/migrations/*.js')
    });
});


gulp.task('appES5', function () {
    return gulp.src('app.js')
        .pipe(babel())
        .pipe(concat('appES5.js'))
        .pipe(gulp.dest(''));
});

gulp.task('soy', function () {
    return gulpHelper.soy.build();
});

gulp.task('scripts', ['soy', 'lint'], function () {
    var getDirectories = function(srcpath)  {
        return fs.readdirSync(srcpath).filter(function(file) {
            return fs.statSync(path.join(srcpath, file)).isDirectory();
        });
    };

    var upLetter = function (string, index) {
        return string.slice(0, index) +
            string[index].toUpperCase() +
            string.slice(index+1);
    };

    var getEnteryPointFromName = function (name) {
        name = name.replace(/l-/g, ''); // Remove l-
        var slice = upLetter(name, 0); // doc => Doc
        var k;
        while ((k = slice.indexOf('-')) != -1){
            slice = upLetter(slice, k+1);
            slice = slice.slice(0, k) + slice.slice(k+1);
        }
        return 'sm.l' + slice + '.' + slice;
    };

    var blocks =path.join(__dirname, BLOCKS_DIR),
        outputFiles = getDirectories(path.join(__dirname,'/app/blocks'))
        .filter(dirname => dirname.startsWith('l-'))
        .filter(name => fs.existsSync(path.join(blocks, name, name) + '.js'))
        .map(name => {
                return {
                    fileName: name + '.js',
                    entryPoint: getEnteryPointFromName(name)
                }
            });

    return gulpHelper.js.build({
        outputFiles: outputFiles
    });
});

gulp.task('styles', ['sprite'], function () {
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
        src: path.join(__dirname, BLOCKS_DIR, '/n-clobl/g-icon/g-icon_img/*.png'),
        retina: {
            filters: [path.join(__dirname, BLOCKS_DIR, '/n-clobl/g-icon/g-icon_img/*@2x.png')]
        }
    }]);
});

gulp.task('images', function () {
    var src = ['png', 'ico', 'svg', 'gif', 'jpg']
            .map(ext => '**/*.' + ext)
            .map(mask => path.join(__dirname, BLOCKS_DIR, mask)),
        dest = path.join(__dirname, 'public/images');

    return gulp.src(src)
        .pipe(gulp.dest(dest));
});

gulp.task('watch', function () {
    gulp.watch(
        [path.join(__dirname + BLOCKS_DIR + '/**/*.soy')],
        ['scripts']
    );
    gulp.watch(
        [path.join(__dirname + BLOCKS_DIR + '/**/*.js')],
        ['scripts']
    );
    gulp.watch([
        path.join(__dirname + BLOCKS_DIR + '/**/*.scss'),
        path.join(__dirname + BLOCKS_DIR + '/**/*.css')
    ], ['styles']);
});

gulp.task('fonts', function () {
    return gulp.src(path.join(__dirname + '/assets/fonts/**/*.*'))
        .pipe(gulp.dest(path.join(__dirname + '/public/fonts')));
});

gulp.task('evercookie', function() {
    return gulp.src([
            path.join(__dirname + '/app/evercookie/**/*.*'),
            path.join('!' + __dirname + '/app/evercookie/css/**/*.*'),
            path.join('!' + __dirname + '/app/evercookie/*.*')
    ])
    .pipe(gulp.dest(path.join(__dirname + '/public/evercookie/')));
});

gulp.task('copy', function() {
    return gulp.src([
            path.join(__dirname + '/assets/robots.txt'),
            path.join(__dirname + '/assets/google86acdf989d7328cf.html'),
            path.join(__dirname + '/assets/yandex_7cfaf013e2f3373d.html'),
            path.join(__dirname + '/assets/sitemap.txt')
        ],
        {base: 'assets/'})
        .pipe(gulp.dest('public'));
});

gulp.task('localConfig', function() {
    return new Promise(function(resolve, reject) {
        exec('node ./console/buildLocalConfig dev ../app/config',
            function() {
                resolve();
            }
        );
    });
});

gulp.task('authConfig', function() {
    return new Promise(function(resolve, reject) {
        exec('node ./console/buildLocalConfig dev ../environment/config/authorization',
            function() {
                gulp.src([
                    path.join(__dirname, '/environment/config/authorization/config.json'),
                    path.join(__dirname, '/environment/config/authorization/services.json')
                ]).pipe(
                    gulp.dest(path.join(__dirname, '/node_modules/auth-service/config/'))
                ).on('end', function() { resolve() });
            }
        );
    });
});

gulp.task('userConfig', function() {
    return new Promise(function(resolve, reject) {
        exec('node ./console/buildLocalConfig dev ../environment/config/user',
            function() {
                gulp.src([
                    path.join(__dirname, '/environment/config/user/config.json'),
                    path.join(__dirname, '/environment/config/user/config.db.json')
                ]).pipe(
                    gulp.dest(path.join(__dirname, '/node_modules/user-service/config/'))
                ).on('end', function() { resolve() });
            }
        );
    });
});

const tasks = function (bool) {
    return bool ?
        ['soy', 'scripts', 'sprite', 'images', 'fonts', 'styles', 'evercookie', 'copy'] :
        ['watch', 'soy', 'scripts', 'sprite', 'images', 'fonts','styles', 'evercookie', 'copy', 'localConfig', 'authConfig', 'userConfig'];
};

gulp.task('build', tasks(true));
gulp.task('default', tasks(production));
