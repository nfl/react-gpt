Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ContentServiceMock = exports.CompanionAdsServiceMock = exports.PubAdsServiceMock = exports.SizeMappingBuilderMock = exports.SlotMock = exports.GPTMock = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _apiList = require("./apiList");

var _Events = require("../Events");

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