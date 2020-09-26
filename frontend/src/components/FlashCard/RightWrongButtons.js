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
            <div>
                <button onClick={this.handleClickGotRight}>Right</button>
                <button onClick={this.handleClickGotWrong}>Wrong</button>
            </div>
        )
    }
}