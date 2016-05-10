import React, {Component} from "react";
import {StyleRoot} from "radium";
import {Bling as Gpt} from "react-gpt"; // eslint-disable-line import/no-unresolved
import {canUseDOM} from "fbjs/lib/ExecutionEnvironment";
import querystring from "querystring";
import "../log";
import Button from "./button";
import styles from "./styles";

const qs = canUseDOM ? querystring.decode(window.location.search.substr(1)) : {};

Gpt.enableSingleRequest().then(value => {
    console.log("value", value);
});
if (qs.mode === "disableInitialLoad") {
    Gpt.disableInitialLoad();
}

class App extends Component {
    state = {
        adUnitPath: "/4595/nfl.test.open",
        targeting: {
            test: "responsive"
        }
    }
    onClick = (params) => {
        if (params === "refresh") {
            Gpt.refresh();
        } else if (params === "disableInitialLoad") {
            window.location.href = `${window.location.pathname}?mode=${params}`;
        } else if (params === "adUnitPath") {
            this.setState({
                adUnitPath: "/4595/nfl.test.open/new"
            });
        } else if (params === "targeting") {
            this.setState({
                targeting: {
                    test: "responsive",
                    changed: Date.now()
                }
            });
        }
    }
    render() {
        const {adUnitPath, targeting} = this.state;
        return (
            <StyleRoot>
                <Button
                    onClick={this.onClick}
                    params="disableInitialLoad"
                >
                    Disable Initial Load
                </Button>
                <Button
                    onClick={this.onClick}
                    params="refresh"
                >
                    Refresh
                </Button>
                <Button
                    onClick={this.onClick}
                    params="adUnitPath"
                >
                     Change adUnitPath
                </Button>
                <Button
                    onClick={this.onClick}
                    params="targeting"
                >
                    Change targeting
                </Button>
                <div style={styles.lb}>
                    <Gpt
                        style={styles.adBorder}
                        adUnitPath={adUnitPath}
                        targeting={targeting}
                        slotSize={[728, 90]}
                    />
                </div>
                <div style={styles.main}>
                    <div style={styles.mr}>
                        <Gpt
                            style={styles.adBorder}
                            adUnitPath="/4595/nfl.test.open"
                            slotSize={[300, 250]}
                        />
                    </div>
                    <div style={styles.ws}>
                        <Gpt
                            style={styles.adBorder}
                            adUnitPath="/4595/nfl.test.open"
                            slotSize={[160, 600]}
                        />
                    </div>
                </div>
            </StyleRoot>
        );
    }
}

export default App;
