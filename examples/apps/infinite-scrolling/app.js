/* eslint-disable react/sort-comp */
import React, {Component} from "react";
import Radium from "radium";
import createHistory from "history/createHashHistory";
import debounce from "debounce";
import {Bling as Gpt} from "react-gpt"; // eslint-disable-line import/no-unresolved
import "../log";
import Page from "./page";
import styles from "./styles";

// implementation based of https://support.google.com/dfp_premium/answer/4578089?hl=en#infiniteContents
Gpt.enableSingleRequest();
Gpt.disableInitialLoad();

@Radium
class App extends Component {
    state = {
        page: 1,
        size: [728, 90]
    }
    componentDidMount() {
        this.history = createHistory();
        this.history.replace("/");
        window.addEventListener("scroll", this.onScroll);
        window.addEventListener("resize", this.onScroll);
        this.onScroll();
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.onScroll);
        window.removeEventListener("resize", this.onScroll);
    }
    onScroll = debounce(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        if (scrollTop + window.innerHeight >= document.body.clientHeight) {
            // update correlator if you want to explicitly use different correlator value for each page
            Gpt.updateCorrelator();
            this.setState({
                page: this.state.page + 1
            });
        }
        const pages = this.root.querySelectorAll(".page");
        Array.from(pages).reverse().some(page => {
            if (page.offsetTop <= scrollTop) {
                this.history.push(`/page${page.getAttribute("data-index")}`);
                return true;
            }
            return false;
        });
    }, 66)

    onSlotDisplay= (event) => {
        const slot = event.slot;
        Gpt.refresh([slot], {changeCorrelator: false});
    }

    render() {
        const {page} = this.state;
        const targeting = {
            test: "infinitescroll"
        };
        const pages = Array.from({length: page}, (_, index) => (
            <Page
                key={index}
                page={index + 1}
                targeting={targeting}
                onSlotDisplay={this.onSlotDisplay}
                onSlotRenderEnded={this.onSlotRenderEnded}
            />
        ));

        return (
            <div ref={root => {this.root = root;}}>
                <div style={styles.lb}>
                    <Gpt
                        adUnitPath="/4595/nfl.test.open"
                        id="top-ad"
                        slotSize={this.state.size}
                        style={styles.adBorder}
                        targeting={targeting}
                        onSlotDisplay={this.onSlotDisplay}
                    />
                </div>
                <div style={styles.main}>
                    {pages}
                </div>
            </div>
        );
    }
}

export default App;
