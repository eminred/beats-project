const { src, dest, task, series, watch, parallel } = require("gulp");
const rm = require('gulp-rm');
const gulp = require('gulp');
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
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

const {SRC_PATH, DIST_PATH, JS_LIBS} = require('./gulp.config');

sass.compiler = require('sass');

task('clean', () => {
return src(`${DIST_PATH}/**/*`, { read: false })
  .pipe(rm())
})

task('copy:html', () => {
return src(`${SRC_PATH}/*.html`)
  .pipe(dest(DIST_PATH))
  .pipe(reload({ stream: true }));
})

task('css', () => {
return src([ 'src/css/main.scss'])
  .pipe(gulpif(env === 'dev', sourcemaps.init()))
  .pipe(concat('main.min.scss'))
  .pipe(sassGlob())
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./css'))
  .pipe(px2rem())
  .pipe(gulpif(env === 'prod', autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    })))
  .pipe(gulpif(env === 'prod', gcmq()))
  .pipe(gulpif(env === 'prod', cleanCSS()))
  .pipe(gulpif(env === 'dev', sourcemaps.write()))
  .pipe(dest(DIST_PATH))
  .pipe(reload({ stream: true }));
});

const libs = [
'node_modules/jquery/dist/jquery.js',
'src/scripts/*.js'
];

task('scripts', () => {
return src([...JS_LIBS, 'src/scripts/*.js'])
  .pipe(gulpif(env === 'dev', sourcemaps.init()))
  .pipe(concat('main.min.js', {newLine: ';'}))
  .pipe(gulpif(env === 'prod', babel({
      presets: ['@babel/env']
    })))
  .pipe(gulpif(env === 'prod', uglify()))
  .pipe(gulpif(env === 'dev', sourcemaps.write()))
  .pipe(dest(DIST_PATH))
  .pipe(reload({ stream: true }));
});

task('img', () => {
return src('src/images/img/*.svg')
  .pipe(svgo({
    plugins: [
      {
        removeAttrs: {
          attrs: '(fill|stroke|style|width|height|data.*)'
        }
      }
    ]
  }))
  .pipe(svgSprite({
    mode: {
      symbol: {
        sprite: '../sprite.svg'
      }
    }
  }))
  .pipe(dest(`${DIST_PATH}/images/img`));
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
watch('./src/css/**/*.scss', series('css'));
watch('./src/*.html', series('copy:html'));
watch('./src/scripts/*.js', series('scripts'));
watch('./src/images/img/*.svg', series('img'));
});


task('default',
series(
  'clean',
  parallel('copy:html', 'css', 'scripts', 'img'),
  parallel('watch', 'server')
)
);

task('build',
series(
  'clean',
  parallel('copy:html', 'css', 'scripts', 'img'))
);