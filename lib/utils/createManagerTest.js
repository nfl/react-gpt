Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.createManagerTest = createManagerTest;

var _createManager = require("../createManager.js");

var _mockGPT = require("./mockGPT");

function createManagerTest(config) {
    return (0, _createManager.createManager)(_extends({}, config, {
        test: true,
        GPTMock: _mockGPT.GPTMock
    }));
}