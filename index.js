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
	options = {
		size: 250,
		...options
	};

	const {objects} = await get(keyword, options);
	return objects.map(element => ({
		name: element.package.name,
		description: element.package.description
	}));
};

module.exports = npmKeyword;
// TODO: Remove this for the next major release
module.exports.default = npmKeyword;

module.exports.names = async (keyword, options) => {
	options = {
		size: 250,
		...options
	};

	const {objects} = await get(keyword, options);
	return objects.map(element => element.package.name);
};

module.exports.count = async keyword => {
	const {total} = await get(keyword, {size: 1});
	return total;
};
