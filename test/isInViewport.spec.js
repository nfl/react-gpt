import isInViewport from "../src/utils/isInViewport";

describe("isInViewport", () => {
    it("returns false when an element is invalid", () => {
        let result = isInViewport();
        expect(result).to.be.false;
        const textNode = document.createTextNode("text");
        result = isInViewport(textNode);
        expect(result).to.be.false;
    });

    it("checks intersection with viewport", () => {
        const el = document.createElement("div");
        document.body.appendChild(el);
        const result = isInViewport(el, [0, 0], 0);
        expect(result).to.be.true;
    });
});
