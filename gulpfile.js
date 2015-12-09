const gulp = require('gulp');
const gulpHelper =
        require('./node_modules/frobl/gulp-helper.js')
        .use(gulp)
        .setProjectDirectory(__dirname);
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
var foreach = require('gulp-foreach');
var SoyExtend = require('./soy-extend');

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

var extender = new SoyExtend({
    blocksDir: path.join(__dirname, BLOCKS_DIR)
});

gulp.task('soy', function (cb) {
    //return gulpHelper.soy([
    //    path.join(__dirname, BLOCKS_DIR, '/**/*.soy')
    //]);

    return gulp.src([
            path.join(__dirname, BLOCKS_DIR, '/**/*.soy'),
            path.join(__dirname, '/node_modules/frobl/blocks', '/**/*.soy')
        ])
        .pipe(gulp.dest(path.join(__dirname, '/tmp/soy')))
        .pipe(foreach(function (stream, file) {
            extender.proceed(file.path);
            return stream;
        }))
        .pipe(soynode({
            outputDir: path.join(__dirname, '/node_modules/frobl', '/tmp/soy'),
            loadCompiledTemplates: false,
            useClosureStyle: true,
            contextJsPaths: [
                path.join(
                    __dirname,
                    '/node_modules/google-closure-library/closure/goog/base.js'
                )
            ]
        }));
});

var appWatch = function(event) {
    //console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    var basename = path.basename(event.path);
    var dest = path.normalize(
        event.path
            .replace('\\app\\blocks\\', '/node_modules/frobl/tmp/appSoy/')
            .replace(basename, '')
    );

    //console.log(dest);

    gulp.src(event.path)
        .pipe(gulp.dest(dest))
        .pipe(foreach(function (stream, file) {
            extender.proceed(file.path);
            return stream;
        }));
};

gulp.task('appSoy', function (cb) {
    return gulp.src([
            path.join(__dirname, BLOCKS_DIR, '/**/*.soy')
        ])
        .pipe(gulp.dest(path.join(__dirname, '/node_modules/frobl/tmp/appSoy')))
        .pipe(foreach(function (stream, file) {
            extender.proceed(file.path);
            return stream;
        }));
});


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

var isFileExists = function(path) {
    try
    {
    	return fs.statSync(path).isFile();
    }
    catch (err)
    {
    	return false;
    }
};

var compileLayout = function(name)  {
    var filePath = path.join(__dirname, BLOCKS_DIR, name, name)+'.js';
    if (!isFileExists(filePath))
    	return;
    var output = name + '.js',
    	enteryPoint = getEnteryPointFromName(name);
    console.log('Building scripts for ' + name + ' [' + enteryPoint + ']');
    return gulpHelper.buildJs(
        [
            path.join(__dirname, BLOCKS_DIR, '/', '/**/*.js')
        ],
        output,
        enteryPoint,
        path.join(__dirname, '/public'),
        production
    );
};

gulp.task('scripts', ['soy', 'lint'], function () {
    var promises = [],
        dirs = getDirectories(path.join(__dirname,'/app/blocks'));
    dirs = dirs.filter((dirname) => {
	    return dirname.startsWith('l-');
    });
    for (var i = 0; i < dirs.length; i++) {
        promises.push(compileLayout(dirs[i]));
    }
    return Q.all(promises);
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

gulp.task('sprite', function() {
    var sctf = {
        imgSrc: path.join(__dirname, BLOCKS_DIR, '/b-icon/b-icon_img/*'),
        cssDest: path.join(__dirname, BLOCKS_DIR, '/b-icon'),
        spriteDest: path.join(__dirname, '/public/images'),
        cssPath: '/images/b-icon_auto-sprite.png'
    };
    return gulpHelper.buildSprites([sctf]);
});

gulp.task('images', function () {
    return gulp.src(path.join(__dirname + BLOCKS_DIR + '/**/*.png'))
        .pipe(gulp.dest(path.join(__dirname + '/public/images')));
});

gulp.task('watch', function () {
    var soyWatcher = gulp.watch(
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

    soyWatcher.on('change', appWatch);
});


gulp.task('fonts', function () {
    return gulp.src(path.join(__dirname + '/assets/fonts/**/*.*'))
        .pipe(gulp.dest(path.join(__dirname + '/public/fonts')));
});


const tasks = function (bool) {
    return bool ?
        ['soy', 'appSoy', 'scripts', 'sprite', 'images', 'fonts', 'styles'] :
        ['watch', 'soy', 'appSoy', 'scripts', 'sprite', 'images', 'fonts','styles'];
};

gulp.task('default', tasks(production));
