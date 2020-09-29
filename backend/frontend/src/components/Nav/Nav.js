import React from 'react';

import { ReviewModeSelect } from './ReviewModeSelect';
import { ManageModeSelect } from './ManageModeSelect';
import { AuthMenu } from '../Authentication/AuthMenu';

/* TODO the active mode's nav item should light up yellow (bootstrap bg-warning)
    when that mode is active. */

export class Nav extends React.Component {

    render() {

        return(
                <div>
                    <ul className="row nav bg-dark text-white">
                        <li className="col-4 nav-item active">
                            <ReviewModeSelect
                                onSetReviewMode={this.props.onSetReviewMode}
                            />
                        </li>
                        <li className="col-4 nav-item active">
                            <ManageModeSelect
                                onSetManageMode={this.props.onSetManageMode}
                            />
                        </li>
                        <li className="col-4 nav-item active">
                            <div
                                id="wrapper row for login align right"
                                className="row justify-content-end"
                                >
                                <div
                                    id="content col for auth display and login"
                                    className="col-10"
                                >
                                    <AuthMenu
                                        onSubmitLogin={this.props.onSubmitLogin}
                                        onLogout={this.props.onLogout}
                                    />
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
        )

    }
}

