import React, { useState } from 'react';
import axios from 'axios';

class InputDemo extends React.Component {

    state = {
        input: ''
    };

    setInput = event => {
        this.setState({
            input: event.target.value
        });
    }

    addCard(newCard) {
        axios.post('http://127.0.0.1:8000/api/', {

                "type": 1,
                "front": newCard.front,
                "back": newCard.back,
                "known": false

        })
            .then(res => {

                console.log(res);
                console.log(res.data);
            })

    }

    handleSubmit = event => {
        event.preventDefault();

        const newCard = {
            type: 1,
            front: this.state.input,
            back: "test input",
        };

        console.log("test function call from handleSubmit. The inputted text was:")
        console.log(newCard)
        this.addCard(newCard)

    };

    render() {
        const {
            input
        } = this.state;
        return (
            <div>
                <p>input demo</p>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        value={input}
                        onChange={this.setInput}
                    />
                    <br />
                    <button type="submit">Post</button>
                </form>
            </div>
        )
    }
}


export default InputDemo;