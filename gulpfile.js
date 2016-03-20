var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');

// build
gulp.task('build', ['jshint']);

// default
gulp.task('default', $.taskListing.withFilters(null, 'default'));

// compile-js
gulp.task('compile-js', function() {
  return gulp.src([__dirname + '/src/scripts/**/*.js'])
    .pipe(plumber())
    .pipe($.concat('all.js'))
    .pipe(gulp.dest(__dirname + '/public/scripts/'));
});

// compile-jade
gulp.task('compile-jade', function() {
  return gulp.src(['src/*.jade', 'src/**/*.jade'])
    .pipe(plumber())
    .pipe($.jade({
        pretty: true
    }))
    .pipe(gulp.dest('public'));
});

// compile-stylus
gulp.task('compile-stylus', function() {
  return gulp.src([__dirname + '/src/stylus/**/*.styl'])
    .pipe(plumber())
    .pipe($.stylus({errors: true}))
    .pipe($.concat('style.css'))
    .pipe($.autoprefixer())
    .pipe(gulp.dest(__dirname + '/public/styles/'));
});

// jshint
gulp.task('jshint', function() {
  return gulp.src([__dirname + '/public/*.js', __dirname + '/public/js/**/*.js'])
    .pipe(plumber())
    .pipe($.cached('jshint'))
    .pipe($.jshint())
    .pipe(jshintNotify())
    .pipe($.jshint.reporter('jshint-stylish'));
});

// serve
gulp.task('serve', ['build', 'browser-sync'], function() {
  gulp.watch(
    [__dirname + '/src/scripts/**/*.js'],
    {debounceDelay: 400},
    ['compile-js']
  );

  gulp.watch(
    [__dirname + '/src/*.jade', __dirname + '/src/views/**/*.jade'],
    {debounceDelay: 400},
    ['compile-jade']
  );

  gulp.watch(
    [__dirname + '/src/stylus/**/*.styl'],
    {debounceDelay: 400},
    ['compile-stylus']
  );

  gulp.watch(
    [__dirname + '/public/*.js', __dirname + '/public/js/**/*.js'],
    {debounceDelay: 400},
    ['jshint']
  );
});

// browser-sync
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: __dirname + '/public/',
      directory: true
    },
    ghostMode: false,
    notify: false,
    debounce: 200,
    startPath: 'index.html'
  });

  gulp.watch([
    __dirname + '/public/**/*.{js,html,css,svg,png,gif,jpg,jpeg}'
  ], {
    debounceDelay: 400
  }, function() {
    browserSync.reload();
  });
});

// concat-js-library
gulp.task('concat-js-lib', function() {
  return gulp.src([
      'bower_components/angular/angular.min.js',
      'bower_components/angular-route/angular-route.min.js',
      'bower_components/flat-ui/dist/js/vendor/jquery.min.js',
      'bower_components/flat-ui/dist/js/vendor/video.js',
      'bower_components/flat-ui/dist/js/flat-ui.min.js',
      'bower_components/scroll-up-bar/dist/scroll-up-bar.js',
      'bower_components/angular-bootstrap/ui-bootstrap.min.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
      'bower_components/Chart.js/Chart.min.js',
      'vendor/HCaptions/jquery.hcaptions.js'
    ])
    .pipe($.concat('vendors.js'))
    .pipe(gulp.dest(__dirname + '/public/lib/'));
});

// concat-css-library
gulp.task('concat-css-lib', function() {
  return gulp.src([
      'bower_components/flat-ui/dist/css/vendor/bootstrap.min.css',
      'bower_components/flat-ui/dist/css/flat-ui.min.css',
      'bower_components/angular-bootstrap/ui-bootstrap-csp.css'
    ])
    .pipe($.concat('vendors.css'))
    .pipe(gulp.dest(__dirname + '/public/lib/'));
});

gulp.task('concat-lib', ['concat-js-lib', 'concat-css-lib']);

// utils
function plumber() {
  return $.plumber({errorHandler: $.notify.onError()});
}

function jshintNotify() {
  return $.notify(function(file) {
    if (file.jshint.success) {
      return false;
    }

    var errors = file.jshint.results.map(function (data) {
      return data.error ? '(' + data.error.line + ':' + data.error.character + ') ' + data.error.reason : '';
    }).join('\n');

    return file.relative + ' (' + file.jshint.results.length + ' errors)\n' + errors;
  });
}
