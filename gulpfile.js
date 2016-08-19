var gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    cssMin = require('gulp-cssmin'),
    csscomb = require('gulp-csscomb'),
    rename = require('gulp-rename'),
    wiredep = require('wiredep').stream,
    server = require('gulp-server-livereload'),
    concat = require('gulp-concat'),
    uncss = require('gulp-uncss'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
		jade = require('gulp-jade'),
    prettify = require('gulp-html-prettify'),
		stylus = require('gulp-stylus'),
    complexity = require('gulp-complexity'),
    autopolyfiller = require('gulp-autopolyfiller'),
    jsfiles = [
      'app/myjs/App.js',
      'app/myjs/controllers/*.js'
    ];

// CLEAN 
gulp.task('clean', function () {
  return gulp.src('form-angular', {read: false}).pipe(clean());
});

// IMAGE-MIN
gulp.task('img', function () {
  gulp.src('app/img/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('form-angular/img'))
});

// BUILD
gulp.task('build', ['clean','img'], function () {
  gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', cssMin()))
    .pipe(uncss({
            html: ['form-angular/*.html']
        }))
    .pipe(gulp.dest('form-angular'));
});

//BOWER
gulp.task('bower', function () {
  gulp.src('app/*.html')
    .pipe(wiredep({
      directory : "app/bower_components"
    }))
    .pipe(gulp.dest('app'));
});

// JADE
gulp.task('jade', function () {
  gulp.src('app/jade/*.jade')
    .pipe(jade())
    .pipe(prettify({indent_char: ' ', indent_size: 3}))
    .pipe(concat('index.html'))
    .pipe(gulp.dest('app'))
});

// STYLUS
gulp.task('styl', function() {
	gulp.src('app/styl/*.styl')
		.pipe(stylus())
		.on('error', console.log)
    .pipe(prefix('last 2 versions', '> 1%', 'ie 9'))
    .pipe(gulp.dest('app/css'))
    .pipe(concat('style.min.css'))
    .pipe(csscomb())
    .pipe(cssMin())
    .pipe(gulp.dest('app/css'));
});

// JAVASCRIPT
gulp.task('js', function () {
  gulp.src(jsfiles)
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});

//SERVER
gulp.task('webserver', function() {
  gulp.src('app')
    .pipe(server({
      livereload: true,
      // directoryListing: true,
      open: true
    }));
});

gulp.task('watch', function () {
  gulp.watch(['bower.json','app/index.html'], ['bower']);
  gulp.watch(['app/jade/*.jade','app/jade/includes/*.jade'],['jade']);
  gulp.watch(jsfiles,['js']);
  gulp.watch('app/img/*',['img']);
  gulp.watch('app/styl/*.styl',['styl']);
});

gulp.task('default', ['watch', 'jade', 'js', 'styl', 'webserver']);
