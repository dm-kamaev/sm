const gulp = require('gulp');
const path = require('path');
const concat = require('gulp-concat');
const util = require('gulp-util');
const babel = require('gulp-babel');
const apidoc = require('gulp-apidoc');
const fs = require('fs-extra');

const gulpHelper =
    require('./node_modules/clobl/gulp-helper.js')
        .use(gulp)
        .setPath({
            root: __dirname,
            blocks: path.join(__dirname, '/app/blocks')
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
    return gulpHelper.soy.build({});
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

gulp.task('styles', function () {
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
        src: path.join(__dirname, BLOCKS_DIR, '/b-icon/b-icon_img/*'),
        imgPath: '/images/b-icon_auto-sprite.png',
        cssDest: path.join(__dirname, BLOCKS_DIR, '/b-icon'),
        pngDest: path.join(__dirname, '/public/images')
    }]);
});

gulp.task('images', function () {
    return gulp.src([
            path.join(__dirname + BLOCKS_DIR + '/**/*.png'),
            path.join(__dirname + BLOCKS_DIR + '/**/*.ico'),
            path.join(__dirname + BLOCKS_DIR + '/**/*.gif')
        ])
        .pipe(gulp.dest(path.join(__dirname + '/public/images')));
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

const tasks = function (bool) {
    return bool ?
        ['soy', 'scripts', 'sprite', 'images', 'fonts', 'styles'] :
        ['watch', 'soy', 'scripts', 'sprite', 'images', 'fonts','styles'];
};

gulp.task('build', tasks(true));
gulp.task('default', tasks(production));
