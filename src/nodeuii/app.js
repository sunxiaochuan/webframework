// 顶部为第一阶段 gulp 配置时测试所用
// import Koa from 'koa';
// import app from 'test';
// app();
// console.log(Koa);
// if(process.env.NODE_ENV == 'development'){//开发环境执行相应脚本
//     function test(){
//         console.log('test');
//     }
//     test();
// }

import Koa from 'koa';//引入 koa  面向node.js的表现型HTTP中间件框架，使Web应用程序和API更加令人愉快地编写 (https://www.npmjs.com/package/koa)
import router from 'koa-simple-router';//引入 koa-simple-router 简单而快速的路由器(https://www.npmjs.com/package/koa-simple-router)
import render from 'koa-swig';//引入 koa-swig  视图渲染 (https://www.npmjs.com/package/koa-swig)
import serve from 'koa-static';//引入 koa-static Koa静态文件服务中间件 (https://www.npmjs.com/package/koa-static)
import config from './config/main';//引入 端口 配置文件
import InitController from './controllers/InitController';//引入 InitController
const app = new Koa();//实例化

InitController.getAllrouters(app,router);//初始化所有路由
app.listen(config.port,()=>{
    console.log('Server is start');
    console.log(config);
});