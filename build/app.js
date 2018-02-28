'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaSimpleRouter = require('koa-simple-router');

var _koaSimpleRouter2 = _interopRequireDefault(_koaSimpleRouter);

var _koaSwig = require('koa-swig');

var _koaSwig2 = _interopRequireDefault(_koaSwig);

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _log4js = require('log4js');

var _log4js2 = _interopRequireDefault(_log4js);

var _main = require('./config/main');

var _main2 = _interopRequireDefault(_main);

var _InitController = require('./controllers/InitController');

var _InitController2 = _interopRequireDefault(_InitController);

var _ErrorHandler = require('./middlewares/ErrorHandler');

var _ErrorHandler2 = _interopRequireDefault(_ErrorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//引入错误提示的中间件文件
//引入 端口 配置文件
//引入 koa-static Koa静态文件服务中间件 (https://www.npmjs.com/package/koa-static)
//引入 koa-swig  视图渲染 (https://www.npmjs.com/package/koa-swig)
//引入 koa  面向node.js的表现型HTTP中间件框架，使Web应用程序和API更加令人愉快地编写 (https://www.npmjs.com/package/koa)
const app = new _koa2.default(); //实例化

//配置 render 静态页面的方法
//引入初始化路由配置文件
//引入打印错误日志的包 log4js https://www.npmjs.com/package/log4js
//引入 co 配合 koa v2.x & koa-swig 使用的包  co 就是把所有的Generator自执行 (https://www.npmjs.com/package/co)
//引入 koa-simple-router 简单而快速的路由器(https://www.npmjs.com/package/koa-simple-router)
app.context.render = _co2.default.wrap((0, _koaSwig2.default)({
	root: _main2.default.viewDir,
	autoescape: true,
	cache: 'memory', // disable, set to false 
	ext: 'html',
	writeBody: false,
	varControls: ['[[', ']]'] //这个是设置后台往 html 传数据时将默认的 {{}} 的写法  改为 [[]] 避免与 vue 或者是其他框架出现冲突
}));
//配置 打印错误日志 的方法
_log4js2.default.configure({
	appenders: { xclog: { type: 'file', filename: './logs/xc.log' } }, //创建一个打印日志的文件
	categories: { default: { appenders: ['xclog'], level: 'error' } //往谁的里面去追加 & 追加的是什么
	} });
const logger = _log4js2.default.getLogger('xclog');

//配置引用页面静态资源的方法
app.use((0, _koaStatic2.default)(_main2.default.staticDir));
//使用中间件进行容错
_ErrorHandler2.default.error(app, logger);
//初始化所有路由
_InitController2.default.getAllrouters(app, _koaSimpleRouter2.default);
//配置程序启动端口
app.listen(_main2.default.port, () => {
	console.log('Server is start');
	console.log(_main2.default);
});