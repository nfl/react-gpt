## Getting Started

The simplest form of React GPT ad looks like the following

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

`adUnitPath` is a required prop and either `slotSize` or `sizeMapping` prop are needed to give the size information.

## Enabling Single Request Mode

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

The above example will make one request to the server to render both ads and easier to ensure category exclusion.

## Responsive ad

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

## Lazy render

React GPT by default renders an ad when its bounding box is fully inside the viewport. You can disable this setting and render an ad regardless of the position, pass `renderWhenViewable={false}` as a prop.
To read more about lazy render, please see the [guide](./Guides.md#viewability).

## Out-of-page ad

You can render out-of-page(prestitial or interstitial) ad by passing `outOfPage={true}` as a prop.
Out-of-page ad does not require either `slotSize` or `sizeMapping`.

```js
import {Bling as GPT} from "react-gpt";

class Application extends React.Component {
    render() {
        return (
            <GPT
                adUnitPath="/4595/nfl.test.open"
                outOfPage={true}
            />
        );
    }
}
```

## Companion ad

Companion ad can be enabled by passing `companionAdService={true}` as a prop. Once enabled and when the video ad plays using [Google IMA](https://developers.google.com/interactive-media-ads/) within the same page, the React GPT ad will render the companion ad.

```js
import {Bling as GPT} from "react-gpt";

class Application extends React.Component {
    render() {
        return (
            <GPT
                adUnitPath="/4595/nfl.test.open"
                slotSize={[728, 90]}
                companionAdService={true}
            />
        );
    }
}
```

## Passback ad

It's not currently supported.

For more use cases, please see [examples](../examples).
