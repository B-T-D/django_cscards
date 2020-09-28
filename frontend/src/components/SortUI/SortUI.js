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
                    label="alphabetical by front content"
                    sortCallback={this.props.onSortFront}
                    reverseCallback={this.props.onReverse}
                />
                <SortButton
                    label="date added"
                    sortCallback={this.props.onSortDateAdded}
                    reverseCallback={this.props.onReverse}
                />
            </div>
        )
    }
}