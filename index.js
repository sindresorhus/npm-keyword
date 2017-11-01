'use strict';
const got = require('got');
const registryUrl = require('registry-url');

function get(keyword, size) {
	if (typeof keyword !== 'string') {
		return Promise.reject(new TypeError('Keyword must be a string'));
	}

	keyword = encodeURIComponent(keyword);

	const url = `${registryUrl()}-/v1/search?text=keywords:${keyword}&size=${size}`;

	return got(url, {json: true}).then(response => response.body);
}

module.exports = keyword => {
	return get(keyword, 250).then(data => {
		return data.objects.map(el => ({
			name: el.package.name,
			description: el.package.description
		}));
	});
};

module.exports.names = keyword => {
	return get(keyword, 250).then(data => data.objects.map(x => x.package.name));
};

module.exports.count = keyword => {
	return get(keyword, 1).then(data => data.total);
};
