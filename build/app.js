'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaSimpleRouter = require('koa-simple-router');

var _koaSimpleRouter2 = _interopRequireDefault(_koaSimpleRouter);

var _koaSwig = require('koa-swig');

var _koaSwig2 = _interopRequireDefault(_koaSwig);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _main = require('./config/main');

var _main2 = _interopRequireDefault(_main);

var _InitController = require('./controllers/InitController');

var _InitController2 = _interopRequireDefault(_InitController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//引入 InitController
//引入 koa-static Koa静态文件服务中间件 (https://www.npmjs.com/package/koa-static)
//引入 koa-simple-router 简单而快速的路由器(https://www.npmjs.com/package/koa-simple-router)
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

const app = new _koa2.default(); //实例化

//引入 端口 配置文件
//引入 koa-swig  视图渲染 (https://www.npmjs.com/package/koa-swig)
//引入 koa  面向node.js的表现型HTTP中间件框架，使Web应用程序和API更加令人愉快地编写 (https://www.npmjs.com/package/koa)
_InitController2.default.getAllrouters(app, _koaSimpleRouter2.default); //初始化所有路由
app.listen(_main2.default.port, () => {
    console.log('Server is start');
    console.log(_main2.default);
});