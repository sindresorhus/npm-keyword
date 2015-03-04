'use strict';
var got = require('got');
var registryUrl = require('registry-url');

module.exports = function (keyword, cb) {
	got(module.exports.url(keyword), function (err, data) {
		if (err) {
			cb(err);
			return;
		}

		var rows = JSON.parse(data).rows;

		if (rows.length === 0) {
			cb(null, []);
		}

		cb(null, rows.map(function (el) {
			return {
				name: el.key[1],
				description: el.key[2]
			};
		}));
	});
};

module.exports.url = function (keyword) {
	keyword = encodeURIComponent(keyword);
	return registryUrl() + '-/_view/byKeyword?startkey=[%22' + keyword + '%22]&endkey=[%22' + keyword + '%22,%7B%7D]&group_level=3';
};
