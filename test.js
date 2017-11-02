import test from 'ava';
import m from '.';

test('npmKeyword()', async t => {
	const packages = await m('gulpplugin');

	t.true(packages.length === 250);
	t.true(packages[0].name.length > 0);
	t.true(packages[0].description.length > 0);
});

test('npmKeyword(10)', async t => {
	const packages = await m('gulpplugin', {size: 10});

	t.true(packages.length === 10);
});

test('npmKeyword.names()', async t => {
	const packageNames = await m.names('gulpplugin');

	t.true(packageNames.length === 250);
	t.is(typeof packageNames[0], 'string');
	t.true(packageNames[0].length > 0);
});

test('npmKeyword.names(10)', async t => {
	const packageNames = await m.names('gulpplugin', {size: 10});

	t.true(packageNames.length === 10);
});

test('npmKeyword.count()', async t => {
	const cnt1 = await m.count('gulpplugin');
	const cnt2 = await m.count('äąâ');

	t.true(cnt1 > 0);
	t.is(typeof cnt1, 'number');
	t.is(cnt2, 0);
});
