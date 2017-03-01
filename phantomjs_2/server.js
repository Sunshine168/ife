const http = require('http');
const url = require("url");
const exec = require('child_process').exec;
const Data = require('./models/Data');

function start() {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("request for" + pathname + "received");
		let message = '';
		let keyword = decodeURI(pathname.slice(1));
		if (/[\u4e00-\u9fa5a-zA-Z0-9]+/.test(keyword) && keyword != "favicon.ico") {
			console.log("search：" + keyword);
			const cmd = `node --harmony-async-await task.js ${keyword}`;
			console.log("cmd with" + cmd);
			exec(cmd, (err, stdout, stderr) => {
				if (err) {
					console.log('error-message' + stderr);
					message = stderr;
				} else {
					let data = JSON.parse(stdout.slice(stdout.indexOf('{')));
					Data.save(data, (err) => {
						if (err) {
							console.log(err);
						}
					})
					message = "success";
				}
			})
		}
		let body = '<html>' +
			'<head>' +
			'<meta http-equiv="Content-Type" ' +
			'content="text/html; charset=UTF-8" />' +
			'</head>' +
			'<body>' + message +
			'</body>' +
			'</html>';
		response.writeHead(200, {
			"Content-Type": "text/html"
		});
		response.write(body);
		response.end();

	}
	http.createServer(onRequest).listen(8000);
	console.log("Server has started");
}
try {
	start();
} catch (e) {
	console.log(e);
}