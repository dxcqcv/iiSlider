import gulp from 'gulp'; 
import rename from 'gulp-rename'; 
import clean from 'gulp-clean'; 


const dirs = {
  src: 'app/dist',
  dest: 'build'
};

const paths = {
  src: [`${dirs.src}/js/*.js`,`${dirs.src}/js/*.js.map`,`${dirs.src}/css/*.css`,`${dirs.src}/css/*.css.map`,],
  dest: `${dirs.dest}` 
};

gulp.task('clean', () => 
  gulp.src(paths.dest,{read:false})
    .pipe(clean({force:true}))
);

gulp.task('publish',gulp.series('clean',() => {
  return gulp.src(paths.src)
    .pipe(rename(file => {
      // get hash
      const re = /(?:[0-9a-z]+\.){1}([a-z0-9]+)/gi;
      file.basename = file.basename.replace(re,'iiSlider.min')
    }))
    .pipe(gulp.dest(paths.dest));
}));

gulp.task('default',gulp.series('publish'))
