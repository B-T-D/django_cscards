import React from 'react';

export class SortButtons extends React.Component {

    constructor(props) {
        super(props);

        // Method Binds
        this.handleClickSortFront = this.handleClickSortFront.bind(this);
        this.handleClickSortPk = this.handleClickSortPk.bind(this);
    }

    handleClickSortFront(e) {
        this.props.onSortFront()
    }

    handleClickSortPk(e) {
        this.props.onSortPk()
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
                <button
                    onClick={this.handleClickSortPk}
                >
                    Primary key (corresponds to order of creation)
                </button>
            </div>
        )
    }
}