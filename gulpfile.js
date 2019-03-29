/*--------------Стандартный кофиг GULP для Front-End------------------
*| Построение файлов проекта:
*| app/ - основная папка проета
*| -scss/ - файлы стилей scss
*| --main.scss - основной файл стилей
*| --libs.scss - файл для импорта стилей библиотек скачанных (пример: @import "app/libs/magnific-popup/dist/magnific-popup.css" // Импортируем библиотеку Magnific Popup) - пережимает исходники
*| -css/ - папка для скопилированных файлов стилей (*.css)
*| --libs.css - стандартный файл стилей библиотек для минификации (!Можно пошаманить но пока нет временя, сейчас обязателен!)
*| -libs/ - папка для хранения библиотек установленных через bower
*| -js/ - папка с пережатыми скриптами
*| --main.js - основный js файл
*| -img/ - папка с изображениями
*| -fonts/ - папка с шрифтами
*| --limbs.min.js - библиотеки установленные через bower в сжатом виде
*| -index.html
*/

var gulp      = require('gulp'), // Подключаем Gulp
    sass        = require('gulp-sass'), //Подключаем Sass пакет,
    browserSync = require('browser-sync'); // Подключаем Browser Sync
    plumber     = require('gulp-plumber'), // модуль для отслеживания ошибок
    rigger      =require('gulp-rigger'), // модуль для импорта содержимого одного файла в другой
    sourcemaps  = require('gulp-sourcemaps'), // модуль для генерации карты исходных файлов
    concat      = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify      = require('gulp-uglifyjs'); // Подключаем gulp-uglifyjs (для сжатия JS)
    cssnano     = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename      = require('gulp-rename'); // Подключаем библиотеку для переименования файлов
    del         = require('del'); // Подключаем библиотеку для удаления файлов и папок
    imagemin    = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant    = require('imagemin-pngquant'); // Подключаем библиотеку для работы с png
    cache       = require('gulp-cache'); // Подключаем библиотеку кеширования
    autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов (display: -webkit-flex;display: -moz-flex;display: -ms-flex;display: -o-flex;display: flex;)

/*---------------------------DEV-------------------------------*/

/*-----Работа с файлами стилей-----*/

/*Компиляция файлов SCSS*/
gulp.task('sass', function(){ // Создаем таск Sass
    return gulp.src('app/scss/**/*.scss') // Берем источник
        .pipe(plumber()) // для отслеживания ошибок
        .pipe(sourcemaps.init()) // инициализируем sourcemap
        .pipe(sass.sync()) // Преобразуем Sass в CSS посредством gulp-sass (Использовать нужно sass.sync() иначе plumber не работает)
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(sourcemaps.write('./')) // записываем sourcemap
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

/*Минификация стилей библиотек имортированных через libs.scss*/
gulp.task('css-libs', function() {
    return gulp.src('app/css/libs.css') // Выбираем файл для минификации
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
});

/*Компиляция файлов js и доп библиотек*/

/*Обработка js скриптов как своих так и библиотек загруженных через bower*/
/*gulp.task('scripts', function() {
    return gulp.src('app/libs/libs.js') //Дополнительные библиотеки подключенные через rigger
        .pipe(plumber()) // для отслеживания ошибок
        .pipe(rigger()) // импортируем все указанные файлы в main.js
        .pipe(gulp.dest('app/js'))
        .pipe(rename({ suffix: '.min' }))
        //.pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(sourcemaps.init()) //инициализируем sourcemap
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(sourcemaps.write('./')) //  записываем sourcemap
        //.pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});*/

/*Обработка js скриптов из libs через rigger*/
gulp.task('scripts', function () {
  return gulp.src('app/libs/libs.js') // получим файл main.js
    .pipe(plumber()) // для отслеживания ошибок
    .pipe(rigger()) // импортируем все указанные файлы в main.js
    .pipe(gulp.dest('app/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.init()) //инициализируем sourcemap
    .pipe(uglify()) // минимизируем js
    .pipe(sourcemaps.write('./')) //  записываем sourcemap
    .pipe(gulp.dest('app/js')); // положим готовый файл
});

/*Задача для перезагрузки браузера при изменении html*/
gulp.task('code', function() {
    return gulp.src('app/*.html')
    .pipe(browserSync.reload({ stream: true }))
});

/*Синхронизация браузера*/
gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

/*----------------Production----------------------*/

gulp.task('clean', async function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function() {
    return gulp.src('app/img/**/*') // Берем все изображения из app
        .pipe(cache(imagemin({ // С кешированием
        // .pipe(imagemin({ // Сжимаем изображения без кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))/**/)
        .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

gulp.task('prebuild', async function() {

    var buildCss = gulp.src([ // Переносим библиотеки в продакшен
        'app/css/main.css',
        'app/css/libs.min.css'
        ])
    .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
    .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
    .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
    .pipe(gulp.dest('dist'));

});

gulp.task('clear', function (callback) {
    return cache.clearAll();
});

/*---Общие---*/

/*Скрипт наблюдения за файлами*/
gulp.task('watch', function() {
    gulp.watch('app/scss/**/*.scss', gulp.parallel('sass')); // Наблюдение за sass файлами
    gulp.watch('app/*.html', gulp.parallel('code')); // Наблюдение за HTML файлами в корне проекта
    gulp.watch(['app/js/main.js', 'app/libs/**/*.js'], gulp.parallel('scripts')); // Наблюдение за главным JS файлом и библиотеками
});

/*Стандартная задача для gulp (запуск необходимых для сборки dev скриптов)*/
gulp.task('default', gulp.parallel(gulp.series('sass','css-libs'), 'scripts', 'browser-sync', 'watch'));
/*Задача для gulp (запуск необходимых для сборки product скриптов)*/
gulp.task('build', gulp.parallel('prebuild', 'clean', 'img', 'sass', 'scripts'));

/*----Создание файловой структуры------*/

gulp.task('initfiles', async function() {
    gulp.src(['empty/**/*']).pipe(gulp.dest('app'));
});

gulp.task('cleanapp', async function() {
    return del.sync('app'); // Удаляем папку dist перед сборкой
});

gulp.task('init', gulp.parallel('initfiles', 'cleanapp'));
