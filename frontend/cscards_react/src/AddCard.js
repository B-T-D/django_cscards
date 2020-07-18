import React, { useState } from 'react';
import axios from 'axios';

class AddCard extends React.Component {

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

function AddTypeButtons({ types }) {
    return (
        <div className="CardAdd">
            <ul>
                {types.map(item => (
                    <li className="CardAdd-item">
                        <button>{item}</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

class TempAddCardUnfolded extends React.Component {

    state = {
        type: null,
        inputFront: '',
        inputBack: ''
    }

    setInputFront = event => {
        this.setState({
            inputFront: event.target.value
        });
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

export default AddCard;
export { TempAddCardUnfolded };
