const gulp = require('gulp');
const babel = require('gulp-babel');//引入 gulp 的编译工具 https://www.npmjs.com/package/gulp-babel
const watch = require('gulp-watch');//引入 gulp 的监听工具 https://www.npmjs.com/package/gulp-watch
const rollup = require('gulp-rollup');//引入清洗 node 无用代码片段的包 https://www.npmjs.com/package/gulp-rollup
const replace = require('rollup-plugin-replace');//引入可以时 rolup 清洗时识别 ENV 的包  https://www.npmjs.com/package/rollup-plugin-replace
// const rollup = require('gulp-better-rollup');//引入可以替代 babel 的rollup 编译工具，出来的东西很干净，唯一不足的是没有 rollup 的清洗能力 https://www.npmjs.com/package/gulp-better-rollup

//开发阶段的 task
gulp.task('builddev', () => {
    return watch('./src/nodeuii/**/*.js', {
        ignoreInitial: false
    }, () => {
        gulp.src('./src/nodeuii/**/*.js')//需要编译的文件
            .pipe(babel({
                babelrc: false,//这个可以不使用全局的 .babelrc 配置文件 然后在下面自定义需要的配置
                'plugins': [
                    'transform-es2015-modules-commonjs'//https://www.npmjs.com/package/babel-plugin-transform-es2015-modules-commonjs
                ]
            }))
            .pipe(gulp.dest('./build/'))//文件编译后储存的目录
    })
}
);

//上线版本的 task
//babel + rollup 流清理

//清洗 nodeuii 目录中其他的 js 文件
gulp.task('buildother', () => {
    gulp.src('./src/nodeuii/**/*.js')//需要编译的文件
        .pipe(babel({
            babelrc: false,//这个可以不使用全局的 .babelrc 配置文件 然后在下面自定义需要的配置
            'ignore': ['./src/nodeuii/app.js'],//排除启动文件使其只在下面的 rollup 中进行编译避免重复编译所产生的问题
            'plugins': [
                'transform-es2015-modules-commonjs'//https://www.npmjs.com/package/babel-plugin-transform-es2015-modules-commonjs
            ]
        }))
        .pipe(gulp.dest('./build/'))//文件编译后储存的目录
});
//单独清洗 nodeuii 目录中的 app.js 文件
gulp.task('buildapp', () =>
    gulp.src('./src/nodeuii/**/*.js')//需要编译的文件
        .pipe(rollup({
            input: ['./src/nodeuii/app.js'],//需要清洗的文件
            format: 'cjs',
            'plugins': [
                replace({//这里是将 env 进程不是 procuction 便会自动不执行了
                    'process.env.NODE_ENV': JSON.stringify('procuction')
                })
            ]
        }))
        .pipe(gulp.dest('./build/'))//文件编译后储存的目录
);

//创建一个接收任务字符串的变量
let _task = ['builddev'];
if(process.env.NODE_ENV == 'procuction'){//判断进程中使用的是 dev 还是 prod   执行相应的任务
    _task = ['buildother','buildapp'];
}

//这个执行一个默认就会执行的 task
gulp.task('default', _task);