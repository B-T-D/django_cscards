import React from 'react';
import PropTypes from 'prop-types';

/* Wrapping the button in a separate <form/> element was most expedient
way to make React refresh the API data on button-click. A "submit" button
triggers page refresh automatically, that's what the "save" button in the
update does.*/

export const DeleteButton = (props) => {
    return (
        <form>
            <button type="submit" onClick={props.onClick}>
                Delete card
            </button>
        </form>
    )
}
