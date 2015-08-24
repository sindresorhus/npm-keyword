'use strict';
var got = require('got');
var registryUrl = require('registry-url');

function get(keyword, level, cb) {
	if (typeof keyword !== 'string') {
		throw new TypeError('Keyword must be a string');
	}

	keyword = encodeURIComponent(keyword);

	var url = registryUrl() +
		'-/_view/byKeyword?' +
		'startkey=[%22' + keyword + '%22]' +
		'&endkey=[%22' + keyword + '%22,%7B%7D]' +
		'&group_level=' + level;

	got(url, function (err, data) {
		if (err) {
			cb(err);
			return;
		}

		cb(null, JSON.parse(data).rows);
	});
}

module.exports = function (keyword, cb) {
	get(keyword, 3, function (err, data) {
		if (err) {
			cb(err);
			return;
		}

		cb(null, data.map(function (el) {
			return {
				name: el.key[1],
				description: el.key[2]
			};
		}));
	});
};

module.exports.names = function (keyword, cb) {
	get(keyword, 2, function (err, data) {
		if (err) {
			cb(err);
			return;
		}

		cb(null, data.map(function (el) {
			return el.key[1];
		}));
	});
};

module.exports.count = function (keyword, cb) {
	get(keyword, 1, function (err, data) {
		if (err) {
			cb(err);
			return;
		}

		cb(null, data[0] ? data[0].value : 0);
	});
};
