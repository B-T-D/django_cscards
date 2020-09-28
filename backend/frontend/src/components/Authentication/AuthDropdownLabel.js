import React from 'react';
import PropTypes from 'prop-types';

import { MenuBackButton } from '../MenuBackButton/MenuBackButton';

export class AuthDropdownLabel extends React.Component {

    render() {
        return(
            this.props.parentDropdownExpanded ?
                <MenuBackButton
                    onClick={this.props.collapseParentDropdown}
                />
                :
                <p>Log in</p>


        )
    }
}

AuthDropdownLabel.propTypes = {
    parentDropdownExpanded: PropTypes.bool.isRequired,
    collapseParentDropdown: PropTypes.func.isRequired,
};

