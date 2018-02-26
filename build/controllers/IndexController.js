'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _IndexModel = require('../models/IndexModel');

var _IndexModel2 = _interopRequireDefault(_IndexModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class IndexController {
    constructor() {}
    index() {
        return async (ctx, next) => {
            ctx.body = '123';
        };
    }
}
exports.default = IndexController;