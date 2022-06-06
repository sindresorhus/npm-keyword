# npm-keyword

> Get a list of npm packages with keywords

## Install

```sh
npm install npm-keyword
```

## Usage

```js
import npmKeyword from 'npm-keyword';

console.log(await npmKeyword('gulpplugin'));
//=> [{name: 'gulp-autoprefixer', description: '…'}, …]
```

## Caveat

The list of packages will contain a maximum of 250 packages matching the keywords. This limitation is caused by the [npm registry API](https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md#get-v1search).

## API

### npmKeyword(keywords, options?)

Returns a promise for a list of packages having the specified keyword in their package.json `keywords` property.

#### keywords

Type: `string | string[]`\
Example: `['string', 'camelcase']`

One or more keywords. Only matches packages that have *all* the given keywords.

#### options

Type: `object`

##### size

Type: `number`\
Default: `250`

Limits the amount of results.

### npmKeyword.names(keywords, options?)

Returns a promise for a list of package names.

#### keywords

Type: `string | string[]`\
Example: `['string', 'camelcase']`

One or more keywords. Only matches packages that have *all* the given keywords.

#### options

Type: `object`

##### size

Type: `number`\
Default: `250`

Limits the amount of results.

### npmKeyword.count(keywords)

Returns a promise for the count of packages.

#### keywords

Type: `string | string[]`\
Example: `['string', 'camelcase']`

One or more keywords. Only matches packages that have *all* the given keywords.

## Related

- [package-json](https://github.com/sindresorhus/package-json) - Get the package.json of a package from the npm registry
- [npm-user](https://github.com/sindresorhus/npm-user) - Get user info of an npm user
- [npm-email](https://github.com/sindresorhus/npm-email) - Get the email of an npm user
