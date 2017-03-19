const Koa = require('koa');
const IO = require('koa-socket')
const fs = require('fs');
const router = require('koa-router');
const path = require('path');
const views = require('koa-views');
const static = require('koa-static');
const convert = require('koa-convert');
const bodyparser = require('koa-bodyparser');
const missionUtil = require('./utils/mission');
const Data = require('./models/Data');
const exec = require('child_process').exec;
const async = require('async');
const io = new IO();
const app = new Koa();
app.use(bodyparser());
app.use(async(ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

//加载模板引擎
app.use(views(path.join(__dirname, './views'), {
        extension: 'ejs'
    }))
    //静态目录
const staticPath = './static';
//使用静态资源中间件
app.use(convert(static(path.join(__dirname, staticPath))));


let index = new router();
index.get('/', async(ctx) => {
    console.log("post?");
    let title = '百度前端任务'
    await ctx.render('index', {
        title,
    })
});

//装载所有子路由
let routers = new router();
//加载任务路由
let task = require('./task/taskHandler').router;
routers.use('/search', task.routes(), task.allowedMethods());
routers.use('/', index.routes(), index.allowedMethods());
app.use(routers.routes()).use(routers.allowedMethods());


io.on('search', (ctx, data) => {
    console.log(data);
    //通过异步队列控制并发
    let queue = async.queue((task, callback) => {
        let cmd = `node --harmony-async-await ./task/task.js ${task.keyword} ${task.device} ${task.page}`;
        exec(cmd, (err, stdout, stderr) => {
            if (err) {
                console.log('error-message' + stderr);
                message = stderr;
            } else {
                let data = JSON.parse(stdout.slice(stdout.indexOf('{')));
                Data.save(data, (err) => {
                    if (err) {
                        console.log(err);
                    }
                })
                ctx.socket.emit('result', {
                    data: data

                })
            }
            callback();
        })

    }, 5);
    let missions = missionUtil.formatMissions(data)
    console.log(missions);
    queue.push(missions);
})

//关联io和app
io.attach(app)
app.listen(3000);