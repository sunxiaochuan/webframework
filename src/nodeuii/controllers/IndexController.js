import IndexModel from '../models/IndexModel';
class IndexController{
    constructor(opts){
        // this.indexservice = opts.service.indexModelIns;
    }
    index(){
        return async(ctx,next) =>{
            var indexModelIns = new IndexModel();
            //await 后面记得一定要接一个 promise 
            const result = await indexModelIns.getData();
            // const result = await this.indexservice.getData();
            ctx.body = await ctx.render('index',{data:result});
        }
    }
}
export default IndexController;