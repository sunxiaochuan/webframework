# 这是一个自己写的 `web` 前端构建框架
>tip：主要完成的是 `node` 端的部分 ,注释较多都写在源码内部；
使用到的包请查看 `package.json` 文件  
##  安装项目依赖
```
npm install
```
## 开发环境编译
```
npm run build:dev
```
## 生产环境编译
```
npm run build:prod
```
## 热启项目文件
```
cd build
supervisor app.js
```
## 浏览器访问项目
```
//开发环境端口号：8081
//生产环境端口号：80
//两个自行创建的路由
http://localhost:8081/users/:id               :id 为任意参数
http://localhost:8081/hello
```
#### 整个项目的实现笔记
-   [BFF 整个完整的 web 前端框架构建（一）](https://www.jianshu.com/p/a829b1da7ed0)
-   [BFF 整个完整的 web 前端框架构建（二）](https://www.jianshu.com/p/e928ed631313)
-   [BFF 整个完整的 web 前端框架构建（三）](https://www.jianshu.com/p/b85331028ac5)