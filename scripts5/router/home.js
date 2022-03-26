// 用于存放home的所有接口
const Router = require("koa-router"); // 引入路由
const home = new Router();
const db = require("../utils/db"); // 接入数据库进行查询

// 写对应的接口

home.get('/', async (ctx)=>{
    ctx.body = "首页"; // 相当于ctx.response.body 简写，接口1
})


home.get('/banner', async (ctx)=>{ // 异步函数用promise来控制获取顺序
    let mydata = await new Promise((resolve,reject)=>
        {
            //访问数据库,获取banner所有数据，给前端
            db.query(`select * from banner`,(err,data)=>{
                if (err) throw err;
                data.map(val=>{
                    val.imgUrl=`http://localhost:5050`+val.imgUrl; //imgUrl=`images/ht2.jpeg`
                    //因为上线之后，地址会发生改变，建议新建一个baseurl.js专门定义'http://localhost:5050'
            })
                resolve(data);
        })
        })
    ctx.body = mydata; // 相当于ctx.response.body 简写，接口2
})

home.get('/footer', async (ctx)=>{
    ctx.body = "首页-ff"; // 相当于ctx.response.body 简写，接口3
})


module.exports = home;