'use strict';
const got = require('got');
const registryUrl = require('registry-url');

function get(keyword, level) {
	if (typeof keyword !== 'string') {
		return Promise.reject(new TypeError('Keyword must be a string'));
	}

	keyword = encodeURIComponent(keyword);

	const url = registryUrl() +
		'-/_view/byKeyword?' +
		'startkey=[%22' + keyword + '%22]' +
		'&endkey=[%22' + keyword + '%22,%7B%7D]' +
		'&group_level=' + level;

	return got(url, {json: true}).then(response => response.body.rows);
}

module.exports = keyword => {
	return get(keyword, 3).then(data => {
		return data.map(el => ({
			name: el.key[1],
			description: el.key[2]
		}));
	});
};

module.exports.names = keyword => {
	return get(keyword, 2).then(data => data.map(x => x.key[1]));
};

module.exports.count = keyword => {
	return get(keyword, 1).then(data => data[0] ? data[0].value : 0);
};
