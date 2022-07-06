# svelte-check-plugin

[![npm](https://img.shields.io/npm/v/svelte-check-plugin)](https://www.npmjs.com/package/svelte-check-plugin)
[![npm](https://img.shields.io/npm/dw/svelte-check-plugin)](https://www.npmjs.com/package/svelte-check-plugin)

This plugin runs `svelte-check` as part of the webpack build process, and causes the build to fail with proper error reporting when `svelte-check` fails. This enables proper TypeScript checking of Svelte projects in webpack builds.

## Installation

Currently, this plugin only supports `npm`, as it uses `npx` to run `svelte-check`.

```sh
npm install --save-dev svelte-check svelte-check-plugin
```

## Usage

The plugin must be specified in your `webpack.config.js`:
```js
...
const SvelteCheckPlugin = requre("svelte-check-plugin");
...
module.exports = {
    ...
    plugins: {
        ...,
        new SvelteCheckPlugin(),
        ...
    },
    ...
}
```

If the plugin is working correctly, you should see output similar to the following when webpack compiles your project:
```sh
====================================
Loading svelte-check in workspace: [your workspace]
Getting Svelte diagnostics...

====================================
svelte-check found 0 errors, 0 warnings, and 0 hints
```

Errors will show up over the rendered page during development if any occur.

You can also pass custom arguments to `svelte-check` if desired:
```js
...
plugins: {
    ...,
    new SvelteCheckPlugin({
        args: ["--fail-on-hints", "--tsconfig", "path/to/tsconfig"]
    }),
    ...
},
...
```
