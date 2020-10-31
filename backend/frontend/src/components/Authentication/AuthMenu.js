import React from 'react';
import PropTypes from 'prop-types';

import { AuthUI } from './AuthUI';
import { AuthStatus } from './AuthStatus';
import { waitingUtil } from '../../util/sleep.js';

export class AuthMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            mousePresent: false
        }

        // Method Binds
        this.expand = this.expand.bind(this);
        this.collapse = this.collapse.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        //this.sleep = this.sleep.bind(this);
    }

    expand() {
        this.setState({
            expanded: true,
        })
    }

    collapse() {
        this.setState({
            expanded: false,
        })
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
        waitingUtil(7500).then((resolvedValue) =>
            {if (this.state.expanded) {
                this.setState({expanded: false});
            }}
        )
    }

    render() {

        return(
            <div
                onClick={this.state.expanded ? null : this.expand}
                onMouseEnter={this.state.expanded ? null : this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                <AuthStatus
                    parentDropdownExpanded={this.state.expanded}
                    collapseParentDropdown={this.collapse}
                />
                { this.state.expanded ?
                    <AuthUI
                        onSubmitLogin={this.props.onSubmitLogin}
                        onLogout={this.props.onLogout}
                        collapseParentDropdown={this.collapse}
                    />
                    :
                    null
                }

            </div>
        );
    }
}

AuthMenu.propTypes = {
    onSubmitLogin: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
};