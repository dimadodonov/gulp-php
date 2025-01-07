import browserSync from 'browser-sync';
import dartSass from 'gulp-dart-sass';
import plumber from 'gulp-plumber';
import autoprefixer from 'gulp-autoprefixer';
import notify from 'gulp-notify';

export const stylesBackend = () => {
    return app.gulp
        .src(app.paths.srcScss)
        .pipe(
            plumber(
                notify.onError({
                    title: 'SCSS',
                    message: 'Error: <%= error.message %>',
                })
            )
        )
        .pipe(dartSass.sync())
        .pipe(
            autoprefixer({
                cascade: false,
                grid: true,
                overrideBrowserslist: ['last 5 versions'],
            })
        )
        .pipe(app.gulp.dest(app.paths.buildCssFolder))
        .pipe(browserSync.stream());
};
