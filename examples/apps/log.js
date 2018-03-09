import {Bling as GPT, Events} from "react-gpt"; // eslint-disable-line import/no-unresolved

GPT.on(Events.SLOT_RENDER_ENDED, event => {
    const slot = event.slot;
    const divId = slot.getSlotElementId();
    const targetingKeys = slot.getTargetingKeys();
    const targeting = targetingKeys.reduce((t, key) => {
        const val = slot.getTargeting(key);
        t[key] = val.length === 1 ? val[0] : val;
        return t;
    }, {});

    if (!event.isEmpty && event.size) {
        console.log(
            `ad creative '${
                event.creativeId
            }' is rendered to slot '${divId}' of size '${event.size[0]}x${
                event.size[1]
            }'`,
            event,
            targeting
        );
    } else {
        console.log(
            `ad rendered but empty, div id is ${divId}`,
            event,
            targeting
        );
    }
});

// Turn on these logs when checking these events.
/* GPT.on(Events.IMPRESSION_VIEWABLE, event => {
    const slot = event.slot;
    const divId = slot.getSlotElementId();
    const sizes = slot.getSizes();
    console.log(`IMPRESSION_VIEWABLE for ${divId}(${JSON.stringify(sizes)})`, event);
});

GPT.on(Events.SLOT_VISIBILITY_CHANGED, event => {
    const slot = event.slot;
    const divId = slot.getSlotElementId();
    const sizes = slot.getSizes();
    console.log(`SLOT_VISIBILITY_CHANGED for ${divId}(${JSON.stringify(sizes)}) to ${event.inViewPercentage}`, event);
});

GPT.on(Events.SLOT_LOADED, event => {
    const slot = event.slot;
    const divId = slot.getSlotElementId();
    const sizes = slot.getSizes();
    console.log(`SLOT_LOADED for ${divId}(${JSON.stringify(sizes)})`, event);
});*/
