import React, {Component} from "react";
import Radium from "radium";
import {Bling as Gpt} from "react-gpt"; // eslint-disable-line import/no-unresolved
import "../log";
import styles from "./styles";

Gpt.configure({viewableThreshold: 0});

@Radium
class App extends Component {
    onClick = () => {
        Gpt.render();
    }
    render() {
        return (
            <div>
                <button
                    onClick={this.onClick}
                    style={styles.button}
                >
                    Re-render
                </button>
                <div style={styles.hWrap}>
                    <div style={styles.content} />
                    <div style={styles.lb}>
                        <Gpt
                            style={styles.adBorder}
                            adUnitPath="/4595/nfl.test.open"
                            slotSize={[728, 90]}
                            targeting={{test: "responsive"}}
                        />
                    </div>
                </div>
                <div style={styles.mr}>
                    <Gpt
                        style={styles.adBorder}
                        adUnitPath="/4595/nfl.test.open"
                        slotSize={[300, 250]}
                        viewableThreshold={1}
                        targeting={{test: "responsive"}}
                    />
                </div>
            </div>
        );
    }
}

export default App;
