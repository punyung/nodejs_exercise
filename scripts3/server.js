// 利用URL获取GET参数，决定跳转到相应的页面
// GET请求参数lang是nodejs程序需要捕捉的数据
// 如何读取URL里GET请求参数？
// 使用javascripts里的URL object
// 创建一个常量保留URL object
const http = require('http'); //use require module to load http
const url = require('url'); // split the query string into readable parts
const fs = require('fs'); //导入fs模块用于读取文件
// ./ means that the module is located in the same folder as the server.js file
const port = 8888;
const ip = "127.0.0.1"; // nodejs服务器在电脑运行，这是本机的IP地址

// build server
// 添加三个html文件
// index.html：我们的首页
// about.html: 里面有一个大标题显示about us
// 404.html: 显示页面不存在
// 建立sendResponse函数，用于统一读取和发送html源代码
const sendResponse = (filename,statusCode,response) => { // statusCode 读取用户发送请求的状态
	fs.readFile(`./html/${filename}`,(error,data)=>{ // 参数1：文件路径，参数2：回调函数
		// 回调函数参数1：成功读取文件 error = undefined，data被赋予文件内容；若报错，error被赋予报错信息
		// 用if else 判断 readFile 是否成功读取文件
		if(error){ // nodejs里先判断程序是否报错
			response.statusCode = 500;
			//设置response object 的content type，告诉浏览器返回的信息格式
			response.setHeader("Content-Type","text/plain");
			response.end("Sorry, Internet error");// 发送报错信息，只需将简短的错误信息返回给用户
		}else{
			response.statusCode = statusCode; // 程序不报错，返回对应的html
			response.setHeader("Content-Type","text/html;charset:utf-8");
			response.end(data); // 发送读取的data
		}

	});
};

const server = http.createServer(function (request, response) { //植入请求监听器，用于识别前端返回的信息,
	// req = request, res = response
	console.log(request.url,request.method);// 返回请求页面的url, method 可以识别请求方法是POST还是GET
	//response.writeHead(200,{'Content-Type':'text/html;charset:utf-8'}); //避免中文显示乱码
	//response.write('<head><meta charset="utf-8"/></head>'); //避免中文显示乱码
	// 赋予变量名，方便调用
	const method = request.method;
	let url = request.url;
	// 使用if else 语句，判断用户需要访问哪个页面，根据请求返回对应的html页面
	if(method === "GET"){
		const requestUrl  = new URL(url,`http://${ip}:${port}`); // URL第一个参数：当前访问页面，第二个参数：基本URL
		// console.log(url); // 打印出来包含/?lang=zh
		// console.log(requestUrl); // 打印URL参数
		// console.log(requestUrl.searchParams.get("lang")); // 打印lang参数的值
		url = requestUrl.pathname;// 利用requestURL里面pathname属性，获取当前路径，但不包括请求参数
		const lang = requestUrl.searchParams.get("lang"); // 声明lang 变量
		let selector; // 用于保存语义字符串
			if(lang === `en` || lang === null ){ // 跳转为英文网页
				selector = "";
			}else if (lang === `zh`){ // 跳转为中文网页
				selector = "-zh"; // 识别html文件名后缀 e.g. about-zh.html
			}else{
				selector = "";
			}

		if(url === "/"){ // "/"代表根目录
			sendResponse(`index${selector}.html`,200,response); // 改成动态文件名
		}else if(url === "/about.html"){
			sendResponse(`about${selector}.html`,200,response);
		}else{
			sendResponse(`404${selector}.html`,404,response);
		}

	}
	else{

	}
});



// 监听来自前端的信息，端口+IP地址+回调函数
server.listen(port,ip,() =>{

	// console type this information
	console.log(`Server running at http://${ip}:${port}`);

});



