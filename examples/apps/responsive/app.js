/* eslint-disable indent */
import React, {Component} from "react";
import Radium from "radium";
import {Bling as Gpt} from "react-gpt"; // eslint-disable-line import/no-unresolved
import "../log";
import Button from "./button";
import styles from "./styles";

@Radium
class App extends Component {
    state = {
        adUnitPath: "/4595/nfl.test.open",
        targeting: {
            test: "responsive"
        },
        sizeMapping: [
            {viewport: [0, 0], slot: [1, 1]},
            {viewport: [340, 0], slot: [320, 50]},
            {viewport: [750, 200], slot: [728, 90]},
            {viewport: [1050, 200], slot: [1024, 120]}
        ],
        style: styles.adBorder
    };

    onClick = params => {
        if (params === "refresh") {
            Gpt.refresh();
            return;
        }
        let newState;
        if (params === "adUnitPath") {
            newState = {
                adUnitPath:
                    this.state.adUnitPath === "/4595/nfl.test.open"
                        ? "/4595/nfl.test.open/new"
                        : "/4595/nfl.test.open"
            };
        } else if (params === "targeting") {
            newState = {
                targeting: {
                    test: "responsive",
                    changed: Date.now()
                }
            };
        } else if (params === "size") {
            newState = {
                sizeMapping:
                    this.state.sizeMapping[1].slot[1] === 50
                        ? [
                              {viewport: [0, 0], slot: [1, 1]},
                              {viewport: [340, 0], slot: [300, 250]},
                              {viewport: [750, 200], slot: [728, 90]},
                              {viewport: [1050, 200], slot: [1024, 120]}
                          ]
                        : [
                              {viewport: [0, 0], slot: [1, 1]},
                              {viewport: [340, 0], slot: [320, 50]},
                              {viewport: [750, 200], slot: [728, 90]},
                              {viewport: [1050, 200], slot: [1024, 120]}
                          ]
            };
        }
        this.setState(newState);
    };

    render() {
        return (
            <div>
                <Button params="refresh" onClick={this.onClick}>
                    Refresh
                </Button>
                <Button params="adUnitPath" onClick={this.onClick}>
                    Change adUnitPath
                </Button>
                <Button params="targeting" onClick={this.onClick}>
                    Change targeting
                </Button>
                <Button params="size" onClick={this.onClick}>
                    Change size mapping
                </Button>
                <div style={styles.lb}>
                    <Gpt {...this.state} />
                </div>
            </div>
        );
    }
}

export default App;
