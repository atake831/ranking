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
    .pipe(gulp.dest(__dirname + '/www/scripts/'));
});

// compile-jade
gulp.task('compile-jade', function() {
  return gulp.src([__dirname + '/src/jade/**/*.jade'])
    .pipe(plumber())
    .pipe($.jade({
        pretty: true
    }))
    .pipe(gulp.dest(__dirname + '/www/views/'));
});

// compile-stylus
gulp.task('compile-stylus', function() {
  return gulp.src([__dirname + '/src/stylus/**/*.styl'])
    .pipe(plumber())
    .pipe($.stylus({errors: true}))
    .pipe($.concat('style.css'))
    .pipe($.autoprefixer())
    .pipe(gulp.dest(__dirname + '/www/styles/'));
});

// jshint
gulp.task('jshint', function() {
  return gulp.src([__dirname + '/www/*.js', __dirname + '/www/js/**/*.js'])
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
    [__dirname + '/src/jade/**/*.jade'],
    {debounceDelay: 400},
    ['compile-jade']
  );

  gulp.watch(
    [__dirname + '/src/stylus/**/*.styl'],
    {debounceDelay: 400},
    ['compile-stylus']
  );

  gulp.watch(
    [__dirname + '/www/*.js', __dirname + '/www/js/**/*.js'],
    {debounceDelay: 400},
    ['jshint']
  );
});

// browser-sync
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: __dirname + '/www/',
      directory: true
    },
    ghostMode: false,
    notify: false,
    debounce: 200,
    startPath: 'index.html'
  });

  gulp.watch([
    __dirname + '/www/**/*.{js,html,css,svg,png,gif,jpg,jpeg}'
  ], {
    debounceDelay: 400
  }, function() {
    browserSync.reload();
  });
});

// concat-js-library
gulp.task('concat-js-lib', function() {
  return gulp.src([
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/angular/angular.min.js',
      'bower_components/angular-route/angular-route.min.js',
      'bower_components/angular-bootstrap/ui-bootstrap.min.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
      'bower_components/moment/moment.js',
      'bower_components/angular-ui-calendar/src/calendar.js',
      'bower_components/fullcalendar/dist/fullcalendar.js',
      'bower_components/fullcalendar/dist/gcal.js',
      'bower_components/fullcalendar/dist/lang/ja.js'
    ])
    .pipe($.concat('vendors.js'))
    .pipe(gulp.dest(__dirname + '/www/lib/'));
});

// concat-css-library
gulp.task('concat-css-lib', function() {
  return gulp.src([
      'bower_components/fullcalendar/dist/fullcalendar.min.css',
      'bower_components/bootstrap-css/css/bootstrap.css'
    ])
    .pipe($.concat('vendors.css'))
    .pipe(gulp.dest(__dirname + '/www/lib/'));
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
