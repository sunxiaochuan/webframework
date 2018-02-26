//上线环境的配置
import _ from 'lodash';//引入 lodash (https://www.npmjs.com/package/lodash)  [lodash 中文网](https://www.lodashjs.com/)
import local from './local';//引入本地开发环境的配置

const server = {
    'port':80//设置上线版本的端口号 一般都是 80
};
let config = {
    'env':process.env.NODE_ENV
};
if(config.env == 'procuction'){//判断如果进程是否是上线状态
    config = _.extend(server);
}else{
    config = _.extend(local);
}
export default config;