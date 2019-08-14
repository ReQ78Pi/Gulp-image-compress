var gulp             = require('gulp');
var plumber          = require('gulp-plumber');
var imagemin         = require('gulp-imagemin');
var imageminMozjpeg  = require('imagemin-mozjpeg');
var imageminPngquant = require('imagemin-pngquant');
var imageminGifsicle = require('imagemin-gifsicle');
var rename           = require('gulp-rename');
var watch            = require('gulp-watch');

  /*----------------------------------------------------------------
  Path
  -----------------------------------------------------------------*/
  var path = {
  	src:   'src/**/*.{JPG,jpg,jpeg,png,gif}',
  	dest:  'compressed',
  };

  /*----------------------------------------------------------------
  Task: gulp compress
  -----------------------------------------------------------------*/
  gulp.task('compress', function() {
  	return gulp.src(path.src)
  	.pipe(plumber())
  	.pipe(imagemin([
      // Jpeg
      imagemin.jpegtran({
       progressive: true
     }),
      imageminMozjpeg({
       quality: 100,
       progressive: true,
       tune: 'ms-ssim'
     }),
      // Png
      imageminPngquant({
        speed: 4,
        strip: true,
        dithering: 1,
        quality: [0.95, 1]
      }),
      imageminGifsicle({
        optimizationLevel: 3,
      }),
      ]))
  	.pipe(rename(function (path) {
  			path.basename += "-min";
  	}))
  	.pipe(gulp.dest(path.dest))
  });


  /*----------------------------------------------------------------
  Task: gulp livecomress
  -----------------------------------------------------------------*/
  
  gulp.task('livecompress', function() {
  	gulp.watch([path.src], gulp.series('compress'));
  });