import React from 'react';

export class AuthStatusDisplay extends React.Component {

/* TODO it's switching to logged in as even when the login failed for backend
    config reasons, 9/23. */


    constructor(props) {
        super(props);
        this.handleClickLogout = this.handleClickLogout.bind(this);
    }

    handleClickLogout(e) {
        this.props.onLogout();
    }

    render() {
        if (!localStorage.getItem("user_id")) {
            return null;
        }
        return (
            <div>
                <p>Logged in as {this.props.user} (user_id {localStorage.getItem("user_id")})</p>
                <button
                    onClick={this.handleClickLogout}
                >
                    Log out
                </button>
            </div>
        );
    }

}