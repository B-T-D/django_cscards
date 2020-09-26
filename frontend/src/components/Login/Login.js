import React from 'react';

import { LoginForm } from './LoginForm';
import { AuthStatusDisplay } from './AuthStatusDisplay';
import { waitingUtil } from '../../util/sleep.js';

export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status: 'out',
            expanded: false,
            mousePresent: false
        }

        // Method Binds
        this.handleClick = this.handleClick.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        //this.sleep = this.sleep.bind(this);
    }

    handleClick(e) {
        this.setState(
            { expanded: !this.state.expanded }
        )
    }

    handleMouseEnter(e) {
        this.setState({
            mousePresent: true
        })
        /* Wait long enough to have reasonable chance user meant to be there.
            Cf. how long Amazon navbar (chrome, large viewport, Sept. 2020,
            known to use React), waits for dropdowns. Seems like about half
            a second. */

        waitingUtil(500).then((resolvedValue) =>
            {if (this.state.mousePresent) {
                this.setState({expanded: true});
                }
            })
    }

    handleMouseLeave(e) {
        this.setState({
            mousePresent: false
        })
    }

    render() {

        const Expanded = () => {
            return(
                <div>
                    <LoginForm
                        onSubmitLogin={this.props.onSubmitLogin}
                    />
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

        // TODO refactor the dropdown-handler button into separate component file

        return(
            <div>
                <AuthStatusDisplay
                    user={this.props.user}
                    onLogout={this.props.onLogout}
                />
                <button
                    onClick={this.handleClick}
                    onMouseEnter={this.state.expanded ? null : this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
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