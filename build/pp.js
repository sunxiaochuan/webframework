'use strict';

var _dec, _dec2, _desc, _value, _class;

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

//测试 装饰器的写法 了解其运行的过程
//源码网址：http://es6.ruanyifeng.com/#docs/decorator#%E6%96%B9%E6%B3%95%E7%9A%84%E4%BF%AE%E9%A5%B0
function dec(id) {
    console.log('evaluated', id);
    return (target, property, descriptor) => {
        console.log('target', target);
        console.log('property', property);
        console.log('descriptor', descriptor);
    };
}

let Example = (_dec = dec(1), _dec2 = dec(2), (_class = class Example {
    method() {
        console.log('init');
    }
}, (_applyDecoratedDescriptor(_class.prototype, 'method', [_dec, _dec2], Object.getOwnPropertyDescriptor(_class.prototype, 'method'), _class.prototype)), _class));

const s = new Example();
s.method();
//下面的控制台的输出
// evaluated 1                            
// evaluated 2                            
// target Example {}                      
// property method                        
// descriptor { value: [Function: method],
//   writable: true,                      
//   enumerable: false,                   
//   configurable: true }                 
// target Example {}                      
// property method                        
// descriptor { value: [Function: method],
//   writable: true,                      
//   enumerable: false,                   
//   configurable: true }                 
// init