import React from 'react';
import PropTypes from 'prop-types';
import { DeleteButton } from './DeleteButton';

export class CardDetailForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cardType: 1,
            cardFront: '',
            cardBack: '',
            cardKnown: false
        }

        // Method Binds
        this.handleCardTypeChange = this.handleCardTypeChange.bind(this);
        this.handleChangeFront = this.handleChangeFront.bind(this);
        this.handleChangeBack = this.handleChangeBack.bind(this);
        this.handleChangeKnown = this.handleChangeKnown.bind(this);
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
        let submitObject = {
            type: this.state.cardType,
            front: this.state.cardFront,
            back: this.state.cardBack,
            known: this.state.cardKnown
        }
        if (this.props.card) {
            this.props.onSubmit(submitObject, this.props.card.id) // The update API caller method takes the pk as a second arg
        } else {
            this.props.onSubmit(submitObject); // The create API-caller only takes one arg, the contents. Backend will assign a pk.
        }

    }

    handleDelete(e) {
        this.props.onDeleteCard(this.props.card.id);
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
                    <input
                        type="text"
                        value={this.state.cardFront}
                        onChange={this.handleChangeFront}
                    />
                <h4>Back of card</h4>
                    <textarea
                        value={this.state.cardBack}
                        onChange={this.handleChangeBack}
                    />
                <h4>Known</h4>
                    <input
                        type="checkbox"
                        name="known (name attribute)"
                        checked={this.state.cardKnown}
                        onChange={this.handleChangeKnown}
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

};
