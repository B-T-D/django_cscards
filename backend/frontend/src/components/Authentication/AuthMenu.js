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
            mousePresent: false,
            cursorInChild: false
        }

        // Method Binds
        this.expand = this.expand.bind(this);
        this.collapse = this.collapse.bind(this);
        this.flagCursorInChild = this.flagCursorInChild.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.flagCursorInChild = this.flagCursorInChild.bind(this);
        this.unflagCursorInChild = this.unflagCursorInChild.bind(this);
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

    flagCursorInChild() {
        /* Callback for use by the login input fields to prevent clicking into
        them with text cursor being treated as a mouseleave, and thus collapsing
        the menu prematurely. */
        this.setState({
            cursorInChild: true
        })
    }

    unflagCursorInChild() {
        /* Callback that text-input children can use when done with cursor. */
        this.setState({
            cursorInChild: false
        })
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
        waitingUtil(2500).then((resolvedValue) =>
            {if (this.state.expanded && !this.state.cursorInChild) {
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
                        flagCursorInChild={this.flagCursorInChild}
                        unflagCursorInChild={this.unflagCursorInChild}
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