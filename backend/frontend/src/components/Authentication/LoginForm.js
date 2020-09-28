import React from 'react';
import PropTypes from 'prop-types';

export class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userNameInput: '',
            passwordInput: '',
            failedAttempts: 0,
        }

        // Method Binds
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
        this.handleLoginFail = this.handleLoginFail.bind(this);

    }

    handleChangeUserName(e) {
        this.setState({
            userNameInput: e.target.value
        });
    }

    handleChangePassword(event) { // TODO the password input can't show the plaintext characters
        this.setState({
            passwordInput: event.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();  // TODO consider whether refreshing the whole app could be desirable / simplest.

        this.props.onSubmitLogin(this.state.userNameInput, this.state.passwordInput)
        .then(this.handleLoginSuccess, this.handleLoginFail)
    }

    handleLoginSuccess(resolvedValue) {
        this.props.collapseParentDropdown();
    }

    handleLoginFail(rejectionReason) {
        this.setState({
            failedAttempts: this.state.failedAttempts + 1
        })
        console.log(`${this.state.failedAttempts} failed login attempts`);
    }

    successfulLogin() {
        /** Return true if there's now a valid access token in localStorage,
            else false. **/
        /* TODO make this more airtight. Should (call a function that...) pings
            api using the current access token in local storage and sees if it
            works. */
        if (localStorage.getItem("user_id")) {
            return true;
        }
        return false;
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    name="user name"
                    value={this.state.userNameInput}
                    onChange={this.handleChangeUserName}
                />
                <input
                    type="text"
                    name="password"
                    value={this.state.passwordInput}
                    onChange={this.handleChangePassword}
                />
                {this.state.failedAttempts > 0 ?
                    <p className="text-danger">Invalid login.</p>
                    :
                    null
                }
                <button type="submit">
                    submit
                </button>
            </form>
        );
    }

}



LoginForm.propTypes = {
    onSubmitLogin: PropTypes.func.isRequired,
    collapseParentDropdown: PropTypes.func.isRequired,
};