import React from 'react';

import { ReviewModeSelect } from './ReviewModeSelect';
import { ManageModeSelect } from './ManageModeSelect';

export class Nav extends React.Component {

    render() {

        return(
            <nav className="App-nav">
                <ul>
                    <li className="App-nav-item">
                        <ReviewModeSelect />
                    </li>
                    <li className="App-nav-item">
                        <ManageModeSelect />
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

