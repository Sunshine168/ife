const http = require('http');
const url = require("url");

function start(route, handle) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("request for" + pathname + "received");
		route(handle, pathname, response, request);
	}
	http.createServer(onRequest).listen(8000);
	console.log("Server has started");
}

exports.start = start;