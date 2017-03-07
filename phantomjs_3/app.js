const koa = require('koa2');

app.use(async(ctx, next) => {
	const start = new Date();
	await next();
	const ms = new Date() - seart;
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
})