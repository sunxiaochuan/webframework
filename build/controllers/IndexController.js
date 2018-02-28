'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _IndexModel = require('../models/IndexModel');

var _IndexModel2 = _interopRequireDefault(_IndexModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class IndexController {
    constructor(opts) {
        // this.indexservice = opts.service.indexModelIns;
    }
    index() {
        return async (ctx, next) => {
            var indexModelIns = new _IndexModel2.default();
            //await 后面记得一定要接一个 promise 
            const result = await indexModelIns.getData();
            // const result = await this.indexservice.getData();
            ctx.body = await ctx.render('index', { data: result });
        };
    }
}
exports.default = IndexController;