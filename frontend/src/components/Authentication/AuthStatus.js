import React from 'react';
import PropTypes from 'prop-types';
import { AuthDropdownLabel } from './AuthDropdownLabel';

export class AuthStatus extends React.Component {

/* TODO it's switching to logged in as even when the login failed for backend
    config reasons, 9/23. */


    constructor(props) {
        super(props);

    }


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