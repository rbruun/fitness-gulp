'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var validate_css = require('gulp-w3c-css');
var path = require('path');
var gutil = require('gulp-util');
var htmlhint = require("gulp-htmlhint");
const babel = require('gulp-babel');
var beautify = require('gulp-beautify');  
var butternut = require('gulp-butternut');  
var moreCSS = require('gulp-more-css');
var htmlmin = require('gulp-htmlmin');

var gulp = require('gulp');

gulp.task('sass', function() {
    return gulp.src('./assets/sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./assets/css/'));
});

gulp.task('w3c-css', function() {
    return gulp.src('./assets/css/*.css')
    .pipe(validate_css())
    .pipe(gulp.dest('./build/css/build'));
})
 
gulp.task('html_hint', function() {
    return gulp.src("*.html")
    .pipe(htmlhint())
    .pipe(htmlhint.reporter())
});

gulp.task('babel', function() {
    return gulp.src('./assets/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./build/js'));
})

gulp.task('beautify', function() {
  gulp.src('./assets/js/*.js')
    .pipe(beautify({indent_size: 2}))
    .pipe(gulp.dest('./build/prettyjs'))
});

gulp.task('compress', function () {
    return gulp.src('./assets/js/*.js')
        .pipe(butternut())
        .pipe(gulp.dest('./build/squashjs'));
});

gulp.task('moreCSS', function() {
    return gulp.src('./assets/css/*.css')
        .pipe(moreCSS())
        .pipe(gulp.dest('./build/squashcss'));
});

gulp.task('minifyhtml', function() {
  return gulp.src('*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./build/squashhtml'));
});

gulp.task('css', ['sass', 'w3c-css', 'moreCSS' ]);
gulp.task('javascript', ['babel', 'beautify', 'compress' ]);
gulp.task('html', ['html_hint', 'minifyhtml']);

gulp.task('default', ['css', 'javascript', 'html' ]);
