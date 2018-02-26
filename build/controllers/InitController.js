'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _IndexController = require('./IndexController');

var _IndexController2 = _interopRequireDefault(_IndexController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//koa-simple-router 示例代码片段 https://www.npmjs.com/package/koa-simple-router
// app.use(router(_ => {
//     _.get('/', (ctx, next) => {
//         ctx.body = 'hello'
//     })
//     _.post('/name/:id', (ctx, next) => {
//         // ... 
//     })
// })

const IndexControllerIns = new _IndexController2.default(); //初始化路由

const InitController = {
    getAllrouters(app, router) {
        app.use(router(_ => {
            _.get('/', IndexControllerIns.index());
            _.get('/Index.html', IndexControllerIns.index());
        }));
    }
};
exports.default = InitController;