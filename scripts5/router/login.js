// 登陆页的接口


// 用于存放list的所有接口
const Router = require("koa-router"); // 引入路由
const login = new Router();
const bodyparser = require('koa-bodyparser');
const db = require('../utils/db'); //引入数据库
const jwt = require('jsonwebtoken')// 引入token

login.use(bodyparser());// 调用这个中间件，就可以收到前端传过来的数据

// 写对应的接口

login.post('/register', async (ctx)=>{
    //console.log(ctx.request.body);
    // 定义两个变量分别保存账号很密码
    let myaccount = ctx.request.body.account;
    let mypwd = ctx.request.body.pwd;
    //判断数据库里到底有无这个账号，如果有就验证密码，如果没有就注册一条新记录
    let searchSql = `select * from users where account = '${myaccount}' ` //数据库查找语句
    let myarr = await new Promise((resolve, reject) => { // 异步函数，目的是构建账号和密码数组
        return db.query(searchSql,(err,data)=>{
            if (err) throw err;
            if (data.length>0){
                resolve(data);
            }else{
                resolve(false);
            }

        })
    })
    if (myarr.length > 0) {
        // 证明存在这个账号
        if (myarr[0].pwd === mypwd) {
            ctx.body = {
                msg:"登陆成功",
                token:myarr[0].token,
                username:myaccount
            };
        } else {
            ctx.body = {
                msg: '账号或密码错误'
            };
        }
    }else {
        //创建一个token
        const mytoken = jwt.sign({myaccount: myaccount, mypwd: mypwd}, 'secret', {expiresIn: 3600});
        // 没有账号，要注册（往users表中插入一条记录）
        let insertSql = `insert into users(account,pwd,token)values('${myaccount}','${mypwd}','${mytoken}') `
        let result = await new Promise((resolve, reject) => {
            return db.query(insertSql, (err, data) => {
                if (err) throw err;
                    //console.log(data);
                let obj = {
                        msg:"注册成功",
                        token:mytoken,
                        username: myaccount
                }
                resolve(obj);
            })
        });
        ctx.body = result;
    }
    console.log(ctx.body);
})


module.exports = login;