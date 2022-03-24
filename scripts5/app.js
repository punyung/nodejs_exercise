// 启动项目方式：npm start or node app.js
// koa项目入口文件



const Koa = require("koa2"); // Koa 为构造函数
const app = new Koa(); //声明实例app
const port = 5050; // 端口号
const router = require('./router'); //因为是index文件，可以直接以文件夹名字进行默认
const db = require('../utils/db.js');

//use调用router的中间件
app.use(router.routes(),router.allowedMethods());// 参数1：启动路由，参数2：允许任何请求（get，post，put）

// app.use(async (ctx)=>{ //调用中间件, 通过ctx.response.body="",返回数据给页面
//     ctx.response.body = "Hello,koa";
// });



// 页面底部外链
.get('/', async (ctx) => {
    let data = await new Promise((resolve, reject)=>{
        let sqlLang = `select * from users`;
        db.query(sqlLang, (err, data)=>{
            if(err) reject(err);
            resolve(data);	// 返回拿到的数据
        })
    })
    ctx.body = data;
})





app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
});