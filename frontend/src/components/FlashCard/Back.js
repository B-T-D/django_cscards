import React from 'react';
import PropTypes from 'prop-types';

export class Back extends React.Component {

    render() {

        return (
            <div>
                <p>{this.props.card.back}</p>
            </div>
        );
    }
}