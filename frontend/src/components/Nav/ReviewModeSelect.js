import React from 'react';

export class ReviewModeSelect extends React.Component {

    render() {
        return(
            <a className="nav-link text-white" onClick={this.props.onSetReviewMode}>
                Review
            </a>
        );
    }
}


