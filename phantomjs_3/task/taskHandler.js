const exec = require('child_process').exec;
const execAsync = require('async-child-process').execAsync;
const router = require('koa-router');
var task = new router();
const Data = require('../models/Data');
task.post('/1', async(ctx) => {
  console.log("post?");
  let keyword = ctx.request.body.keyword || '',
    searchUrl = ctx.request.body.url || '';
  let resultData = new Object();
  ctx.response.type = 'application/json';
  if (keyword) {
    console.log("search：" + keyword);
    const cmd = `node --harmony-async-await ./task/task.js ${keyword}`;
    console.log("cmd with" + cmd);
    //调用
    const {
      stdout
    } = await execAsync(cmd);
    const data = JSON.parse(stdout.slice(stdout.indexOf('{')));
    console.log(stdout);
    if (data['code'] == 1) {
      let dataList = data['dataList'];
      resultData['code'] = 1;
      resultData['data'] = dataList
      Data.save(data, (err) => {
        if (err) {
          console.log(err);
        }
      });
    } else {
      resultData['code'] = 0;
    }

  }
  ctx.response.body = resultData;
})
module.exports = {
  'router': task
}