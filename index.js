import ky from 'ky';
import registryUrl from 'registry-url';

const get = async (keyword, {size = 250} = {}) => {
	if (typeof keyword !== 'string' && !Array.isArray(keyword)) {
		throw new TypeError('The keyword must be either a string or an array of strings');
	}

	if (size === 0 || size > 250) {
		throw new TypeError('The `size` option must be in the range 1...250');
	}

	keyword = encodeURIComponent(keyword).replace('%2C', '+');

	const url = `${registryUrl()}-/v1/search?text=keywords:${keyword}&size=${size}`;

	return ky(url).json();
};

export default async function npmKeyword(keyword, options) {
	const {objects} = await get(keyword, options);

	return objects.map(element => ({
		name: element.package.name,
		description: element.package.description,
	}));
}

npmKeyword.names = async (keyword, options) => {
	const {objects} = await get(keyword, options);
	return objects.map(element => element.package.name);
};

npmKeyword.count = async keyword => {
	const {total} = await get(keyword, {size: 1});
	return total;
};
