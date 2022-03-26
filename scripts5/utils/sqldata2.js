// 文章数据录入
// 文章一大段
// 文章标题+小标题

const fs = require('fs');
const db = require('./db');
//const path = require('path');



// // 测试读取vue.txt文件
// fs.readFile(`assets/vue.txt`, (err, data)=>{
//     if(err) throw err;
//     console.log( data.toString() );	// 这里读取到的文件是二进制文件流，因此要转字符串
// })

//把读取流程封装成函数
// function readFileFn(arg){
//     fs.readFile(`assets/${arg}.txt`, (err, data)=>{
//      if(err) throw err;
//      console.log( data.toString() );	// 这里读取到的文件是二进制文件流，因此要转字符串
//     })
//
// }
// readFileFn('react')



//通过异步函数的返回值，得到数据
function readFileFn(subject){
    return new Promise((resolve, reject)=>{
        fs.readFile(`assets/${subject}.txt`, (err, data)=>{
            if(err) throw err;
            resolve(data.toString())
        })
    })
}

// let vueTxt = readFileFn('vue');
// let reactTxt = readFileFn('react');
// let angularTxt = readFileFn('angular');



// 创建联表数据（，终端运行）
// CREATE TABLE zixun(
//     id INT PRIMARY KEY COMMENT '资讯id',
//     title VARCHAR(100) COMMENT '标题',
//     subtitle VARCHAR(100) COMMENT '子标题',
//     icon VARCHAR(100) NOT NULL COMMENT 'logo'
// );
//
// CREATE TABLE article(
//     id INT PRIMARY KEY COMMENT '资讯id',
//     title VARCHAR(20) COMMENT '标题',
//     author VARCHAR(20) COMMENT '作者',
//     date VARCHAR(20) COMMENT '日期',
//     imgUrl VARCHAR(100) COMMENT '配图',
//     content LONGTEXT COMMENT '内容-存储html标签',
//     FOREIGN KEY (id) REFERENCES zixun(id)
// );

// 异步函数如何保证，先执行line35-line37的赋值
// 使用async，await


let vueContent, reactContent, angularContent;
var fn = async () => {
    // 分别读取这几份txt文件
    vueContent = await readFileFn('vue');
    reactContent = await readFileFn('react');
    angularContent = await readFileFn('angular');

    let data = [
        {id: 0, title: "一套框架多种平台 移动端&桌面端", author: "张三丰", date: "2013-03-22", imgUrl: "/images/ht2.jpg", content: angularContent},
        {id: 1, title: "渐进式的JavaScript 框架", author: "小鱼儿", date: "2014-04-23", imgUrl: "/images/ht3.jpg", content: vueContent},
        {id: 2, title: "一套框架多种平台 移动端&桌面端", author: "花无缺", date: "2015-05-24", imgUrl: "/images/ksat.jpg", content: reactContent}
    ]

    data.map(val=>{
        let sql = `INSERT INTO article VALUES (${val.id}, '${val.title}', '${val.author}', '${val.date}', '${val.imgUrl}', '${val.content}')`;
        db.query(sql, (err, data)=>{
            if(err) console.log(err);
            console.log(data)
        })
    })
}
fn();







// 根据arr有多少项，从而决定插入几条数据到article表
// 如果插入数据的表有外键，必须先保证外键相连的表有数据；
// 例如：先插入数据到"zixun"，再插入数据到"article"


// 插入数据到"zixun"表中

/*
// 给表zixun添加数据
const db = require('./db')
const data = [
    {id: 0, icon: '/images/angular.gif', subtitle: "学会用 Angular 构建应用，把这些代码和能力复用在多种不同平台的应用上", title: "一套框架多种平台 移动端&桌面端"},
    {id: 1, icon: '/images/vue.gif', subtitle: "不断繁荣的生态系统，可以在一个库和一套完整框架之间自如伸缩", title: "渐进式的JavaScript 框架"},
    {id: 2, icon: '/images/react.gif', subtitle: "组件逻辑使用 JavaScript 编写而非模版，你可以轻松地在应用中传递数据，并使得状态与 DOM 分离", title: "用于构建用户界面的 JavaScript 库"},
]

data.map(val=>{
    let sql = `INSERT INTO zixun VALUES (${val.id}, '${val.title}', '${val.subtitle}', '${val.icon}')`;
    db.query(sql, (err, data)=>{
        if(err) console.log(err);
        console.log(data)
    })
})
*/
