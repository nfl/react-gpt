import {
    createManager,
    AdManager,
    pubadsAPI,
    APIToCallBeforeServiceEnabled
} from "../src/createManager";
import Events from "../src/Events";
import {gptVersion} from "../src/utils/apiList";
import {createManagerTest} from "../src/utils/createManagerTest";

describe("createManager", () => {
    let googletag;
    let adManager;

    beforeEach(() => {
        adManager = createManagerTest();
        googletag = adManager.googletag;
    });

    afterEach(() => {
        window.googletag = undefined;
    });

    it("accepts syncCorrelator", () => {
        adManager.syncCorrelator(true);
        expect(adManager._syncCorrelator).to.be.true;
    });

    it("accepts pubads API before pubads is ready", done => {
        const apiStubs = {};
        pubadsAPI.forEach(method => {
            apiStubs[method] = sinon.stub(googletag.pubads(), method);
        });

        pubadsAPI.forEach(method => {
            let args = [];
            if (method === "collapseEmptyDivs") {
                args = [true];
            } else if (method === "setTargeting") {
                args = ["key", "value"];
            }
            adManager.pubadsProxy({method, args});
        });

        adManager.once(Events.RENDER, () => {
            APIToCallBeforeServiceEnabled.forEach(method => {
                expect(adManager[`_${method}`]).to.be.true;
            });
            Object.keys(apiStubs).forEach(method => {
                const stub = apiStubs[method];
                expect(stub.calledOnce).to.be.true;
                if (method === "collapseEmptyDivs") {
                    expect(stub.calledWith(true)).to.be.true;
                } else if (method === "setTargeting") {
                    expect(stub.calledWith("key", "value")).to.be.true;
                }
                sinon.restore(stub);
            });

            done();
        });

        adManager.render();
    });

    it("accepts pubads API after pubads is ready", done => {
        const apiStubs = {};
        pubadsAPI.forEach(method => {
            apiStubs[method] = sinon.stub(googletag.pubads(), method);
        });

        adManager.once(Events.RENDER, () => {
            pubadsAPI.forEach(method => {
                let args = [];
                if (method === "collapseEmptyDivs") {
                    args = [true];
                } else if (method === "setTargeting") {
                    args = ["key", "value"];
                }
                adManager.pubadsProxy({method, args});
            });
            APIToCallBeforeServiceEnabled.forEach(method => {
                expect(adManager[`_${method}`]).to.be.true;
            });
            Object.keys(apiStubs).forEach(method => {
                const stub = apiStubs[method];
                expect(stub.calledOnce).to.be.true;
                if (method === "collapseEmptyDivs") {
                    expect(stub.calledWith(true)).to.be.true;
                } else if (method === "setTargeting") {
                    expect(stub.calledWith("key", "value")).to.be.true;
                }
                sinon.restore(stub);
            });

            done();
        });

        adManager.render();
    });

    it("loads gpt", done => {
        adManager
            .load("//www.googletagservices.com/tag/js/gpt.js")
            .then(result => {
                expect(result).to.be.an("object");
                expect(adManager.isLoaded).to.be.true;
                done();
            })
            .catch(done);
    });

    it("uses gpt when already exists", done => {
        window.googletag = googletag;
        adManager
            .load("//www.googletagservices.com/tag/js/gpt-invalid.js")
            .then(() => {
                expect(adManager.isLoaded).to.be.true;
                done();
            })
            .catch(done);
    });

    it("handles missing url", done => {
        adManager = createManager();
        adManager.load("").catch(err => {
            expect(err.message).to.equal("url is missing");
            done();
        });
    });

    it("handles invalid url", done => {
        adManager = createManager();
        adManager
            .load("//www.googletagservices.com/tag/js/gpt-invalid.js")
            .catch(err => {
                expect(err.message).to.equal("failed to load script");
                done();
            });
    });

    it("handles gpt existence", done => {
        adManager = createManager();
        adManager.load("//www.google.com/jsapi").catch(err => {
            expect(err.message).to.equal("window.googletag is not available");
            done();
        });
    });

    it("returns gpt version", () => {
        expect(adManager.getGPTVersion()).to.equal(gptVersion);
    });

    it("maintains instance list", () => {
        const _toggleListener = sinon.stub(
            AdManager.prototype,
            "_toggleListener"
        );
        const addMQListener = sinon.stub(AdManager.prototype, "addMQListener");
        const removeMQListener = sinon.stub(
            AdManager.prototype,
            "removeMQListener"
        );
        const instances = [{}, {}];

        adManager.addInstance(instances[0]);

        expect(_toggleListener.calledWith(true)).to.be.true;
        expect(_toggleListener.calledOnce).to.be.true;
        expect(addMQListener.calledWith(instances[0])).to.be.true;
        expect(addMQListener.calledOnce).to.be.true;

        adManager.addInstance(instances[1]);

        expect(_toggleListener.calledOnce).to.be.true;
        expect(addMQListener.calledWith(instances[1])).to.be.true;
        expect(addMQListener.calledTwice).to.be.true;

        adManager.removeInstance(instances[0]);

        expect(removeMQListener.calledWith(instances[0])).to.be.true;
        expect(removeMQListener.calledOnce).to.be.true;

        adManager.removeInstance(instances[1]);

        expect(_toggleListener.calledWith(false)).to.be.true;
        expect(_toggleListener.calledTwice).to.be.true;
        expect(removeMQListener.calledWith(instances[1])).to.be.true;
        expect(removeMQListener.calledTwice).to.be.true;

        _toggleListener.restore();
        addMQListener.restore();
        removeMQListener.restore();
    });

    it("adds/removes instance to matchMedia query listener", () => {
        // case 1 - missing `sizeMapping`

        let instance = {
            props: {}
        };

        adManager.addInstance(instance);

        expect(adManager._mqls).to.be.undefined;

        adManager.removeInstance(instance);

        // case 2 - non-array `sizeMapping`

        instance = {
            props: {
                sizeMapping: 100
            }
        };

        adManager.addInstance(instance);

        expect(adManager._mqls).to.be.undefined;

        adManager.removeInstance(instance);

        // case 3 - invalid `sizeMapping` item

        instance = {
            props: {
                sizeMapping: [320, 50]
            }
        };

        adManager.addInstance(instance);

        expect(adManager._mqls).to.be.undefined;

        adManager.removeInstance(instance);

        // case 4 - valid `sizeMapping` item

        instance = {
            props: {
                sizeMapping: [{viewport: [0, 0], slot: [320, 50]}]
            }
        };

        adManager.addInstance(instance);

        expect(adManager._mqls).to.be.an("object");
        expect(adManager._mqls["0"]).to.be.an("object");
        expect(adManager._mqls["0"].listeners.length).to.be.equal(1);

        adManager.removeInstance(instance);

        // case 5 - multiple instance listens for the same matchMedia query

        let instance2 = {
            props: {
                sizeMapping: [{viewport: [0, 0], slot: [320, 50]}]
            }
        };

        adManager.addInstance(instance);
        adManager.addInstance(instance2);

        expect(adManager._mqls).to.be.an("object");
        expect(adManager._mqls["0"]).to.be.an("object");
        expect(adManager._mqls["0"].listeners.length).to.be.equal(2);

        adManager.removeInstance(instance);

        expect(adManager._mqls["0"].listeners.length).to.be.equal(1);

        adManager.removeInstance(instance2);

        expect(adManager._mqls).to.be.an("object");
        expect(adManager._mqls["0"]).to.be.undefined;

        // case 6 - removing an instance that's not in listeners won't accidentally remove listeners

        instance2 = {
            props: {}
        };

        adManager.addInstance(instance);
        adManager.addInstance(instance2);

        adManager.removeInstance(instance2);

        expect(adManager._mqls).to.be.an("object");
        expect(adManager._mqls["0"]).to.be.an("object");
        expect(adManager._mqls["0"].listeners.length).to.be.equal(1);
    });

    it("handles media query change", () => {
        adManager.syncCorrelator();

        const refresh = sinon.stub(googletag.pubads(), "refresh");

        googletag.pubadsReady = true;

        const instance = {
            props: {
                sizeMapping: [{viewport: [0, 0], slot: [320, 50]}]
            },
            refresh() {}
        };

        const instanceRefresh = sinon.stub(instance, "refresh");

        adManager.addInstance(instance);
        adManager._handleMediaQueryChange({
            media: "(min-width: 0px)"
        });

        expect(refresh.calledOnce).to.be.true;

        adManager.syncCorrelator(false);

        adManager._handleMediaQueryChange({
            media: "(min-width: 0px)"
        });

        expect(instanceRefresh.calledOnce).to.be.true;

        // IE
        adManager._handleMediaQueryChange({
            media: "all and (min-width:0px)"
        });

        expect(instanceRefresh.calledTwice).to.be.true;

        adManager.removeInstance(instance);

        refresh.restore();
        instanceRefresh.restore();
    });

    it("debounces render", done => {
        const enableServices = sinon.stub(
            googletag,
            "enableServices",
            googletag.enableServices
        );

        adManager.once(Events.RENDER, () => {
            expect(enableServices.calledOnce).to.be.true;
            enableServices.restore();
            done();
        });

        adManager.render();
        adManager.render();
        adManager.render();
    });

    it("executes render once", done => {
        const enableServices = sinon.stub(
            googletag,
            "enableServices",
            googletag.enableServices
        );

        adManager.once(Events.RENDER, () => {
            expect(enableServices.calledOnce).to.be.true;

            setTimeout(() => {
                expect(enableServices.calledTwice).to.be.false;
                enableServices.restore();
                done();
            }, 300);

            adManager.render();
        });

        adManager.render();
        adManager.render();
        adManager.render();
    });

    it("manages initial render", done => {
        adManager.pubadsProxy({method: "disableInitialLoad"});
        adManager.pubadsProxy({method: "collapseEmptyDivs", args: [false]});

        const disableInitialLoad = sinon.stub(
            googletag.pubads(),
            "disableInitialLoad"
        );
        const collapseEmptyDivs = sinon.stub(
            googletag.pubads(),
            "collapseEmptyDivs"
        );

        const instance = {
            props: {
                sizeMapping: [{viewport: [0, 0], slot: [320, 50]}]
            },
            notInViewport() {
                return false;
            },
            defineSlot() {},
            display() {},
            adSlot: googletag.defineSlot("/", [])
        };

        const defineSlot = sinon.stub(instance, "defineSlot");
        const display = sinon.stub(instance, "display");

        adManager.addInstance(instance);

        adManager.once(Events.RENDER, () => {
            expect(disableInitialLoad.calledOnce).to.be.true;
            expect(collapseEmptyDivs.calledWith(false)).to.be.true;
            expect(defineSlot.calledOnce).to.be.true;
            expect(display.calledOnce).to.be.true;

            disableInitialLoad.restore();
            collapseEmptyDivs.restore();
            defineSlot.restore();
            display.restore();
            adManager.removeInstance(instance);
            done();
        });

        adManager.render();
        adManager.render();
        adManager.render();
    });

    it("throttles foldCheck", done => {
        const instance = {
            props: {
                sizeMapping: [{viewport: [0, 0], slot: [320, 50]}]
            },
            getRenderWhenViewable() {
                return true;
            },
            foldCheck() {}
        };

        const instance2 = {
            props: {
                sizeMapping: [{viewport: [0, 0], slot: [320, 50]}]
            },
            getRenderWhenViewable() {
                return false;
            },
            foldCheck() {}
        };

        const foldCheck = sinon.stub(instance, "foldCheck");
        const foldCheck2 = sinon.stub(instance2, "foldCheck");
        const getRenderWhenViewable = sinon.spy(
            instance,
            "getRenderWhenViewable"
        );
        const getRenderWhenViewable2 = sinon.spy(
            instance2,
            "getRenderWhenViewable"
        );
        const managerFoldCheck = sinon.spy(adManager, "_foldCheck");
        const timer = sinon.spy(adManager, "_getTimer");

        adManager.addInstance(instance);
        adManager.addInstance(instance2);

        const start = Date.now();
        adManager._foldCheck();
        adManager._foldCheck();
        setTimeout(() => {
            adManager._foldCheck();
        }, 5);
        setTimeout(() => {
            adManager._foldCheck();
        }, 10);
        setTimeout(() => {
            adManager._foldCheck();
        }, 15);

        setTimeout(() => {
            expect(managerFoldCheck.callCount).to.equal(5);
            expect(timer.calledTwice).to.be.true;
            expect(timer.returnValues[1] - timer.returnValues[0]).to.be.above(
                19
            ); // timer above 20ms timeout
            expect(timer.returnValues[0] - start).to.be.below(5); // should start ~immediately
            expect(foldCheck.calledTwice).to.be.true;
            expect(foldCheck2.notCalled).to.be.true;

            foldCheck.restore();
            foldCheck2.restore();
            getRenderWhenViewable.restore();
            getRenderWhenViewable2.restore();
            managerFoldCheck.restore();
            timer.restore();
            adManager.removeInstance(instance);
            adManager.removeInstance(instance2);
            done();
        }, 100);
    });

    it("renders all ads", done => {
        googletag.apiReady = false;
        const updateCorrelator = sinon.stub(
            AdManager.prototype,
            "updateCorrelator"
        );

        const instance = {
            props: {},
            forceUpdate() {}
        };

        const instance2 = {
            props: {},
            forceUpdate() {}
        };

        const forceUpdate = sinon.stub(instance, "forceUpdate");
        const forceUpdate2 = sinon.stub(instance2, "forceUpdate");

        adManager.addInstance(instance);
        adManager.addInstance(instance2);

        setTimeout(() => {
            expect(updateCorrelator.calledOnce).to.be.false;
            expect(forceUpdate.calledOnce).to.be.false;
            expect(forceUpdate2.calledOnce).to.be.false;

            googletag.apiReady = true;

            setTimeout(() => {
                expect(updateCorrelator.calledOnce).to.be.true;
                expect(forceUpdate.calledOnce).to.be.true;
                expect(forceUpdate2.calledOnce).to.be.true;

                updateCorrelator.restore();
                forceUpdate.restore();
                forceUpdate2.restore();
                adManager.removeInstance(instance);
                adManager.removeInstance(instance2);
                done();
            }, 300);

            adManager.renderAll();
        }, 300);

        adManager.renderAll();
    });

    it("refreshes ads", () => {
        const refresh = sinon.stub(googletag.pubads(), "refresh");

        adManager.refresh();
        expect(refresh.calledOnce).to.be.false;

        googletag.pubadsReady = true;
        adManager.refresh();
        expect(refresh.calledOnce).to.be.true;
        refresh.restore();
    });

    it("clears ads", () => {
        const clear = sinon.stub(googletag.pubads(), "clear");

        adManager.clear();
        expect(clear.calledOnce).to.be.false;

        googletag.pubadsReady = true;
        adManager.clear();
        expect(clear.calledOnce).to.be.true;
        clear.restore();
    });

    it("calls prop function for gpt event", done => {
        const listeners = [];
        const slot = googletag.defineSlot("/", []);
        const addEventListener = sinon.stub(
            googletag.pubads(),
            "addEventListener",
            (eventType, cb) => {
                if (!listeners[eventType]) {
                    listeners[eventType] = [];
                }
                listeners[eventType].push(cb);
            }
        );

        const instance = {
            props: {
                onSlotRenderEnded() {}
            },
            adSlot: slot,
            notInViewport() {
                return false;
            },
            defineSlot() {},
            display() {}
        };

        const display = sinon.stub(instance, "display", () => {
            Object.keys(listeners).forEach(key => {
                if (listeners[key]) {
                    listeners[key].forEach(cb => {
                        cb({slot});
                    });
                }
            });
        });

        const onSlotRenderEnded = sinon.stub(
            instance.props,
            "onSlotRenderEnded"
        );

        adManager.addInstance(instance);

        adManager.once(Events.RENDER, () => {
            expect(onSlotRenderEnded.calledOnce).to.be.true;
            addEventListener.restore();
            display.restore();
            onSlotRenderEnded.restore();
            adManager.removeInstance(instance);
            done();
        });

        adManager.render();
    });
});
