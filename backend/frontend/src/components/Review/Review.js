import React from 'react';
import PropTypes from 'prop-types';

import { FlashCard } from '../FlashCard/FlashCard';

export class Review extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentCardIndex: 0
        }

        // Method Binds
        this.prevCard = this.prevCard.bind(this);
        this.nextCard = this.nextCard.bind(this);
    }

    prevCard() {
        let newIndex = this.state.currentCardIndex - 1;
        if (newIndex < 0) { // Loop around if it hit zero
            newIndex = this.props.cards.length - 1
        }
        this.setState({
            currentCardIndex: newIndex
        })
    }

    nextCard() {
        const newIndex = (this.state.currentCardIndex + 1) % this.props.cards.length; // Loop around if go past the last element
        this.setState({
            currentCardIndex: newIndex
        })
    }

    render() {
        return(

            <div className="row flex-fill d-flex justify-content-center">
                <div id="reserved left filler" className="col-2 bg-light"/>
                    <FlashCard
                        card={this.props.cards[this.state.currentCardIndex]}
                        onPrev={this.prevCard}
                        onNext={this.nextCard}
                        onUpdateCard={this.props.onUpdateCard}
                        onDeleteCard={this.props.onDeleteCard}
                    />
                <div id="reserved right filler" className="col-2 bg-light"/>
            </div>
        );
    }
}

Review.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object).isRequired,
}