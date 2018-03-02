//路由守护相当于是请求的路由在中间做自定义的一些操作 然后更方便的进行控制
const xcAauthenticate = () =>{
    return (target,proerty,descriptor)=>{//语法参照 http://es6.ruanyifeng.com/#docs/decorator#%E6%96%B9%E6%B3%95%E7%9A%84%E4%BF%AE%E9%A5%B0
        console.log('路由守护',proerty);
        
        return proerty();
        const result = 'ok';
        if(result == 'ok'){
            return Property();
        }else{
            // target.redirect('https://www.baidu.com');//这里测试使页面跳转至百度
            target.redirect('/404');
        }
    }
};
export default xcAauthenticate;
