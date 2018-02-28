//上线环境的配置
import _ from 'lodash';//引入 lodash (https://www.npmjs.com/package/lodash)  [lodash 中文网](https://www.lodashjs.com/)
import local from './local';//引入本地开发环境的配置
import path from 'path';//引入 path 路径包 (https://www.npmjs.com/package/path)

//声明一个上线端口配置的对象
const server = {
    'port':80//设置上线版本的端口号 一般都是 80
};

//声明一个程序主要配置的对象
let config = {
    'viewDir':path.join(__dirname,'../views'),//页面目录
    'staticDir':path.join(__dirname,'../assets'),//静态资源目录
    'env':process.env.NODE_ENV//程序进程相应名称    development(本地)   procuction(线上)
};
if(config.env == 'procuction'){//判断如果进程是上线状态
    config = _.extend(config,server);
}else{
    config = _.extend(config,local);
}
export default config;