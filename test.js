import test from 'ava';
import npmKeyword from './index.js';

test('npmKeyword()', async t => {
	const packages = await npmKeyword('gulpplugin');

	t.is(packages.length, 250);
	t.true(packages[0].name.length > 0);
	t.true(packages[0].description.length > 0);
});

test('npmKeyword() using the size option', async t => {
	const packages = await npmKeyword('gulpplugin', {size: 10});

	t.is(packages.length, 10);
});

test('npmKeyword() using invalid options', async t => {
	const packages = await npmKeyword('gulpplugin', {foo: 'bar'});

	t.is(packages.length, 250);
});

test('npmKeyword() size < 1', async t => {
	await t.throwsAsync(
		npmKeyword('gulpplugin', {size: 0}),
		{
			message: /The `size` option/,
		},
	);
});

test('npmKeyword() size > 250', async t => {
	await t.throwsAsync(
		npmKeyword('gulpplugin', {size: 255}),
		{
			message: /The `size` option/,
		},
	);
});

test('npmKeyword.names()', async t => {
	const packageNames = await npmKeyword.names('gulpplugin');

	t.is(packageNames.length, 250);
	t.is(typeof packageNames[0], 'string');
	t.true(packageNames[0].length > 0);
});

test('npmKeyword.names() using the size option', async t => {
	const packageNames = await npmKeyword.names('gulpplugin', {size: 10});

	t.is(packageNames.length, 10);
});

test('npmKeyword.names() using invalid options', async t => {
	const packageNames = await npmKeyword.names('gulpplugin', {foo: 'bar'});

	t.is(packageNames.length, 250);
});

test('npmKeyword.count()', async t => {
	const packagesWithValidKeyword = await npmKeyword.count('gulpplugin');
	const packagesWithInvalidKeyword = await npmKeyword.count('äąâ');

	t.true(packagesWithValidKeyword > 0);
	t.is(typeof packagesWithValidKeyword, 'number');
	t.is(packagesWithInvalidKeyword, 0);
});

test('npmKeyword.count() using an array of keywords', async t => {
	const packagesWithOneKeyword = await npmKeyword.count('gulpplugin');
	const packagesWithMultipleKeywords = await npmKeyword.count(['gulpplugin', 'sass', 'css']);

	t.true(packagesWithMultipleKeywords > 0);
	t.true(packagesWithMultipleKeywords < packagesWithOneKeyword);
});

test('npmKeyword.count() using wrong type for keywords parameter', async t => {
	await t.throwsAsync(
		npmKeyword.count({keyword: 'gulpplugin'}),
		{
			message: /The keyword must be/,
		},
	);
});
