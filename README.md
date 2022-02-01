This repo contains a minimal reproduction of a problem that was
encountered when updating Next.js from v11 (11.1.4) to v12 (12.0.10)
while using Preconstruct.

## Problem

In `packages/components`, there are two *problem lines* (
[1](https://github.com/anttimaki/preconstruct-nextjs12-problem/blob/main/packages/components/src/CookieReader.tsx#L8),
[2](https://github.com/anttimaki/preconstruct-nextjs12-problem/blob/main/packages/components/src/HookForm.tsx#L6)
) that refer external libraries. Uncommmenting these lines cause an error:

```
Server Error

Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
This error happened while generating the page. Any console logs will be displayed in the terminal window.

Call Stack

ReactDOMServerRenderer.render
file:/home/autti/minimal/node_modules/react-dom/cjs/react-dom-server.node.development.js (4053:17)

ReactDOMServerRenderer.read
file:/home/autti/minimal/node_modules/react-dom/cjs/react-dom-server.node.development.js (3690:29)

Object.renderToString
file:/home/autti/minimal/node_modules/react-dom/cjs/react-dom-server.node.development.js (4298:27)

Object.renderPage
file:/home/autti/minimal/node_modules/next/dist/server/render.js (736:46)

Object.defaultGetInitialProps
file:/home/autti/minimal/node_modules/next/dist/server/render.js (368:51)

Function.getInitialProps
../../node_modules/next/dist/pages/_document.js (145:19)

Object.loadGetInitialProps
file:/home/autti/minimal/node_modules/next/dist/shared/lib/utils.js (69:29)

renderDocument
file:/home/autti/minimal/node_modules/next/dist/server/render.js (749:48)

Object.renderToHTML
file:/home/autti/minimal/node_modules/next/dist/server/render.js (812:34)

async doRender
file:/home/autti/minimal/node_modules/next/dist/server/base-server.js (855:38)
```

The same lines are present in
[`apps/nextjs`](https://github.com/anttimaki/preconstruct-nextjs12-problem/blob/main/apps/nextjs/pages/index.tsx#L8-L9),
where they work without problems.

### Case 1

Running the repo as is:

```
rm -rf node_modules/ packages/components/dist/ packages/components/node_modules/ apps/nextjs/.next/ apps/nextjs/node_modules/
yarn install
yarn workspace nextjs dev
```

* Next.js v11: works
* Next.js v12: works

### Case 2

Uncomment the *problem lines* in `packages/components`, then rerun:

```
rm -rf node_modules/ packages/components/dist/ packages/components/node_modules/ apps/nextjs/.next/ apps/nextjs/node_modules/
yarn install
yarn workspace nextjs dev
```

* Next.js v11: works
* Next.js v12: causes the aforementioned error to pop up when page is loaded.

### Case 3

Build `packages/components` before running the dev server, with the *problem
lines* still uncommented:


```
rm -rf node_modules/ packages/components/dist/ packages/components/node_modules/ apps/nextjs/.next/ apps/nextjs/node_modules/
yarn install
yarn build
yarn workspace nextjs dev
```

* Next.js v11: works
* Next.js v12: works

But at this point, a rebuild is required for any changes done to
`packages/components` to have an effect (as is to be expected, I assume).

All three test cases yield similar results when the `build` and `start` commands
of Next.js are used instead of the `dev` server.
