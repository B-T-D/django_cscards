import React from 'react';
import PropTypes from 'prop-types';
import { DeleteButton } from './DeleteButton';
import { EditButton } from '../ReusableButtons/EditButton';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export class CardDetailFormModal extends React.Component {

    constructor(props) {
        super(props);
        this.location = this.props.location; /* Intent = the modal needs an open-me button regardless of where it's being rendered (manage, review, edit, create, etc). */
            /* TODO this ^ is an expedient thing to allow the modal to be implemented ASAP, probably a cleaner and more Reactful way */
        this.mode = this.props.mode; // Flag for whether we're creating new card or editing an existing
            /* Didn't put it in state 11/1/20 on rationale that it's never going
                to change within an instance of this component. Any time the
                form is used, it's an "add" or an "edit" for the whole time. */

        this.state = {
            show: false,
            cardType: 1,
            cardFront: '',
            cardBack: '',
            cardKnown: false,
        }

        // Method binds
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCardTypeChange = this.handleCardTypeChange.bind(this);
        this.handleChangeFront = this.handleChangeFront.bind(this);
        this.handleChangeBack = this.handleChangeBack.bind(this);
        this.handleChangeKnown = this.handleChangeKnown.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        if (this.props.card) {
            this.setState({
                cardType: this.props.card.type,
                cardFront: this.props.card.front,
                cardBack: this.props.card.back,
                cardKnown: this.props.card.known
            })
        }

    }


    // Modal methods

    handleShow() {
        this.setState(
            {show: true}
        )
        document.addEventListener("keydown", this.handleKeyDown)
    }

    handleClose() {
        this.setState(
            {show: false}
        )
        document.removeEventListener("keydown", this.handleKeyDown)
    }

    // Form methods

    handleCardTypeChange(e) {
        this.setState({
            cardType: e.target.value
        });
    }

    handleChangeFront(e) {
        this.setState({
            cardFront: e.target.value
        });
    }

    handleChangeBack(e) {
        this.setState({
            cardBack: e.target.value
        })
    }

    handleChangeKnown(event) {
        this.setState({
            cardKnown: event.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        let submitObject = {
            type: this.state.cardType,
            front: this.state.cardFront,
            back: this.state.cardBack,
            known: this.state.cardKnown,
            user: localStorage.getItem("user_id")
            /* TODO when updating a card, this changes its user field to the user who
                updated it. Wouldn't work if there ever actually was more than
                one user and cards were shared between users. */
        }
        alert(`submit object is ${JSON.stringify(submitObject)}`);
        if (this.props.card) {
            this.props.onSubmit(submitObject, this.props.card.id) // The update API caller method takes the pk as a second arg
        } else {
            this.props.onSubmit(submitObject); // The create API-caller only takes one arg, the contents. Backend will assign a pk.
        }
        this.handleClose(); // Close the modal last thing.
    }

    handleDelete(e) {
        this.props.onDeleteCard(this.props.card.id);
    }

    // Keyboard shortcuts methods

    handleKeyDown(e) {
    //alert(`${e.key} key was pressed`);

    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        //alert('save');
        this.handleSubmit(e);
    }

    //this.isShortcut(e.key);
    this.setState({
        prevPrevKey: this.state.prevKey,
        prevKey: e.key,
        })

    }

    render() {

        const OpenerButton = () => {
            if (this.mode === 'create') {
                return(
                    <button
                        className={"btn btn-outline-dark"}
                        onClick={this.handleShow}
                    >
                        +
                    </button>
                )
            } else if (this.mode === 'update') {
                return(
                    <EditButton
                        onClick={this.handleShow}
                    />
                )

            }
        }
        return(
            <div>
                <OpenerButton />
                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}
                >


                    <form onSubmit={this.handleSubmit}>

                        <Modal.Header closeButton>
                            TODO, new or edit depending on context of the form instance
                        </Modal.Header>
                        <Modal.Body>
                            <label>
                                Category
                                <select value={this.state.cardType} onChange={this.handleCardTypeChange}>
                                    <option value={1}>General</option>
                                    <option value={2}>Code</option>
                                </select>
                            </label>
                            <h4>Front of card</h4>
                                <textarea
                                    className="form-control"
                                    value={this.state.cardFront}
                                    onChange={this.handleChangeFront}
                                />
                            <h4>Back of card</h4>
                                <textarea
                                    className="form-control"
                                    value={this.state.cardBack}
                                    onChange={this.handleChangeBack}
                                />
                            <br />
                        </Modal.Body>

                        <Modal.Footer>
                            <button
                                type="submit"
                                onClick={this.handleSubmit}
                            >
                                Save, modal version
                            </button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>
        )
    }

}






export class CardDetailForm extends React.Component {

    constructor(props) {
        super(props);
        this.keybindings = {
            'thing that t key does': ['t'],
            'thing that tfu does': ['t', 'f', 'u'],
        }
        this.state = {
            cardType: 1,
            cardFront: '',
            cardBack: '',
            cardKnown: false,
            prevKey: null,
            prevPrevKey: null,
        }

        // Method Binds
        this.handleCardTypeChange = this.handleCardTypeChange.bind(this);
        this.handleChangeFront = this.handleChangeFront.bind(this);
        this.handleChangeBack = this.handleChangeBack.bind(this);
        this.handleChangeKnown = this.handleChangeKnown.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidMount() {
        if (this.props.card) {
            this.setState({
                cardType: this.props.card.type,
                cardFront: this.props.card.front,
                cardBack: this.props.card.back,
                cardKnown: this.props.card.known
            })
        }
        document.addEventListener("keydown", this.handleKeyDown)
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown)
    }

    handleCardTypeChange(e) {
        this.setState({
            cardType: e.target.value
        });
    }

    handleChangeFront(e) {
        this.setState({
            cardFront: e.target.value
        });
    }

    handleChangeBack(e) {
        this.setState({
            cardBack: e.target.value
        })
    }

    handleChangeKnown(event) {
        this.setState({
            cardKnown: event.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        let submitObject = {
            type: this.state.cardType,
            front: this.state.cardFront,
            back: this.state.cardBack,
            known: this.state.cardKnown,
            user: localStorage.getItem("user_id")
            /* TODO when updating a card, this changes its user field to the user who
                updated it. Wouldn't work if there ever actually was more than
                one user and cards were shared between users. */
        }
        if (this.props.card) {
            this.props.onSubmit(submitObject, this.props.card.id) // The update API caller method takes the pk as a second arg
        } else {
            this.props.onSubmit(submitObject); // The create API-caller only takes one arg, the contents. Backend will assign a pk.
        }
        this.props.onCloseForm();

    }

    handleDelete(e) {
        this.props.onDeleteCard(this.props.card.id);
    }

    /* TODO use event.preventDefault or avoid the <form> element entirely, to
        stop "submit" from refreshing the entire page. Need finer control than
        that to have smooth-acting app. E.g. need it not to refresh and go to
        the Review view out of the the manage view--there's no obvious way to
        avoid that happening (when the initial on-first-mount view is Review)
        so long as using the default <form /> --> "submit" behavior. */

    /* TODO save button: use bootstrap "Server" SVG (database symbol thing). */

    handleKeyDown(e) {
        //alert(`${e.key} key was pressed`);

        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            //alert('save');
            this.handleSubmit(e);
        }

        //this.isShortcut(e.key);
        this.setState({
            prevPrevKey: this.state.prevKey,
            prevKey: e.key,
            })

    }

    render() {
        return(
            <div>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Category
                    <select value={this.state.cardType} onChange={this.handleCardTypeChange}>
                        <option value={1}>General</option>
                        <option value={2}>Code</option>
                    </select>
                </label>
                <h4>Front of card</h4>
                    <textarea
                        className="form-control"
                        value={this.state.cardFront}
                        onChange={this.handleChangeFront}
                    />
                <h4>Back of card</h4>
                    <textarea
                        className="form-control"
                        value={this.state.cardBack}
                        onChange={this.handleChangeBack}
                    />
                <br />
                <button type="submit">
                    Save
                </button>
            </form>
            {this.props.card ?
                    <DeleteButton
                        onClick={this.handleDelete}
                    />
                    :
                    null

                }
            </div>
        )
    }
}

CardDetailForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onDeleteCard: PropTypes.func.isRequired,
    onCloseForm: PropTypes.func.isRequired,

};
