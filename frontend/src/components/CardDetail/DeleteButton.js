import React from 'react';
import PropTypes from 'prop-types';

export const DeleteButton = (props) => {
    return (
        <button onClick={props.onClick}>
            Delete card
        </button>
    )
}
