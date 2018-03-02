const ErrorHandler = {
    error(app, logger) {
        //打印错误日志
        app.use(async (ctx, next) => {
            try {
                await next();
            } catch (err) {
                logger.error(err);
                ctx.status = err.status || 500;
                ctx.body = 500;
            }
        });
        app.use(async (ctx, next) => {
            await next();//这里是打个标记还要回来的
            if(404 != ctx.status) return;
            ctx.status = 404;
            ctx.body = 404;
        });
    }
}
export default ErrorHandler;