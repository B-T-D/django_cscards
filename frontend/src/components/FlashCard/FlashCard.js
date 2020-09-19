import React from 'react';
import PropTypes from 'prop-types';
import { FlashCardButtons } from './FlashCardButtons';
import { Front } from './Front';
import { Back } from './Back';

export class FlashCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            flipped: false // false displays front of card, true displays back
        }

        // Method Binds
        this.toggleFlipped = this.toggleFlipped.bind(this);
    }

    toggleFlipped() {
        this.setState({
            flipped: (!this.state.flipped)
        });
    }


    render() {
        return(
            <div>
                <p>I am a flashcard</p>
                {this.state.flipped ?
                    <Back card={this.props.card} />
                    :
                    <Front content={this.props.card.front} />
                }
                <FlashCardButtons
                    onPrev={this.props.onPrev}
                    onFlip={this.toggleFlipped}
                    onNext={this.props.onNext}
                />
            </div>
        );
    }
}

FlashCard.propTypes = {
    card: PropTypes.exact({
        id: PropTypes.number,
        type: PropTypes.number,
        front: PropTypes.string,
        back: PropTypes.string,
        known: PropTypes.bool,
        controlErroneousProperty: PropTypes.bool
    }).isRequired,
}
// kjkljklkjhkjh
