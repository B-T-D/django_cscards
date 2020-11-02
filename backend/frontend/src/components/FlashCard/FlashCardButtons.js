import React from 'react';

import chevronDoubleRight from 'bootstrap-icons/icons/chevron-double-right.svg';
import chevronDoubleLeft from 'bootstrap-icons/icons/chevron-double-left.svg';
import { Icon, InlineIcon } from '@iconify/react';
import tildeIcon from '@iconify/icons-mdi/tilde';

import { DynamicLabelButton } from '../ReusableButtons/DynamicLabelButton';

export class FlashCardButtons extends React.Component {

/* TODO: On mouse enter/leave toggle explanatory text for the bitwise symbols.
    */

    constructor(props) {
        super(props);

        this.classNameString = "btn btn-light btn-block border border-dark";

        this.mainContentPrevButton = <img src={chevronDoubleLeft}/>; // Bitwise left-shift operator symbol for prev button
        this.mainContentFlipButton = <Icon icon={tildeIcon}/>; // Bitwise NOT / ones-complement operator to "flip"
        this.mainContentNextButton = <img src={chevronDoubleRight} />; // Bitwise right-shift operator for next button

    }

    render() {

        return(
            <div className="row"
                style={{"position": "absolute", "bottom": "0", "width": "100%"}}
            >
                <div
                    className="col-4"
                >
                    <DynamicLabelButton
                        classNameString={this.classNameString}
                        mainText={this.mainContentPrevButton}
                        hoverText={"Previous"}
                        onClick={this.props.onPrev}
                        lagLeave={0}
                    />
                </div>
                <div className="col-4">
                    <DynamicLabelButton
                        classNameString={this.classNameString}
                        mainText={this.mainContentFlipButton}
                        hoverText={"Flip"}
                        onClick={this.props.onFlip}
                        lagLeave={0}
                    />
                </div>
               <div className="col-4">
                    <DynamicLabelButton
                        classNameString={this.classNameString}
                        mainText={this.mainContentNextButton}
                        hoverText={"Next"}
                        onClick={this.props.onPrev}
                        lagLeave={0}
                    />
                </div>

            </div>
        );
    }
}