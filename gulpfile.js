    const { src, dest, task, series, watch, parallel } = require("gulp");
  const rm = require('gulp-rm');
  const sass = require('gulp-sass')(require('sass'));
  const concat = require('gulp-concat');
  const browserSync = require('browser-sync').create();
  const reload = browserSync.reload;
  const sassGlob = require('gulp-sass-glob');
  const autoprefixer = require('gulp-autoprefixer');
  const px2rem = require('gulp-smile-px2rem');
  const gcmq = require('gulp-group-css-media-queries');
  const cleanCSS = require('gulp-clean-css');
  const sourcemaps = require('gulp-sourcemaps');
  const gulpif = require('gulp-if');
  const babel = require('gulp-babel');
  const uglify = require('gulp-uglify');


  const env = process.env.NODE_ENV;
 
  const {SRC_PATH, DIST_PATH, STYLE_LIBS, JS_LIBS} = require('./gulp.config');
  
  sass.compiler = require('sass');
  
  task('clean', () => {
    console.log(env );
     return src(`${DIST_PATH}/**/*`, { read: false })
      .pipe(rm())
   })
  
  task('copy:svg', () => {
  return src('src/*.svg')
    .pipe(dest('dist'))
    .pipe(reload({ stream: true }));
  })

  task('copy:img', () => {
    return src('src/img/*')
      .pipe(dest('dist/img'))
      .pipe(reload({ stream: true }));
    })

  
  task('copy:html', () => {
    return src('src/*.html')
      .pipe(dest('dist'))
      .pipe(reload({ stream: true }));
    })
    
  
  task('styles', () => {
  return src('src/css/main.scss')
  .pipe(gulpif(env === 'dev', sourcemaps.init()))
  .pipe(concat('main.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(env === 'prod', autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    })))
    .pipe(gulpif(env === 'prod', gcmq()))
    .pipe(gulpif(env === 'prod', cleanCSS()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest('dist/css'))
    .pipe(reload({ stream: true }));
 });

 task('scripts', () => {
  return src('src/scripts/*.js')
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.js', {newLine: ';'}))
    .pipe(gulpif(env === 'prod', babel({
      presets: ['@babel/env']
    })))
    .pipe(gulpif(env === 'prod', uglify()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest('dist'))
    .pipe(reload({ stream: true }));
 });
  
  
  task('server', () => {
  browserSync.init({
      server: {
          baseDir: "./dist"
      },
      open: false
  });
  });
  
  task('watch', () => {
    watch('./src/css/**/*.scss', series('styles'));
    watch('./src/*.html', series('copy:html'));
    watch('./src/scripts/*.js', series('scripts'));
   });
    
    
   task('default',
    series(
      'clean',
      parallel('copy:img','copy:html','copy:svg',  'styles', 'scripts'),
      parallel('watch', 'server')
    )
   );
    
   task('build',
    series(
      'clean',
      parallel('copy:img','copy:html','copy:svg',  'styles', 'scripts'))
   );

  //watch('./src/css/**/*.scss', series('styles'));
  //watch('./src/*.html', series('copy:html'));
  
  //task('default', series('clean', 'copy:img','copy:html','copy:svg', 'styles','scripts', 'server'));