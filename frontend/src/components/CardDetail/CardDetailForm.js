import React from 'react';

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
        alert(event.target.value);
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
        this.props.onSubmit(submitObject);
    }

    render() {
        return(
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
                    <input
                        type="text"
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
                <button type="submit">Save</button>

            </form>
        )
    }
}

/*
CardDetailForm.propTypes = {
    card: React.PropTypes.object.isRequired
};
*/