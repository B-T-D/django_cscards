import React from 'react';

export class FlashCardButtons extends React.Component {

    render() {

        return(
            <div>
                <button
                    onClick={this.props.onPrev}
                >
                    Prev
                </button>
                <button
                    onClick={this.props.onFlip}
                >
                    Flip
                </button>
                <button>I know it</button>
                <button
                    onClick={this.props.onNext}
                >
                    Next
                </button>

            </div>
        );
    }
}