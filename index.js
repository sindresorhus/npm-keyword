'use strict';

const got = require('got');
const registryUrl = require('registry-url');

async function get(keyword, options) {
	if (typeof keyword !== 'string' && !Array.isArray(keyword)) {
		throw new TypeError('Keyword must be either a string or an array of strings');
	}

	if (options.size < 1 || options.size > 250) {
		throw new TypeError('Size option must be between 1 and 250');
	}

	keyword = encodeURIComponent(keyword).replace('%2C', '+');

	const url = `${registryUrl()}-/v1/search?text=keywords:${keyword}&size=${options.size}`;

	const {body} = await got(url, {json: true});
	return body;
}

const npmKeyword = async (keyword, options) => {
	options = {size: 250, ...options};

	const data = await get(keyword, options);
	return data.objects.map(el => ({
		name: el.package.name,
		description: el.package.description
	}));
};

module.exports = npmKeyword;
module.exports.default = npmKeyword;

module.exports.names = async (keyword, options) => {
	options = {size: 250, ...options};

	const data = await get(keyword, options);
	return data.objects.map(x => x.package.name);
};

module.exports.count = async keyword => {
	const {total} = await get(keyword, {size: 1});
	return total;
};
