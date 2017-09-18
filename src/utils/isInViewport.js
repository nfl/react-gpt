export default function isInViewport(el, [width, height] = [0, 0], offset = 0) {
    if (!el || el.nodeType !== 1) {
        return false;
    }
    const clientRect = el.getBoundingClientRect();
    const rect = {
        top: clientRect.top,
        left: clientRect.left,
        bottom: clientRect.bottom,
        right: clientRect.right
    };
    const viewport = {
        top: 0,
        left: 0,
        bottom: window.innerHeight,
        right: window.innerWidth
    };
    const inViewport =
        rect.bottom >= viewport.top + height * offset &&
        rect.right >= viewport.left + width * offset &&
        rect.top <= viewport.bottom - height * offset &&
        rect.left <= viewport.right - width * offset;
    return inViewport;
}
