import React from 'react';
import { waitingUtil } from '../../util/sleep.js';

export class ManageModeSelect extends React.Component {

    constructor(props) {
        super(props)

        this.defaultText = "Manage"

        this.state = {
            text: this.defaultText
        }

        // Method Binds
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    // TODO reusable universal tooltip

    handleMouseEnter(e) {
        this.setState({
            text: "Create, update, or delete cards"
        })
    }

    handleMouseLeave(e) {
        waitingUtil(100) // Wait just a tiny moment so it doesn't seem so abrupt
        .then((resolvedValue) => {
            this.setState({
                text: this.defaultText
            })
        })
    }

    render() {

        return (
            <button className="btn btn-outline-light"
                onClick={this.props.onSetManageMode}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                {this.state.text}
            </button>
        );

    }
}