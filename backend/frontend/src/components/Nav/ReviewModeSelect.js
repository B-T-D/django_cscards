import React from 'react';

export class ReviewModeSelect extends React.Component {

    render() {
        return(
            <button className="btn btn-outline-light" onClick={this.props.onSetReviewMode}>
                Review
            </button>
        );
    }
}


