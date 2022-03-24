var http = require('http'); //use require module to load http
var dt = require('./myfirstmodule'); // use the module
var url = require('url'); // split the query string into readable parts
// ./ means that the module is located in the same folder as the server.js file

// build server
// 添加三个html文件
// index.html：我们的首页
// about.html:
// 404.html:

const server = http.createServer(function (req, res) { //植入请求监听器，用于监听前端返回的信息
	// HTTP head
	// HTTP: 200:OK
	// contain: text/plain
	res.writeHead(200,{'Content-Type':'text/html;charset:utf-8'});
	res.write('<head><meta charset="utf-8"/></head>');
	 // solve coding problem
	res.write("The date and time are currently:"+dt.myDateTime());
//holds the part of the url that comes after the domain name
	var q = url.parse(req.url,true).query;
	var txt = q.year + " " + q.month;
	// send response data: "Hello world"
	res.end(txt); // 发送信息到前端
})


const port = 8888;
const ip = "127.0.0.1"; // nodejs服务器在电脑运行，这是本机的IP地址
// 监听来自前端的信息，端口+IP地址+回调函数
server.listen(port,ip,() =>{

	// console type this information
	console.log(`Server running at http://${ip}:${port}`);

});



