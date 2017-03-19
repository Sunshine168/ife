const phantom = require('phantom');
const devices_config = require('./devices_config');
const uuid = require('uuidv4');
const fs = require('fs');
const request = require('request');
const mkdirp = require('mkdirp');
const dir = './static/img';
if (process.argv.length < 3) {
	console.log("node --harmony-async-await demo1.js keyword");
	return;
}
const keyword = process.argv[2];
const device = process.argv[3] || '';
const page = process.argv[4] || 0;
const url = encodeURI(`https://www.baidu.com/s?wd=${keyword}&pn=${page}`);
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
		// download pic
		result.forEach((item) => {
			if (item['pic'] != '') {
				let pid = uuid().replace(/-/g, "");
				item['pid'] = pid + ".jpg";
				mkdirp(dir, (err) => {
					if (err) {
						console.log(err);
					}
				});
				request(item.pic).pipe(fs.createWriteStream(dir + '/' + item.pid))
			}
		})
		let data = {
			code: 1,
			msg: "抓取成功",
			word: keyword,
			device: device,
			time: Date.now() - start,
			url: url,
			dataList: result
		}

		console.log(JSON.stringify(data));
	}

	await instance.exit();
}());