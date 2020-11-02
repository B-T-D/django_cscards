import React from 'react';
import PropTypes from 'prop-types';
import { CardsList } from '../CardsList/CardsList';
import { AddCard } from '../AddCard/AddCard';
import { CardDetailFormModal } from '../CardDetail/CardDetailForm'

/* TODO careful about "prop drilling". Not a super huge app but still might be
    more maintainable to use context some places instead of many-layered
    prop-pass chains. */

export class Manage extends React.Component {


    render() {
        return (
            <div className="row align-content-center">
                <div id="wrapper col main manage content">
                <AddCard
                    types={this.props.types}
                    onSubmit={this.props.onCreateCard}
                    onUpdateCard={this.props.onUpdateCard}
                    onDeleteCard={this.props.onDeleteCard}
                />
                <CardDetailFormModal
                    location="manage"
                    mode="create"
                    onSubmit={this.props.onCreateCard}
                />
                <CardsList
                    cards={this.props.cards}
                    types={this.props.types}
                    onUpdateCard={this.props.onUpdateCard}
                    onDeleteCard={this.props.onDeleteCard}
                    onReverse={this.props.onReverse}
                    onSortFront={this.props.onSortFront}
                    onSortPk={this.props.onSortPk}
                    onSortDateAdded={this.props.onSortDateAdded}
                />
                </div>
            </div>
        );

    }
}

Manage.propTypes = {
    cards: PropTypes.array.isRequired,
    onUpdateCard: PropTypes.func.isRequired
}