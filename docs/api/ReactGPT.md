## React GPT API References

### <a id='Bling'></a>[`<Bling props>`](#Bling)

A React component which renders [GPT](https://support.google.com/dfp_sb/answer/1649768?hl=en) ad.

#### Props

`Bling` tries to cover as much [Slot API](https://developers.google.com/doubleclick-gpt/reference#googletagslot) as possible as `props`.

- `id`(optional) - An optional string to be used as container div id.
- `adUnitPath`(required) - An string indicating ad unit path which will be used to create an ad slot.
- `targeting`(optional) - An optional object which includes ad targeting key-value pairs.
- `slotSize`(optional) - An optional prop to specify the ad slot size which accepts [googletag.GeneralSize](https://developers.google.com/doubleclick-gpt/reference#googletag.GeneralSize) as a type. This will be preceded by the sizeMapping if specified.
- `sizeMapping`(optional) - An optional array of object which contains an array of viewport size and slot size. This needs to be set if the ad needs to serve different ad sizes per different viewport sizes (responsive ad). Setting the `slot` to any dimension that's not configured in DFP results in rendering an empty ad. The ad slot size which is provided for the viewport size of [0, 0] will be used as default ad size if none of viewport size matches.
- `outOfPage`(optional) - An optional flag to indicate whether an ad slot should be out-of-page slot.
- `companionAdService`(optional) - An optional flag to indicate whether companion ad service should be enabled for the ad. If an object is passed, it takes as a configuration expecting `enableSyncLoading` or `refreshUnfilledSlots`.
- `content`(optional) - An optional HTML content for the slot. If specified, the ad will render with the HTML content using content service.
- `clickUrl`(optional) - An optional click through URL. If specified, any landing page URL associated with the creative that is served is overridden.
- `categoryExclusion`(optional) - An optional string or an array of string which specifies a page-level ad category exclusion for the given label name.
- `attributes`(optional) - An optional map of key-value pairs for an AdSense attribute on a particular ad slot. see [the list of supported key value](https://developers.google.com/doubleclick-gpt/adsense_attributes#adsense_parameters.googletag.Slot)
- `collapseEmptyDiv`(optional) - An optional flag to indicate whether an empty ad should be collapsed or not.
- `forceSafeFrame`(optional) - An optional flag to indicate whether ads in this slot should be forced to be rendered using a SafeFrame container.
- `safeFrameConfig`(optional) - An optional object to set the slot-level preferences for SafeFrame configuration.
- `onSlotRenderEnded`(optional) - An optional event handler function for `googletag.events.SlotRenderEndedEvent`.
- `onImpressionViewable`(optional) - An optional event handler function for `googletag.events.ImpressionViewableEvent`.
- `onSlotVisibilityChanged`(optional) - An optional event handler function for `googletag.events.slotVisibilityChangedEvent`.
- `onSlotOnload`(optional) - An optional event handler function for `googletag.events.SlotOnloadEvent`.
- `renderWhenViewable`(optional) - An optional flag to indicate whether an ad should only render when it's fully in the viewport area.
- `viewableThreshold`(optional) - An optional number to indicate how much percentage of an ad area needs to be in a viewable area before rendering. Acceptable range is between `0` and `1`.
- `onScriptLoaded`(optional) - An optional call back function to notify when the script is loaded.
- `onMediaQueryChange`(optional) - An optional call back function to notify when the media queries change on the break point specified in the `sizeMapping`.
- `style`(optional) - An optional object to be applied as `style` props to the container div. **This prop is only applied once in initial render.** If you want to apply style to the ad and change it frequently, apply style to the container.

Only `adUnitPath` is a required prop, but either `slotSize` or `sizeMapping` need to be passed for `Bling` to render an ad.

#### Static Methods

- `configure(config = {})` - Update global configuration.
- `on(eventType, cb)` - Subscribe to the event.
- `once(eventType, cb)` - Subscribe to the event once.
- `removeListener(eventType, cb)` - Removes the specified listener from the listener array for the specified `eventType`.
- `removeAllListeners([eventType])` - Removes all listeners, or those of the specified `eventType`.
- `getGPTVersion` - Returns the GPT version.
- `getPubadsVersion` - Returns the Pubads version.
- `syncCorrelator([flag])` - Sets a flag to indicate whether the `refresh` should happen with the same correlator value or not.
- `render` - Force rendering all the ads.
- `refresh([slots, options])` - Refreshes the ad specified by an array of slot. If slots are not specified, it will refresh all ads. See [here](https://developers.google.com/doubleclick-gpt/reference#googletag.PubAdsService_refresh) for more details.
- `clear([slots])` - Clears the ad specifid by an array of slot. If slots are not specified, it will clear all ads. See [here](https://developers.google.com/doubleclick-gpt/reference#googletagpubadsservice) for more details.
- `updateCorrelator` - Updates the correlator value that's sent with ad requests. See [here](https://developers.google.com/doubleclick-gpt/reference#googletag.PubAdsService_updateCorrelator) for more details.
- `createTestManager` - Creates a test ad manager to use mocked GPT for unit testing.

In addition to the defined static methods above, all the supported Pubads API are exposed as static methods, too.
The list of the supported API are maintained [here](https://github.com/nfl/react-gpt/blob/master/src/createManager.js#L9) and updated based on the [GPT API Reference](https://developers.google.com/doubleclick-gpt/reference).

There are several Pubads APIs which is required to call before the service is enabled.
React GPT makes sure that those APIs are called right before the service is enabled.

#### Global configuration

Global configuration applies to the all React GPT instances. You can set the following configuration through `Bling.configure(config)`.

- `seedFileUrl` - An optional string for GPT seed file url to override. Default value is `//www.googletagservices.com/tag/js/gpt.js`.
- `renderWhenViewable` - An optional flag to indicate whether an ad should only render when it's fully in the viewport area. Default is `true`.
- `viewableThreshold` - An optional number to indicate how much percentage of an ad area needs to be in a viewable area before rendering. Default value is `0.5`. Acceptable range is between `0` and `1.0`.
- `filterProps` - An optional function to create an object with filtered current props and next props for a given keys to perform equality check. Default value is [`filterProps`](../../src/utils/filterProps.js).
- `propsEqual` - An optional function for the filtered props and the next props to perform equality check. Default value is [`deepEqual`](https://github.com/substack/node-deep-equal).

### <a id='Events'></a>[`Events`](#Events)

- `READY` - This event is fired when the pubads is ready and before the service is enabled.
- `RENDER` - This event is fired after the initial ad rendering is triggered. Due to the handing of single request mode, the initial rendering is done for all ads at once.
- `SLOT_RENDER_ENDED` - This event is fired when a slot on the page has finished rendering. The event is fired by the service that rendered the slot. See [here](https://developers.google.com/doubleclick-gpt/reference#googletageventsslotrenderendedevent) for more details.
- `IMPRESSION_VIEWABLE` - This event is fired when an impression becomes viewable, according to the [Active View criteria](https://support.google.com/dfp_premium/answer/4574077?hl=en). See [here](https://developers.google.com/doubleclick-gpt/reference#googletageventsimpressionviewableevent) for more details.
- `SLOT_VISIBILITY_CHANGED` - This event is fired whenever the on-screen percentage of an ad slot's area changes. The event is throttled and will not fire more often than once every 200ms. See [here](https://developers.google.com/doubleclick-gpt/reference#googletageventsslotvisibilitychangedevent) for more details.
