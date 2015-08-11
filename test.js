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

test('no description', function (t) {
	t.plan(2);

	npmKeyword('gulpplugin', {description: false}, function (err, packages) {
		t.assert(!err, err);
		t.assert(!packages[0].description);
	});
});

test('include description', function (t) {
	t.plan(2);

	npmKeyword('gulpplugin', function (err, packages) {
		t.assert(!err, err);
		t.assert(packages[0].description.length > 0);
	});
});

test('defaults to including description', function (t) {
	t.plan(2);

	npmKeyword('gulpplugin', function (err, packages) {
		t.assert(!err, err);
		t.assert(packages[0].description.length > 0);
	});
});

test('uses custom formatter', function (t) {
	t.plan(3);

	var format = function (el) {
		return el.key[1];
	};

	npmKeyword('gulpplugin', {format: format}, function (err, packages) {
		t.assert(!err, err);
		t.assert(Array.isArray(packages));
		t.assert(typeof packages[0] === 'string');
	});
});
