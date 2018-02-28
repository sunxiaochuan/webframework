import Koa from 'koa'; //引入 koa  面向node.js的表现型HTTP中间件框架，使Web应用程序和API更加令人愉快地编写 (https://www.npmjs.com/package/koa)
import router from 'koa-simple-router'; //引入 koa-simple-router 简单而快速的路由器(https://www.npmjs.com/package/koa-simple-router)
import render from 'koa-swig'; //引入 koa-swig  视图渲染 (https://www.npmjs.com/package/koa-swig)
import co from 'co'; //引入 co 配合 koa v2.x & koa-swig 使用的包  co 就是把所有的Generator自执行 (https://www.npmjs.com/package/co)
import serve from 'koa-static'; //引入 koa-static Koa静态文件服务中间件 (https://www.npmjs.com/package/koa-static)
import log4js from 'log4js'; //引入打印错误日志的包 log4js https://www.npmjs.com/package/log4js
import config from './config/main'; //引入 端口 配置文件
import InitController from './controllers/InitController'; //引入初始化路由配置文件
import ErrorHandler from './middlewares/ErrorHandler';//引入错误提示的中间件文件
const app = new Koa(); //实例化

//配置 render 静态页面的方法
app.context.render = co.wrap(render({
	root: config.viewDir,
	autoescape: true,
	cache: 'memory', // disable, set to false 
	ext: 'html',
	writeBody: false,
	varControls:['[[',']]']//这个是设置后台往 html 传数据时将默认的 {{}} 的写法  改为 [[]] 避免与 vue 或者是其他框架出现冲突
}));
//配置 打印错误日志 的方法
log4js.configure({
	appenders: { xclog: { type: 'file', filename: './logs/xc.log' } },//创建一个打印日志的文件
	categories: { default: { appenders: ['xclog'], level: 'error' } }//往谁的里面去追加 & 追加的是什么
});
const logger = log4js.getLogger('xclog');

//配置引用页面静态资源的方法
app.use(serve(config.staticDir));
//使用中间件进行容错
ErrorHandler.error(app,logger);
//初始化所有路由
InitController.getAllrouters(app, router);
//配置程序启动端口
app.listen(config.port, () => {
	console.log('Server is start');
	console.log(config);
});