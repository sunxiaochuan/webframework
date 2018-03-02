import { route, GET, POST, before } from 'awilix-koa';

@route('/hello')
export default class HelloAPI {
    constructor({ testService }) {
        this.testService = testService
    }

    @GET()
    //   @before([authenticate()])
    async getUser(ctx) {
        const result = await this.testService.find();
        // console.log("获取到的数据："+ result);
        ctx.body = await ctx.render('index',{data:result});
    }
}