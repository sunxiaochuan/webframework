import IndexModel from '../models/IndexModel';
class IndexController{
    constructor(){
    }
    index(){
        return async(ctx,next) =>{
            ctx.body = '123'; 
        }
    }
}
export default IndexController;