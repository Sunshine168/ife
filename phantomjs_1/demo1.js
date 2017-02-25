const phantom = require('phantom');
if (process.argv.length < 3) {
	console.log("node --harmony-async-await demo1.js keyword");
	return;
}
let keyword = process.argv[2];
let url = encodeURI(`https://www.baidu.com/s?wd=${keyword}`);
(async function() {
	const instance = await phantom.create();
	const page = await instance.createPage();
	const status = await page.open(url);
	if (status !== 'success') {
		console.log("访问失败");
		return;
	} else {
		if (process.argv.length == 4 && process.argv[3] == 'pic') {

			await page.property('viewportSize', {
				width: 1024,
				height: 768
			});
			await page.property('clipRect', {
				top: 0,
				left: 0,
				width: 1024,
				height: 768
			});
			await page.render('germy.png');
		}
		let start = Date.now();
		let result = await page.evaluate(function() {
			return $('.result.c-container').map(function() {
				return ({
					title: $(this).find('.t').text() || '',
					link: $(this).find('.c-showurl').text() || '',
					info: $(this).find('.c-abstract').text() || '',
					pic: $(this).find('.general_image_pic img').attr('src') || ''
				});
			}).toArray();
		});
		let data = {
			cose: 1,
			msg: "抓取成功",
			word: keyword,
			time: Date.now() - start,
			dataList: result
		}
		console.log(JSON.stringify(data));
	}

	await instance.exit();
}());