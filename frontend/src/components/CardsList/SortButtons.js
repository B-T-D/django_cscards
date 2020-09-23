import React from 'react';

export class SortButtons extends React.Component {

    constructor(props) {
        super(props);

        // Method Binds
        this.handleClickSortFront = this.handleClickSortFront.bind(this);
    }

    handleClickSortFront(e) {
        this.props.onSortFront()
    }

    render() {
        return(
            <div>
                <p>Sort by:</p>
                <button
                    onClick={this.handleClickSortFront}
                >
                    Front content (alphabetical)
                </button>
            </div>
        )
    }
}