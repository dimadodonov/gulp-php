import gulpif from 'gulp-if';
import browserSync from 'browser-sync';
import cleanCSS from 'gulp-clean-css';
import dartSass from 'gulp-dart-sass';
import plumber from 'gulp-plumber';
import autoprefixer from 'gulp-autoprefixer';
import notify from 'gulp-notify';

export const styles = () => {
    return app.gulp
        .src(app.paths.srcScss, { sourcemaps: !app.isProd })
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
        .pipe(
            gulpif(
                app.isProd,
                cleanCSS({
                    level: 2,
                })
            )
        )
        .pipe(app.gulp.dest(app.paths.buildCssFolder, { sourcemaps: '.' }))
        .pipe(browserSync.stream());
};
