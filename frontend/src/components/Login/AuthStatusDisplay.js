import React from 'react';

export class AuthStatusDisplay extends React.Component {

    render() {
        if (!this.props.user) {
            return null;
        }
        return (
            <p>Logged in as {this.props.user}</p>
        );
    }

}