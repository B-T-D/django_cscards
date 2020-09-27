import React from 'react';
import PropTypes from 'prop-types';

import arrowLeftCircle from 'bootstrap-icons/icons/arrow-left-circle.svg';

/** A button for "back" or "cancel" type UI actions, meant to be reusable
    across the interface in different menus, dropdowns, detail views, forms,
    etc. */

export class MenuBackButton extends React.Component {
    constructor(props) {
        super(props);

        // Fixed instance variables
        this.verboseLabel = "Back";
        this.content = <img src={arrowLeftCircle} />;
        // TODO choose a svg and import it

        // Method Binds
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.onClick()
    }

    render() {
        return(
            <button
                onClick={this.handleClick}
            >
                {this.content}
            </button>
        )
    }

}

MenuBackButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};