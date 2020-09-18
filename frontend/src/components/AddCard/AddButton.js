import React from 'react';

export class AddToggleButton extends React.Component {

    render() {

        return(
            <button onClick={this.props.onClick}>
                {this.props.expanded ? "Cancel" : "Add a Card"}
            </button>
        );
    }
}