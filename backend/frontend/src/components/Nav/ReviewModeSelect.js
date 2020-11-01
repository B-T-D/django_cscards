import React from 'react';

import { DynamicLabelButton } from '../ReusableButtons/DynamicLabelButton'

export class ReviewModeSelect extends React.Component {

    render() {
        return(
            <DynamicLabelButton
                classNameString={"btn btn-outline-light"}
                mainText={"Review"}
                hoverText={"Test knowledge of cards"}
                onClick={this.props.onSetReviewMode}
                lagLeave={100}
            />
        );
    }
}


