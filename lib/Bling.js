Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2; /* eslint-disable react/sort-comp */


var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _invariant = require("invariant");

var _invariant2 = _interopRequireDefault(_invariant);

var _deepEqual = require("deep-equal");

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _hoistNonReactStatics = require("hoist-non-react-statics");

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _Events = require("./Events");

var _Events2 = _interopRequireDefault(_Events);

var _filterProps = require("./utils/filterProps");

var _filterProps2 = _interopRequireDefault(_filterProps);

var _createManager = require("./createManager");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * An Ad Component using Google Publisher Tags.
 * This component should work standalone w/o context.
 * https://developers.google.com/doubleclick-gpt/
 *
 * @module Bling
 * @class Bling
 * @fires Bling#Events.READY
 * @fires Bling#Events.SLOT_RENDER_ENDED
 * @fires Bling#Events.IMPRESSION_VIEWABLE
 * @fires Bling#Events.SLOT_VISIBILITY_CHANGED
 * @fires Bling#Events.SLOT_LOADED
 */
var Bling = (_temp2 = _class = function (_Component) {
    _inherits(Bling, _Component);

    function Bling() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Bling);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Bling.__proto__ || Object.getPrototypeOf(Bling)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            scriptLoaded: false,
            inViewport: false
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    /**
     * An array of prop names which can reflect to the ad by calling `refresh`.
     *
     * @property refreshableProps
     * @static
     */

    /**
     * An array of prop names which requires to create a new ad slot and render as a new ad.
     *
     * @property reRenderProps
     * @static
     */

    /**
     * An instance of ad manager.
     *
     * @property _adManager
     * @private
     * @static
     */

    /**
     *
     * @property
     * @private
     * @static
     */


    _createClass(Bling, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            Bling._adManager.addInstance(this);
            Bling._adManager.load(Bling._config.seedFileUrl).then(this.onScriptLoaded.bind(this)).catch(this.onScriptError.bind(this));
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            var propsEqual = Bling._config.propsEqual;
            var sizeMapping = this.props.sizeMapping;


            if ((nextProps.sizeMapping || sizeMapping) && !propsEqual(nextProps.sizeMapping, sizeMapping)) {
                Bling._adManager.removeMQListener(this, nextProps);
            }
        }
    }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState) {
            // if adUnitPath changes, need to create a new slot, re-render
            // otherwise, just refresh
            var scriptLoaded = nextState.scriptLoaded,
                inViewport = nextState.inViewport;

            var notInViewport = this.notInViewport(nextProps, nextState);
            var inViewportChanged = this.state.inViewport !== inViewport;
            var isScriptLoaded = this.state.scriptLoaded !== scriptLoaded;

            // Exit early for visibility change, before executing deep equality check.
            if (notInViewport) {
                return false;
            } else if (inViewportChanged) {
                return true;
            }

            var _Bling$_config = Bling._config,
                filterProps = _Bling$_config.filterProps,
                propsEqual = _Bling$_config.propsEqual;

            var refreshableProps = filterProps(Bling.refreshableProps, this.props, nextProps);
            var reRenderProps = filterProps(Bling.reRenderProps, this.props, nextProps);
            var shouldRender = !propsEqual(reRenderProps.props, reRenderProps.nextProps);
            var shouldRefresh = !shouldRender && !propsEqual(refreshableProps.props, refreshableProps.nextProps);

            if (shouldRefresh) {
                this.configureSlot(this._adSlot, nextProps);
            }

            if (Bling._adManager._syncCorrelator) {
                if (shouldRefresh) {
                    Bling._adManager.refresh();
                } else if (shouldRender || isScriptLoaded) {
                    Bling._adManager.renderAll();
                }
            } else {
                if (shouldRefresh) {
                    this.refresh();
                    return false;
                }
                if (shouldRender || isScriptLoaded) {
                    return true;
                }
            }

            return false;
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            if (this.notInViewport(this.props, this.state)) {
                return;
            }
            if (this._divId) {
                // initial render will enable pubads service before any ad renders
                // so taken care of by the manager
                if (Bling._adManager._initialRender) {
                    Bling._adManager.render();
                } else {
                    this.renderAd();
                }
            }
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            Bling._adManager.removeInstance(this);
            if (this._adSlot) {
                Bling._adManager.googletag.destroySlots([this._adSlot]);
                this._adSlot = null;
            }
        }
    }, {
        key: "onScriptLoaded",
        value: function onScriptLoaded() {
            var onScriptLoaded = this.props.onScriptLoaded;


            if (this.getRenderWhenViewable()) {
                this.foldCheck();
            }
            this.setState({ scriptLoaded: true }, onScriptLoaded); // eslint-disable-line react/no-did-mount-set-state
        }
    }, {
        key: "onScriptError",
        value: function onScriptError(err) {
            console.warn("Ad: Failed to load gpt for " + Bling._config.seedFileUrl, err);
        }
    }, {
        key: "getRenderWhenViewable",
        value: function getRenderWhenViewable() {
            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

            return props.renderWhenViewable !== undefined ? props.renderWhenViewable : Bling._config.renderWhenViewable;
        }
    }, {
        key: "foldCheck",
        value: function foldCheck() {
            if (this.state.inViewport) {
                return;
            }

            var slotSize = this.getSlotSize();
            if (Array.isArray(slotSize) && Array.isArray(slotSize[0])) {
                slotSize = slotSize[0];
            }
            if (slotSize === "fluid" || Array.isArray(slotSize) && slotSize[0] === "fluid") {
                slotSize = [0, 0];
            }

            var inViewport = Bling._adManager.isInViewport(_reactDom2.default.findDOMNode(this), slotSize, this.viewableThreshold);
            if (inViewport) {
                this.setState({ inViewport: true });
            }
        }
    }, {
        key: "defineSizeMapping",
        value: function defineSizeMapping(adSlot, sizeMapping) {
            if (sizeMapping) {
                Bling._adManager.addMQListener(this, this.props);
                var sizeMappingArray = sizeMapping.reduce(function (mapping, size) {
                    return mapping.addSize(size.viewport, size.slot);
                }, Bling._adManager.googletag.sizeMapping()).build();
                adSlot.defineSizeMapping(sizeMappingArray);
            }
        }
    }, {
        key: "setAttributes",
        value: function setAttributes(adSlot, attributes) {
            // no clear method, attempting to clear existing attributes before setting new ones.
            var attributeKeys = adSlot.getAttributeKeys();
            attributeKeys.forEach(function (key) {
                adSlot.set(key, null);
            });
            if (attributes) {
                Object.keys(attributes).forEach(function (key) {
                    adSlot.set(key, attributes[key]);
                });
            }
        }
    }, {
        key: "setTargeting",
        value: function setTargeting(adSlot, targeting) {
            adSlot.clearTargeting();
            if (targeting) {
                Object.keys(targeting).forEach(function (key) {
                    adSlot.setTargeting(key, targeting[key]);
                });
            }
        }
    }, {
        key: "addCompanionAdService",
        value: function addCompanionAdService(serviceConfig, adSlot) {
            var companionAdsService = Bling._adManager.googletag.companionAds();
            adSlot.addService(companionAdsService);
            if ((typeof serviceConfig === "undefined" ? "undefined" : _typeof(serviceConfig)) === "object") {
                if (serviceConfig.hasOwnProperty("enableSyncLoading")) {
                    companionAdsService.enableSyncLoading();
                }
                if (serviceConfig.hasOwnProperty("refreshUnfilledSlots")) {
                    companionAdsService.setRefreshUnfilledSlots(serviceConfig.refreshUnfilledSlots);
                }
            }
        }
    }, {
        key: "getSlotSize",
        value: function getSlotSize() {
            var _props = this.props,
                origSlotSize = _props.slotSize,
                origSizeMapping = _props.sizeMapping;

            var slotSize = void 0;
            if (origSlotSize) {
                slotSize = origSlotSize;
            } else if (origSizeMapping) {
                var sizeMapping = origSizeMapping;
                slotSize = sizeMapping[0] && sizeMapping[0].slot;
            }

            return JSON.stringify(slotSize) === "[0,0]" ? [] : slotSize;
        }
    }, {
        key: "renderAd",
        value: function renderAd() {
            this.defineSlot();
            this.display();
        }
    }, {
        key: "notInViewport",
        value: function notInViewport() {
            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
            var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state;
            var inViewport = state.inViewport;

            return this.getRenderWhenViewable(props) && !inViewport;
        }
    }, {
        key: "defineSlot",
        value: function defineSlot() {
            var _props2 = this.props,
                adUnitPath = _props2.adUnitPath,
                outOfPage = _props2.outOfPage,
                npa = _props2.npa;

            var divId = this._divId;
            var slotSize = this.getSlotSize();

            this.handleSetNpaFlag(npa);

            if (!this._adSlot) {
                if (outOfPage) {
                    this._adSlot = Bling._adManager.googletag.defineOutOfPageSlot(adUnitPath, divId);
                } else {
                    this._adSlot = Bling._adManager.googletag.defineSlot(adUnitPath, slotSize || [], divId);
                }
            }

            this._adSlot && this.configureSlot(this._adSlot);
        }
    }, {
        key: "configureSlot",
        value: function configureSlot(adSlot) {
            var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props;
            var sizeMapping = props.sizeMapping,
                attributes = props.attributes,
                targeting = props.targeting,
                companionAdService = props.companionAdService,
                categoryExclusion = props.categoryExclusion,
                collapseEmptyDiv = props.collapseEmptyDiv,
                safeFrameConfig = props.safeFrameConfig,
                content = props.content,
                clickUrl = props.clickUrl,
                forceSafeFrame = props.forceSafeFrame;


            this.defineSizeMapping(adSlot, sizeMapping);

            if (collapseEmptyDiv !== undefined) {
                if (Array.isArray(collapseEmptyDiv)) {
                    var _adSlot$setCollapseEm;

                    (_adSlot$setCollapseEm = adSlot.setCollapseEmptyDiv).call.apply(_adSlot$setCollapseEm, [adSlot].concat(_toConsumableArray(collapseEmptyDiv)));
                } else {
                    adSlot.setCollapseEmptyDiv(collapseEmptyDiv);
                }
            }

            // Overrides click url
            if (clickUrl) {
                adSlot.setClickUrl(clickUrl);
            }

            // Sets category exclusion
            if (categoryExclusion) {
                var exclusion = categoryExclusion;
                if (typeof exclusion === "string") {
                    exclusion = [exclusion];
                }
                adSlot.clearCategoryExclusions();
                exclusion.forEach(function (item) {
                    adSlot.setCategoryExclusion(item);
                });
            }

            // Sets AdSense attributes
            this.setAttributes(adSlot, attributes);

            // Sets custom targeting parameters
            this.setTargeting(adSlot, targeting);

            if (safeFrameConfig) {
                adSlot.setSafeFrameConfig(safeFrameConfig);
            }

            if (forceSafeFrame) {
                adSlot.setForceSafeFrame(forceSafeFrame);
            }

            // Enables companion ad service
            if (companionAdService) {
                this.addCompanionAdService(companionAdService, adSlot);
            }

            // GPT checks if the same service is already added.
            if (content) {
                adSlot.addService(Bling._adManager.googletag.content());
            } else {
                adSlot.addService(Bling._adManager.googletag.pubads());
            }
        }
    }, {
        key: "display",
        value: function display() {
            var _props3 = this.props,
                content = _props3.content,
                displayCallback = _props3.displayCallback,
                adUnitPath = _props3.adUnitPath;

            var divId = this._divId;
            var adSlot = this._adSlot;
            var slotSize = this.getSlotSize();

            if (content) {
                Bling._adManager.googletag.content().setContent(adSlot, content);
            } else {
                if (!Bling._adManager._disableInitialLoad && !Bling._adManager._syncCorrelator) {
                    Bling._adManager.updateCorrelator();
                }

                if (typeof displayCallback === "function") {
                    displayCallback({
                        display: function display() {
                            return Bling._adManager.googletag.display(divId);
                        },
                        adSlotData: {
                            adUnitPath: adUnitPath,
                            size: slotSize,
                            adSlotId: divId
                        }
                    });
                } else {
                    Bling._adManager.googletag.display(divId);
                }

                if (Bling._adManager._disableInitialLoad && !Bling._adManager._initialRender) {
                    this.refresh();
                }
            }
        }
    }, {
        key: "clear",
        value: function clear() {
            var adSlot = this._adSlot;
            if (adSlot && adSlot.hasOwnProperty("getServices")) {
                // googletag.ContentService doesn't clear content
                var services = adSlot.getServices();
                if (this._divId && services.some(function (s) {
                    return !!s.setContent;
                })) {
                    document.getElementById(this._divId).innerHTML = "";
                    return;
                }
                Bling._adManager.clear([adSlot]);
            }
        }
    }, {
        key: "refresh",
        value: function refresh(options) {
            var adSlot = this._adSlot;
            if (adSlot) {
                this.clear();
                Bling._adManager.refresh([adSlot], options);
            }
        }
    }, {
        key: "render",
        value: function render() {
            var scriptLoaded = this.state.scriptLoaded;
            var _props4 = this.props,
                id = _props4.id,
                outOfPage = _props4.outOfPage,
                style = _props4.style;

            var shouldNotRender = this.notInViewport(this.props, this.state);

            if (!scriptLoaded || shouldNotRender) {
                var slotSize = this.getSlotSize();

                if (!outOfPage) {
                    (0, _invariant2.default)(slotSize, "Either 'slotSize' or 'sizeMapping' prop needs to be set.");
                }

                if (Array.isArray(slotSize) && Array.isArray(slotSize[0])) {
                    slotSize = slotSize[0];
                }
                // https://developers.google.com/doubleclick-gpt/reference?hl=en#googletag.NamedSize
                if (slotSize === "fluid" || Array.isArray(slotSize) && slotSize[0] === "fluid") {
                    slotSize = ["auto", "auto"];
                }
                var emptyStyle = slotSize && {
                    width: slotSize[0],
                    height: slotSize[1]
                };
                // render node element instead of script element so that `inViewport` check works.
                return _react2.default.createElement("div", { style: emptyStyle });
            }

            // clear the current ad if exists
            this.clear();
            if (this._adSlot) {
                Bling._adManager.googletag.destroySlots([this._adSlot]);
                this._adSlot = null;
            }
            this._divId = id || Bling._adManager.generateDivId();

            return _react2.default.createElement("div", { id: this._divId, style: style });
        }

        /**
         * Call pubads and set the non-personalized Ads flag, if it is not undefined.
         *
         * @param {boolean} npa
         */

    }, {
        key: "handleSetNpaFlag",
        value: function handleSetNpaFlag(npa) {
            if (npa === undefined) {
                return;
            }

            Bling._adManager.pubadsProxy({
                method: "setRequestNonPersonalizedAds",
                args: [npa ? 1 : 0],
                resolve: null,
                reject: null
            });
        }
    }, {
        key: "adSlot",
        get: function get() {
            return this._adSlot;
        }
    }, {
        key: "viewableThreshold",
        get: function get() {
            return this.props.viewableThreshold >= 0 ? this.props.viewableThreshold : Bling._config.viewableThreshold;
        }
    }], [{
        key: "on",
        value: function on(eventType, cb) {
            Bling._on("on", eventType, cb);
        }
    }, {
        key: "once",
        value: function once(eventType, cb) {
            Bling._on("once", eventType, cb);
        }
    }, {
        key: "removeListener",
        value: function removeListener() {
            var _Bling$_adManager;

            (_Bling$_adManager = Bling._adManager).removeListener.apply(_Bling$_adManager, arguments);
        }
    }, {
        key: "removeAllListeners",
        value: function removeAllListeners() {
            var _Bling$_adManager2;

            (_Bling$_adManager2 = Bling._adManager).removeAllListeners.apply(_Bling$_adManager2, arguments);
        }
    }, {
        key: "_on",
        value: function _on(fn, eventType, cb) {
            if (typeof cb !== "function") {
                return;
            }
            if (eventType === _Events2.default.READY && Bling._adManager.isReady) {
                cb.call(Bling._adManager, Bling._adManager.googletag);
            } else {
                Bling._adManager[fn](eventType, cb);
            }
        }
    }, {
        key: "configure",
        value: function configure() {
            var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            Bling._config = _extends({}, Bling._config, config);
        }
        /**
         * Returns the GPT version.
         *
         * @method getGPTVersion
         * @returns {Number|boolean} a version or false if GPT is not yet ready.
         * @static
         */

    }, {
        key: "getGPTVersion",
        value: function getGPTVersion() {
            return Bling._adManager.getGPTVersion();
        }
        /**
         * Returns the Pubads Service version.
         *
         * @method getPubadsVersion
         * @returns {Number|boolean} a version or false if Pubads Service is not yet ready.
         * @static
         */

    }, {
        key: "getPubadsVersion",
        value: function getPubadsVersion() {
            return Bling._adManager.getPubadsVersion();
        }
        /**
         * Sets a flag to indicate whether the correlator value should always be same across the ads in the page or not.
         *
         * @method syncCorrelator
         * @param {boolean} value
         * @static
         */

    }, {
        key: "syncCorrelator",
        value: function syncCorrelator(value) {
            Bling._adManager.syncCorrelator(value);
        }
        /**
         * Trigger re-rendering of all the ads.
         *
         * @method render
         * @static
         */

    }, {
        key: "render",
        value: function render() {
            Bling._adManager.renderAll();
        }
        /**
         * Refreshes all the ads in the page with a new correlator value.
         *
         * @param {Array} slots An array of ad slots.
         * @param {Object} options You can pass `changeCorrelator` flag.
         * @static
         */

    }, {
        key: "refresh",
        value: function refresh(slots, options) {
            Bling._adManager.refresh(slots, options);
        }
        /**
         * Clears the ads for the specified ad slots, if no slots are provided, all the ads will be cleared.
         *
         * @method clear
         * @param {Array} slots An optional array of slots to clear.
         * @static
         */

    }, {
        key: "clear",
        value: function clear(slots) {
            Bling._adManager.clear(slots);
        }
        /**
         * Updates the correlator value for the next ad request.
         *
         * @method updateCorrelator
         * @static
         */

    }, {
        key: "updateCorrelator",
        value: function updateCorrelator() {
            Bling._adManager.updateCorrelator();
        }
    }, {
        key: "testManager",
        set: function set(testManager) {
            (0, _invariant2.default)(testManager, "Pass in createManagerTest to mock GPT");
            Bling._adManager = testManager;
        }
    }]);

    return Bling;
}(_react.Component), _class.propTypes = {
    /**
     * An optional string to be used as container div id.
     *
     * @property id
     */
    id: _propTypes2.default.string,
    /**
     * An optional string indicating ad unit path which will be used
     * to create an ad slot.
     *
     * @property adUnitPath
     */
    adUnitPath: _propTypes2.default.string.isRequired,
    /**
     * An optional object which includes ad targeting key-value pairs.
     *
     * @property targeting
     */
    targeting: _propTypes2.default.object,
    /**
     * An optional prop to specify the ad slot size which accepts [googletag.GeneralSize](https://developers.google.com/doubleclick-gpt/reference#googletag.GeneralSize) as a type.
     * This will be preceded by the sizeMapping if specified.
     *
     * @property slotSize
     */
    slotSize: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.string]),
    /**
     * An optional array of object which contains an array of viewport size and slot size.
     * This needs to be set if the ad needs to serve different ad sizes per different viewport sizes (responsive ad).
     * Setting the `slot` to any dimension that's not configured in DFP results in rendering an empty ad.
     * The ad slot size which is provided for the viewport size of [0, 0] will be used as default ad size if none of viewport size matches.
     *
     * https://support.google.com/dfp_premium/answer/3423562?hl=en
     *
     * e.g.
     *
     * sizeMapping={[
     *   {viewport: [0, 0], slot: [320, 50]},
     *   {viewport: [768, 0], slot: [728, 90]}
     * ]}
     *
     * @property sizeMapping
     */
    sizeMapping: _propTypes2.default.arrayOf(_propTypes2.default.shape({
        viewport: _propTypes2.default.array,
        slot: _propTypes2.default.array
    })),
    /**
     * An optional flag to indicate whether an ad slot should be out-of-page slot.
     *
     * @property outOfPage
     */
    outOfPage: _propTypes2.default.bool,
    /**
     * An optional flag to indicate whether companion ad service should be enabled for the ad.
     * If an object is passed, it takes as a configuration expecting `enableSyncLoading` or `refreshUnfilledSlots`.
     *
     * @property companionAdService
     */
    companionAdService: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.object]),
    /**
     * An optional HTML content for the slot. If specified, the ad will render with the HTML content using content service.
     *
     * @property content
     */
    content: _propTypes2.default.string,
    /**
     * An optional click through URL. If specified, any landing page URL associated with the creative that is served is overridden.
     *
     * @property clickUrl
     */
    clickUrl: _propTypes2.default.string,
    /**
     * An optional string or an array of string which specifies a page-level ad category exclusion for the given label name.
     *
     * @property categoryExclusion
     */
    categoryExclusion: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array]),
    /**
     * An optional map of key-value pairs for an AdSense attribute on a particular ad slot.
     * see the list of supported key value: https://developers.google.com/doubleclick-gpt/adsense_attributes#adsense_parameters.googletag.Slot
     *
     * @property attributes
     */
    attributes: _propTypes2.default.object,
    /**
     * An optional flag to indicate whether an empty ad should be collapsed or not.
     *
     * @property collapseEmptyDiv
     */
    collapseEmptyDiv: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.array]),
    displayCallback: _propTypes2.default.func,
    /**
     * An optional flag to indicate whether ads in this slot should be forced to be rendered using a SafeFrame container.
     *
     * @property forceSafeFrame
     */
    forceSafeFrame: _propTypes2.default.bool,
    /**
     * An optional object to set the slot-level preferences for SafeFrame configuration.
     *
     * @property safeFrameConfig
     */
    safeFrameConfig: _propTypes2.default.object,
    /**
     * An optional event handler function for `googletag.events.SlotRenderEndedEvent`.
     *
     * @property onSlotRenderEnded
     */
    onSlotRenderEnded: _propTypes2.default.func,
    /**
     * An optional event handler function for `googletag.events.ImpressionViewableEvent`.
     *
     * @property onImpressionViewable
     */
    onImpressionViewable: _propTypes2.default.func,
    /**
     * An optional event handler function for `googletag.events.slotVisibilityChangedEvent`.
     *
     * @property onSlotVisibilityChanged
     */
    onSlotVisibilityChanged: _propTypes2.default.func,
    /**
     * An optional event handler function for `googletag.events.SlotOnloadEvent`.
     *
     * @property onSlotOnload
     */
    onSlotOnload: _propTypes2.default.func,
    /**
     * An optional flag to indicate whether an ad should only render when it's fully in the viewport area.
     *
     * @property renderWhenViewable
     */
    renderWhenViewable: _propTypes2.default.bool,
    /**
     * An optional number to indicate how much percentage of an ad area needs to be in a viewable area before rendering.
     * Acceptable range is between 0 and 1.
     *
     * @property viewableThreshold
     */
    viewableThreshold: _propTypes2.default.number,
    /**
     * An optional call back function to notify when the script is loaded.
     *
     * @property onScriptLoaded
     */
    onScriptLoaded: _propTypes2.default.func,
    /**
     * An optional call back function to notify when the media queries on the document change.
     *
     * @property onMediaQueryChange
     */
    onMediaQueryChange: _propTypes2.default.func,
    /**
     * An optional object to be applied as `style` props to the container div.
     *
     * @property style
     */
    style: _propTypes2.default.object,
    /**
     * An optional property to control non-personalized Ads.
     * https://support.google.com/admanager/answer/7678538
     *
     * Set to `true` to mark the ad request as NPA, and to `false` for ad requests that are eligible for personalized ads
     * It is `false` by default, according to Google's definition.
     *
     * @property npa
     */
    npa: _propTypes2.default.bool
}, _class.refreshableProps = ["targeting", "sizeMapping", "clickUrl", "categoryExclusion", "attributes", "collapseEmptyDiv", "companionAdService", "forceSafeFrame", "safeFrameConfig"], _class.reRenderProps = ["adUnitPath", "slotSize", "outOfPage", "content", "npa"], _class._adManager = (0, _createManager.createManager)(), _class._config = {
    /**
     * An optional string for GPT seed file url to override.
     */
    seedFileUrl: "https://securepubads.g.doubleclick.net/tag/js/gpt.js",
    /**
     * An optional flag to indicate whether an ad should only render when it's fully in the viewport area. Default is `true`.
     */
    renderWhenViewable: true,
    /**
     * An optional number to indicate how much percentage of an ad area needs to be in a viewable area before rendering. Default value is 0.5.
     * Acceptable range is between 0 and 1.
     */
    viewableThreshold: 0.5,
    /**
     * An optional function to create an object with filtered current props and next props for a given keys to perform equality check.
     */
    filterProps: _filterProps2.default,
    /**
     * An optional function for the filtered props and the next props to perform equality check.
     */
    propsEqual: _deepEqual2.default
}, _temp2);

// proxy pubads API through Bling

exports.default = (0, _hoistNonReactStatics2.default)(Bling, _createManager.pubadsAPI.reduce(function (api, method) {
    api[method] = function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return Bling._adManager.pubadsProxy({ method: method, args: args });
    };
    return api;
}, {}));