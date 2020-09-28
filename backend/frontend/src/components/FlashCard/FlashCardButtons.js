import React from 'react';

import chevronDoubleRight from 'bootstrap-icons/icons/chevron-double-right.svg';
import chevronDoubleLeft from 'bootstrap-icons/icons/chevron-double-left.svg';
import { Icon, InlineIcon } from '@iconify/react';
import tildeIcon from '@iconify/icons-mdi/tilde';

export class FlashCardButtons extends React.Component {

/* TODO: On mouse enter/leave toggle explanatory text for the bitwise symbols.
    */

    constructor(props) {
        super(props);

        this.state = {
            contentPrevButton: <img src={chevronDoubleLeft}/>, // Bitwise left-shift operator for prev button
            contentFlipButton: <Icon icon={tildeIcon}/>, // Bitwise NOT / ones-complement operator to "flip"
            contentNextButton: <img src={chevronDoubleRight} />, // Bitwise right-shift operator for next button

        }
    }

    render() {

        return(
            <div className="row">
                <div className="col-4">
                    <button
                        className="btn btn-outline-dark btn-block"
                        onClick={this.props.onPrev}
                    >
                        {this.state.contentPrevButton}
                    </button>
                </div>
                <div className="col-4">
                    <button
                        className="btn btn-outline-dark btn-block"
                        onClick={this.props.onFlip}
                    >
                        {this.state.contentFlipButton}
                    </button>
                </div>
               <div className="col-4">
                    <button
                        className="btn btn-outline-dark btn-block"
                        onClick={this.props.onNext}
                    >
                        {this.state.contentNextButton}
                    </button>
                </div>

            </div>
        );
    }
}