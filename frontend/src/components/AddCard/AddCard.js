import React, { useState } from 'react';
import axios from 'axios';

export class AddCard extends React.Component {

    render() {
        return (
            <div className="App-nav">
                <h1>Add a Card</h1>
                <AddTypeButtons
                    types={this.props.types}
                />
            </div>
        )
    }
}

class AddTypeButtons extends React.Component {

    /* TODO fold/unfold can prob be done with conditional render logic. Render
        folded; if x render unfolded; while not [refold-condition] unfolded remains
        true */

    state = {
        generalClicked: false,
        codeClicked: false
    }

    handleClick(type) { // TODO at some point this will also handle the fold-down
        this.toggleSelected(type);
    }

    toggleSelected(type) { //TODO wildly clunky code to implement "if one button is on the other should be off && if the one that's on is turned off they're both off"
        if (type==1) {
            console.log("toggling type 1 to selected")
            this.setState({
                generalClicked: !this.state.generalClicked

            })
            if (this.state.codeClicked) { // If the other one was on, turn it off.
                this.setState({
                    codeClicked: !this.state.codeClicked
                })
            }
        } else {
            this.setState({
                codeClicked: !this.state.codeClicked,
            })
            if (this.state.generalClicked) { // If the other one was on, turn it off.
                this.setState ({
                    generalClicked: !this.state.generalClicked
                })
            }
            console.log("toggling type 2 to selected")

        }

    }

    applyCSSSelected(value) {
        const text = value ? 'CardAdd-btn-selected' : 'CardAdd';
        return text;
    }

    render() {
        return(
            <div className="CardAdd">
                <ul>
                    <li className="CardAdd-item">
                        <button
                            className={this.applyCSSSelected(this.state.generalClicked)}
                            onClick={ () => this.handleClick(1)}
                        >
                            general
                        </button>
                    </li>
                    <li className="CardAdd-item">
                        <button
                            className={this.applyCSSSelected(this.state.codeClicked)}
                            onClick={ () => this.handleClick(2)}
                        >
                            code
                        </button>
                    </li>
                </ul>
            </div>
        )
    }
}

export class TempAddCardUnfolded extends React.Component {

    state = {
        inputCard: {
            inputCardType: null,
            inputFront: '',
            inputBack: ''
        },
        buttonClicks : {
            general: false,
            code: false,
        }

    }



    setInputCardType = event => {
        this.setState({
            inputCardType: event.target.value
        })
    }

    setInputFront = event => {
        this.setState({
            inputFront: event.target.value
        });
    }

    setInputBack = event => { // TODO collapse into a single function that sets either front or back based on arg
        this.setState({
            inputBack: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        const newCard = {
            type: this.state.inputCardType,
            front: this.state.inputFront,
            back: this.state.inputBack
        };

        this.addCard(newCard)
    }

    addCard(newCard) {
        axios.post(this.props.apiURLCreateCard, {

            "type": 1, // TODO connect to type set by buttons
            "front": newCard.front,
            "back": newCard.back,
            "known": false
        })
            .then(res => {
                console.log("res from api post attempt:")
                console.log(res)
                console.log(res.data)
            })
    }

    debugPrint = event => {
        console.log("printing from debug print test button:")
        console.log(this.state.inputFront)
    }

    render() {
        return (
            <div>Temp manual unfolded prototype
                <div className="App-nav">
                    <h1>Add a Card</h1>
                    <AddTypeButtons
                        types={this.props.types}
                    />
                    <form onSubmit={this.handleSubmit}>
                        <p>Front of Card</p>
                        <input
                            type="text"
                            value={this.state.inputFront}
                            onChange={this.setInputFront}
                        />
                        <p>Back of Card</p>
                        <input
                            type="text"
                            value={this.state.inputBack}
                            onChange={this.setInputBack}
                        />
                        <br />
                        <button type="submit">Save</button>
                        <button
                            onClick={ () => this.debugPrint()}
                        >
                            debug print inputFront
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}