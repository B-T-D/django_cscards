import React from 'react';

export class RightWrongButtons extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            textGotRight: "1",
            textGotWrong: "0",
        }

        // Method Binds
        this.handleClickGotRight = this.handleClickGotRight.bind(this);
        this.handleClickGotWrong = this.handleClickGotWrong.bind(this);

        // Tooltip-like on hover methods
        this.handleMouseOverGotRight = this.handleMouseOverGotRight.bind(this);
        this.handleResetGotRightText = this.handleResetGotRightText.bind(this);
        this.handleMouseOverGotWrong = this.handleMouseOverGotWrong.bind(this);
        this.handleResetGotWrongText = this.handleResetGotWrongText.bind(this);
    }

    handleClickGotRight(e) {
        this.props.onIncrementRight();
    }

    handleClickGotWrong(e) {
        this.props.onIncrementWrong();
    }

    /* TODO all these on hover methods are just standin for a good reusable, modular
        tooltip that can be used throughout the whole UI. */


    handleMouseOverGotRight(e) {
        this.setState({
            textGotRight: "Got it right!"
        })
    }

    handleResetGotRightText(e) { // TODO DRY
        this.setState({
            textGotRight: "1"
        })
    }

    handleMouseOverGotWrong(e) {
        this.setState({
            textGotWrong: "didn't know it"
        });
    }

    handleResetGotWrongText(e) {
        this.setState({
            textGotWrong: "0"
        })
    }

    render() {
        return (
            <div className="col-12">
                <button
                    className="btn btn-outline-dark bg-secondary text-white col-6"
                    onClick={this.handleClickGotWrong}
                    onMouseOver={this.handleMouseOverGotWrong}
                    onMouseLeave={this.handleResetGotWrongText}
                >
                    {this.state.textGotWrong}
                </button>
                <button
                    className="btn btn-outline-dark bg-warning col-6"
                    onClick={this.handleClickGotRight}
                    onMouseOver={this.handleMouseOverGotRight}
                    onMouseLeave={this.handleResetGotRightText}
                >
                    {this.state.textGotRight}
                </button>

            </div>
        )
    }
}