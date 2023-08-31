import {expectType} from 'tsd';
import npmKeyword, {type PackageDescriptor} from './index.js';

expectType<Promise<PackageDescriptor[]>>(npmKeyword('gulpplugin'));
expectType<Promise<PackageDescriptor[]>>(npmKeyword('gulpplugin', {size: 10}));
expectType<Promise<string[]>>(npmKeyword.names('gulpplugin'));
expectType<Promise<string[]>>(npmKeyword.names('gulpplugin', {size: 10}));
expectType<Promise<number>>(npmKeyword.count('gulpplugin'));
