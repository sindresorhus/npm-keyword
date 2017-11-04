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
	const packagesWithValidKeyword = await m.count('gulpplugin');
	const packagesWithInvalidKeyword = await m.count('äąâ');

	t.true(packagesWithValidKeyword > 0);
	t.is(typeof packagesWithValidKeyword, 'number');
	t.is(packagesWithInvalidKeyword, 0);
});

test('npmKeyword.count() using an array of keywords', async t => {
	const packagesWithOneKeyword = await m.count('gulpplugin');
	const packagesWithMultipleKeywords = await m.count(['gulpplugin', 'sass', 'css']);

	t.true(packagesWithMultipleKeywords > 0);
	t.true(packagesWithMultipleKeywords < packagesWithOneKeyword);
});

test('npmKeyword.count() using wrong type for keywords parameter', async t => {
	const error = await t.throws(m.count({keyword: 'gulpplugin'}));

	t.is(error.message, 'Keyword must be either a string or an array of strings');
});
