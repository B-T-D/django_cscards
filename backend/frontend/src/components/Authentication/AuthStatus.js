import React from 'react';
import PropTypes from 'prop-types';
import { AuthDropdownLabel } from './AuthDropdownLabel';

export class AuthStatus extends React.Component {

    render() {
        return (
            <div>
                {localStorage.getItem("user_id") ?
                    <p>Logged in as {localStorage.getItem("username")}</p>
                    :
                    <AuthDropdownLabel
                        parentDropdownExpanded={this.props.parentDropdownExpanded}
                        collapseParentDropdown={this.props.collapseParentDropdown}
                    />
                }
            </div>
        );
    }
}

AuthStatus.propTypes = {
    parentDropdownExpanded: PropTypes.bool.isRequired,
    collapseParentDropdown: PropTypes.func.isRequired,
}