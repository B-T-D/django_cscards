import React from 'react';

export class CardContent extends React.Component {

    /* TODO make it render newlines correctly in the table view. Bootstrap is
        your friend prob. */

    render() {
        return(
            <td>
                <h2>{this.props.card.front}</h2>
                <p>{this.props.card.back}</p>
            </td>
        );
    }
}