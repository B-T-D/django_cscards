import React from 'react';
import PropTypes from 'prop-types';
import { CardRow } from './CardRow';

function TotalCards({ numCards }) {
    return(
        <h1>{numCards} Cards</h1>
    )
}

function FilterButtons({ types }) {
    return (
        <div className="FilterButtons">
            <ul>
                {types.map(item => (
                    <li className="FilterButtons">
                        <button>{item}</button>
                    </li>
                ))}
                <li className="FilterButtons">
                    <button>Known</button>
                </li>
                <li className="FilterButtons">
                    <button>Unknown</button>
                </li>
            </ul>
        </div>
    )
}

export class CardsList extends React.Component {

    constructor(props) {
        super(props);

        // Method Binds
        this.onDeleteRow = this.onDeleteRow.bind(this);
    }

    onDeleteRow(pk) { // pk argument must come back up from the single-card-based component that called delete.
        this.props.onDeleteCard(pk);
        this.setState();
    }

    // Todo goal is for the component to re-render on deletion. Because the props are different.

    render() {
        return(
            <div className="cards-list">
                <TotalCards numCards={this.props.cards.length} />
                <FilterButtons types={this.props.types} />
                <table>
                    {this.props.cards.map(card => (
                        <CardRow
                            key={card.id}
                            card={card}
                            onUpdateCard={this.props.onUpdateCard}
                            onDeleteCard={this.onDeleteRow}
                        />
                    ))}
                </table>
            </div>
        )
    }
}

CardsList.propTypes = {
    onDeleteCard: PropTypes.func.isRequired,
}