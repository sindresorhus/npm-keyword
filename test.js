'use strict';
var test = require('ava');
var npmKeyword = require('./');

test('npmKeyword()', function (t) {
	t.plan(3);

	npmKeyword('gulpplugin', function (err, packages) {
		t.assert(!err, err);
		t.assert(packages.length > 0);
		t.assert(packages[0].name.length > 0);
	});
});

test('npmKeyword.url()', function (t) {
	t.assert(/npmjs/.test(npmKeyword.url('gulpplugin')));
	t.end();
});
