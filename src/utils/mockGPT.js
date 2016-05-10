import {gptAPI, pubadsAPI, slotAPI, gptVersion, pubadsVersion} from "./apiList";
import Events from "../Events";

function createMock(list) {
    return list.reduce((mock, [api, type]) => {
        if (type === "function") {
            mock[api] = (...args) => {
                if (args.length) {
                    return args[0];
                }
                return {};
            };
        } else if (type === "boolean") {
            mock[api] = true;
        } else {
            mock[api] = {};
        }
        return mock;
    }, {});
}

function getSize(slot) {
    const sizes = slot.getSizes();
    let item = sizes;
    while (Array.isArray(item[0])) {
        item = item[0];
    }

    return item;
}

const SlotMock = function (adUnitPath, size, divId) {
    this.adUnitPath = adUnitPath;
    this.size = size;
    this.divId = divId;
    this.services = [];
    this.attributes = {};
    this.categoryExclusions = [];
    this._targeting = {};
};
SlotMock.prototype = {
    ...createMock(slotAPI),
    defineSizeMapping(sizeMapping) {
        this.size = sizeMapping;
        return this;
    },
    addService(service) {
        this.services.push(service);
    },
    getServices() {
        return this.services;
    },
    set(key, value) {
        this.attributes[key] = value;
        return this;
    },
    get(key) {
        return this.attributes[key];
    },
    getAttributeKeys() {
        return Object.keys(this.attributes);
    },
    setCollapseEmptyDiv(collapse, collapseBeforeAdFetch) {
        this.collapseEmptyDiv = collapse;
        this.collapseBeforeAdFetch = collapseBeforeAdFetch;
        return this;
    },
    getCollapseEmptyDiv() {
        return this.collapseEmptyDiv;
    },
    setClickUrl(clickUrl) {
        this.clickUrl = clickUrl;
        return this;
    },
    getClickUrl() {
        return this.clickUrl;
    },
    setCategoryExclusion(categoryExclusion) {
        this.categoryExclusions.push(categoryExclusion);
        return this;
    },
    getCategoryExclusions() {
        return this.categoryExclusions;
    },
    clearCategoryExclusions() {
        this.categoryExclusions = [];
        return this;
    },
    setTargeting(key, value) {
        this._targeting[key] = value;
        return this;
    },
    getAdUnitPath() {
        return this.adUnitPath;
    },
    clearTargeting() {
        this._targeting = {};
        return this;
    },
    getTargeting(key) {
        return this._targeting && this._targeting[key];
    },
    getTargetingKeys() {
        return this._targeting && Object.keys(this._targeting);
    },
    getSizes() {
        return this.size;
    },
    getSlotElementId() {
        return this.divId;
    }
};

const SizeMappingBuilderMock = function (config = {}) {
    this.config = config;
};
SizeMappingBuilderMock.prototype = {
    addSize(viewportSize, slotSize) {
        if (!this.mapping) {
            this.mapping = [];
        }
        this.mapping.push([viewportSize, slotSize]);
        return this;
    },
    build() {
        return this.mapping;
    }
};

const BaseService = function () {
    this.listeners = {};
};
BaseService.prototype = {
    addEventListener(eventType, cb) {
        if (!this.listeners[eventType]) {
            this.listeners[eventType] = [];
        }
        this.listeners[eventType].push(cb);
    }
};

const PubAdsServiceMock = function (config = {}) {
    this.config = config;
    this.version = pubadsVersion;
    this.listeners = {};
    this.slots = {};
};
PubAdsServiceMock.prototype = {
    ...createMock(pubadsAPI),
    ...BaseService.prototype,
    getVersion() {
        return this.version;
    },
    getSlots() {
        return Object.keys(this.slots).map(key => this.slots[key]);
    },
    refresh(slots) {
        if (!slots) {
            slots = Object.keys(this.slots).map(key => this.slots[key]);
        }
        setTimeout(() => {
            const key = Events.SLOT_RENDER_ENDED;
            slots.forEach(slot => {
                if (this.listeners[key]) {
                    this.listeners[key].forEach(cb => {
                        const isEmpty = !!this.config.emptyAd;
                        const event = {
                            isEmpty,
                            creativeId: isEmpty ? null : Date.now(),
                            lineItemId: isEmpty ? null : Date.now(),
                            serviceName: "publisher_ads",
                            size: isEmpty ? null : getSize(slot),
                            slot
                        };
                        cb(event);
                    });
                }
            });
        }, 0);
    }
};

const CompanionAdsServiceMock = function (config = {}) {
    this.config = config;
    this.listeners = {};
};
CompanionAdsServiceMock.prototype = {
    ...BaseService.prototype,
    enableSyncLoading() {
        this._enableSyncLoading = true;
    },
    setRefreshUnfilledSlots(value) {
        if (typeof value === "boolean") {
            this._refreshUnfilledSlots = value;
        }
    }
};

const ContentServiceMock = function (config = {}) {
    this.config = config;
    this.listeners = {};
};
ContentServiceMock.prototype = {
    ...BaseService.prototype,
    setContent(slot, content) {
        slot._content = content;
    }
};

const GPTMock = function (config = {}) {
    this.config = config;
    this.version = gptVersion;
    this.cmd = {};
    this.cmd.push = cb => {cb();};
};
GPTMock.prototype = {
    ...createMock(gptAPI),
    pubadsReady: false,
    getVersion() {
        return this.version;
    },
    enableServices() {
        setTimeout(() => {
            this.pubadsReady = true;
        }, 0);
    },
    sizeMapping() {
        if (!this.sizeMappingBuilder) {
            this.sizeMappingBuilder = new SizeMappingBuilderMock(this.config);
        }
        return this.sizeMappingBuilder;
    },
    pubads() {
        if (!this._pubads) {
            this._pubads = new PubAdsServiceMock(this.config);
        }
        return this._pubads;
    },
    companionAds() {
        if (!this._companionAds) {
            this._companionAds = new CompanionAdsServiceMock(this.config);
        }
        return this._companionAds;
    },
    content() {
        if (!this._content) {
            this._content = new ContentServiceMock(this.config);
        }
        return this._content;
    },
    defineSlot(adUnitPath, size, divId) {
        const slot = new SlotMock(adUnitPath, size, divId);
        this.pubads().slots[divId] = slot;
        return slot;
    },
    defineOutOfPageSlot(adUnitPath, divId) {
        const slot = new SlotMock(adUnitPath, [1, 1], divId);
        this.pubads().slots[divId] = slot;
        return slot;
    },
    display(divId) {
        const pubads = this.pubads();
        setTimeout(() => {
            Object.keys(pubads.listeners).forEach(key => {
                if (pubads.listeners[key]) {
                    pubads.listeners[key].forEach(cb => {
                        const slot = pubads.slots[divId];
                        const isEmpty = !!this.config.emptyAd;
                        const event = {
                            isEmpty,
                            creativeId: isEmpty ? null : Date.now(),
                            lineItemId: isEmpty ? null : Date.now(),
                            serviceName: "publisher_ads",
                            size: isEmpty ? null : getSize(slot),
                            slot
                        };
                        cb(event);
                    });
                }
            });
        }, 0);
    }
};

export {
    GPTMock,
    SlotMock,
    SizeMappingBuilderMock,
    PubAdsServiceMock,
    CompanionAdsServiceMock,
    ContentServiceMock
};
