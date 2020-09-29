import React from 'react';
import PropTypes from 'prop-types';

import { SortButton } from './SortButton';

export class SortUI extends React.Component {

    constructor(props) {
        super(props);

        // Method Binds
        this.handleClickReverse = this.handleClickReverse.bind(this);
        this.handleClickSortFront = this.handleClickSortFront.bind(this);
        this.handleClickSortPk = this.handleClickSortPk.bind(this);
    }

    handleClickSortFront(e) {
        this.props.onSortFront()
    }

    handleClickSortPk(e) {
        this.props.onSortPk()
    }

    handleClickReverse(e) {
        this.props.onReverse();
    }

    render() {
        return(
            <div>
                <p>Sort by:</p>
                <SortButton
                    label="last modified"
                    sortCallback={this.props.onSortCardsLastModified}
                    reverseCallback={this.props.onReverseCards}
                />
                <SortButton
                    label="times wrong"
                    sortCallback={this.props.onSortCardsTimesWrong}
                    reverseCallback={this.props.onReverseCards}
                />
                <SortButton
                    label="date added"
                    sortCallback={this.props.onSortCardsDateAdded}
                    reverseCallback={this.props.onReverseCards}
                />
            </div>
        )
    }
}

SortUI.propTypes = {
    onReverse: PropTypes.func.isRequired,
    onSortFront: PropTypes.func.isRequired,
    onSortPk: PropTypes.func.isRequired,
    onSortDateAdded: PropTypes.func.isRequired,
}