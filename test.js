import test from 'ava';
import npmKeyword from './';

test('npmKeyword()', async t => {
	const packages = await npmKeyword('gulpplugin');

	t.true(packages.length > 0);
	t.true(packages[0].name.length > 0);
	t.true(packages[0].description.length > 0);
});

test('npmKeyword.names()', async t => {
	const packageNames = await npmKeyword.names('gulpplugin');

	t.is(typeof packageNames[0], 'string');
	t.true(packageNames[0].length > 0);
});

test('npmKeyword.count()', async t => {
	const cnt1 = await npmKeyword.count('gulpplugin');
	const cnt2 = await npmKeyword.count('äąâ');

	t.true(cnt1 > 0);
	t.is(typeof cnt1, 'number');
	t.is(cnt2, 0);
});
