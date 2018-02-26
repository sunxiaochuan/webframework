//初始化路由
import IndexController from './IndexController';

//koa-simple-router 示例代码片段 https://www.npmjs.com/package/koa-simple-router
// app.use(router(_ => {
//     _.get('/', (ctx, next) => {
//         ctx.body = 'hello'
//     })
//     _.post('/name/:id', (ctx, next) => {
//         // ... 
//     })
// })

const IndexControllerIns = new IndexController();
const InitController = {
    getAllrouters(app, router) {
        app.use(router(_=>{
            _.get('/',IndexControllerIns.index())
            _.get('/Index.html',IndexControllerIns.index())
        }));
    }
};
export default InitController;