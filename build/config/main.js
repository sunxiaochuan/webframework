'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _local = require('./local');

var _local2 = _interopRequireDefault(_local);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//引入 path 路径包 (https://www.npmjs.com/package/path)

//声明一个上线端口配置的对象
//引入 lodash (https://www.npmjs.com/package/lodash)  [lodash 中文网](https://www.lodashjs.com/)
const server = {
    'port': 80 //设置上线版本的端口号 一般都是 80
};

//声明一个程序主要配置的对象
//引入本地开发环境的配置
//上线环境的配置
let config = {
    'viewDir': _path2.default.join(__dirname, '../views'), //页面目录
    'staticDir': _path2.default.join(__dirname, '../assets'), //静态资源目录
    'env': process.env.NODE_ENV //程序进程相应名称    development(本地)   procuction(线上)
};
if (config.env == 'procuction') {
    //判断如果进程是上线状态
    config = _lodash2.default.extend(config, server);
} else {
    config = _lodash2.default.extend(config, _local2.default);
}
exports.default = config;