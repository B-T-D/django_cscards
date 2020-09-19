import React from 'react';
import PropTypes from 'prop-types';
import { FlashCardButtons } from './FlashCardButtons';
import { Front } from './Front';

export class FlashCard extends React.Component {

    render() {
        return(
            <div>
                <p>I am a flashcard</p>
                <Front content={"card.front here"} />
                <FlashCardButtons />
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
