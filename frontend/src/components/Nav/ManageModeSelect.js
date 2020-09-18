import React from 'react';

export class ManageModeSelect extends React.Component {

    /* Don't need a constructor and super(props) because nothing needs to be
    bound here because the callback takes no args */

    /* Callback func doesn't pass an arg so doesn't need an event handler */

    render() {

        return (
            <button onClick={this.props.onSetManageMode}>
                manage cards
            </button>
        );

    }
}