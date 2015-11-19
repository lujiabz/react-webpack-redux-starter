var gulp = require("gulp");
var uglify = require("gulp-uglify");
var cssshrink = require('gulp-cssshrink');
var rename = require("gulp-rename");
var autoprefixer = require("gulp-autoprefixer");
var livereload = require("gulp-livereload");
var base64 = require("gulp-base64");
var compass = require('gulp-compass');
var concat = require('gulp-concat');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var gulpWebpack = require('gulp-webpack');
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config");
var webpackHotConfig = require("./webpack.hot.config");
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var runSequence = require('run-sequence');
var htmlreplace = require('gulp-html-replace');
var del = require('del');

//合并压缩一些js库
gulp.task('vendor', function() {
    return gulp.src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/toastr/toastr.js',
        'node_modules/socket.io-client/socket.io.js',
        'node_modules/echarts/build/source/echarts-all.js'
    ]).pipe(concat('vendor.js'))
        .pipe(gulp.dest('public/dist/'));
});

//转化scss到css
gulp.task('sass', function () {
    gulp.src('app/stylesheets/index.scss')
        .pipe(sass("index.css"))
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('public/dist/'))
        .pipe(livereload());
});

gulp.task('publish-css', function () {
    return gulp.src('public/dist/*.css')
        .pipe(cssshrink())
        .pipe(rev())
        .pipe(gulp.dest('public/dist/'))
        .pipe(rev.manifest('public/rev-manifest.json', {merge: true}))
        .pipe(gulp.dest(''));
});


//监视scss文件，有变动就编译
gulp.task('sass:watch', function () {
    gulp.watch('app/stylesheets/index.scss', ['sass']);
});

gulp.task('build-js', function () {
    return gulp.src('app/app.js')
        .pipe(gulpWebpack(webpackConfig))    
        .pipe(gulp.dest('public/dist/'))
});

gulp.task('publish-js', function () {
    return gulp.src('public/dist/*.js')
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('public/dist/'))
        .pipe(rev.manifest('public/rev-manifest.json', {merge: true}))
        .pipe(gulp.dest(''));
});

gulp.task('publish-html', function () {
  return gulp.src(['public/rev-manifest.json', 'public/www/*.html'])
    .pipe(revCollector({
        dirReplacements: {
            
        }
    }))
    .pipe(gulp.dest('public/www/'));
});

gulp.task("webpack-dev-server", function(callback) {
    // Start a webpack-dev-server
    var compiler = webpack(webpackHotConfig);

    new WebpackDevServer(compiler, {
        publicPath: '/public/',
        hot:true
    }).listen(3001, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:3001");
    });
});

gulp.task("html-dev",function(){
    return gulp.src(['index.html','views/login.html','views/register.html'])
        .pipe(htmlreplace({
            'js': 'http://localhost:3001/public/bundle.js',
            'css': 'http://localhost:3001/public/ant.css'
        }))
        .pipe(gulp.dest('public/www'));
})
gulp.task("html-build",function(){
    return gulp.src(['index.html','views/login.html','views/register.html'])
        .pipe(htmlreplace({
            'js': '/dist/bundle.js',
            'css': '/dist/ant.css'
        }))
        .pipe(gulp.dest('public/www'));
})

gulp.task('clean', function () {
    return del([
        'public/rev-manifest.json',
        'public/dist/*',
        'public/www/rev-manifest.json'
    ]);
});

//gulp监听任务，任何js或css改变时执行
gulp.task("watch",function(){	
	livereload.listen();
})

gulp.task("dev",function(){
    runSequence("clean",["webpack-dev-server","watch","sass:watch","sass","vendor","html-dev"])
})
gulp.task("build",function(){
    runSequence("clean",["sass","build-js","vendor"],"publish-css","publish-js","html-build","publish-html")
});