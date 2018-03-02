//测试 装饰器的写法 了解其运行的过程
//源码网址：http://es6.ruanyifeng.com/#docs/decorator#%E6%96%B9%E6%B3%95%E7%9A%84%E4%BF%AE%E9%A5%B0
function dec(id) {
    console.log('evaluated', id);
    return (target, property, descriptor) => {
        console.log('target',target);
        console.log('property',property);
        console.log('descriptor',descriptor);
    }
}

class Example {
    @dec(1)
    @dec(2)
    method() {
        console.log('init');
    }
}
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