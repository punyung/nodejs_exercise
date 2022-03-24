// 用于存放home的所有接口
const Router = require("koa-router"); // 引入路由
const home = new Router();

// 写对应的接口

home.get('/', async (ctx)=>{
    ctx.body = "首页"; // 相当于ctx.response.body 简写，接口1
})


home.get('/banner', async (ctx)=>{
    ctx.body = "首页-bbb"; // 相当于ctx.response.body 简写，接口2
})

home.get('/footer', async (ctx)=>{
    ctx.body = "首页-ff"; // 相当于ctx.response.body 简写，接口3
})


module.exports = home;