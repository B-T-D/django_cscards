import React from 'react';
import PropTypes from 'prop-types';
import { LoginForm } from './LoginForm';

export class AuthUI extends React.Component {

    constructor(props) {
        super(props);
        // TODO does it still need a constructor after refactoring the form to separate component?

        // Method Binds
        this.handleClickLogout = this.handleClickLogout.bind(this);
    }

    handleClickLogout(e) {
        this.props.onLogout();
    }

    render() {
        return(
            <div>
            {localStorage.getItem("user_id") ?
                <button onClick={this.handleClickLogout}>
                    Log out
                </button>
                :
                <LoginForm
                    onSubmitLogin={this.props.onSubmitLogin}
                    collapseParentDropdown={this.props.collapseParentDropdown}
                    flagCursorInChild={this.props.flagCursorInChild}
                    unflagCursorInChild={this.props.unflagCursorInChild}
                />
            }
            </div>
        )
    }
}

AuthUI.propTypes = {
    onLogout: PropTypes.func.isRequired,
    onSubmitLogin: PropTypes.func.isRequired,
    collapseParentDropdown: PropTypes.func.isRequired,
}