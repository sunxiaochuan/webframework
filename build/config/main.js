'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _local = require('./local');

var _local2 = _interopRequireDefault(_local);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//引入本地开发环境的配置

//上线环境的配置
const server = {
    'port': 80 //设置上线版本的端口号 一般都是 80
}; //引入 lodash (https://www.npmjs.com/package/lodash)  [lodash 中文网](https://www.lodashjs.com/)

let config = {
    'env': process.env.NODE_ENV
};
if (config.env == 'procuction') {
    //判断如果进程是否是上线状态
    config = _lodash2.default.extend(server);
} else {
    config = _lodash2.default.extend(_local2.default);
}
exports.default = config;