var gulp = require("gulp"),
    cssLint = require("gulp-csslint"),
    cssMinifier = require("gulp-minify-css"),
    sourcemaps = require("gulp-sourcemaps"),
    jshint = require("gulp-jshint"),
    jsStylish = require("jshint-stylish"),
    jsUglify = require("gulp-uglify"),
    jsConcat = require("gulp-concat"),
    jsNotify = require("gulp-notify");

gulp.task("copy-externals", function(){
    gulp.src("./bower_components/modernizr/modernizr.js")
        .pipe(gulp.dest("./app/dist/js"));

    gulp.src("./bower_components/bootstrap/dist/**")
        .pipe(gulp.dest("./app/dist/bootstrap/"));
});

gulp.task("css-build", function(){
    gulp.src("./app/styles/*.css")
        .pipe(cssLint({
            'ids': false
        }))
        .pipe(cssLint.reporter("junit-xml"))
        .pipe(cssLint.reporter("fail")) // als er een fout in de css zit wordt de rest niet overschreven
        .pipe(sourcemaps.init()) // eerst sourcemaps voor minify
        .pipe(cssMinifier())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./app/dist/css"));
});


gulp.task("watch", function () {
    var cssWatcher = gulp.watch("./app/styles/*.css", ["css-build"]);
    cssWatcher.on("change", function(event){
        console.log("file: " + event.path + " was " + event.type);
    });

    var jsWatcher = gulp.watch("./app/scripts/*.js", ["js-build"]);
    jsWatcher.on("change", function(event){
        console.log("file: " + event.path + " was " + event.type);
    });
});

gulp.task("js-build", function(){
    gulp.src("./app/scripts/**/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter(jsStylish))
        .pipe(sourcemaps.init())
        .pipe(jsConcat("app.min.js"))
        .pipe(jsUglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./app/dist/js"))
        .pipe(jsNotify({message: "js built"}));
});