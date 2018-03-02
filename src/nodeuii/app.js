import Koa from 'koa'; //引入 koa  面向node.js的表现型HTTP中间件框架，使Web应用程序和API更加令人愉快地编写 (https://www.npmjs.com/package/koa)
import router from 'koa-simple-router'; //引入 koa-simple-router 简单而快速的路由器(https://www.npmjs.com/package/koa-simple-router)
import render from 'koa-swig'; //引入 koa-swig  视图渲染 (https://www.npmjs.com/package/koa-swig)
import co from 'co'; //引入 co 配合 koa v2.x & koa-swig 使用的包  co 就是把所有的Generator自执行 (https://www.npmjs.com/package/co)
import serve from 'koa-static'; //引入 koa-static Koa静态文件服务中间件 (https://www.npmjs.com/package/koa-static)
import log4js from 'log4js'; //引入打印错误日志的包 log4js https://www.npmjs.com/package/log4js
import { asClass, createContainer,Lifetime,asValue } from 'awilix';//引用可以实现 IoC 的包 https://github.com/jeffijoe/awilix-koa
import { loadControllers,scopePerRequest } from 'awilix-koa';//引用可以实现 IoC 的包 相应的 koa 版本 https://github.com/jeffijoe/awilix-koa
import dev from './config/dev';//控制开发环境的模拟开关  这个配置只是个点到的东西并没有完善
import config from './config/main'; //引入 端口 配置文件
import ErrorHandler from './middlewares/ErrorHandler';//引入错误提示的中间件文件
const app = new Koa(); //实例化
//控制开发环境的模拟开关
dev.init();

//创建灵魂 IoC (控制反转（Inversion of Control，英文缩写为IoC）) 容器
const container = createContainer();
//关键点  将所有的 controller 的 service 服务到每一个路由中去  这个就是所谓的 DI (依赖注入)了
//先把所有的 service 注册到容器里面来
container.loadModules(['models/*.js'], {
	formatName: 'camelCase',//把文件名转换成驼峰的写法来进行 model 调用  例：TestService -> testService
	resolverOptions: {
		//这里也可以设置注入时使用的方法  register:asClass  因为默认就是这个设置所以这里就不需要再自行设置了
	  lifetime: Lifetime.SCOPED//这个就是生命周期 SCOPED 实现的是 当每一个用户第一次过来请求的页面的时候给其新建一个实例，他再来就会用上次生成的缓存不会再新创建实例
	}
  });
//!!!!!  Service 中心注入到对应的 container 中去
app.use(scopePerRequest(container)); 
//awilix 可以传一个贯穿全局的值
app.use((ctx,next)=>{
	ctx.state.container.register({
		user:asValue('di')
	});
	return next();
});

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
//初始化所有路由  这里 use 的目的：保证 ctx 上下文顺利的进行传输
app.use(loadControllers('controllers/*.js', { cwd: __dirname }))
//配置程序启动端口
app.listen(config.port, () => {
	// console.log('Server is start');
	// console.log(config);
});