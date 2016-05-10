/* eslint-disable react/no-multi-comp */
import React, {Component, PropTypes} from "react";
import {Bling as Gpt} from "react-gpt"; // eslint-disable-line import/no-unresolved
import styles from "./styles/page";

class Page extends Component {
    static propTypes = {
        adUnitPath: PropTypes.string,
        params: PropTypes.object
    }

    render() {
        const {adUnitPath, params} = this.props;
        return (
            <div>
                <h1>Page: {params.id}</h1>
                <div style={styles.container}>
                    <Gpt
                        adUnitPath={adUnitPath}
                        targeting={{test: "responsive"}}
                        slotSize={[300, 250]}
                    />
                </div>
            </div>
        );
    }
}

export default Page;
