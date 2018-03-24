var gulp            =  require('gulp');
var image           =  require('gulp-imagemin');
var sass            =  require('gulp-sass');
var uglify          =  require('gulp-uglify');
var browserSync     =  require('browser-sync').create();

//Compilar SCSS em CSS & injetar no navegador
gulp.task('sass', function(){
    return gulp.src(['src/scss/bootstrap.scss', 'src/sass/*.sass'])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

//Otimizar Imagens
gulp.task('image',function(){
    return gulp.src(['src/images/*'])
    .pipe(image())
    .pipe(gulp.dest("src/img"));
});

//Mover JS para src/css
gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 
        'node_modules/jquery/dist/jquery.min.js', 
        'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.stream());
});

// Minify JS
gulp.task('uglify', function() {
    return gulp.src('src/js/*')
        .pipe(uglify())
        .pipe(gulp.dest("src/js/min"));
});

//Seridor para compilar HTML/CSS
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./src"
    });

    gulp.watch(['src/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

//fim
gulp.task('default', ['js', 'serve']);