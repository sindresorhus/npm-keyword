'use strict';
var test = require('ava');
var npmKeyword = require('./');

test('npmKeyword()', function (t) {
	t.plan(4);

	npmKeyword('gulpplugin', function (err, packages) {
		t.assert(!err, err);
		t.assert(packages.length > 0);
		t.assert(packages[0].name.length > 0);
		t.assert(packages[0].description.length > 0);
	});
});

test('npmKeyword.names()', function (t) {
	t.plan(3);

	npmKeyword.names('gulpplugin', function (err, packageNames) {
		t.assert(!err, err);
		t.assert(typeof packageNames[0] === 'string');
		t.assert(packageNames[0].length > 0);
	});
});

test('npmKeyword.count()', function (t) {
	t.plan(3);

	npmKeyword.count('gulpplugin', function (err, count) {
		t.assert(!err, err);
		t.assert(typeof count === 'number');
		t.assert(count > 0);
	});
});
