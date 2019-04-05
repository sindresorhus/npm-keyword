declare namespace npmKeyword {
	interface Options {
		/**
		Limits the amount of results.

		@default 250
		*/
		readonly size?: number;
	}

	interface PackageDescriptor {
		readonly name: string;
		readonly description: string;
	}
}

declare const npmKeyword: {
	/**
	Get a list of npm packages with a certain keyword.

	@param keyword - One or more keywords. Only matches packages that have *all* the given keywords. Example: `['string', 'camelcase']`.
	@returns A list of packages having the specified keyword in their package.json `keyword` property.

	@example
	```
	import npmKeyword = require('npm-keyword');

	(async () => {
		console.log(await npmKeyword('gulpplugin'));
		//=> [{name: 'gulp-autoprefixer', description: '…'}, …]
	})();
	```
	*/
	(keyword: string | string[], options?: npmKeyword.Options): Promise<
		npmKeyword.PackageDescriptor[]
	>;

	/**
	Get a list of npm package names with a certain keyword.

	@param keyword - One or more keywords. Only matches packages that have *all* the given keywords. Example: `['string', 'camelcase']`.
	@returns A list of package names. Use this if you don't need the description as it's faster.

	@example
	```
	import npmKeyword = require('npm-keyword');

	(async () => {
		console.log(await npmKeyword.names('gulpplugin'));
		//=> ['gulp-autoprefixer', …]
	})();
	```
	*/
	names(
		keyword: string | string[],
		options?: npmKeyword.Options
	): Promise<string[]>;

	/**
	Get the count of npm packages names with a certain keyword.

	@param keyword - One or more keywords. Only matches packages that have *all* the given keywords. Example: `['string', 'camelcase']`.
	@returns The count of packages.

	@example
	```
	import npmKeyword = require('npm-keyword');

	(async () => {
		console.log(await npmKeyword.count('gulpplugin'));
		//=> 3457
	})();
	```
	*/
	count(keyword: string | string[]): Promise<number>;

	// TODO: Remove this for the next major release
	default: typeof npmKeyword;
};

export = npmKeyword;
