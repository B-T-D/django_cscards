import React from 'react';

export class EditButton extends React.Component {

    render() {
        return(
            <td>
                <button
                    onClick={this.props.onClick}
                >
                    {this.props.expanded ? "Cancel" : "Edit"}
                </button>
            </td>
        );
    }
}