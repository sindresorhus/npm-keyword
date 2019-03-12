export interface Options {
	/**
	 * Limits the amount of results.
	 *
	 * @default 250
	 */
	readonly size?: number;
}

export interface PackageDescriptor {
	readonly name: string;
	readonly description: string;
}

declare const npmKeyword: {
	/**
	 * Get a list of npm packages with a certain keyword.
	 *
	 * @param keyword - One or more keywords. Only matches packages that have *all* the given keywords. Example: `['string', 'camelcase']`.
	 * @returns A list of packages having the specified keyword in their package.json `keyword` property.
	 */
	(keyword: string | string[], options?: Options): Promise<PackageDescriptor[]>;

	/**
	 * Get a list of npm package names with a certain keyword.
	 *
	 * @param keyword - One or more keywords. Only matches packages that have *all* the given keywords. Example: `['string', 'camelcase']`.
	 * @returns A list of package names. Use this if you don't need the description as it's faster.
	 */
	names(keyword: string | string[], options?: Options): Promise<string[]>;

	/**
	 * Get the count of npm packages names with a certain keyword.
	 *
	 * @param keyword - One or more keywords. Only matches packages that have *all* the given keywords. Example: `['string', 'camelcase']`.
	 * @returns The count of packages.
	 */
	count(keyword: string | string[]): Promise<number>;
};

export default npmKeyword;
