'use strict';
var got = require('got');
var registryUrl = require('registry-url');
var objectAssign = require('object-assign');

function getUrl(keyword, description) {
	keyword = encodeURIComponent(keyword);

	return registryUrl() +
		'-/_view/byKeyword?' +
		'startkey=[%22' + keyword + '%22]' +
		'&endkey=[%22' + keyword + '%22,%7B%7D]' +
		'&group_level=' + (description ? 3 : 2);
}

module.exports = function (keyword, opts, cb) {
	if (typeof keyword !== 'string') {
		throw new TypeError('Keyword must be a string');
	}

	cb = typeof opts === 'function' ? opts : cb;
	opts = objectAssign({description: true}, opts);

	got(getUrl(keyword, opts.description), function (err, data) {
		if (err) {
			cb(err);
			return;
		}

		cb(null, JSON.parse(data).rows.map(function (el) {
			var row = {name: el.key[1]};

			if (el.key[2]) {
				row.description = el.key[2];
			}

			return row;
		}));
	});
};
