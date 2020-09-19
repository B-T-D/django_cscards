import React from 'react';
import PropTypes from 'prop-types';
import { CardsList } from '../CardsList/CardsList';
import { AddCard } from '../AddCard/AddCard';
import { CardDetail } from '../CardDetail/CardDetail';

/* TODO careful about "prop drilling". Not a super huge app but still might be
    more maintainable to use context some places instead of many-layered
    prop-pass chains. */

export class Manage extends React.Component {


    render() {
        return (
            <div>
                <AddCard
                    types={this.props.types}
                    onCreateCard={this.props.onCreateCard}
                />
                <CardsList
                    cards={this.props.cards}
                    types={this.props.types}
                    onUpdateCard={this.props.onUpdateCard}
                    onDeleteCard={this.props.onDeleteCard}
                />
            </div>
        );

    }
}

Manage.propTypes = {
    cards: PropTypes.array.isRequired,
    onUpdateCard: PropTypes.func.isRequired
}