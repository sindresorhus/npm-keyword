export type Options = {
	/**
	Limits the amount of results.

	@default 250
	*/
	readonly size?: number;
};

export type PackageDescriptor = {
	readonly name: string;
	readonly description: string;
};

declare const npmKeyword: {
	/**
	Get a list of npm packages with certain keywords.

	@param keyword - One or more keywords. Only matches packages that have *all* the given keywords.
	@returns A list of packages having the specified keywords in their package.json `keyword` property.

	@example
	```
	import npmKeyword from 'npm-keyword';

	console.log(await npmKeyword('gulpplugin'));
	//=> [{name: 'gulp-autoprefixer', description: '…'}, …]
	```
	*/
	(keyword: string | readonly string[], options?: Options): Promise<PackageDescriptor[]>;

	/**
	Get a list of npm package names with certain keywords.

	@param keyword - One or more keywords. Only matches packages that have *all* the given keywords. Example: `['string', 'camelcase']`.
	@returns A list of package names. Use this if you don't need the description as it's faster.

	@example
	```
	import npmKeyword from 'npm-keyword';

	console.log(await npmKeyword.names('gulpplugin'));
	//=> ['gulp-autoprefixer', …]
	```
	*/
	names(
		keyword: string | readonly string[],
		options?: Options
	): Promise<string[]>;

	/**
	Get the count of npm packages names with certain keywords.

	@param keyword - One or more keywords. Only matches packages that have *all* the given keywords. Example: `['string', 'camelcase']`.
	@returns The count of packages.

	@example
	```
	import npmKeyword from 'npm-keyword';

	console.log(await npmKeyword.count('gulpplugin'));
	//=> 3457
	```
	*/
	count(keyword: string | readonly string[]): Promise<number>;
};

export default npmKeyword;
