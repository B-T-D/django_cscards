import React from 'react';
import PropTypes from 'prop-types';

/** Modular sort button that sorts by its callback function on first click and
    reverses that order on second click. Meant to be reusable regardless of
    the sort-comparison criterion. **/

export class SortButton extends React.Component {

    constructor(props) {
        super(props);

        // Fixed instance variable values
        this.displayContent = this.props.label

        this.state = {
            reversed: true, // So it can be flipped to false on the first click.
            clicked: false,
        }

        // Method Binds
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        /* If it's an even numbered click, reverse the sort, else sort it
        normally. */
        if (this.state.clicked) {
            this.props.reverseCallback();
        } else {
            this.props.sortCallback();
        }
        this.setState({
            reversed: !this.state.reversed,
            clicked: !this.state.clicked,
        })
    }

    handleMouseLeave(e) {
        this.setState({
            consecutiveClicks: 0,
        })
    }

    render() {
        return(
            <button
                className="btn"
                onClick={this.handleClick}
            >
                {this.displayContent}
            </button>
        )
    }

}

SortButton.propTypes = {
    label: PropTypes.string.isRequired,
    sortCallback: PropTypes.func.isRequired,
    reverseCallback: PropTypes.func.isRequired,
}