"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
//这个 Model 主要是为了可以随意的去发数据来用的
class IndexModel {
    constructor() {}
    //构建一个获取数据的方法
    getData() {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve("Hello World");
            }, 1000);
        });
    }
}

exports.default = IndexModel;