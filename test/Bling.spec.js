/* eslint-disable react/no-multi-comp */
import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactTestUtils from "react-dom/test-utils";
import ShallowRenderer from "react-test-renderer/shallow";
import Bling from "../src/Bling";
import Events from "../src/Events";
import { pubadsAPI, APIToCallBeforeServiceEnabled } from "../src/createManager";
import { gptVersion, pubadsVersion } from "../src/utils/apiList";
import { createManagerTest } from "../src/utils/createManagerTest";

describe("Bling", () => {
    let googletag;
    const stubs = [];

    beforeEach(() => {
        Bling.configure({ renderWhenViewable: false });
        Bling.testManager = createManagerTest();
        googletag = Bling._adManager.googletag;
    });

    afterEach(() => {
        stubs.forEach(stub => {
            stub.restore();
        });
    });

    it("throws when either slotSize or sizeMapping is missing", () => {
        const renderBling = () => {
            const renderer = new ShallowRenderer();
            renderer.render(<Bling adUnitPath="/4595/nfl.test.open" />);
        };

        expect(renderBling).to.throw(
            "Either 'slotSize' or 'sizeMapping' prop needs to be set."
        );
    });

    it("initially renders empty div with style", () => {
        const renderer = new ShallowRenderer();
        renderer.render(
            <Bling adUnitPath="/4595/nfl.test.open" slotSize={[728, 90]} />
        );
        const result = renderer.getRenderOutput();
        expect(result.type).to.equal("div");
        expect(result.props.style).to.eql({ width: 728, height: 90 });
    });

    it("renders fluid to auto width and height", () => {
        const renderer = new ShallowRenderer();
        renderer.render(
            <Bling adUnitPath="/4595/nfl.test.open" slotSize={"fluid"} />
        );
        const result = renderer.getRenderOutput();
        expect(result.type).to.equal("div");
        expect(result.props.style).to.eql({ width: "auto", height: "auto" });
    });

    it("renders ['fluid'] to auto width and height", () => {
        const renderer = new ShallowRenderer();
        renderer.render(
            <Bling adUnitPath="/4595/nfl.test.open" slotSize={["fluid"]} />
        );
        const result = renderer.getRenderOutput();
        expect(result.type).to.equal("div");
        expect(result.props.style).to.eql({ width: "auto", height: "auto" });
    });

    it("returns gpt version", done => {
        Bling.once(Events.READY, () => {
            expect(Bling.getGPTVersion()).to.equal(gptVersion);
            done();
        });

        ReactTestUtils.renderIntoDocument(
            <Bling adUnitPath="/4595/nfl.test.open" slotSize={[728, 90]} />
        );
    });

    it("returns pubads version", done => {
        Bling.once(Events.READY, () => {
            expect(Bling.getPubadsVersion()).to.equal(pubadsVersion);
            done();
        });

        ReactTestUtils.renderIntoDocument(
            <Bling adUnitPath="/4595/nfl.test.open" slotSize={[728, 90]} />
        );
    });

    it("accepts syncCorrelator", done => {
        const render = sinon.stub(
            Bling._adManager,
            "render",
            function syncCorrelator() {
                expect(this._syncCorrelator).to.be.true;
                render.restore();
                done();
            }
        );

        Bling.syncCorrelator();

        ReactTestUtils.renderIntoDocument(
            <Bling adUnitPath="/4595/nfl.test.open" slotSize={[728, 90]} />
        );
    });

    it("accepts pubads API", done => {
        const apiStubs = {};
        pubadsAPI.forEach(method => {
            apiStubs[method] = sinon.stub(googletag.pubads(), method);
        });

        Bling.once(Events.RENDER, () => {
            APIToCallBeforeServiceEnabled.forEach(method => {
                expect(Bling._adManager[`_${method}`]).to.be.true;
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

        pubadsAPI.forEach(method => {
            let args = [];
            if (method === "collapseEmptyDivs") {
                args = [true];
            } else if (method === "setTargeting") {
                args = ["key", "value"];
            }
            Bling[method](...args);
        });

        ReactTestUtils.renderIntoDocument(
            <Bling adUnitPath="/4595/nfl.test.open" slotSize={[728, 90]} />
        );
    });

    it("can call pubads API multiple times", done => {
        const spy = sinon.stub(googletag.pubads(), "setTargeting");

        Bling.once(Events.RENDER, () => {
            expect(spy.calledTwice).to.be.true;
            expect(spy.calledWith("key1", "value1")).to.be.true;
            expect(spy.calledWith("key2", "value2")).to.be.true;
            sinon.restore(spy);
            done();
        });

        Bling.setTargeting("key1", "value1");
        Bling.setTargeting("key2", "value2");

        ReactTestUtils.renderIntoDocument(
            <Bling adUnitPath="/4595/nfl.test.open" slotSize={[728, 90]} />
        );
    });

    it("fires once event", done => {
        const events = Object.keys(Events).map(key => Events[key]);

        function afterReady() {
            Bling.once(Events.READY, () => {
                done();
            });
        }

        events.forEach(event => {
            Bling.once(event, () => {
                events.splice(events.indexOf(event), 1);
                if (events.length === 0) {
                    afterReady();
                }
            });
        });

        ReactTestUtils.renderIntoDocument(
            <Bling adUnitPath="/4595/nfl.test.open" slotSize={[728, 90]} />
        );
    });

    it("fires on event", done => {
        const events = Object.keys(Events).map(key => Events[key]);

        function afterReady() {
            Bling.on(Events.READY, () => {
                Bling.removeAllListeners();
                done();
            });
        }

        events.forEach(event => {
            Bling.on(event, () => {
                events.splice(events.indexOf(event), 1);
                if (events.length === 0) {
                    afterReady();
                }
            });
        });

        ReactTestUtils.renderIntoDocument(
            <Bling adUnitPath="/4595/nfl.test.open" slotSize={[728, 90]} />
        );
    });

    it("removes event", done => {
        const spy = sinon.spy();
        Bling.on(Events.RENDER, spy);
        Bling.removeListener(Events.RENDER, spy);

        Bling.once(Events.SLOT_RENDER_ENDED, () => {
            expect(spy.calledOnce).to.be.false;
            done();
        });

        ReactTestUtils.renderIntoDocument(
            <Bling adUnitPath="/4595/nfl.test.open" slotSize={[728, 90]} />
        );
    });

    it("refreshes ads", () => {
        const refresh = sinon.stub(Bling._adManager, "refresh");
        const slots = [];
        const options = {};

        Bling.refresh(slots, options);

        expect(refresh.calledOnce).to.be.true;
        expect(refresh.calledWith(slots, options)).to.be.true;
        refresh.restore();
    });

    it("clears ads", () => {
        const clear = sinon.stub(Bling._adManager, "clear");
        const slots = [];

        Bling.clear(slots);

        expect(clear.calledOnce).to.be.true;
        expect(clear.calledWith(slots)).to.be.true;
        clear.restore();
    });

    it("handles empty adSlot on clear", () => {
        const instance = new Bling();
        instance._adSlot = {};

        expect(() => {
            instance.clear();
        }).to.not.throw("adSlot.getServices is not a function");
    });

    it("calls getServices on adSlot on clear", () => {
        const instance = new Bling();
        const adSlot = sinon.mock({ getServices: () => {} });
        adSlot.expects("getServices").once();
        instance._adSlot = adSlot;
        instance.clear();
    });

    it("updates correlator", () => {
        const updateCorrelator = sinon.stub(
            Bling._adManager,
            "updateCorrelator"
        );

        Bling.updateCorrelator();

        expect(updateCorrelator.calledOnce).to.be.true;
        updateCorrelator.restore();
    });

    it("reflects adUnitPath props to adSlot", done => {
        Bling.once(Events.RENDER, () => {
            const adSlot = instance.adSlot;
            expect(adSlot.getAdUnitPath()).to.equal("/4595/nfl.test.open");
            done();
        });

        const instance = ReactTestUtils.renderIntoDocument(
            <Bling adUnitPath="/4595/nfl.test.open" slotSize={[300, 250]} />
        );
    });

    it("reflects slotSize props to adSlot", done => {
        Bling.once(Events.RENDER, () => {
            const adSlot = instance.adSlot;
            expect(adSlot.getSizes()).to.eql([300, 250]);
            done();
        });

        const instance = ReactTestUtils.renderIntoDocument(
            <Bling adUnitPath="/4595/nfl.test.open" slotSize={[300, 250]} />
        );
    });

    it("reflects sizeMapping props to adSlot", done => {
        Bling.once(Events.RENDER, () => {
            const adSlot = instance.adSlot;
            expect(adSlot.getSizes()).to.eql([
                [[0, 0], [320, 50]],
                [[750, 200], [728, 90]],
                [[1050, 200], [1024, 120]]
            ]);
            done();
        });

        const instance = ReactTestUtils.renderIntoDocument(
            <Bling
                adUnitPath="/4595/nfl.test.open"
                sizeMapping={[
                    { viewport: [0, 0], slot: [320, 50] },
                    { viewport: [750, 200], slot: [728, 90] },
                    { viewport: [1050, 200], slot: [1024, 120] }
                ]}
            />
        );
    });

    it("reflects targeting props to adSlot", done => {
        const targeting = { t1: "v1", t2: [1, 2, 3] };

        Bling.once(Events.RENDER, () => {
            const adSlot = instance.adSlot;
            expect(adSlot.getTargetingKeys()).to.eql(["t1", "t2"]);
            expect(adSlot.getTargeting("t1")).to.equal(targeting.t1);
            expect(adSlot.getTargeting("t2")).to.eql(targeting.t2);
            done();
        });

        const instance = ReactTestUtils.renderIntoDocument(
            <Bling
                adUnitPath="/4595/nfl.test.open"
                slotSize={[300, 250]}
                targeting={targeting}
            />
        );
    });

    it("reflects collapseEmptyDiv props to adSlot", done => {
        Bling.once(Events.RENDER, () => {
            expect(ads[0].adSlot.getCollapseEmptyDiv()).to.be.true;
            expect(ads[1].adSlot.getCollapseEmptyDiv()).to.be.false;
            done();
        });

        class Wrapper extends Component {
            static propTypes = {
                children: PropTypes.node
            };
            render() {
                return <div>{this.props.children}</div>;
            }
        }

        const instance = ReactTestUtils.renderIntoDocument(
            <Wrapper>
                <Bling
                    adUnitPath="/4595/nfl.test.open"
                    collapseEmptyDiv={[true, true]}
                    slotSize={[300, 250]}
                />
                <Bling
                    adUnitPath="/4595/nfl.test.open"
                    collapseEmptyDiv={false}
                    slotSize={[300, 250]}
                />
            </Wrapper>
        );
        const ads = ReactTestUtils.scryRenderedComponentsWithType(
            instance,
            Bling
        );
    });

    it("reflects attributes props to adSlot", done => {
        Bling.once(Events.RENDER, () => {
            const adSlot = instance.adSlot;
            expect(adSlot.get("attr1")).to.equal("val1");
            expect(adSlot.get("attr2")).to.equal("val2");
            expect(adSlot.getAttributeKeys()).to.eql(["attr1", "attr2"]);
            done();
        });

        const instance = ReactTestUtils.renderIntoDocument(
            <Bling
                adUnitPath="/4595/nfl.test.open"
                attributes={{ attr1: "val1", attr2: "val2" }}
                slotSize={[300, 250]}
            />
        );
    });

    it("reflects categoryExclusion props to adSlot", done => {
        Bling.once(Events.RENDER, () => {
            expect(ads[0].adSlot.getCategoryExclusions()).to.eql(["Airline"]);
            expect(ads[1].adSlot.getCategoryExclusions()).to.eql(["Airline"]);
            done();
        });

        class Wrapper extends Component {
            static propTypes = {
                children: PropTypes.node
            };
            render() {
                return <div>{this.props.children}</div>;
            }
        }

        const instance = ReactTestUtils.renderIntoDocument(
            <Wrapper>
                <Bling
                    adUnitPath="/4595/nfl.test.open"
                    categoryExclusion="Airline"
                    slotSize={[300, 250]}
                />
                <Bling
                    adUnitPath="/4595/nfl.test.open"
                    categoryExclusion={["Airline"]}
                    slotSize={[300, 250]}
                />
            </Wrapper>
        );
        const ads = ReactTestUtils.scryRenderedComponentsWithType(
            instance,
            Bling
        );
    });

    it("reflects clickUrl props to adSlot", done => {
        Bling.once(Events.RENDER, () => {
            const adSlot = instance.adSlot;
            expect(adSlot.getClickUrl()).to.equal("clickUrl");
            done();
        });

        const instance = ReactTestUtils.renderIntoDocument(
            <Bling
                adUnitPath="/4595/nfl.test.open"
                clickUrl="clickUrl"
                slotSize={[300, 250]}
            />
        );
    });

    it("reflects companionAdService props to adSlot", done => {
        Bling.once(Events.RENDER, () => {
            const adSlot = instance.adSlot;
            const services = adSlot.getServices();
            const companionAdService = services.filter(
                service => !!service.setRefreshUnfilledSlots
            )[0];
            expect(companionAdService._enableSyncLoading).to.be.true;
            expect(companionAdService._refreshUnfilledSlots).to.be.true;
            done();
        });

        const instance = ReactTestUtils.renderIntoDocument(
            <Bling
                adUnitPath="/4595/nfl.test.open"
                companionAdService={{
                    enableSyncLoading: true,
                    refreshUnfilledSlots: true
                }}
                slotSize={[300, 250]}
            />
        );
    });

    it("reflects outOfPage props to adSlot", done => {
        Bling.once(Events.RENDER, () => {
            const adSlot = instance.adSlot;
            expect(adSlot.getSizes()).to.eql([1, 1]);
            done();
        });

        const instance = ReactTestUtils.renderIntoDocument(
            <Bling adUnitPath="/4595/nfl.test.open" outOfPage={true} />
        );
    });

    it("renders static ad", done => {
        const content = `<a href="www.mydestinationsite.com"><img src="www.mysite.com/img.png"></img></a>`;

        Bling.once(Events.RENDER, () => {
            const adSlot = instance.adSlot;
            expect(adSlot._content).to.equal(content);
            done();
        });

        const instance = ReactTestUtils.renderIntoDocument(
            <Bling
                adUnitPath="/4595/nfl.test.open"
                content={content}
                slotSize={[300, 250]}
            />
        );
    });

    it("does not render ad when renderWhenViewable prop is set to true and the component is not in viewport", done => {
        const isInViewport = sinon.stub(
            Bling._adManager,
            "isInViewport",
            () => false
        );

        Bling.once(Events.SLOT_RENDER_ENDED, event => {
            expect(event.slot).to.equal(ads[1].adSlot);
            isInViewport.restore();
            done();
        });

        function onScriptLoaded() {
            expect(ads[0].state.inViewport).to.be.false;
        }

        class Wrapper extends Component {
            static propTypes = {
                children: PropTypes.node
            };
            render() {
                return <div>{this.props.children}</div>;
            }
        }

        const instance = ReactTestUtils.renderIntoDocument(
            <Wrapper>
                <Bling
                    adUnitPath="/4595/nfl.test.open"
                    renderWhenViewable={true}
                    slotSize={[300, 250]}
                    onScriptLoaded={onScriptLoaded}
                />
                <Bling
                    adUnitPath="/4595/nfl.test.open"
                    renderWhenViewable={false}
                    slotSize={[300, 250]}
                />
            </Wrapper>
        );
        const ads = ReactTestUtils.scryRenderedComponentsWithType(
            instance,
            Bling
        );
    });

    it("renders ad as soon as the component gets in the viewport", done => {
        const isInViewport = sinon.stub(
            Bling._adManager,
            "isInViewport",
            () => false
        );

        Bling.once(Events.SLOT_RENDER_ENDED, event => {
            expect(event.slot).to.equal(ads[0].adSlot);
            done();
        });

        function onScriptLoaded() {
            expect(ads[0].state.inViewport).to.be.false;

            // simulate resize/scroll
            isInViewport.restore();
            Bling._adManager._foldCheck();
        }

        class Wrapper extends Component {
            static propTypes = {
                children: PropTypes.node
            };
            render() {
                return <div>{this.props.children}</div>;
            }
        }

        const instance = ReactTestUtils.renderIntoDocument(
            <Wrapper>
                <Bling
                    adUnitPath="/4595/nfl.test.open"
                    slotSize={[300, 250]}
                    onScriptLoaded={onScriptLoaded}
                />
            </Wrapper>
        );
        const ads = ReactTestUtils.scryRenderedComponentsWithType(
            instance,
            Bling
        );
    });

    it("renders slotSize with an array", () => {
        const renderer = new ShallowRenderer();
        renderer.render(
            <Bling adUnitPath="/4595/nfl.test.open" slotSize={[[300, 250]]} />
        );
        const result = renderer.getRenderOutput();
        expect(result.type).to.equal("div");
        expect(result.props.style).to.eql({ width: 300, height: 250 });
    });

    it("sets slotSize to 0,0 on foldCheck of 'fluid' or ['fluid']", done => {
        const isInViewport = sinon.spy(Bling._adManager, "isInViewport");

        class Wrapper extends Component {
            onSlotRenderEnded = () => {
                expect(isInViewport.args[0][1].join()).to.equal([0, 0].join());
                done();
            };
            render() {
                return (
                    <Bling
                        adUnitPath="/4595/nfl.test.open"
                        renderWhenViewable={true}
                        slotSize={["fluid"]}
                        onSlotRenderEnded={this.onSlotRenderEnded}
                    />
                );
            }
        }

        ReactTestUtils.renderIntoDocument(<Wrapper />);
    });

    it("refreshes ad when refreshable prop changes", done => {
        let count = 0;

        Bling.syncCorrelator();

        class Wrapper extends Component {
            state = {
                targeting: { prop: "val" }
            };
            onSlotRenderEnded = event => {
                if (count === 0) {
                    expect(event.slot.getTargeting("prop")).to.equal("val");
                    this.setState({
                        targeting: { prop: "val2" }
                    });
                    count++;
                } else {
                    expect(event.slot.getTargeting("prop")).to.equal("val2");
                    done();
                }
            };
            render() {
                const { targeting } = this.state;
                return (
                    <Bling
                        adUnitPath="/4595/nfl.test.open"
                        slotSize={[300, 250]}
                        targeting={targeting}
                        onSlotRenderEnded={this.onSlotRenderEnded}
                    />
                );
            }
        }

        ReactTestUtils.renderIntoDocument(<Wrapper />);
    });

    it("refreshes ad when refreshableProps changes w/o sync correlator", done => {
        let count = 0;

        Bling.syncCorrelator(false);

        class Wrapper extends Component {
            state = {
                targeting: { prop: "val" }
            };
            onSlotRenderEnded = event => {
                if (count === 0) {
                    expect(event.slot.getTargeting("prop")).to.equal("val");
                    this.setState({
                        targeting: { prop: "val2" }
                    });
                    count++;
                } else {
                    expect(event.slot.getTargeting("prop")).to.equal("val2");
                    done();
                }
            };
            render() {
                const { targeting } = this.state;
                return (
                    <Bling
                        adUnitPath="/4595/nfl.test.open"
                        slotSize={[300, 250]}
                        targeting={targeting}
                        onSlotRenderEnded={this.onSlotRenderEnded}
                    />
                );
            }
        }

        ReactTestUtils.renderIntoDocument(<Wrapper />);
    });

    it("re-renders ad when reRenderProps changes", done => {
        let count = 0;

        Bling.syncCorrelator();

        class Wrapper extends Component {
            state = {
                adUnitPath: "/4595/nfl.test.open"
            };
            onSlotRenderEnded = event => {
                if (count === 0) {
                    expect(event.slot.getAdUnitPath()).to.equal(
                        "/4595/nfl.test.open"
                    );
                    this.setState({
                        adUnitPath: "/4595/nfl.test.open/new"
                    });
                    count++;
                } else {
                    expect(event.slot.getAdUnitPath()).to.equal(
                        "/4595/nfl.test.open/new"
                    );
                    done();
                }
            };
            render() {
                const { adUnitPath } = this.state;
                return (
                    <Bling
                        adUnitPath={adUnitPath}
                        slotSize={[300, 250]}
                        onSlotRenderEnded={this.onSlotRenderEnded}
                    />
                );
            }
        }

        ReactTestUtils.renderIntoDocument(<Wrapper />);
    });

    it("removes itself from registry when unmounted", () => {
        const instance = ReactTestUtils.renderIntoDocument(
            <Bling adUnitPath="/4595/nfl.test.open" slotSize={[300, 250]} />
        );
        instance.componentWillUnmount();
        expect(Bling._adManager.getMountedInstances()).to.have.length(0);
    });
});
