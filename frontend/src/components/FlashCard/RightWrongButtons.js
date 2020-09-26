import React from 'react';

export class RightWrongButtons extends React.Component {

    constructor(props) {
        super(props);

        // Method Binds
        this.handleClickGotRight = this.handleClickGotRight.bind(this);
        this.handleClickGotWrong = this.handleClickGotWrong.bind(this);
    }

    handleClickGotRight(e) {
        this.props.onIncrementRight();
    }

    handleClickGotWrong(e) {
        this.props.onIncrementWrong();
    }

    render() {
        return (
            <div className="row">
                <button
                    className="col-6"
                    onClick={this.handleClickGotRight}
                >
                    Right
                </button>
                <button
                    className="col-6"
                    onClick={this.handleClickGotWrong}
                >
                    Wrong
                </button>
            </div>
        )
    }
}