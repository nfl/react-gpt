/* eslint-disable camelcase */
module.exports = function (config) {
    config.set({
        singleRun: true
    });

    console.log("running default test on Chrome");
    config.set({
        browsers: ["ChromeHeadless"]
    });
};
