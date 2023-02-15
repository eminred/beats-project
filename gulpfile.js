    const { src, dest, task, series, watch } = require("gulp");
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

  
  sass.compiler = require('sass');
  
  task('clean', () => {
  return src('dist/**/*', { read: false })
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
  .pipe(sourcemaps.init())
    .pipe(concat('main.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    //.pipe(gcmq())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(dest('dist/css'));
 });

 task('scripts', () => {
  return src('src/scripts/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('main.js', {newLine: ';'}))
    .pipe(sourcemaps.write())
    .pipe(dest('dist'));
 });
  
  
  task('server', () => {
  browserSync.init({
      server: {
          baseDir: "./dist"
      },
      open: false
  });
  });
  
  watch('./src/css/**/*.scss', series('styles'));
  watch('./src/*.html', series('copy:html'));
  
  task('default', series('clean', 'copy:img','copy:html','copy:svg', 'styles','scripts', 'server'));