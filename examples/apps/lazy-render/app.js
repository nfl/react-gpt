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
    };
    render() {
        return (
            <div>
                <button style={styles.button} onClick={this.onClick}>
                    Re-render
                </button>
                <div style={styles.hWrap}>
                    <div style={styles.content} />
                    <div style={styles.lb}>
                        <Gpt
                            adUnitPath="/4595/nfl.test.open"
                            slotSize={[728, 90]}
                            style={styles.adBorder}
                            targeting={{test: "responsive"}}
                        />
                    </div>
                </div>
                <div style={styles.mr}>
                    <Gpt
                        adUnitPath="/4595/nfl.test.open"
                        slotSize={[300, 250]}
                        style={styles.adBorder}
                        targeting={{test: "responsive"}}
                        viewableThreshold={1}
                    />
                </div>
            </div>
        );
    }
}

export default App;
