import React, {Component, PropTypes} from "react";
import Radium from "radium";
import {Bling as Gpt} from "react-gpt"; // eslint-disable-line import/no-unresolved
import styles from "./styles/content";

@Radium
class Content extends Component {
    static propTypes = {
        bgColor: PropTypes.string,
        content: PropTypes.string,
        index: PropTypes.number,
        page: PropTypes.number,
        targeting: PropTypes.object,
        onSlotDisplay: PropTypes.func.isRequired
    }
    render() {
        const {
            bgColor,
            content,
            index,
            page,
            targeting,
            onSlotDisplay
        } = this.props;
        let ad;
        if (index !== 2) {
            ad = (
                <div style={styles.mr}>
                    <Gpt
                        adUnitPath={`/4595/nfl.test.open/${page}`}
                        slotSize={index === 0 ? [728, 90] : [300, 250]}
                        targeting={targeting}
                        onSlotDisplay={onSlotDisplay}
                    />
                </div>
            );
        }

        return (
            <div style={{backgroundColor: bgColor}}>
                <div style={styles.main}>
                    {ad}
                    <p>
                        <span style={styles.title}>Content {index}</span>
                        <span style={styles.description}>Lorem ipsum dolor sit amet, accusamus complectitur an est</span>
                        {content}
                    </p>
                </div>
            </div>
        );
    }
}

export default Content;
