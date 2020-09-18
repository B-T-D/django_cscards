import React from 'react';
import { EditButton } from './EditButton';
import { CardContent } from './CardContent';

export class CardRow extends React.Component {

    render() {
        return(
            <tr key={this.props.card.id}>
                <EditButton card={this.props.card} />
                <CardContent card={this.props.card}/>
            </tr>
        )

    }
}