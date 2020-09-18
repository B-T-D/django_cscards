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
        this.handleChangeFront = this.handleChangeFront.bind(this);
        this.handleChangeBack = this.handleChangeBack.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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