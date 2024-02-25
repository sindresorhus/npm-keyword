import {expectType} from 'tsd';
import {
	npmKeyword,
	npmKeywordNames,
	npmKeywordCount,
	type PackageDescriptor,
} from './index.js';

expectType<Promise<PackageDescriptor[]>>(npmKeyword('gulpplugin'));
expectType<Promise<PackageDescriptor[]>>(npmKeyword('gulpplugin', {size: 10}));
expectType<Promise<string[]>>(npmKeywordNames('gulpplugin'));
expectType<Promise<string[]>>(npmKeywordNames('gulpplugin', {size: 10}));
expectType<Promise<number>>(npmKeywordCount('gulpplugin'));
