import Koa from 'koa';
import app from 'test';
app();
console.log(Koa);
if(process.env.NODE_ENV == 'development'){//开发环境执行相应脚本
    function test(){
        console.log('test');
    }
    test();
}