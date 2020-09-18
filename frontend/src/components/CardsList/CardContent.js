import React from 'react';

export class CardContent extends React.Component {

    render() {
        return(
            <td>
                <h2>{this.props.card.front}</h2>
                <p>{this.props.card.back}</p>
            </td>
        );
    }
}