import React from 'react';

import { LoginForm } from './LoginForm';

export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status: 'out',
            expanded: false,
        }

        // Method Binds
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.setState(
            { expanded: !this.state.expanded }
        )
    }

    render() {

        const Expanded = () => {
            return(
                <div>
                    <LoginForm />
                </div>
            );
        }

        const ButtonText = () => {
            if (this.state.expanded) {
                return <p>cancel</p>
            } else if (this.state.status === 'out') {
                return <p>log in</p>
            } else if (this.state.status === 'in') {
                return <p>log out</p>
            }
        }

        return(
            <div>
                <button
                    onClick={this.handleClick}
                >
                    <ButtonText />
                </button>
                {this.state.expanded ?
                    <Expanded />
                    :
                    null
                }
            </div>
        );
    }

}