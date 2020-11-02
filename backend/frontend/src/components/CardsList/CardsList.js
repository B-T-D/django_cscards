import React from 'react';
import PropTypes from 'prop-types';
import { CardRow } from './CardRow';
import { SortUI } from '../SortUI/SortUI';



function TotalCards({ numCards }) {
    return(
        <h1>{numCards} Cards</h1>
    )
}

// Sort Utility Functions

function compareFront(a, b) { // TODO messy quick placing, move this
    if (a.front.toLowerCase() < b.front.toLowerCase()) {
        return -1
    };
    return 1;
}

function compareId(a, b) {
    if (a.id < b.id) {
        return -1
    };
    return 1;
}

function compareDateAdded(a, b) {
    if (a["date_added"] < b["date_added"]) {
        return -1
    };
    return 1;
}

function compareLastModified(a, b) {
    if (a["last_modified"] < b["last_modified"]) {
        return -1
    };
    return 1;
}

function compareTimesWrong(a, b) {
    if (a["times_wrong"] < b["times_wrong"]) {
        return -1
    };
    return 1;
}

//function compareModelField(a, b, field) {
//    /* TODO does JS array.sort() implemention allow this? NB there aren't
//        all that many fields here. Not critical to be able to generalize this. */
//    /* Compare values on any valid, comparable model field of the backend's
//        Card model. */
//    if (a[field]) < b[field]) {
//        return -1
//    };
//    return 1;
//}



export class CardsList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cardsList: this.props.cards.sort(compareDateAdded),
            sortOrder: "last_modified -r",
        } /* TODO is this the "correct" place to do this? Facebook docs say not to use WillMount anymore, and DidMount doesn't work here
                Goal is to have the initial cards list as the starting state, then have sorts performed here and that display order preserved in state. */



        // Method Binds
        this.onDeleteRow = this.onDeleteRow.bind(this);
        this.conformSortOrder = this.conformSortOrder.bind(this);

            // Method Binds -- Cards Sorting
        this.onSortCardsLastModified = this.onSortCardsLastModified.bind(this);
        this.onReverseCards = this.onReverseCards.bind(this);
        this.onSortCardsFront = this.onSortCardsFront.bind(this);
        this.onSortCardsPk = this.onSortCardsPk.bind(this);
        this.onSortCardsDateAdded = this.onSortCardsDateAdded.bind(this);
        this.onSortCardsTimesWrong = this.onSortCardsTimesWrong.bind(this);
    }

    //// Card-Sort Methods

    onReverseCards() {
        /** However cards are currently ordered, reverse them. */
        this.setState({
            cardsList: this.state.cardsList.reverse(),
        });
        if (!this.state.sortOrder.includes("-r")) {
            this.setState({
                sortOrder: this.state.sortOrder + " -r"
            })
        }
    }

    onSortCardsLastModified() {
        this.setState({
            cardsList: this.state.cardsList.sort(compareLastModified),
            sortOrder: "last_modified",
        })
    }

    onSortCardsFront() {
        this.setState({
            cardsList: this.state.cardsList.sort(compareFront)
        })
    }

    onSortCardsPk() {
        this.setState({
            cardsList: this.state.cardsList.sort(compareId)
        })
    }

    onSortCardsDateAdded() {
        this.setState({
            cardsList: this.state.cardsList.sort(compareDateAdded),
            sortOrder: "date_added",
        })
    }

    onSortCardsTimesWrong() {
        this.setState({
            cardsList: this.state.cardsList.sort(compareTimesWrong),
            sortOrder: "times_wrong",
        })
    }

    onDeleteRow(pk) { // pk argument must come back up from the single-card-based component that called delete.
        this.props.onDeleteCard(pk);
        this.setState();
    }

    // Todo goal is for the component to re-render on deletion. Because the props are different.


    conformSortOrder() {
        /** Sort the cards in the order currently stored in this.state.sortOrder
            This is called from within render, so can't call setState.
        */
        // TODO there's surely a more correct way to do this.
        if (this.state.sortOrder === "last_modified") {
            this.state.cardsList.sort(compareLastModified);
        } else if (this.state.sortOrder === "last_modified -r") {
            this.state.cardsList.sort(compareLastModified).reverse()
        } else if (this.state.sortOrder === "date_added") {
            this.state.cardsList = this.state.cardsList.sort(compareDateAdded)
        } else if (this.state.sortOrder === "date_added -r") {
            this.state.cardsList = this.state.cardsList.sort(compareDateAdded).reverse()
        }


    }

    render() {

        /* TODO this will still render twice even in the best case, right? The cards come from
            the backend sorted the same way every time, I think by pk */

        this.conformSortOrder();

        return(
            <div
                className="col-12"
            >
                <TotalCards numCards={this.state.cardsList.length} />
                <br />
                <SortUI
                    onReverseCards={this.onReverseCards}
                    onSortCardsLastModified={this.onSortCardsLastModified}
                    onSortCardsDateAdded={this.onSortCardsDateAdded}
                    onSortCardsTimesWrong={this.onSortCardsTimesWrong}
                />
                <table>
                    <tbody>
                        {this.state.cardsList.map(card => (
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
    cards: PropTypes.arrayOf(PropTypes.exact({
        id: PropTypes.number,
        type: PropTypes.number,
        front: PropTypes.string,
        back: PropTypes.string,
        known: PropTypes.bool,
        controlErroneousProperty: PropTypes.bool
    })).isRequired,


    onDeleteCard: PropTypes.func.isRequired,
}
