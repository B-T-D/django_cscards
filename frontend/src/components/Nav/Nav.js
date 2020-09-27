import React from 'react';

import { ReviewModeSelect } from './ReviewModeSelect';
import { ManageModeSelect } from './ManageModeSelect';
import { Login } from '../Login/Login';

/* TODO the active mode's nav item should light up yellow (bootstrap bg-warning)
    when that mode is active. */

export class Nav extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return(
            <div className="row">
                <nav className="col navbar navbar-expand-md bg-dark text-white">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <ReviewModeSelect
                                onSetReviewMode={this.props.onSetReviewMode}
                            />
                        </li>
                        <li className="nav-item active">
                            <ManageModeSelect
                                onSetManageMode={this.props.onSetManageMode}
                            />
                        </li>
                        <li className="nav-item active">
                            <Login
                                user={this.props.user ? this.props.user : null}
                                onSubmitLogin={this.props.onSubmitLogin}
                                onLogout={this.props.onLogout}
                            />
                        </li>
                    </ul>
                </nav>
            </div>
        )

    }
}

