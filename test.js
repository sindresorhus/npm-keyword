'use strict';
var test = require('ava');
var npmKeyword = require('./');

test('npmKeyword()', function (t) {
	t.plan(3);

	npmKeyword('gulpplugin').then(function (packages) {
		t.assert(packages.length > 0);
		t.assert(packages[0].name.length > 0);
		t.assert(packages[0].description.length > 0);
	});
});

test('npmKeyword.names()', function (t) {
	t.plan(2);

	npmKeyword.names('gulpplugin').then(function (packageNames) {
		t.assert(typeof packageNames[0] === 'string');
		t.assert(packageNames[0].length > 0);
	});
});

test('npmKeyword.count()', function (t) {
	t.plan(3);

	npmKeyword.count('gulpplugin').then(function (count) {
		t.assert(typeof count === 'number');
		t.assert(count > 0);
	});

	npmKeyword.count('äąâ').then(function (count) {
		t.assert(count === 0);
	});
});
