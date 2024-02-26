import test from 'ava';
import {npmKeyword, npmKeywordNames, npmKeywordCount} from './index.js';

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

test('npmKeywordNames()', async t => {
	const packageNames = await npmKeywordNames('gulpplugin');

	t.is(packageNames.length, 250);
	t.is(typeof packageNames[0], 'string');
	t.true(packageNames[0].length > 0);
});

test('npmKeywordNames() using the size option', async t => {
	const packageNames = await npmKeywordNames('gulpplugin', {size: 10});

	t.is(packageNames.length, 10);
});

test('npmKeywordNames() using invalid options', async t => {
	const packageNames = await npmKeywordNames('gulpplugin', {foo: 'bar'});

	t.is(packageNames.length, 250);
});

test('npmKeywordCount()', async t => {
	const packagesWithValidKeyword = await npmKeywordCount('gulpplugin');
	const packagesWithInvalidKeyword = await npmKeywordCount('äąâ');

	t.true(packagesWithValidKeyword > 0);
	t.is(typeof packagesWithValidKeyword, 'number');
	t.is(packagesWithInvalidKeyword, 0);
});

test('npmKeywordCount() using an array of keywords', async t => {
	const packagesWithOneKeyword = await npmKeywordCount('gulpplugin');
	const packagesWithMultipleKeywords = await npmKeywordCount(['gulpplugin', 'sass', 'css']);

	t.true(packagesWithMultipleKeywords > 0);
	t.true(packagesWithMultipleKeywords < packagesWithOneKeyword);
});

test('npmKeywordCount() using wrong type for keywords parameter', async t => {
	await t.throwsAsync(
		npmKeywordCount({keyword: 'gulpplugin'}),
		{
			message: /The keyword must be/,
		},
	);
});
