import gulp from 'gulp';
import browserSync from 'browser-sync';

import { paths } from './gulp/config/paths.js';
import { clean } from './gulp/tasks/clean.js';
import { svgSprites } from './gulp/tasks/sprite.js';
import { styles } from './gulp/tasks/styles.js';
import { stylesBackend } from './gulp/tasks/styles-backend.js';
import { scripts } from './gulp/tasks/scripts.js';
import { scriptsBackend } from './gulp/tasks/scripts-backend.js';
import { resources } from './gulp/tasks/resources.js';
import { images } from './gulp/tasks/images.js';
import { webpImages } from './gulp/tasks/webp.js';
import { cacheTask } from './gulp/tasks/cache.js';

global.app = {
  gulp,
  isProd: process.argv.includes('--build'),
  paths,
}

const watcher = () => {
    browserSync.init({
        proxy: "gulp-php.local", // Укажите ваш локальный сервер (например, localhost)
        notify: false,
        port: 3000,
    });

  gulp.watch(app.paths.srcScss, styles);
  gulp.watch(app.paths.srcFullJs, scripts);
  gulp.watch(app.paths.srcPhp).on('change', browserSync.reload);
  gulp.watch(`${app.paths.resourcesFolder}/**`, resources);
  gulp.watch(`${app.paths.srcImgFolder}/**/**.{jpg,jpeg,png,svg}`, images);
  gulp.watch(`${app.paths.srcImgFolder}/**/**.{jpg,jpeg,png}`, webpImages);
  gulp.watch(app.paths.srcSvg, svgSprites);
}

const dev = gulp.series(clean, scripts, styles, resources, images, webpImages, svgSprites, watcher);
const backend = gulp.series(clean, scriptsBackend, stylesBackend, resources, images, webpImages, svgSprites);
const build = gulp.series(clean, scripts, styles, resources, images, webpImages, svgSprites);
const cache = gulp.series(cacheTask);

export { dev }
export { build }
export { backend }
export { cache }

gulp.task('default', dev);
