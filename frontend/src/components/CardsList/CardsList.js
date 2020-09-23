import React from 'react';
import PropTypes from 'prop-types';
import { CardRow } from './CardRow';
import { SortButtons } from './SortButtons';

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
                    <li className="FilterButtons"
                        key={item}
                    >
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

function compareFront(a, b) {
    if (a.front.toLowerCase() < b.front.toLowerCase()) {
        return -1
    };
    return 1;
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

//        this.props.cards.sort(compareFront); // Todo ugly naming and placement, but does work to alphabetically sort.

        return(
            <div className="cards-list">
                <TotalCards numCards={this.props.cards.length} />
                <FilterButtons types={this.props.types} />
                <br />
                <SortButtons
                    onSortFront={this.props.onSortFront}
                />
                <table>
                    <tbody>
                        {this.props.cards.map(card => (
                            <CardRow
                                key={card.id}
                                card={card}
                                onUpdateCard={this.props.onUpdateCard}
                                onDeleteCard={this.onDeleteRow}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

CardsList.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDeleteCard: PropTypes.func.isRequired,
}