import {createManager} from "../createManager.js";
import {GPTMock} from "./mockGPT";

export function createManagerTest(config) {
    return createManager({
        ...config,
        test: true,
        GPTMock
    });
}
