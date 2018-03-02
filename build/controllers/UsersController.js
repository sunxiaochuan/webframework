'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _dec, _dec2, _dec3, _dec4, _class, _desc, _value, _class2;

var _awilixKoa = require('awilix-koa');

var _xcAauthenticate = require('../middlewares/xcAauthenticate');

var _xcAauthenticate2 = _interopRequireDefault(_xcAauthenticate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

//引入一个路由守护的方法

//路由名称叫 users    这样的写法是 ES6 装饰性函数  decorator  http://es6.ruanyifeng.com/#docs/decorator
let UserAPI = (_dec = (0, _awilixKoa.route)('/users'), _dec2 = (0, _awilixKoa.route)('/:id'), _dec3 = (0, _awilixKoa.GET)(), _dec4 = (0, _awilixKoa.before)([(0, _xcAauthenticate2.default)()]), _dec(_class = (_class2 = class UserAPI {
    //UserAPI 是  users 的API
    constructor({ userService, user }) {
        this.userService = userService;
        this.user = user;
    }

    //这个是注册了一个方法 相当于 users/:id  假设访问的是 users/4 -> 实际上就到了下面的 async 函数里
    //拿回来一个 promise 的 API
    //use 的方式去 load 的所有的 controllers
    //这个做的是路由守护的事情  这里守护之后就不会往下面执行了 逻辑就都在  xcAauthenticate 里面写了
    async getUser(ctx) {
        console.log('贯穿的 user 值： ' + this.user);
        const result = await this.userService.get(ctx.params.id);
        // console.log("获取到的数据："+ result);
        ctx.body = await ctx.render('index', { data: result });
    }
}, (_applyDecoratedDescriptor(_class2.prototype, 'getUser', [_dec2, _dec3, _dec4], Object.getOwnPropertyDescriptor(_class2.prototype, 'getUser'), _class2.prototype)), _class2)) || _class);
exports.default = UserAPI;