Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AdManager = exports.APIToCallBeforeServiceEnabled = exports.pubadsAPI = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.createManager = createManager;

var _eventemitter = require("eventemitter3");

var _eventemitter2 = _interopRequireDefault(_eventemitter);

var _throttleDebounce = require("throttle-debounce");

var _invariant = require("invariant");

var _invariant2 = _interopRequireDefault(_invariant);

var _exenv = require("exenv");

var _Events = require("./Events");

var _Events2 = _interopRequireDefault(_Events);

var _isInViewport2 = require("./utils/isInViewport");

var _isInViewport3 = _interopRequireDefault(_isInViewport2);

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
        _this._foldCheck = (0, _throttleDebounce.throttle)(20, function (event) {
            var instances = _this.getMountedInstances();
            instances.forEach(function (instance) {
                if (instance.getRenderWhenViewable()) {
                    instance.foldCheck(event);
                }
            });

            if (_this.testMode) {
                _this._getTimer();
            }
        });

        _this._handleMediaQueryChange = function (event) {
            if (_this._syncCorrelator) {
                _this.refresh();
                return;
            }
            // IE returns `event.media` value differently, need to use regex to evaluate.
            // eslint-disable-next-line wrap-regex
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

        _this.render = (0, _throttleDebounce.debounce)(4, function () {
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

                    if (adSlot && adSlot.hasOwnProperty("getServices")) {
                        var services = adSlot.getServices();
                        if (!hasPubAdsService) {
                            hasPubAdsService = services.filter(function (service) {
                                return !!service.enableAsyncRendering;
                            }).length > 0;
                        }
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
        });
        _this.renderAll = (0, _throttleDebounce.debounce)(4, function () {
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
        });


        if (config.test) {
            _this.testMode = config;
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
        key: "_getTimer",
        value: function _getTimer() {
            return Date.now();
        }
    }, {
        key: "_listen",
        value: function _listen() {
            var _this4 = this;

            if (!this._listening) {
                [_Events2.default.SLOT_RENDER_ENDED, _Events2.default.IMPRESSION_VIEWABLE, _Events2.default.SLOT_VISIBILITY_CHANGED, _Events2.default.SLOT_LOADED].forEach(function (eventType) {
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
                if (!_exenv.canUseDOM) {
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
                if (window.googletag && window.googletag.apiReady) {
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
                    var params = {
                        method: method,
                        args: args,
                        resolve: resolve2,
                        reject: reject2
                    };
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
            if (process.env.NODE_ENV === "production") {
                return;
            }
            var test = config.test,
                GPTMock = config.GPTMock;

            this._isLoaded = true;
            this._testMode = !!test;

            if (test) {
                (0, _invariant2.default)(test && GPTMock, "Must provide GPTMock to enable testMode. config{GPTMock}");
                this._googletag = new GPTMock(config);
            }
        }
    }]);

    return AdManager;
}(_eventemitter2.default);

function createManager(config) {
    return new AdManager(config);
}