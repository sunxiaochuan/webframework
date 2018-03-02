//这个 Model 主要是为了可以随意的去发数据来用的
class IndexService{
    constructor(){

    }
    //构建一个获取数据的方法
    get(id){
        return new Promise((resolve,reject)=>{
            setTimeout(function(){
                resolve("Hello World" + "【" + id + "】");// `${id}`
            },1000)
        })
    }
}

export default IndexService;