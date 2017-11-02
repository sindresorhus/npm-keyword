'use strict';
const got = require('got');
const registryUrl = require('registry-url');

function get(keyword, options) {
	if (typeof keyword !== 'string') {
		return Promise.reject(new TypeError('Keyword must be a string'));
	}

	keyword = encodeURIComponent(keyword);

	const url = `${registryUrl()}-/v1/search?text=keywords:${keyword}&size=${options.size}`;

	return got(url, {json: true}).then(response => response.body);
}

module.exports = (keyword, options) => {
	options = options || {size: 250};
	return get(keyword, options).then(data => {
		return data.objects.map(el => ({
			name: el.package.name,
			description: el.package.description
		}));
	});
};

module.exports.names = (keyword, options) => {
	options = options || {size: 250};
	return get(keyword, options).then(data => data.objects.map(x => x.package.name));
};

module.exports.count = keyword => {
	return get(keyword, {size: 0}).then(data => data.total);
};
