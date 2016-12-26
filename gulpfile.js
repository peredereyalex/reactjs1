var gulp         = require('gulp'),
    sass         = require('gulp-sass'), //препроцессор для sass/scss
    watch        = require('gulp-watch'), //наблюдение за изменениями в файлах
    concat       = require('gulp-concat'), //конкатенация файлов
    source       = require('gulp-sourcemaps'), //маппинг
    cssnano      = require('gulp-cssnano'), //минификация css
    plumber      = require('gulp-plumber'), //отлавливает ошибки чтобы не прерывался watch
    autoprefixer = require('gulp-autoprefixer'); //автопрефиксер css

var path = {
    build: {
        css: './assets/css/',
    },
    src: {
        styles: './dev/scss/global.scss',
    },
    watch: {
        styles: './dev/scss/**/*.scss',
    }
};

//сборка scss
gulp.task('scss', function() {
    gulp.src([path.src.styles])
        .pipe(plumber())
        .pipe(source.init())
        .pipe(concat('global.min.css'))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(source.write())
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.build.css));
});

//watcher
gulp.task('watch', function(){
    watch([path.watch.styles], function(event, cb) {
        gulp.start('scss');
    });
});

gulp.task('default', ['build']);
