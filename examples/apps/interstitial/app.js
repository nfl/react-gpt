import React, {Component} from "react";
import {Bling as Gpt} from "react-gpt"; // eslint-disable-line import/no-unresolved
import "../log";
import styles from "./styles";

class App extends Component {
    state = {
        adUnitPath: "/4595/nfl.test.open/page/A"
    };

    onClick = () => {
        this.setState({
            adUnitPath:
                this.state.adUnitPath.indexOf("B") > -1
                    ? "/4595/nfl.test.open/page/A"
                    : "/4595/nfl.test.open/page/B"
        });
    };

    render() {
        const {adUnitPath} = this.state;
        return (
            <div>
                <button style={styles.button} onClick={this.onClick}>
                    Change ad unit path (navigate to different page)
                </button>
                <Gpt adUnitPath={adUnitPath} outOfPage={true} />
            </div>
        );
    }
}

export default App;
