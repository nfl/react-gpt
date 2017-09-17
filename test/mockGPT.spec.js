import {
    GPTMock,
    SlotMock,
    SizeMappingBuilderMock,
    PubAdsServiceMock,
    CompanionAdsServiceMock,
    ContentServiceMock
} from "../src/utils/mockGPT";
import {gptVersion} from "../src/utils/apiList";

describe("mockGPT", () => {
    let gptMock;

    beforeEach(() => {
        gptMock = new GPTMock();
    });

    it("returns version from getVersion()", () => {
        expect(gptMock.getVersion()).to.equal(gptVersion);
    });

    it("returns sizeMappingBuilder from sizeMapping()", () => {
        const sizeMappingBuilder = gptMock.sizeMapping();
        expect(sizeMappingBuilder).to.be.an.instanceof(SizeMappingBuilderMock);
        const sizeMappingBuilder2 = sizeMappingBuilder
            .addSize([1024, 768], [970, 250])
            .addSize([980, 690], [728, 90])
            .addSize([640, 480], "fluid");
        expect(sizeMappingBuilder).to.equal(sizeMappingBuilder2);
        const mapping = sizeMappingBuilder2.build();
        expect(mapping).to.eql([
            [[1024, 768], [970, 250]],
            [[980, 690], [728, 90]],
            [[640, 480], "fluid"]
        ]);
    });

    it("returns pubAdsService from pubads()", () => {
        const pubAdsService = gptMock.pubads();
        expect(pubAdsService).to.be.an.instanceof(PubAdsServiceMock);
    });

    it("returns companionAdsService from companionAds()", () => {
        const companionAdsService = gptMock.companionAds();
        expect(companionAdsService).to.be.an.instanceof(
            CompanionAdsServiceMock
        );
    });

    it("returns contentService from content()", () => {
        const contentService = gptMock.content();
        expect(contentService).to.be.an.instanceof(ContentServiceMock);
    });

    it("returns slot from defineSlot()", () => {
        const adUnitPath = "/1234/abc";
        const size = [728, 90];
        const divId = "div-1";
        const slot = gptMock.defineSlot(adUnitPath, size, divId);
        expect(slot).to.be.an.instanceof(SlotMock);
        expect(slot.getSlotElementId()).to.equal(divId);
        expect(slot.getSizes()).to.equal(size);
        expect(slot.getAdUnitPath()).to.equal(adUnitPath);

        const adUnitPath2 = "/1234/def";
        const size2 = [300, 250];
        const divId2 = "div-2";
        const slot2 = gptMock.defineSlot(adUnitPath2, size2, divId2);

        const pubAdsService = gptMock.pubads();
        expect(pubAdsService.getSlots()).to.eql([slot, slot2]);
    });

    it("executes callback from cmd()", () => {
        const spy = sinon.spy();
        gptMock.cmd.push(spy);
        expect(spy.called).to.be.true;
    });
});
