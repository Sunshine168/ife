module.exports = {
	formatMissions: (data) => {
		let missions = [];
		let {
			keyword,
			devices,
			pages = 0
		} = data;
		for (let i = 1; i <= pages; i++) {
			let page = i > 1 ? (i - 1) * 10 : 0;
			if (devices.length > 0) {
				for (let j = 0; j < devices.length; j++) {
					missions.push({
						keyword: keyword,
						page: page,
						device: devices[j]
					})
				}
			} else {
				missions.push({
					keyword: keyword,
					page: page,
					device: ''
				})
			}
		}


		return missions;
	}
}