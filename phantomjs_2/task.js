const phantom = require('phantom');
const devices_config = require('./devices_config');
if (process.argv.length < 3) {
	console.log("node --harmony-async-await demo1.js keyword");
	return;
}
const keyword = process.argv[2];
const url = encodeURI(`https://www.baidu.com/s?wd=${keyword}`);
const device = process.argv[3] || '';
(async function() {
	const instance = await phantom.create();
	const page = await instance.createPage();
	const status = await page.open(url);
	if (status !== 'success') {
		console.log("访问失败");
		return;
	} else {
		if (device != '') {
			page.setting('userAgent', devices_config[device]['userAgent']);
			await page.property('viewportSize', {
				'width': devices_config[device]['width'],
				'height': devices_config[device]['height']
			});
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
			code: 1,
			msg: "抓取成功",
			word: keyword,
			device: device,
			time: Date.now() - start,
			dataList: result
		}
		console.log(JSON.stringify(data));
	}

	await instance.exit();
}());