(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["ReactGPT"] = factory(require("react"), require("react-dom"));
	else
		root["ReactGPT"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_18__, __WEBPACK_EXTERNAL_MODULE_19__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Bling = __webpack_require__(2);

	Object.defineProperty(exports, "Bling", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Bling).default;
	  }
	});

	var _Events = __webpack_require__(1);

	Object.defineProperty(exports, "Events", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Events).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 1 */
/***/ function(module, exports) {

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Events = {
	    READY: "ready",
	    RENDER: "render",
	    SLOT_RENDER_ENDED: "slotRenderEnded",
	    IMPRESSION_VIEWABLE: "impressionViewable",
	    SLOT_VISIBILITY_CHANGED: "slotVisibilityChanged"
	};

	exports.default = Events;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _class, _temp2; /* eslint-disable react/sort-comp */


	var _react = __webpack_require__(18);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(19);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _invariant = __webpack_require__(15);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _deepEqual = __webpack_require__(10);

	var _deepEqual2 = _interopRequireDefault(_deepEqual);

	var _hoistNonReactStatics = __webpack_require__(16);

	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

	var _Events = __webpack_require__(1);

	var _Events2 = _interopRequireDefault(_Events);

	var _filterProps = __webpack_require__(5);

	var _filterProps2 = _interopRequireDefault(_filterProps);

	var _createManager = __webpack_require__(3);

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
	            // console.log(`shouldRefresh: ${shouldRefresh}, shouldRender: ${shouldRender}, isScriptLoaded: ${isScriptLoaded}, syncCorrelator: ${Bling._adManager._syncCorrelator}`);

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
	            if (slotSize === "fluid") {
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

	            return slotSize;
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
	                outOfPage = _props2.outOfPage;

	            var divId = this._divId;
	            var slotSize = this.getSlotSize();

	            if (!this._adSlot) {
	                if (outOfPage) {
	                    this._adSlot = Bling._adManager.googletag.defineOutOfPageSlot(adUnitPath, divId);
	                } else {
	                    this._adSlot = Bling._adManager.googletag.defineSlot(adUnitPath, slotSize || [], divId);
	                }
	            }

	            this.configureSlot(this._adSlot);
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
	            var content = this.props.content;

	            var divId = this._divId;
	            var adSlot = this._adSlot;

	            if (content) {
	                Bling._adManager.googletag.content().setContent(adSlot, content);
	            } else {
	                if (!Bling._adManager._disableInitialLoad && !Bling._adManager._syncCorrelator) {
	                    Bling._adManager.updateCorrelator();
	                }
	                Bling._adManager.googletag.display(divId);
	                if (Bling._adManager._disableInitialLoad && !Bling._adManager._initialRender) {
	                    this.refresh();
	                }
	            }
	        }
	    }, {
	        key: "clear",
	        value: function clear() {
	            var adSlot = this._adSlot;
	            if (adSlot) {
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
	            var _props3 = this.props,
	                id = _props3.id,
	                outOfPage = _props3.outOfPage,
	                style = _props3.style;

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
	                if (slotSize === "fluid") {
	                    slotSize = ["auto", "auto"];
	                }
	                var emptyStyle = slotSize && { width: slotSize[0], height: slotSize[1] };
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
	        key: "createTestManager",
	        value: function createTestManager() {
	            Bling._adManager = (0, _createManager.createManager)({ test: true });
	        }
	    }]);

	    return Bling;
	}(_react.Component), _class.propTypes = {
	    /**
	     * An optional string to be used as container div id.
	     *
	     * @property id
	     */
	    id: _react.PropTypes.string,
	    /**
	     * An optional string indicating ad unit path which will be used
	     * to create an ad slot.
	     *
	     * @property adUnitPath
	     */
	    adUnitPath: _react.PropTypes.string.isRequired,
	    /**
	     * An optional object which includes ad targeting key-value pairs.
	     *
	     * @property targeting
	     */
	    targeting: _react.PropTypes.object,
	    /**
	     * An optional prop to specify the ad slot size which accepts [googletag.GeneralSize](https://developers.google.com/doubleclick-gpt/reference#googletag.GeneralSize) as a type.
	     * This will be preceded by the sizeMapping if specified.
	     *
	     * @property slotSize
	     */
	    slotSize: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.string]),
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
	    sizeMapping: _react.PropTypes.arrayOf(_react.PropTypes.shape({
	        viewport: _react.PropTypes.array,
	        slot: _react.PropTypes.array
	    })),
	    /**
	     * An optional flag to indicate whether an ad slot should be out-of-page slot.
	     *
	     * @property outOfPage
	     */
	    outOfPage: _react.PropTypes.bool,
	    /**
	     * An optional flag to indicate whether companion ad service should be enabled for the ad.
	     * If an object is passed, it takes as a configuration expecting `enableSyncLoading` or `refreshUnfilledSlots`.
	     *
	     * @property companionAdService
	     */
	    companionAdService: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.object]),
	    /**
	     * An optional HTML content for the slot. If specified, the ad will render with the HTML content using content service.
	     *
	     * @property content
	     */
	    content: _react.PropTypes.string,
	    /**
	     * An optional click through URL. If specified, any landing page URL associated with the creative that is served is overridden.
	     *
	     * @property clickUrl
	     */
	    clickUrl: _react.PropTypes.string,
	    /**
	     * An optional string or an array of string which specifies a page-level ad category exclusion for the given label name.
	     *
	     * @property categoryExclusion
	     */
	    categoryExclusion: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.array]),
	    /**
	     * An optional map of key-value pairs for an AdSense attribute on a particular ad slot.
	     * see the list of supported key value: https://developers.google.com/doubleclick-gpt/adsense_attributes#adsense_parameters.googletag.Slot
	     *
	     * @property attributes
	     */
	    attributes: _react.PropTypes.object,
	    /**
	     * An optional flag to indicate whether an empty ad should be collapsed or not.
	     *
	     * @property collapseEmptyDiv
	     */
	    collapseEmptyDiv: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.array]),
	    /**
	     * An optional flag to indicate whether ads in this slot should be forced to be rendered using a SafeFrame container.
	     *
	     * @property forceSafeFrame
	     */
	    forceSafeFrame: _react.PropTypes.bool,
	    /**
	     * An optional object to set the slot-level preferences for SafeFrame configuration.
	     *
	     * @property safeFrameConfig
	     */
	    safeFrameConfig: _react.PropTypes.object,
	    /**
	     * An optional event handler function for `googletag.events.SlotRenderEndedEvent`.
	     *
	     * @property onSlotRenderEnded
	     */
	    onSlotRenderEnded: _react.PropTypes.func,
	    /**
	     * An optional event handler function for `googletag.events.ImpressionViewableEvent`.
	     *
	     * @property onImpressionViewable
	     */
	    onImpressionViewable: _react.PropTypes.func,
	    /**
	     * An optional event handler function for `googletag.events.slotVisibilityChangedEvent`.
	     *
	     * @property onSlotVisibilityChanged
	     */
	    onSlotVisibilityChanged: _react.PropTypes.func,
	    /**
	     * An optional flag to indicate whether an ad should only render when it's fully in the viewport area.
	     *
	     * @property renderWhenViewable
	     */
	    renderWhenViewable: _react.PropTypes.bool,
	    /**
	     * An optional number to indicate how much percentage of an ad area needs to be in a viewable area before rendering.
	     * Acceptable range is between 0 and 1.
	     *
	     * @property viewableThreshold
	     */
	    viewableThreshold: _react.PropTypes.number,
	    /**
	     * An optional call back function to notify when the script is loaded.
	     *
	     * @property onScriptLoaded
	     */
	    onScriptLoaded: _react.PropTypes.func,
	    /**
	     * An optional call back function to notify when the media queries on the document change.
	     *
	     * @property onMediaQueryChange
	     */
	    onMediaQueryChange: _react.PropTypes.func,
	    /**
	     * An optional object to be applied as `style` props to the container div.
	     *
	     * @property style
	     */
	    style: _react.PropTypes.object
	}, _class.refreshableProps = ["targeting", "sizeMapping", "clickUrl", "categoryExclusion", "attributes", "collapseEmptyDiv", "companionAdService", "forceSafeFrame", "safeFrameConfig"], _class.reRenderProps = ["adUnitPath", "slotSize", "outOfPage", "content"], _class._adManager = (0, _createManager.createManager)(), _class._config = {
	    /**
	     * An optional string for GPT seed file url to override.
	     */
	    seedFileUrl: "//www.googletagservices.com/tag/js/gpt.js",
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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.AdManager = exports.APIToCallBeforeServiceEnabled = exports.pubadsAPI = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.createManager = createManager;

	var _eventemitter = __webpack_require__(13);

	var _eventemitter2 = _interopRequireDefault(_eventemitter);

	var _lodash = __webpack_require__(17);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _debounce = __webpack_require__(9);

	var _debounce2 = _interopRequireDefault(_debounce);

	var _ExecutionEnvironment = __webpack_require__(14);

	var _Events = __webpack_require__(1);

	var _Events2 = _interopRequireDefault(_Events);

	var _isInViewport2 = __webpack_require__(6);

	var _isInViewport3 = _interopRequireDefault(_isInViewport2);

	var _mockGPT = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// based on https://developers.google.com/doubleclick-gpt/reference?hl=en
	var pubadsAPI = exports.pubadsAPI = ["enableAsyncRendering", "enableSingleRequest", "enableSyncRendering", "disableInitialLoad", "collapseEmptyDivs", "enableVideoAds", "set", "get", "getAttributeKeys", "setTargeting", "clearTargeting", "setCategoryExclusion", "clearCategoryExclusions", "setCentering", "setCookieOptions", "setLocation", "setPublisherProvidedId", "setTagForChildDirectedTreatment", "clearTagForChildDirectedTreatment", "setVideoContent", "setForceSafeFrame"];

	var APIToCallBeforeServiceEnabled = exports.APIToCallBeforeServiceEnabled = ["enableAsyncRendering", "enableSingleRequest", "enableSyncRendering", "disableInitialLoad", "collapseEmptyDivs", "setCentering"];

	var AdManager = exports.AdManager = function (_EventEmitter) {
	    _inherits(AdManager, _EventEmitter);

	    function AdManager() {
	        var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        _classCallCheck(this, AdManager);

	        var _this = _possibleConstructorReturn(this, (AdManager.__proto__ || Object.getPrototypeOf(AdManager)).call(this, config));

	        _this._adCnt = 0;
	        _this._initialRender = true;
	        _this._syncCorrelator = false;
	        _this._testMode = false;
	        _this._foldCheck = (0, _lodash2.default)(function (event) {
	            var instances = _this.getMountedInstances();
	            instances.forEach(function (instance) {
	                if (instance.getRenderWhenViewable()) {
	                    instance.foldCheck(event);
	                }
	            });
	        }, 200);

	        _this._handleMediaQueryChange = function (event) {
	            if (_this._syncCorrelator) {
	                _this.refresh();
	                return;
	            }
	            // IE returns `event.media` value differently, need to use regex to evaluate.
	            var res = /min-width:\s?(\d+)px/.exec(event.media);
	            var viewportWidth = res && res[1];

	            if (viewportWidth && _this._mqls[viewportWidth]) {
	                _this._mqls[viewportWidth].listeners.forEach(function (instance) {
	                    instance.refresh();
	                    if (instance.props.onMediaQueryChange) {
	                        instance.props.onMediaQueryChange(event);
	                    }
	                });
	            }
	        };

	        _this.render = (0, _debounce2.default)(function () {
	            if (!_this._initialRender) {
	                return;
	            }

	            var checkPubadsReady = function checkPubadsReady(cb) {
	                if (_this.pubadsReady) {
	                    cb();
	                } else {
	                    setTimeout(checkPubadsReady, 50, cb);
	                }
	            };

	            var instances = _this.getMountedInstances();
	            var hasPubAdsService = false;
	            var dummyAdSlot = void 0;

	            // Define all the slots
	            instances.forEach(function (instance) {
	                if (!instance.notInViewport()) {
	                    instance.defineSlot();
	                    var adSlot = instance.adSlot;
	                    var services = adSlot.getServices();
	                    if (!hasPubAdsService) {
	                        hasPubAdsService = services.filter(function (service) {
	                            return !!service.enableAsyncRendering;
	                        }).length > 0;
	                    }
	                }
	            });
	            // if none of the ad slots uses pubads service, create dummy slot to use pubads service.
	            if (!hasPubAdsService) {
	                dummyAdSlot = _this.googletag.defineSlot("/", []);
	                dummyAdSlot.addService(_this.googletag.pubads());
	            }

	            // Call pubads API which needs to be called before service is enabled.
	            _this._processPubadsQueue();

	            // Enable service
	            _this.googletag.enableServices();

	            // After the service is enabled, check periodically until `pubadsReady` flag returns true before proceeding the rest.
	            checkPubadsReady(function () {
	                // destroy dummy ad slot if exists.
	                if (dummyAdSlot) {
	                    _this.googletag.destroySlots([dummyAdSlot]);
	                }
	                // Call the rest of the pubads API that's in the queue.
	                _this._processPubadsQueue();
	                // listen for GPT events
	                _this._listen();
	                // client should be able to set any page-level setting within the event handler.
	                _this._isReady = true;
	                _this.emit(_Events2.default.READY, _this.googletag);

	                // Call display
	                instances.forEach(function (instance) {
	                    if (!instance.notInViewport()) {
	                        instance.display();
	                    }
	                });

	                _this.emit(_Events2.default.RENDER, _this.googletag);

	                _this._initialRender = false;
	            });
	        }, 4);
	        _this.renderAll = (0, _debounce2.default)(function () {
	            if (!_this.apiReady) {
	                return false;
	            }

	            // first instance updates correlator value and re-render each ad
	            var instances = _this.getMountedInstances();
	            instances.forEach(function (instance, i) {
	                if (i === 0) {
	                    _this.updateCorrelator();
	                }
	                instance.forceUpdate();
	            });

	            return true;
	        }, 4);


	        if (config.test) {
	            _this.testMode = config.test;
	        }
	        return _this;
	    }

	    _createClass(AdManager, [{
	        key: "_processPubadsQueue",
	        value: function _processPubadsQueue() {
	            var _this2 = this;

	            if (this._pubadsProxyQueue) {
	                Object.keys(this._pubadsProxyQueue).forEach(function (method) {
	                    if (_this2.googletag && !_this2.googletag.pubadsReady && APIToCallBeforeServiceEnabled.indexOf(method) > -1 || _this2.pubadsReady) {
	                        _this2._pubadsProxyQueue[method].forEach(function (params) {
	                            return _this2.pubadsProxy(params);
	                        });
	                        delete _this2._pubadsProxyQueue[method];
	                    }
	                });
	                if (!Object.keys(this._pubadsProxyQueue).length) {
	                    this._pubadsProxyQueue = null;
	                }
	            }
	        }
	    }, {
	        key: "_callPubads",
	        value: function _callPubads(_ref) {
	            var method = _ref.method,
	                args = _ref.args,
	                resolve = _ref.resolve,
	                reject = _ref.reject;

	            if (typeof this.googletag.pubads()[method] !== "function") {
	                reject(new Error("googletag.pubads does not support " + method + ", please update pubadsAPI"));
	            } else {
	                try {
	                    var _googletag$pubads;

	                    var result = (_googletag$pubads = this.googletag.pubads())[method].apply(_googletag$pubads, _toConsumableArray(args));
	                    resolve(result);
	                } catch (err) {
	                    reject(err);
	                }
	            }
	        }
	    }, {
	        key: "_toggleListener",
	        value: function _toggleListener(add) {
	            var _this3 = this;

	            ["scroll", "resize"].forEach(function (eventName) {
	                window[add ? "addEventListener" : "removeEventListener"](eventName, _this3._foldCheck);
	            });
	        }
	    }, {
	        key: "_listen",
	        value: function _listen() {
	            var _this4 = this;

	            if (!this._listening) {
	                [_Events2.default.SLOT_RENDER_ENDED, _Events2.default.IMPRESSION_VIEWABLE, _Events2.default.SLOT_VISIBILITY_CHANGED].forEach(function (eventType) {
	                    ["pubads", "content", "companionAds"].forEach(function (service) {
	                        // there is no API to remove listeners.
	                        _this4.googletag[service]().addEventListener(eventType, _this4._onEvent.bind(_this4, eventType));
	                    });
	                });
	                this._listening = true;
	            }
	        }
	    }, {
	        key: "_onEvent",
	        value: function _onEvent(eventType, event) {
	            // fire to the global listeners
	            if (this.listeners(eventType, true)) {
	                this.emit(eventType, event);
	            }
	            // call event handler props
	            var instances = this.getMountedInstances();
	            var slot = event.slot;

	            var funcName = "on" + eventType.charAt(0).toUpperCase() + eventType.substr(1);
	            var instance = instances.filter(function (inst) {
	                return slot === inst.adSlot;
	            })[0];
	            if (instance && instance.props[funcName]) {
	                instance.props[funcName](event);
	            }
	        }
	    }, {
	        key: "syncCorrelator",
	        value: function syncCorrelator() {
	            var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

	            this._syncCorrelator = value;
	        }
	    }, {
	        key: "generateDivId",
	        value: function generateDivId() {
	            return "bling-" + ++this._adCnt;
	        }
	    }, {
	        key: "getMountedInstances",
	        value: function getMountedInstances() {
	            if (!this.mountedInstances) {
	                this.mountedInstances = [];
	            }
	            return this.mountedInstances;
	        }
	    }, {
	        key: "addInstance",
	        value: function addInstance(instance) {
	            var instances = this.getMountedInstances();
	            var index = instances.indexOf(instance);
	            if (index === -1) {
	                // The first instance starts listening for the event.
	                if (instances.length === 0) {
	                    this._toggleListener(true);
	                }
	                this.addMQListener(instance, instance.props);
	                instances.push(instance);
	            }
	        }
	    }, {
	        key: "removeInstance",
	        value: function removeInstance(instance) {
	            var instances = this.getMountedInstances();
	            var index = instances.indexOf(instance);
	            if (index >= 0) {
	                instances.splice(index, 1);
	                // The last instance removes listening for the event.
	                if (instances.length === 0) {
	                    this._toggleListener(false);
	                }
	                this.removeMQListener(instance, instance.props);
	            }
	        }
	    }, {
	        key: "addMQListener",
	        value: function addMQListener(instance, _ref2) {
	            var _this5 = this;

	            var sizeMapping = _ref2.sizeMapping;

	            if (!sizeMapping || !Array.isArray(sizeMapping)) {
	                return;
	            }

	            sizeMapping.forEach(function (size) {
	                var viewportWidth = size.viewport && size.viewport[0];
	                if (viewportWidth !== undefined) {
	                    if (!_this5._mqls) {
	                        _this5._mqls = {};
	                    }
	                    if (!_this5._mqls[viewportWidth]) {
	                        var mql = window.matchMedia("(min-width: " + viewportWidth + "px)");
	                        mql.addListener(_this5._handleMediaQueryChange);
	                        _this5._mqls[viewportWidth] = {
	                            mql: mql,
	                            listeners: []
	                        };
	                    }
	                    if (_this5._mqls[viewportWidth].listeners.indexOf(instance) === -1) {
	                        _this5._mqls[viewportWidth].listeners.push(instance);
	                    }
	                }
	            });
	        }
	    }, {
	        key: "removeMQListener",
	        value: function removeMQListener(instance) {
	            var _this6 = this;

	            if (!this._mqls) {
	                return;
	            }

	            Object.keys(this._mqls).forEach(function (key) {
	                var index = _this6._mqls[key].listeners.indexOf(instance);
	                if (index > -1) {
	                    _this6._mqls[key].listeners.splice(index, 1);
	                }
	                if (_this6._mqls[key].listeners.length === 0) {
	                    _this6._mqls[key].mql.removeListener(_this6._handleMediaQueryChange);
	                    delete _this6._mqls[key];
	                }
	            });
	        }
	    }, {
	        key: "isInViewport",
	        value: function isInViewport() {
	            return _isInViewport3.default.apply(undefined, arguments);
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
	            if (!this.pubadsReady) {
	                return false;
	            }

	            // gpt already debounces refresh
	            this.googletag.pubads().refresh(slots, options);

	            return true;
	        }
	    }, {
	        key: "clear",
	        value: function clear(slots) {
	            if (!this.pubadsReady) {
	                return false;
	            }

	            this.googletag.pubads().clear(slots);

	            return true;
	        }

	        /**
	         * Re-render(not refresh) all the ads in the page and the first ad will update the correlator value.
	         * Updating correlator value ensures competitive exclusion.
	         *
	         * @method renderAll
	         * @static
	         */

	    }, {
	        key: "getGPTVersion",
	        value: function getGPTVersion() {
	            if (!this.apiReady) {
	                return false;
	            }
	            return this.googletag.getVersion();
	        }
	    }, {
	        key: "getPubadsVersion",
	        value: function getPubadsVersion() {
	            if (!this.pubadsReady) {
	                return false;
	            }
	            return this.googletag.pubads().getVersion();
	        }
	    }, {
	        key: "updateCorrelator",
	        value: function updateCorrelator() {
	            if (!this.pubadsReady) {
	                return false;
	            }
	            this.googletag.pubads().updateCorrelator();

	            return true;
	        }
	    }, {
	        key: "load",
	        value: function load(url) {
	            var _this7 = this;

	            return this._loadPromise || (this._loadPromise = new Promise(function (resolve, reject) {
	                // test mode can't be enabled in production mode
	                if (_this7.testMode) {
	                    resolve(_this7.googletag);
	                    return;
	                }
	                if (!_ExecutionEnvironment.canUseDOM) {
	                    reject(new Error("DOM not available"));
	                    return;
	                }
	                if (!url) {
	                    reject(new Error("url is missing"));
	                    return;
	                }
	                var onLoad = function onLoad() {
	                    if (window.googletag) {
	                        _this7._googletag = window.googletag;
	                        // make sure API is ready for use.
	                        _this7.googletag.cmd.push(function () {
	                            _this7._isLoaded = true;
	                            resolve(_this7.googletag);
	                        });
	                    } else {
	                        reject(new Error("window.googletag is not available"));
	                    }
	                };
	                if (window.googletag) {
	                    onLoad();
	                } else {
	                    var script = document.createElement("script");
	                    script.async = true;
	                    script.onload = onLoad;
	                    script.onerror = function () {
	                        reject(new Error("failed to load script"));
	                    };
	                    script.src = url;
	                    document.head.appendChild(script);
	                }
	            }));
	        }
	    }, {
	        key: "pubadsProxy",
	        value: function pubadsProxy(_ref3) {
	            var _this8 = this;

	            var method = _ref3.method,
	                _ref3$args = _ref3.args,
	                args = _ref3$args === undefined ? [] : _ref3$args,
	                resolve = _ref3.resolve,
	                reject = _ref3.reject;

	            if (!resolve) {
	                // there are couple pubads API which doesn't provide getter methods for later use,
	                // so remember them here.
	                if (APIToCallBeforeServiceEnabled.indexOf(method) > -1) {
	                    this["_" + method] = args && args.length && args[0] || true;
	                }
	                return new Promise(function (resolve2, reject2) {
	                    var params = { method: method, args: args, resolve: resolve2, reject: reject2 };
	                    if (!_this8.pubadsReady) {
	                        if (!_this8._pubadsProxyQueue) {
	                            _this8._pubadsProxyQueue = {};
	                        }
	                        if (!_this8._pubadsProxyQueue[method]) {
	                            _this8._pubadsProxyQueue[method] = [];
	                        }
	                        _this8._pubadsProxyQueue[method].push(params);
	                    } else {
	                        _this8._callPubads(params);
	                    }
	                });
	            }

	            this._callPubads({ method: method, args: args, resolve: resolve, reject: reject });

	            return Promise.resolve();
	        }
	    }, {
	        key: "googletag",
	        get: function get() {
	            return this._googletag;
	        }
	    }, {
	        key: "isLoaded",
	        get: function get() {
	            return !!this._isLoaded;
	        }
	    }, {
	        key: "isReady",
	        get: function get() {
	            return !!this._isReady;
	        }
	    }, {
	        key: "apiReady",
	        get: function get() {
	            return this.googletag && this.googletag.apiReady;
	        }
	    }, {
	        key: "pubadsReady",
	        get: function get() {
	            return this.googletag && this.googletag.pubadsReady;
	        }
	    }, {
	        key: "testMode",
	        get: function get() {
	            return this._testMode;
	        },
	        set: function set(config) {
	            if (false) {
	                return;
	            }
	            this._googletag = new _mockGPT.GPTMock(config);
	            this._isLoaded = true;
	            this._testMode = !!config;
	        }
	    }]);

	    return AdManager;
	}(_eventemitter2.default);

	function createManager(config) {
	    return new AdManager(config);
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// DO NOT MODIFY THIS FILE MANUALLY.
	// This file is generated by `npm run update-apilist`.
	// Note that only APIs that's documented in https://developers.google.com/doubleclick-gpt/reference is officially supported.

	var gptVersion = exports.gptVersion = 110;
	var gptAPI = exports.gptAPI = [["getVersion", "function"], ["cmd", "object"], ["getEventLog", "function"], ["enableServices", "function"], ["setAdIframeTitle", "function"], ["impl", "object"], ["pubads", "function"], ["defineOutOfPageSlot", "function"], ["defineSlot", "function"], ["defineUnit", "function"], ["destroySlots", "function"], ["display", "function"], ["companionAds", "function"], ["content", "function"], ["debug_log", "object"], ["service_manager_instance", "object"], ["disablePublisherConsole", "function"], ["onPubConsoleJsLoad", "function"], ["openConsole", "function"], ["sizeMapping", "function"], ["evalScripts", "function"], ["apiReady", "boolean"], ["slot_manager_instance", "object"], ["pubadsReady", "boolean"]];
	var pubadsVersion = exports.pubadsVersion = 110;
	var pubadsAPI = exports.pubadsAPI = [["set", "function"], ["get", "function"], ["getAttributeKeys", "function"], ["display", "function"], ["getName", "function"], ["setCookieOptions", "function"], ["setTagForChildDirectedTreatment", "function"], ["clearTagForChildDirectedTreatment", "function"], ["setKidsFriendlyAds", "function"], ["setTargeting", "function"], ["clearTargeting", "function"], ["getTargeting", "function"], ["getTargetingKeys", "function"], ["setCategoryExclusion", "function"], ["clearCategoryExclusions", "function"], ["disableInitialLoad", "function"], ["enableSingleRequest", "function"], ["enableAsyncRendering", "function"], ["enableSyncRendering", "function"], ["setCentering", "function"], ["setPublisherProvidedId", "function"], ["definePassback", "function"], ["defineOutOfPagePassback", "function"], ["refresh", "function"], ["enableVideoAds", "function"], ["setVideoContent", "function"], ["getVideoContent", "function"], ["getCorrelator", "function"], ["setCorrelator", "function"], ["updateCorrelator", "function"], ["isAdRequestFinished", "function"], ["collapseEmptyDivs", "function"], ["clear", "function"], ["setLocation", "function"], ["getVersion", "function"], ["forceExperiment", "function"], ["markAsAmp", "function"], ["setSafeFrameConfig", "function"], ["setForceSafeFrame", "function"], ["enableChromeInterventionSignals", "function"], ["markAsGladeControl", "function"], ["markAsGladeOptOut", "function"], ["getName", "function"], ["getVersion", "function"], ["getSlots", "function"], ["getSlotIdMap", "function"], ["enable", "function"], ["addEventListener", "function"]];
	var slotAPI = exports.slotAPI = [["getPassbackPageUrl", "function"], ["set", "function"], ["get", "function"], ["getAttributeKeys", "function"], ["addService", "function"], ["getName", "function"], ["getAdUnitPath", "function"], ["getInstance", "function"], ["getSlotElementId", "function"], ["getSlotId", "function"], ["getServices", "function"], ["getSizes", "function"], ["defineSizeMapping", "function"], ["hasWrapperDiv", "function"], ["setClickUrl", "function"], ["getClickUrl", "function"], ["setForceSafeFrame", "function"], ["setCategoryExclusion", "function"], ["clearCategoryExclusions", "function"], ["getCategoryExclusions", "function"], ["setTargeting", "function"], ["clearTargeting", "function"], ["getTargetingMap", "function"], ["getTargeting", "function"], ["getTargetingKeys", "function"], ["getOutOfPage", "function"], ["getAudExtId", "function"], ["gtfcd", "function"], ["setCollapseEmptyDiv", "function"], ["getCollapseEmptyDiv", "function"], ["getDivStartsCollapsed", "function"], ["fetchStarted", "function"], ["getContentUrl", "function"], ["fetchEnded", "function"], ["renderStarted", "function"], ["getResponseInformation", "function"], ["renderEnded", "function"], ["loaded", "function"], ["impressionViewable", "function"], ["visibilityChanged", "function"], ["setFirstLook", "function"], ["getFirstLook", "function"], ["getEscapedQemQueryId", "function"], ["setSafeFrameConfig", "function"], ["getCsiId", "function"]];

/***/ },
/* 5 */
/***/ function(module, exports) {

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = filterProps;
	function filterProps(propKeys, props, nextProps) {
	    return propKeys.reduce(function (filtered, key) {
	        filtered.props[key] = props[key];
	        filtered.nextProps[key] = nextProps[key];
	        return filtered;
	    }, {
	        props: {},
	        nextProps: {}
	    });
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	exports.default = isInViewport;
	function isInViewport(el) {
	    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [0, 0],
	        _ref2 = _slicedToArray(_ref, 2),
	        width = _ref2[0],
	        height = _ref2[1];

	    var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

	    if (!el || el.nodeType !== 1) {
	        return false;
	    }
	    var clientRect = el.getBoundingClientRect();
	    var rect = {
	        top: clientRect.top - 400,
	        left: clientRect.left,
	        bottom: clientRect.bottom,
	        right: clientRect.right
	    };
	    var viewport = {
	        top: 0,
	        left: 0,
	        bottom: window.innerHeight,
	        right: window.innerWidth
	    };
	    var inViewport = rect.bottom >= viewport.top + height * offset && rect.right >= viewport.left + width * offset && rect.top <= viewport.bottom - height * offset && rect.left <= viewport.right - width * offset;
	    return inViewport;
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ContentServiceMock = exports.CompanionAdsServiceMock = exports.PubAdsServiceMock = exports.SizeMappingBuilderMock = exports.SlotMock = exports.GPTMock = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _apiList = __webpack_require__(4);

	var _Events = __webpack_require__(1);

	var _Events2 = _interopRequireDefault(_Events);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function createMock(list, obj) {
	    return list.reduce(function (mock, _ref) {
	        var _ref2 = _slicedToArray(_ref, 2),
	            api = _ref2[0],
	            type = _ref2[1];

	        if (typeof mock[api] === "undefined") {
	            if (type === "function") {
	                mock[api] = function () {
	                    if (arguments.length) {
	                        return arguments.length <= 0 ? undefined : arguments[0];
	                    }
	                    return {};
	                };
	            } else if (type === "boolean") {
	                mock[api] = true;
	            } else {
	                mock[api] = {};
	            }
	        }
	        return mock;
	    }, obj || {});
	}

	function getSize(slot) {
	    var sizes = slot.getSizes();
	    var item = sizes;
	    while (Array.isArray(item[0])) {
	        item = item[0];
	    }

	    return item;
	}

	var SlotMock = function () {
	    function SlotMock(adUnitPath, size, divId) {
	        _classCallCheck(this, SlotMock);

	        this.adUnitPath = adUnitPath;
	        this.size = size;
	        this.divId = divId;
	        this.services = [];
	        this.attributes = {};
	        this.categoryExclusions = [];
	        this._targeting = {};
	    }

	    _createClass(SlotMock, [{
	        key: "defineSizeMapping",
	        value: function defineSizeMapping(sizeMapping) {
	            this.size = sizeMapping;
	            return this;
	        }
	    }, {
	        key: "addService",
	        value: function addService(service) {
	            this.services.push(service);
	        }
	    }, {
	        key: "getServices",
	        value: function getServices() {
	            return this.services;
	        }
	    }, {
	        key: "set",
	        value: function set(key, value) {
	            this.attributes[key] = value;
	            return this;
	        }
	    }, {
	        key: "get",
	        value: function get(key) {
	            return this.attributes[key];
	        }
	    }, {
	        key: "getAttributeKeys",
	        value: function getAttributeKeys() {
	            return Object.keys(this.attributes);
	        }
	    }, {
	        key: "setCollapseEmptyDiv",
	        value: function setCollapseEmptyDiv(collapse, collapseBeforeAdFetch) {
	            this.collapseEmptyDiv = collapse;
	            this.collapseBeforeAdFetch = collapseBeforeAdFetch;
	            return this;
	        }
	    }, {
	        key: "getCollapseEmptyDiv",
	        value: function getCollapseEmptyDiv() {
	            return this.collapseEmptyDiv;
	        }
	    }, {
	        key: "setClickUrl",
	        value: function setClickUrl(clickUrl) {
	            this.clickUrl = clickUrl;
	            return this;
	        }
	    }, {
	        key: "getClickUrl",
	        value: function getClickUrl() {
	            return this.clickUrl;
	        }
	    }, {
	        key: "setCategoryExclusion",
	        value: function setCategoryExclusion(categoryExclusion) {
	            this.categoryExclusions.push(categoryExclusion);
	            return this;
	        }
	    }, {
	        key: "getCategoryExclusions",
	        value: function getCategoryExclusions() {
	            return this.categoryExclusions;
	        }
	    }, {
	        key: "clearCategoryExclusions",
	        value: function clearCategoryExclusions() {
	            this.categoryExclusions = [];
	            return this;
	        }
	    }, {
	        key: "setTargeting",
	        value: function setTargeting(key, value) {
	            this._targeting[key] = value;
	            return this;
	        }
	    }, {
	        key: "getAdUnitPath",
	        value: function getAdUnitPath() {
	            return this.adUnitPath;
	        }
	    }, {
	        key: "clearTargeting",
	        value: function clearTargeting() {
	            this._targeting = {};
	            return this;
	        }
	    }, {
	        key: "getTargeting",
	        value: function getTargeting(key) {
	            return this._targeting && this._targeting[key];
	        }
	    }, {
	        key: "getTargetingKeys",
	        value: function getTargetingKeys() {
	            return this._targeting && Object.keys(this._targeting);
	        }
	    }, {
	        key: "getSizes",
	        value: function getSizes() {
	            return this.size;
	        }
	    }, {
	        key: "getSlotElementId",
	        value: function getSlotElementId() {
	            return this.divId;
	        }
	    }]);

	    return SlotMock;
	}();

	createMock(_apiList.slotAPI, SlotMock.prototype);

	var SizeMappingBuilderMock = function () {
	    function SizeMappingBuilderMock() {
	        var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        _classCallCheck(this, SizeMappingBuilderMock);

	        this.config = config;
	    }

	    _createClass(SizeMappingBuilderMock, [{
	        key: "addSize",
	        value: function addSize(viewportSize, slotSize) {
	            if (!this.mapping) {
	                this.mapping = [];
	            }
	            this.mapping.push([viewportSize, slotSize]);
	            return this;
	        }
	    }, {
	        key: "build",
	        value: function build() {
	            return this.mapping;
	        }
	    }]);

	    return SizeMappingBuilderMock;
	}();

	var BaseService = function () {
	    function BaseService() {
	        var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        _classCallCheck(this, BaseService);

	        this.config = config;
	        this.listeners = {};
	        this.slots = {};
	    }

	    _createClass(BaseService, [{
	        key: "addEventListener",
	        value: function addEventListener(eventType, cb) {
	            if (!this.listeners[eventType]) {
	                this.listeners[eventType] = [];
	            }
	            this.listeners[eventType].push(cb);
	        }
	    }, {
	        key: "getSlots",
	        value: function getSlots() {
	            var _this = this;

	            return Object.keys(this.slots).map(function (key) {
	                return _this.slots[key];
	            });
	        }
	    }]);

	    return BaseService;
	}();

	var PubAdsServiceMock = function (_BaseService) {
	    _inherits(PubAdsServiceMock, _BaseService);

	    function PubAdsServiceMock() {
	        var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        _classCallCheck(this, PubAdsServiceMock);

	        var _this2 = _possibleConstructorReturn(this, (PubAdsServiceMock.__proto__ || Object.getPrototypeOf(PubAdsServiceMock)).call(this, config));

	        _this2.version = _apiList.pubadsVersion;
	        return _this2;
	    }

	    _createClass(PubAdsServiceMock, [{
	        key: "getVersion",
	        value: function getVersion() {
	            return this.version;
	        }
	    }, {
	        key: "refresh",
	        value: function refresh(slots) {
	            var _this3 = this;

	            if (!slots) {
	                slots = Object.keys(this.slots).map(function (key) {
	                    return _this3.slots[key];
	                });
	            }
	            setTimeout(function () {
	                var key = _Events2.default.SLOT_RENDER_ENDED;
	                slots.forEach(function (slot) {
	                    if (_this3.listeners[key]) {
	                        _this3.listeners[key].forEach(function (cb) {
	                            var isEmpty = !!_this3.config.emptyAd;
	                            var event = {
	                                isEmpty: isEmpty,
	                                creativeId: isEmpty ? null : Date.now(),
	                                lineItemId: isEmpty ? null : Date.now(),
	                                serviceName: "publisher_ads",
	                                size: isEmpty ? null : getSize(slot),
	                                slot: slot
	                            };
	                            cb(event);
	                        });
	                    }
	                });
	            }, 0);
	        }
	    }]);

	    return PubAdsServiceMock;
	}(BaseService);

	createMock(_apiList.pubadsAPI, PubAdsServiceMock.prototype);

	var CompanionAdsServiceMock = function (_BaseService2) {
	    _inherits(CompanionAdsServiceMock, _BaseService2);

	    function CompanionAdsServiceMock() {
	        var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        _classCallCheck(this, CompanionAdsServiceMock);

	        return _possibleConstructorReturn(this, (CompanionAdsServiceMock.__proto__ || Object.getPrototypeOf(CompanionAdsServiceMock)).call(this, config));
	    }

	    _createClass(CompanionAdsServiceMock, [{
	        key: "enableSyncLoading",
	        value: function enableSyncLoading() {
	            this._enableSyncLoading = true;
	        }
	    }, {
	        key: "setRefreshUnfilledSlots",
	        value: function setRefreshUnfilledSlots(value) {
	            if (typeof value === "boolean") {
	                this._refreshUnfilledSlots = value;
	            }
	        }
	    }]);

	    return CompanionAdsServiceMock;
	}(BaseService);

	var ContentServiceMock = function (_BaseService3) {
	    _inherits(ContentServiceMock, _BaseService3);

	    function ContentServiceMock() {
	        var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        _classCallCheck(this, ContentServiceMock);

	        return _possibleConstructorReturn(this, (ContentServiceMock.__proto__ || Object.getPrototypeOf(ContentServiceMock)).call(this, config));
	    }

	    _createClass(ContentServiceMock, [{
	        key: "setContent",
	        value: function setContent(slot, content) {
	            slot._content = content;
	        }
	    }]);

	    return ContentServiceMock;
	}(BaseService);

	var GPTMock = function () {
	    function GPTMock() {
	        var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        _classCallCheck(this, GPTMock);

	        this.pubadsReady = false;

	        this.config = config;
	        this.version = _apiList.gptVersion;
	        this.cmd = {};
	        this.cmd.push = function (cb) {
	            cb();
	        };
	    }

	    _createClass(GPTMock, [{
	        key: "getVersion",
	        value: function getVersion() {
	            return this.version;
	        }
	    }, {
	        key: "enableServices",
	        value: function enableServices() {
	            var _this6 = this;

	            setTimeout(function () {
	                _this6.pubadsReady = true;
	            }, 0);
	        }
	    }, {
	        key: "sizeMapping",
	        value: function sizeMapping() {
	            if (!this.sizeMappingBuilder) {
	                this.sizeMappingBuilder = new SizeMappingBuilderMock(this.config);
	            }
	            return this.sizeMappingBuilder;
	        }
	    }, {
	        key: "pubads",
	        value: function pubads() {
	            if (!this._pubads) {
	                this._pubads = new PubAdsServiceMock(this.config);
	            }
	            return this._pubads;
	        }
	    }, {
	        key: "companionAds",
	        value: function companionAds() {
	            if (!this._companionAds) {
	                this._companionAds = new CompanionAdsServiceMock(this.config);
	            }
	            return this._companionAds;
	        }
	    }, {
	        key: "content",
	        value: function content() {
	            if (!this._content) {
	                this._content = new ContentServiceMock(this.config);
	            }
	            return this._content;
	        }
	    }, {
	        key: "defineSlot",
	        value: function defineSlot(adUnitPath, size, divId) {
	            var slot = new SlotMock(adUnitPath, size, divId);
	            this.pubads().slots[divId] = slot;
	            return slot;
	        }
	    }, {
	        key: "defineOutOfPageSlot",
	        value: function defineOutOfPageSlot(adUnitPath, divId) {
	            var slot = new SlotMock(adUnitPath, [1, 1], divId);
	            this.pubads().slots[divId] = slot;
	            return slot;
	        }
	    }, {
	        key: "display",
	        value: function display(divId) {
	            var _this7 = this;

	            var pubads = this.pubads();
	            setTimeout(function () {
	                Object.keys(pubads.listeners).forEach(function (key) {
	                    if (pubads.listeners[key]) {
	                        pubads.listeners[key].forEach(function (cb) {
	                            var slot = pubads.slots[divId];
	                            var isEmpty = !!_this7.config.emptyAd;
	                            var event = {
	                                isEmpty: isEmpty,
	                                creativeId: isEmpty ? null : Date.now(),
	                                lineItemId: isEmpty ? null : Date.now(),
	                                serviceName: "publisher_ads",
	                                size: isEmpty ? null : getSize(slot),
	                                slot: slot
	                            };
	                            cb(event);
	                        });
	                    }
	                });
	            }, 0);
	        }
	    }]);

	    return GPTMock;
	}();

	createMock(_apiList.gptAPI, GPTMock.prototype);

	exports.GPTMock = GPTMock;
	exports.SlotMock = SlotMock;
	exports.SizeMappingBuilderMock = SizeMappingBuilderMock;
	exports.PubAdsServiceMock = PubAdsServiceMock;
	exports.CompanionAdsServiceMock = CompanionAdsServiceMock;
	exports.ContentServiceMock = ContentServiceMock;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = Date.now || now

	function now() {
	    return new Date().getTime()
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	var now = __webpack_require__(8);

	/**
	 * Returns a function, that, as long as it continues to be invoked, will not
	 * be triggered. The function will be called after it stops being called for
	 * N milliseconds. If `immediate` is passed, trigger the function on the
	 * leading edge, instead of the trailing.
	 *
	 * @source underscore.js
	 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
	 * @param {Function} function to wrap
	 * @param {Number} timeout in ms (`100`)
	 * @param {Boolean} whether to execute at the beginning (`false`)
	 * @api public
	 */

	module.exports = function debounce(func, wait, immediate){
	  var timeout, args, context, timestamp, result;
	  if (null == wait) wait = 100;

	  function later() {
	    var last = now() - timestamp;

	    if (last < wait && last > 0) {
	      timeout = setTimeout(later, wait - last);
	    } else {
	      timeout = null;
	      if (!immediate) {
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      }
	    }
	  };

	  return function debounced() {
	    context = this;
	    args = arguments;
	    timestamp = now();
	    var callNow = immediate && !timeout;
	    if (!timeout) timeout = setTimeout(later, wait);
	    if (callNow) {
	      result = func.apply(context, args);
	      context = args = null;
	    }

	    return result;
	  };
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var pSlice = Array.prototype.slice;
	var objectKeys = __webpack_require__(12);
	var isArguments = __webpack_require__(11);

	var deepEqual = module.exports = function (actual, expected, opts) {
	  if (!opts) opts = {};
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;

	  } else if (actual instanceof Date && expected instanceof Date) {
	    return actual.getTime() === expected.getTime();

	  // 7.3. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
	    return opts.strict ? actual === expected : actual == expected;

	  // 7.4. For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else {
	    return objEquiv(actual, expected, opts);
	  }
	}

	function isUndefinedOrNull(value) {
	  return value === null || value === undefined;
	}

	function isBuffer (x) {
	  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
	  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
	    return false;
	  }
	  if (x.length > 0 && typeof x[0] !== 'number') return false;
	  return true;
	}

	function objEquiv(a, b, opts) {
	  var i, key;
	  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
	    return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  //~~~I've managed to break Object.keys through screwy arguments passing.
	  //   Converting to array solves the problem.
	  if (isArguments(a)) {
	    if (!isArguments(b)) {
	      return false;
	    }
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return deepEqual(a, b, opts);
	  }
	  if (isBuffer(a)) {
	    if (!isBuffer(b)) {
	      return false;
	    }
	    if (a.length !== b.length) return false;
	    for (i = 0; i < a.length; i++) {
	      if (a[i] !== b[i]) return false;
	    }
	    return true;
	  }
	  try {
	    var ka = objectKeys(a),
	        kb = objectKeys(b);
	  } catch (e) {//happens when one is a string literal and the other isn't
	    return false;
	  }
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!deepEqual(a[key], b[key], opts)) return false;
	  }
	  return typeof a === typeof b;
	}


/***/ },
/* 11 */
/***/ function(module, exports) {

	var supportsArgumentsClass = (function(){
	  return Object.prototype.toString.call(arguments)
	})() == '[object Arguments]';

	exports = module.exports = supportsArgumentsClass ? supported : unsupported;

	exports.supported = supported;
	function supported(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	};

	exports.unsupported = unsupported;
	function unsupported(object){
	  return object &&
	    typeof object == 'object' &&
	    typeof object.length == 'number' &&
	    Object.prototype.hasOwnProperty.call(object, 'callee') &&
	    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
	    false;
	};


/***/ },
/* 12 */
/***/ function(module, exports) {

	exports = module.exports = typeof Object.keys === 'function'
	  ? Object.keys : shim;

	exports.shim = shim;
	function shim (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var has = Object.prototype.hasOwnProperty
	  , prefix = '~';

	/**
	 * Constructor to create a storage for our `EE` objects.
	 * An `Events` instance is a plain object whose properties are event names.
	 *
	 * @constructor
	 * @api private
	 */
	function Events() {}

	//
	// We try to not inherit from `Object.prototype`. In some engines creating an
	// instance in this way is faster than calling `Object.create(null)` directly.
	// If `Object.create(null)` is not supported we prefix the event names with a
	// character to make sure that the built-in object properties are not
	// overridden or used as an attack vector.
	//
	if (Object.create) {
	  Events.prototype = Object.create(null);

	  //
	  // This hack is needed because the `__proto__` property is still inherited in
	  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
	  //
	  if (!new Events().__proto__) prefix = false;
	}

	/**
	 * Representation of a single event listener.
	 *
	 * @param {Function} fn The listener function.
	 * @param {Mixed} context The context to invoke the listener with.
	 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
	 * @constructor
	 * @api private
	 */
	function EE(fn, context, once) {
	  this.fn = fn;
	  this.context = context;
	  this.once = once || false;
	}

	/**
	 * Minimal `EventEmitter` interface that is molded against the Node.js
	 * `EventEmitter` interface.
	 *
	 * @constructor
	 * @api public
	 */
	function EventEmitter() {
	  this._events = new Events();
	  this._eventsCount = 0;
	}

	/**
	 * Return an array listing the events for which the emitter has registered
	 * listeners.
	 *
	 * @returns {Array}
	 * @api public
	 */
	EventEmitter.prototype.eventNames = function eventNames() {
	  var names = []
	    , events
	    , name;

	  if (this._eventsCount === 0) return names;

	  for (name in (events = this._events)) {
	    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
	  }

	  if (Object.getOwnPropertySymbols) {
	    return names.concat(Object.getOwnPropertySymbols(events));
	  }

	  return names;
	};

	/**
	 * Return the listeners registered for a given event.
	 *
	 * @param {String|Symbol} event The event name.
	 * @param {Boolean} exists Only check if there are listeners.
	 * @returns {Array|Boolean}
	 * @api public
	 */
	EventEmitter.prototype.listeners = function listeners(event, exists) {
	  var evt = prefix ? prefix + event : event
	    , available = this._events[evt];

	  if (exists) return !!available;
	  if (!available) return [];
	  if (available.fn) return [available.fn];

	  for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
	    ee[i] = available[i].fn;
	  }

	  return ee;
	};

	/**
	 * Calls each of the listeners registered for a given event.
	 *
	 * @param {String|Symbol} event The event name.
	 * @returns {Boolean} `true` if the event had listeners, else `false`.
	 * @api public
	 */
	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
	  var evt = prefix ? prefix + event : event;

	  if (!this._events[evt]) return false;

	  var listeners = this._events[evt]
	    , len = arguments.length
	    , args
	    , i;

	  if (listeners.fn) {
	    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

	    switch (len) {
	      case 1: return listeners.fn.call(listeners.context), true;
	      case 2: return listeners.fn.call(listeners.context, a1), true;
	      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
	      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
	      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
	      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
	    }

	    for (i = 1, args = new Array(len -1); i < len; i++) {
	      args[i - 1] = arguments[i];
	    }

	    listeners.fn.apply(listeners.context, args);
	  } else {
	    var length = listeners.length
	      , j;

	    for (i = 0; i < length; i++) {
	      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

	      switch (len) {
	        case 1: listeners[i].fn.call(listeners[i].context); break;
	        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
	        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
	        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
	        default:
	          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
	            args[j - 1] = arguments[j];
	          }

	          listeners[i].fn.apply(listeners[i].context, args);
	      }
	    }
	  }

	  return true;
	};

	/**
	 * Add a listener for a given event.
	 *
	 * @param {String|Symbol} event The event name.
	 * @param {Function} fn The listener function.
	 * @param {Mixed} [context=this] The context to invoke the listener with.
	 * @returns {EventEmitter} `this`.
	 * @api public
	 */
	EventEmitter.prototype.on = function on(event, fn, context) {
	  var listener = new EE(fn, context || this)
	    , evt = prefix ? prefix + event : event;

	  if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;
	  else if (!this._events[evt].fn) this._events[evt].push(listener);
	  else this._events[evt] = [this._events[evt], listener];

	  return this;
	};

	/**
	 * Add a one-time listener for a given event.
	 *
	 * @param {String|Symbol} event The event name.
	 * @param {Function} fn The listener function.
	 * @param {Mixed} [context=this] The context to invoke the listener with.
	 * @returns {EventEmitter} `this`.
	 * @api public
	 */
	EventEmitter.prototype.once = function once(event, fn, context) {
	  var listener = new EE(fn, context || this, true)
	    , evt = prefix ? prefix + event : event;

	  if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;
	  else if (!this._events[evt].fn) this._events[evt].push(listener);
	  else this._events[evt] = [this._events[evt], listener];

	  return this;
	};

	/**
	 * Remove the listeners of a given event.
	 *
	 * @param {String|Symbol} event The event name.
	 * @param {Function} fn Only remove the listeners that match this function.
	 * @param {Mixed} context Only remove the listeners that have this context.
	 * @param {Boolean} once Only remove one-time listeners.
	 * @returns {EventEmitter} `this`.
	 * @api public
	 */
	EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
	  var evt = prefix ? prefix + event : event;

	  if (!this._events[evt]) return this;
	  if (!fn) {
	    if (--this._eventsCount === 0) this._events = new Events();
	    else delete this._events[evt];
	    return this;
	  }

	  var listeners = this._events[evt];

	  if (listeners.fn) {
	    if (
	         listeners.fn === fn
	      && (!once || listeners.once)
	      && (!context || listeners.context === context)
	    ) {
	      if (--this._eventsCount === 0) this._events = new Events();
	      else delete this._events[evt];
	    }
	  } else {
	    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
	      if (
	           listeners[i].fn !== fn
	        || (once && !listeners[i].once)
	        || (context && listeners[i].context !== context)
	      ) {
	        events.push(listeners[i]);
	      }
	    }

	    //
	    // Reset the array, or remove it completely if we have no more listeners.
	    //
	    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
	    else if (--this._eventsCount === 0) this._events = new Events();
	    else delete this._events[evt];
	  }

	  return this;
	};

	/**
	 * Remove all listeners, or those of the specified event.
	 *
	 * @param {String|Symbol} [event] The event name.
	 * @returns {EventEmitter} `this`.
	 * @api public
	 */
	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
	  var evt;

	  if (event) {
	    evt = prefix ? prefix + event : event;
	    if (this._events[evt]) {
	      if (--this._eventsCount === 0) this._events = new Events();
	      else delete this._events[evt];
	    }
	  } else {
	    this._events = new Events();
	    this._eventsCount = 0;
	  }

	  return this;
	};

	//
	// Alias methods names because people roll like that.
	//
	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;

	//
	// This function doesn't apply anymore.
	//
	EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
	  return this;
	};

	//
	// Expose the prefix.
	//
	EventEmitter.prefixed = prefix;

	//
	// Allow `EventEmitter` to be imported as module namespace.
	//
	EventEmitter.EventEmitter = EventEmitter;

	//
	// Expose the module.
	//
	if (true) {
	  module.exports = EventEmitter;
	}


/***/ },
/* 14 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

	/**
	 * Simple, lightweight module assisting with the detection and context of
	 * Worker. Helps avoid circular dependencies and allows code to reason about
	 * whether or not they are in a Worker, even if they never include the main
	 * `ReactWorker` dependency.
	 */
	var ExecutionEnvironment = {

	  canUseDOM: canUseDOM,

	  canUseWorkers: typeof Worker !== 'undefined',

	  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

	  canUseViewport: canUseDOM && !!window.screen,

	  isInWorker: !canUseDOM // For now, this is true - might change in the future.

	};

	module.exports = ExecutionEnvironment;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var validateFormat = function validateFormat(format) {};

	if (true) {
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}

	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;

/***/ },
/* 16 */
/***/ function(module, exports) {

	/**
	 * Copyright 2015, Yahoo! Inc.
	 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
	 */
	'use strict';

	var REACT_STATICS = {
	    childContextTypes: true,
	    contextTypes: true,
	    defaultProps: true,
	    displayName: true,
	    getDefaultProps: true,
	    mixins: true,
	    propTypes: true,
	    type: true
	};

	var KNOWN_STATICS = {
	    name: true,
	    length: true,
	    prototype: true,
	    caller: true,
	    arguments: true,
	    arity: true
	};

	var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function';

	module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
	    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components
	        var keys = Object.getOwnPropertyNames(sourceComponent);

	        /* istanbul ignore else */
	        if (isGetOwnPropertySymbolsAvailable) {
	            keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
	        }

	        for (var i = 0; i < keys.length; ++i) {
	            if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) {
	                try {
	                    targetComponent[keys[i]] = sourceComponent[keys[i]];
	                } catch (error) {

	                }
	            }
	        }
	    }

	    return targetComponent;
	};


/***/ },
/* 17 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeMin = Math.min;

	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */
	var now = function() {
	  return root.Date.now();
	};

	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide `options` to indicate whether `func` should be invoked on the
	 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent
	 * calls to the debounced function return the result of the last `func`
	 * invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the debounced function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */
	function debounce(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  wait = toNumber(wait) || 0;
	  if (isObject(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }

	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;

	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }

	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time;
	    // Start the timer for the trailing edge.
	    timerId = setTimeout(timerExpired, wait);
	    // Invoke the leading edge.
	    return leading ? invokeFunc(time) : result;
	  }

	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        result = wait - timeSinceLastCall;

	    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
	  }

	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime;

	    // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.
	    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
	      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
	  }

	  function timerExpired() {
	    var time = now();
	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    }
	    // Restart the timer.
	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }

	  function trailingEdge(time) {
	    timerId = undefined;

	    // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.
	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }
	    lastArgs = lastThis = undefined;
	    return result;
	  }

	  function cancel() {
	    if (timerId !== undefined) {
	      clearTimeout(timerId);
	    }
	    lastInvokeTime = 0;
	    lastArgs = lastCallTime = lastThis = timerId = undefined;
	  }

	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now());
	  }

	  function debounced() {
	    var time = now(),
	        isInvoking = shouldInvoke(time);

	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;

	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }
	      if (maxing) {
	        // Handle invocations in a tight loop.
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }
	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}

	/**
	 * Creates a throttled function that only invokes `func` at most once per
	 * every `wait` milliseconds. The throttled function comes with a `cancel`
	 * method to cancel delayed `func` invocations and a `flush` method to
	 * immediately invoke them. Provide `options` to indicate whether `func`
	 * should be invoked on the leading and/or trailing edge of the `wait`
	 * timeout. The `func` is invoked with the last arguments provided to the
	 * throttled function. Subsequent calls to the throttled function return the
	 * result of the last `func` invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the throttled function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.throttle` and `_.debounce`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to throttle.
	 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=true]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new throttled function.
	 * @example
	 *
	 * // Avoid excessively updating the position while scrolling.
	 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
	 *
	 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
	 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
	 * jQuery(element).on('click', throttled);
	 *
	 * // Cancel the trailing throttled invocation.
	 * jQuery(window).on('popstate', throttled.cancel);
	 */
	function throttle(func, wait, options) {
	  var leading = true,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  if (isObject(options)) {
	    leading = 'leading' in options ? !!options.leading : leading;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }
	  return debounce(func, wait, {
	    'leading': leading,
	    'maxWait': wait,
	    'trailing': trailing
	  });
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	module.exports = throttle;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_18__;

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_19__;

/***/ }
/******/ ])
});
;