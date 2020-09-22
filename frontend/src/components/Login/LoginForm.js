import React from 'react';

export class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userNameInput: '',
            passwordInput: ''
        }

        // Method Binds
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUserName(event) {
        this.setState({
            userNameInput: event.target.value
        });
    }

    handleChangePassword(event) {
        this.setState({
            passwordInput: event.target.value
        });
    }

    handleSubmit(event) {
        alert("Placeholder--login form submitted!");
    }


    // TODO the password input can't show the plaintext characters

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
                <button type="submit">
                    POST
                </button>
            </form>
        )
    }
}