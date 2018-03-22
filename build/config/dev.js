'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const dev = {
    init: function () {
        if (process.env.NODE_ENV == 'development') {
            console.log('development');
        }
        if (process.env.NODE_ENV == 'tesing') {
            console.log('tesing');
        }
        if (process.env.NODE_ENV == 'procuction') {
            console.log('procuction');
        }
    }
};
exports.default = dev;