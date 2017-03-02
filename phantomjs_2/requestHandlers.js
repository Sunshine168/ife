const exec = require('child_process').exec;
const Data = require('./models/Data');
const url = require('url');
var search = (request, response) => {
	let parts = url.parse(request.url, true);
	let query = parts.query;
	console.log(query);
	let message = '';
	let keyword = query['keyword'] || '';
	if (keyword && keyword != "favicon.ico") {
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
			}
		})
	}
	let body = '<html>' +
		'<head>' +
		'<meta http-equiv="Content-Type" ' +
		'content="text/html; charset=UTF-8" />' +
		'</head>' +
		'<body>' +
		'正在抓取'
	'</body>' +
	'</html>';

	response.writeHead(200, {
		"Content-Type": "text/html"
	});
	response.write(body);
	response.end();
}
module.exports = {
	'search': search
}