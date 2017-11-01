/* eslint-disable react/no-multi-comp */
import React, {Component} from "react";
import PropTypes from "prop-types";
import createHistory from "history/createHashHistory";
import {Bling as Gpt} from "react-gpt"; // eslint-disable-line import/no-unresolved
import "../log";
import Home from "./home";
import Page from "./page";
import styles from "./styles";

Gpt.syncCorrelator();
Gpt.enableSingleRequest();

class App extends Component {
    static propTypes = {
        location: PropTypes.object,
        history: PropTypes.object,
        children: PropTypes.node
    };

    createHref(path) {
        return `${window.location.origin}${window.location.pathname}#${path}`;
    }

    render() {
        const {location, children} = this.props;
        const adUnitPath = `/4595/nfl.test.open${location.pathname}`;
        const props = {
            ...this.props,
            adUnitPath
        };

        return (
            <div>
                <ul>
                    <li>
                        <a href={this.createHref("/Travel/Europe")}>Home</a>
                    </li>
                    <li>
                        <a href={this.createHref("/Travel/Europe/France")}>
                            France
                        </a>
                    </li>
                    <li>
                        <a href={this.createHref("/Travel/Europe/Spain")}>
                            Spain
                        </a>
                    </li>
                </ul>
                <div style={styles.topAd}>
                    <Gpt
                        adUnitPath={adUnitPath}
                        slotSize={[[728, 90], [970, 90]]}
                        targeting={{test: "responsive"}}
                    />
                </div>
                {children && React.cloneElement(children, props)}
            </div>
        );
    }
}

class AppContainer extends Component {
    // eslint-disable-next-line react/sort-comp
    routes = {
        "/Travel/Europe": {component: Home},
        "/Travel/Europe/France": {component: Page, params: {id: "France"}},
        "/Travel/Europe/Spain": {component: Page, params: {id: "Spain"}}
    };

    state = {
        routeComponent: this.routes["/Travel/Europe"].component
    };

    componentWillMount() {
        this.unlisten = this.history.listen(location => {
            const route =
                this.routes[location.pathname] || this.routes["/Travel/Europe"];
            const {component: routeComponent, params} = route;
            this.setState({routeComponent, location, params});
        });
        this.history.replace("/Travel/Europe");
    }

    componentWillUnmount() {
        this.unlisten();
    }

    history = createHistory();

    render() {
        return (
            <App
                history={this.history}
                location={this.state.location}
                params={this.state.params}
            >
                {React.createElement(this.state.routeComponent)}
            </App>
        );
    }
}

export default AppContainer;
