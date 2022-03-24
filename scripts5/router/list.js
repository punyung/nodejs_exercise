// 用于存放list的所有接口
const Router = require("koa-router"); // 引入路由
const list = new Router();

// 写对应的接口

list.get('/', async (ctx)=>{
    ctx.body = "list-首页"; // 相当于ctx.response.body 简写，接口1
})


list.get('/yinger', async (ctx)=>{
    ctx.body = "list-yinger"; // 相当于ctx.response.body 简写，接口2
})

list.get('/wanju', async (ctx)=>{
    ctx.body = "list-wanju"; // 相当于ctx.response.body 简写，接口3
})


module.exports = list;