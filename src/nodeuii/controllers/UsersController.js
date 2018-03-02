import { route, GET, POST, before } from 'awilix-koa';
import xcAauthenticate from '../middlewares/xcAauthenticate';//引入一个路由守护的方法

//路由名称叫 users    这样的写法是 ES6 装饰性函数  decorator  http://es6.ruanyifeng.com/#docs/decorator
@route('/users')
export default class UserAPI {//UserAPI 是  users 的API
    constructor({ userService, user }) {
        this.userService = userService;
        this.user = user;
    }

    //这个是注册了一个方法 相当于 users/:id  假设访问的是 users/4 -> 实际上就到了下面的 async 函数里
    //拿回来一个 promise 的 API
    //use 的方式去 load 的所有的 controllers
    @route('/:id')
    @GET()
    @before([xcAauthenticate()])//这个做的是路由守护的事情  这里守护之后就不会往下面执行了 逻辑就都在  xcAauthenticate 里面写了
    async getUser(ctx) {
        console.log('贯穿的 user 值： ' + this.user);
        const result = await this.userService.get(ctx.params.id);
        // console.log("获取到的数据："+ result);
        ctx.body = await ctx.render('index', { data: result });
    }
}