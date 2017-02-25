var webPage = require('webpage');
var page = webPage.create();
var URL = 'http//www.baidu.com/s?wd=网易';
page.open(URL, function(status) {
	page.includeJs("https://cdn.bootcss.com/jquery/1.8.3/jquery.min.js", function() {
		var title = page.evaluate(function() {
			return document.title
		});
		console.log('Page title is ', title);
		phantom.exit();
	});
})