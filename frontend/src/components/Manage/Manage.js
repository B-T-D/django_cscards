import React from 'react';
import { CardsList } from '../CardsList/CardsList';
import { AddCard } from '../AddCard/AddCard';
import { CardDetail } from '../CardDetail/CardDetail';

export class Manage extends React.Component {


    render() {
        return (
            <div>
                <p>manage mode is now active</p>
                <AddCard
                    types={this.props.types}
                    onCreateCard={this.props.onCreateCard}
                />
                <CardsList
                    cards={this.props.cards}
                    types={this.props.types}
                />
            </div>
        );

    }
}