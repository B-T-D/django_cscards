import React from 'react';

import { ReviewModeSelect } from './ReviewModeSelect';
import { ManageModeSelect } from './ManageModeSelect';

export class Nav extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return(
            <nav className="App-nav">
                <ul>
                    <li className="App-nav-item">
                        <ReviewModeSelect
                            onSetReviewMode={this.props.onSetReviewMode}
                        />
                    </li>
                    <li className="App-nav-item">
                        <ManageModeSelect
                            onSetManageMode={this.props.onSetManageMode}
                        />
                    </li>
                    <li className="App-nav-item">
                        <button>general</button>
                    </li>
                    <li className="App-nav-item">
                        <button>code</button>
                    </li>
                    <li className="App-nav-item">
                        <button>log out</button>
                    </li>
                </ul>
            </nav>
        )

    }

}

