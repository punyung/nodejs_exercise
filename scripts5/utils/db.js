// 连接mysql数据库
var mysql = require('mysql')

var pool = mysql.createPool({
    host: '127.0.0.1', // 连接的服务器(代码托管到线上后，需改为内网IP，而非外网)
    port: 3306, // mysql服务运行的端口
    database: 'boblog', // 选择的库
    user: 'root', // 用户名
    password:'123456' // 用户密码，在mysql8.0.4之后：必须修改密码，密码不能为空
    //alter user 'root'@'localhost' identified with mysql_native_password by '123456';
    //flush privileges;
})

//对数据库进行增删改查操作的基础
function query(sql,callback){
    pool.getConnection(function(err,connection){
        connection.query(sql, function (err,rows) {
            callback(err,rows)
            connection.release() // 中断连接
        })
    })
}

exports.query = query;