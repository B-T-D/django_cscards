import React from 'react';
import PropTypes from 'prop-types';

/* Wrapping the button in a separate <form/> element was most expedient
way to make React refresh the API data on button-click. A "submit" button
triggers page refresh automatically, that's what the "save" button in the
update does.*/

/* TODO you can use these SVGs with less html gore than this. See Bootstrap
    documentation. */

const DeleteSvgFill = () => {
    return ( // Bootstrap "trash fill"
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
        </svg>
    )
}

const onMouseOver = () => {
    console.log("const onMouseOver was called in DeleteButton.js");
}

export const DeleteButton = (props) => {
    return (
        <form>
            <button
                className={"btn btn-outline-dark"}
                onClick={props.onClick}
                onMouseOver={onMouseOver}
            >
                <DeleteSvgFill />
            </button>
        </form>
    )
}

DeleteButton.propTypes = {
    onClick: PropTypes.func.isRequired
}
