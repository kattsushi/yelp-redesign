var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cssjoin = require('gulp-cssjoin'),
    concat = require('gulp-concat-sourcemap'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');
 
var paths = {
  src:'src',
  build:'build',
  bower_components:'bower_components',
  vendor:'vendor',
  tpl:'tpl',
};

var componentPaths = {
  jquery : paths.bower_components+'/jquery/dist/jquery.js',

  angular : paths.bower_components+'/angular/angular.js',
  angularTouch : paths.bower_components+'/angular-touch/angular-touch.js',
  angularSanitize : paths.bower_components+'/angular-sanitize/angular-sanitize.js',
  angularAnimate : paths.bower_components+'/angular-animate/angular-animate.js',
  angularUIRouter : paths.bower_components+'/angular-ui-router/release/angular-ui-router.js',

  angularAria : paths.bower_components+'/angular-aria/angular-aria.min.js',
  angularMaterial : paths.bower_components+'/angular-material/angular-material.min.js',
  angularMaterialCSS : paths.bower_components+'/angular-material/angular-material.min.css',

  lodash : paths.bower_components+'/lodash/lodash.min.js',
  angularSimpleLogger : paths.bower_components+'/angular-simple-logger/dist/angular-simple-logger.min.js',
  angularGoogleMaps : paths.bower_components+'/angular-google-maps/dist/angular-google-maps.min.js',

  oAuthSignature : paths.bower_components+'/oauth-signature/dist/oauth-signature.min.js',

  // datatables : paths.bower_components+'/datatables/media/js/jquery.dataTables.js',

  // moment : paths.bower_components+'/moment/min/moment.min.js',

  // d3 : paths.bower_components+'/d3/d3.js',
  // rickshaw : paths.bower_components+'/rickshaw/rickshaw.js',
  // angularRickshaw : paths.bower_components+'/angular-rickshaw/rickshaw.js',
  // rickshawcss : paths.bower_components+'/rickshaw/rickshaw.css',

  // datatablescss : paths.bower_components+'/datatables/media/css/jquery.dataTables.css',
  // datatablescsstheme : paths.bower_components+'/datatables/media/css/jquery.dataTables_themeroller.css',
  // datatablesbootstrap : paths.vendor+'/datatables_plugins/integration/bootstrap/3/dataTables.bootstrap.js',
  // datatablesbootstrapcss : paths.vendor+'/datatables_plugins/integration/bootstrap/3/dataTables.bootstrap.css',
  // datatablescolreorder : paths.bower_components+'/datatables-colreorder/js/jquery.dataTables.js',
  // datatablescolreordercss : paths.bower_components+'/datatables-colreorder/css/dataTables.colReorder.css',
  // datatablestabletools : paths.bower_components+'/datatables-tabletools/js/dataTables.tableTools.js',
  // datatablestabletoolscss : paths.bower_components+'/datatables-tabletools/css/dataTables.tableTools.css'
};

/**
 * $ gulp compile bower css files into one scss
 * description: 
 */
gulp.task('bower_css', function () {
  return gulp.src([
      './'+componentPaths.rickshawcss,
      './'+componentPaths.angularMaterialCSS,
      // './'+componentPaths.bootstrapSwitchCSS,
      // './'+componentPaths.datatablescss,
      // './'+componentPaths.datatablesbootstrapcss,
      // './'+componentPaths.datatablescsstheme,
      // './'+componentPaths.datatablescolreordercss,
      // './'+componentPaths.datatablestabletoolscss
    ])
    .pipe(concat('_bower_components.scss'))
    .pipe(gulp.dest('./'+paths.src+'/sass/'));
});

/**
 * $ gulp default
 * description: launches server
 */
// Static Server + watching scss/html files
gulp.task('serve', ['js','sass'], function() {

    browserSync.init({
        server: "./build"
    });

    gulp.watch([
      './'+paths.src+'/sass/main.scss',
      './'+paths.src+'/sass/**/*.scss'
    ], ['sass']);

    gulp.watch([
      './'+paths.src+'/img/*.jpg',
      './'+paths.src+'/img/*.png',
      './'+paths.src+'/img/*.gif',
      './'+paths.src+'/img/**/*.jpg',
      './'+paths.src+'/img/**/*.png',
      './'+paths.src+'/img/**/*.gif',
    ], ['imagemin']);

    gulp.watch(['./'+paths.src+'/app/**/*.js'], ['js']);

    gulp.watch([
      paths.src+'/index.html',
      paths.src+'/app/tpl/*.html',
      paths.src+'/app/tpl/*.tpl',
      paths.src+'/app/views/*.html'
    ],['html']).on('change', browserSync.reload);
});

/**
 * $ gulp copy fonts
 * description: Compile sass into CSS & auto-inject into browsers
 */
// gulp.task('sass', function() {
//     return gulp.src("app/scss/*.scss")
//         .pipe(sass())
//         .pipe(gulp.dest("app/css"))
//         .pipe(browserSync.stream());
// });

/**
 * $ gulp sass
 * description: 
 */
gulp.task('sass', function () {
  return gulp.src([
    './'+paths.src+'/sass/main.scss',
    './'+paths.src+'/sass/**/*.scss'
  ])
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./'+paths.build+'/css'))
  .pipe(browserSync.stream());
});

/**
 * $ gulp copy html and templates
 * description: 
 */
gulp.task('html', function() {

  gulp.src('./'+paths.src+'/index.html')
  .pipe(gulp.dest('./'+paths.build));

  gulp.src(['./'+paths.src+'/app/views/*.html'])
  .pipe(gulp.dest('./'+paths.build+'/views'));

  gulp.src(['./'+paths.src+'/app/tpl/*.html','./'+paths.src+'/app/tpl/*.tpl'])
  .pipe(gulp.dest('./'+paths.build+'/tpl'));

});

/**
 * $ gulp copy html and templates
 * description: 
 */
gulp.task('data', function () {
  return gulp.src('./'+paths.src+'/data/*.json')
  .pipe(gulp.dest('./'+paths.build+'/data'));
});

/**
 * $ gulp copy fonts
 * description: 
 */
gulp.task('fonts', function () {
  
  gulp.src('./'+paths.bower_components+'/bootstrap-sass/assets/fonts/**')
  .pipe(gulp.dest('./'+paths.build+'/fonts'));
  
  gulp.src('./'+paths.bower_components+'/bootstrap-material-design/dist/fonts/**')
  .pipe(gulp.dest('./'+paths.build+'/fonts'));

  return gulp.src('./'+paths.src+'/fonts/*')
  .pipe(gulp.dest('./'+paths.build+'/fonts'));
});

/**
 * $ gulp compile js
 * description: 
 */
gulp.task('js', function () {
  return gulp.src([
    componentPaths.jquery,
    componentPaths.angular,
    componentPaths.angularTouch,
    componentPaths.angularSanitize,
    componentPaths.angularAnimate,
    componentPaths.angularAria,
    componentPaths.angularMaterial,
    // componentPaths.angularBootstrap,
    componentPaths.angularUIRouter,
    // componentPaths.bootstrap,
    // componentPaths.bootstrapSwitch,
    // componentPaths.angularBootstrapSwitch,
    // componentPaths.d3,
    // componentPaths.rickshaw,
    // componentPaths.angularRickshaw,
    componentPaths.lodash,
    componentPaths.angularSimpleLogger,
    componentPaths.angularGoogleMaps,
    componentPaths.oAuthSignature,
    // componentPaths.datatables,
    // componentPaths.datatablesbootstrap,
    // componentPaths.datatablescolreorder,
    // componentPaths.datatablestabletools,
    // componentPaths.moment,
    './'+paths.src+'/app/libs/*.js',
    './'+paths.src+'/app/app.js',
    './'+paths.src+'/app/routes.js',
    './'+paths.src+'/app/services/*.js',
    './'+paths.src+'/app/factories/*.js',
    './'+paths.src+'/app/controllers/*.js',
    './'+paths.src+'/app/directives/*.js',
  ])
  .pipe(concat('app.js',{sourcesContent:true}))
  .pipe(gulp.dest('./'+paths.build+'/js'));
});

/**
 * $ gulp compress images
 * description: Compresses images from original quality
 */
gulp.task('imagemin', function () {
    return gulp.src(['src/img/*','src/img/**/*'])
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('build/img'));
});

gulp.task('default', ['serve']);
