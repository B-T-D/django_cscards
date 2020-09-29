import React from 'react';
import PropTypes from 'prop-types';

import { MenuBackButton } from '../MenuBackButton/MenuBackButton';

export class AddToggleButton extends React.Component {

    /* Re: convoluted nesting: It needs a parent element to lock its size.
        Make it "block" so that it grows to parent's full size, then manipulate
        the parent's size. Seems like stuck with this when using bootstrap. */


    render() {

        return(
            <div className="row align-items-end">
            <div className="col-1 align-self-start">
                {this.props.expanded ?
                    <MenuBackButton onClick={this.props.onClick}/>
                    :
                    <button onClick={this.props.onClick}>
                        Add Card
                    </button>
                }
            </div>
            </div>
        );
    }
}

AddToggleButton.propTypes = {
    onClick: PropTypes.func.isRequired,
}