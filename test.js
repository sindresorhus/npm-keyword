import test from 'ava';
import m from '.';

test('npmKeyword()', async t => {
	const packages = await m('gulpplugin');

	t.is(packages.length, 250);
	t.true(packages[0].name.length > 0);
	t.true(packages[0].description.length > 0);
});

test('npmKeyword() using the size option', async t => {
	const packages = await m('gulpplugin', {size: 10});

	t.is(packages.length, 10);
});

test('npmKeyword() using invalid options', async t => {
	const packages = await m('gulpplugin', {foo: 'bar'});

	t.is(packages.length, 250);
});

test('npmKeyword() size < 1', async t => {
	const error = await t.throws(m('gulpplugin', {size: 0}));

	t.is(error.message, 'Size option must be between 1 and 250');
});

test('npmKeyword() size > 250', async t => {
	const error = await t.throws(m('gulpplugin', {size: 255}));

	t.is(error.message, 'Size option must be between 1 and 250');
});

test('npmKeyword.names()', async t => {
	const packageNames = await m.names('gulpplugin');

	t.is(packageNames.length, 250);
	t.is(typeof packageNames[0], 'string');
	t.true(packageNames[0].length > 0);
});

test('npmKeyword.names() using the size option', async t => {
	const packageNames = await m.names('gulpplugin', {size: 10});

	t.is(packageNames.length, 10);
});

test('npmKeyword.names() using invalid options', async t => {
	const packageNames = await m.names('gulpplugin', {foo: 'bar'});

	t.is(packageNames.length, 250);
});

test('npmKeyword.count()', async t => {
	const cnt1 = await m.count('gulpplugin');
	const cnt2 = await m.count('äąâ');

	t.true(cnt1 > 0);
	t.is(typeof cnt1, 'number');
	t.is(cnt2, 0);
});
