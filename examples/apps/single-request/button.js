import React, {PropTypes, Component} from "react";
import styles from "./styles";

export default class Button extends Component {
    static propTypes = {
        children: PropTypes.node,
        onClick: PropTypes.func.isRequired,
        params: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]).isRequired
    }
    onClick = () => {
        this.props.onClick(this.props.params);
    }
    render() {
        return (
            <button
                onClick={this.onClick}
                style={styles.button}
            >
                {this.props.children}
            </button>
        );
    }
}
