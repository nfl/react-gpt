<img align="right" height="200" src="http://static.nfl.com/static/content/public/static/img/logos/nfl-engineering-light.svg" />

# React GPT

[![npm Version](https://img.shields.io/npm/v/react-gpt.svg?style=flat-square)](https://www.npmjs.org/package/react-gpt)
[![Build Status](https://img.shields.io/travis/nfl/react-gpt/master.svg?style=flat-square)](https://travis-ci.org/nfl/react-gpt)
[![Dependency Status](https://img.shields.io/david/nfl/react-gpt.svg?style=flat-square)](https://david-dm.org/nfl/react-gpt)
[![codecov.io](https://img.shields.io/codecov/c/github/nfl/react-gpt/master.svg?style=flat-square)](https://codecov.io/github/nfl/react-gpt?branch=master)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md#pull-requests)

A [React](https://github.com/facebook/react) component for [Google Publisher Tags](https://developers.google.com/doubleclick-gpt/?hl=en).

## Requirements

 * React 0.14+

## Browser Requirements

 * IE10+

## Features

 * Supports all rendering modes (single request mode, async rendering node and *sync rendering mode)
 * Supports responsive ads.
 * Supports interstitial ads.
 * Supports lazy render.

\* Synchronous rendering requires that the GPT JavaScript be loaded synchronously.

## Installation

```
$ yarn react-gpt
```

React GPT depends on [Promise](https://promisesaplus.com/) to be available in browser. If your application support the browser which doesn't support Promise, please include the polyfill.

## Getting Started

Import React GPT and pass props to the component.

```js
import {Bling as GPT} from "react-gpt";

class Application extends React.Component {
    render() {
        return (
            <GPT
                adUnitPath="/4595/nfl.test.open"
                slotSize={[728, 90]}
            />
        );
    }
}
```

You at least need to pass `adUnitPath` and one of `slotSize` and `sizeMapping`.

#### Enabling Single Request Mode

To enable [Single Request Mode](https://support.google.com/dfp_sb/answer/181071?hl=en), call `Bling.enableSingleRequest()` before rendering any ad.
It defaults to `Asynchronous Rendering Mode` if not set.

```js
import {Bling as GPT} from "react-gpt";

GPT.enableSingleRequest();

class Application extends React.Component {
    render() {
        return (
            <div id="ad-1">
                <GPT
                    adUnitPath="/4595/nfl.test.open"
                    slotSize={[728, 90]}
                />
            </div>
            <div id="ad-2">
                <GPT
                    adUnitPath="/4595/nfl.test.open"
                    slotSize={[300, 250]}
                />
            </div>
        );
    }
}
```

The above example will make one request to the server to render both ads which makes it easier to ensure category exclusion.

#### Responsive ad

If you pass `sizeMapping` props instead of `slotSize`, React GPT listens for the viewport width change and refreshes an ad when the break point is hit.

```js
import {Bling as GPT} from "react-gpt";

class Application extends React.Component {
    render() {
        return (
            <GPT
                adUnitPath="/4595/nfl.test.open"
                sizeMapping={[
                    {viewport: [0, 0], slot: [320, 50]},
                    {viewport: [750, 0], slot: [728, 90]},
                    {viewport: [1050, 0], slot: [1024, 120]}
                ]}
            />
        );
    }
}
```

## API and Documentation

* [API](/docs/api/) Review the `React GPT` API
* [Getting Started](/docs/GettingStarted.md) A more detailed Getting Started Guide
* [Docs](/docs/) Guides and API.

## To run examples:

1. Clone this repo
2. Run `yarn`
3. Run `npm run examples` for client side rendering, `npm start` for server side rendering.
4. Point your browser to http://localhost:8080

## Contributing to this project

Please take a moment to review the [guidelines for contributing](CONTRIBUTING.md).

* [Pull requests](CONTRIBUTING.md#pull-requests)
* [Development Process](CONTRIBUTING.md#development)

## License

MIT
