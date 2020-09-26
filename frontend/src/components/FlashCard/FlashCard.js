import React from 'react';
import PropTypes from 'prop-types';
import { FlashCardButtons } from './FlashCardButtons';
import { Front } from './Front';
import { Back } from './Back';

export class FlashCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            flipped: false, // false displays front of card, true displays back
            card: null, // setState will need to update the entire card in one call IMU
            timesRight: null,
            timesWrong: null,
            lastReviewed: null
        }

        // Method Binds
        this.toggleFlipped = this.toggleFlipped.bind(this);
        this.incrementRight = this.incrementRight.bind(this);
        this.incrementWrong = this.incrementWrong.bind(this);
    }

    componentDidMount() { // Unpack these from props into state on the first render only.
        this.setState({
            card: this.props.card,
        })
    }

    componentWillReceiveProps() {
        this.setState({
            flipped: false // Always go to the front of the next card.
        })
    }

    toggleFlipped() {
        this.setState({
            flipped: (!this.state.flipped)
        });
    }

    incrementRight() {
        const newCard = Object.assign({}, this.props.card); // TODO don't think there's actually any reason to do it this way, but it's working for now so leaving it
        newCard['times_right'] = this.state.card['times_right'] + 1;
         // TODO there's def a better way to do this (increment the times_right counter)
        this.setState({
            card: newCard
        });
        this.props.onUpdateCard(this.state.card, this.state.card.id);
    }

    incrementWrong() {
        const  newCard = Object.assign({}, this.props.card);
        newCard['times_wrong'] = this.state.card['times_wrong'] + 1;
        //newCard['last_reviewed'] = dateString
            // TODO make the backend be able to take this as-is, and parse it to the correct python UTC datetime string.
        this.setState({
            card: newCard
        });
        this.props.onUpdateCard(this.state.card, this.state.card.id);
    }

    render() {
        return(
            <div className="container">
                {this.state.flipped ?
                    <Back
                        card={this.props.card}
                        onIncrementRight={this.incrementRight}
                        onIncrementWrong={this.incrementWrong}
                        onUpdateCard={this.props.onUpdateCard}
                        onDeleteCard={this.props.onDeleteCard}

                    />
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

