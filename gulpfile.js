var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

var PATHS = {
    src: 'app/**/*.ts'
};

gulp.task('clean', function (done) {
    var del = require('del');
    del(['app/dist'], done);
});

gulp.task('ts2js', function () {
    var typescript = require('gulp-typescript');
    var tscConfig = require('./tsconfig.json');

    var tsResult = gulp
        .src([PATHS.src, 'node_modules/angular2/typings/browser.d.ts'])
        .pipe(typescript(tscConfig.compilerOptions));

    return tsResult.js.pipe(gulp.dest('app/dist'));
});

gulp.task('play', ['ts2js'], function () {
    var http = require('http');
    var connect = require('connect');
    var serveStatic = require('serve-static');
    var open = require('open');

    var port = 9000, app;

    gulp.watch(PATHS.src, ['ts2js']);

    app = connect().use(serveStatic(__dirname));
    http.createServer(app).listen(port, function () {
        open('http://localhost:' + port);
    });
});

gulp.task('server', function () {
    nodemon({
        script: './bin/server'
    //   , ext: 'js html'
        , ignore: ["app/*", "typings/*"]
        , env: { 'NODE_ENV': 'development' }
    })
})


gulp.task('default', ['server']);
