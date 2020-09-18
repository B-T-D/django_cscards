import React from 'react';

export class ReviewModeSelect extends React.Component {

    render() {
        return(
            <button onClick={this.props.onSetReviewMode}>
                CS Flash Cards
            </button>
        );
    }
}


