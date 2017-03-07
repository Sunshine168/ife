const Koa = require('koa');
const fs = require('fs');
const router = require('koa-router');
const path = require('path');
const views = require('koa-views');
const static = require('koa-static');
const convert = require('koa-convert');
const app = new Koa();
app.use(async(ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

//加载模板引擎
app.use(views(path.join(__dirname, './view'), {
        extension: 'ejs'
    }))
    //静态目录
const staticPath = './static';
//使用静态资源中间件
app.use(convert(static(path.join(__dirname, staticPath))));

let task = new router();
task.get('/', async(ctx) => {
    let title = '百度前端任务'
    await ctx.render('index', {
        title,
    })
});

app.listen(3000);