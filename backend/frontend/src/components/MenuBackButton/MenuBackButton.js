import React from 'react';
import PropTypes from 'prop-types';
import { waitingUtil } from '../../util/sleep.js';
import arrowLeftCircle from 'bootstrap-icons/icons/arrow-left-circle.svg';

/** A button for "back" or "cancel" type UI actions, meant to be reusable
    across the interface in different menus, dropdowns, detail views, forms,
    etc. */

export class MenuBackButton extends React.Component {
    constructor(props) {
        super(props);

        // Fixed instance variables
        this.verboseLabel = "Back";
        this.verboseLabelJSX = this.verboseLabel;
        this.icon = <img src={arrowLeftCircle}/>;

        // State
        this.state = {
            content: this.icon,
        }

        // Method Binds
        this.handleClick = this.handleClick.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown)
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown)
    }

    handleKeyDown(e) {
        if (e.key === "Escape") {
            this.props.onClick();
        }
    }

    handleClick(e) {
        this.props.onClick()
    }

    handleMouseEnter(e) {
        this.setState({
            content: this.verboseLabelJSX
        })
    }

    handleMouseLeave(e) {
        waitingUtil(100) // Wait just a tiny moment so it doesn't seem so abrupt
        .then((resolvedValue) => {
            this.setState({
                content: this.icon
            })
        })
    }



    render() {
        return(
            <div>
                <button
                    className="btn btn-block btn-outline-dark btn-lg"
                    style={{'font-size': '10px', 'min-height': '35px'}}
                    onClick={this.handleClick}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                >
                    {this.state.content}
                </button>
            </div>
        )
    }

}

MenuBackButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};