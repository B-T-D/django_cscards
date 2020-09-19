import React from 'react';
import PropTypes from 'prop-types';

import { FlashCard } from '../FlashCard/FlashCard';

export class Review extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            side: 'front',
            currentCardIndex: 0
        }
    }

    render() {
        console.log(JSON.stringify(this.props.cards));
        return(
            <div>
                <p>Review mode</p>
                <FlashCard
                    card={this.props.cards[0]}
                />
            </div>
        );
    }
}

Review.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object).isRequired,
} // TODO validate array shape and element types
//klklkl;lk