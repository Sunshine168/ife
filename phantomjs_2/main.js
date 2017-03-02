const server = require("./server");
const router = require("./router");
const requestHandlers = require("./requestHandlers");
const route = require('./router').route;

var handle = {};
handle["/search"] = requestHandlers.search;
server.start(router.route, handle);