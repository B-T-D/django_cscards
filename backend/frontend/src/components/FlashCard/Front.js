import React from 'react';
import PropTypes from 'prop-types';

// TODO prob can be condensed to a functional component later

export class Front extends React.Component {

    render() {

        return (
            <h2>{this.props.content}</h2>
        );
    }
}

Front.propTypes = {
    content: PropTypes.string.isRequired,
}