import React from 'react';
import PropTypes from 'prop-types';

import { waitingUtil } from '../../util/sleep.js';

/* TODO this take a wait time parameter, or should that be uniform for all
buttons across the site? */

export class DynamicLabelButton extends React.Component {
    /* Abstract base component for buttons that change their displayed
        text on mousehover and revert to a default text on mouse leave. */

    constructor(props) {
        super(props);
        this.state = {
            text: this.props.mainText
        }

        // Method binds
        this.handleClick = this.handleClick.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);

    }

    handleClick(e) {
        this.props.onClick();
    }

    handleMouseEnter(e) {
        this.setState({
            text: this.props.hoverText
        })
    }

    handleMouseLeave(e) {
        waitingUtil(this.props.lagLeave)
        .then((resolvedValue) => {
            this.setState({
                text: this.props.mainText
            })
        })
    }

    render() {
        return(
            <button
                className={this.props.classNameString}
                onClick={this.handleClick}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                style={{"height": "100%"}}
            >
                {this.state.text}
            </button>
        )
    }

}

DynamicLabelButton.propTypes = {
    classNameString: PropTypes.string.isRequired,
    mainText: PropTypes.string.isRequired,
    hoverText: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    lagLeave: PropTypes.number.isRequired
}