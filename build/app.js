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

var _awilix = require('awilix');

var _awilixKoa = require('awilix-koa');

var _dev = require('./config/dev');

var _dev2 = _interopRequireDefault(_dev);

var _main = require('./config/main');

var _main2 = _interopRequireDefault(_main);

var _ErrorHandler = require('./middlewares/ErrorHandler');

var _ErrorHandler2 = _interopRequireDefault(_ErrorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//引入错误提示的中间件文件
//控制开发环境的模拟开关  这个配置只是个点到的东西并没有完善
//引用可以实现 IoC 的包 https://github.com/jeffijoe/awilix-koa
//引入 koa-static Koa静态文件服务中间件 (https://www.npmjs.com/package/koa-static)
//引入 koa-swig  视图渲染 (https://www.npmjs.com/package/koa-swig)
//引入 koa  面向node.js的表现型HTTP中间件框架，使Web应用程序和API更加令人愉快地编写 (https://www.npmjs.com/package/koa)
const app = new _koa2.default(); //实例化
//控制开发环境的模拟开关
//引入 端口 配置文件
//引用可以实现 IoC 的包 相应的 koa 版本 https://github.com/jeffijoe/awilix-koa
//引入打印错误日志的包 log4js https://www.npmjs.com/package/log4js
//引入 co 配合 koa v2.x & koa-swig 使用的包  co 就是把所有的Generator自执行 (https://www.npmjs.com/package/co)
//引入 koa-simple-router 简单而快速的路由器(https://www.npmjs.com/package/koa-simple-router)
_dev2.default.init();

//创建灵魂 IoC (控制反转（Inversion of Control，英文缩写为IoC）) 容器
const container = (0, _awilix.createContainer)();
//关键点  将所有的 controller 的 service 服务到每一个路由中去  这个就是所谓的 DI (依赖注入)了
//先把所有的 service 注册到容器里面来
container.loadModules(['models/*.js'], {
	formatName: 'camelCase', //把文件名转换成驼峰的写法来进行 model 调用  例：TestService -> testService
	resolverOptions: {
		//这里也可以设置注入时使用的方法  register:asClass  因为默认就是这个设置所以这里就不需要再自行设置了
		lifetime: _awilix.Lifetime.SCOPED //这个就是生命周期 SCOPED 实现的是 当每一个用户第一次过来请求的页面的时候给其新建一个实例，他再来就会用上次生成的缓存不会再新创建实例
	}
});
//!!!!!  Service 中心注入到对应的 container 中去
app.use((0, _awilixKoa.scopePerRequest)(container));
//awilix 可以传一个贯穿全局的值
app.use((ctx, next) => {
	ctx.state.container.register({
		user: (0, _awilix.asValue)('di')
	});
	return next();
});

//配置 render 静态页面的方法
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
//初始化所有路由  这里 use 的目的：保证 ctx 上下文顺利的进行传输
app.use((0, _awilixKoa.loadControllers)('controllers/*.js', { cwd: __dirname }));
//配置程序启动端口
app.listen(_main2.default.port, () => {
	// console.log('Server is start');
	// console.log(config);
});