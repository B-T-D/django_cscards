import React, { Component } from 'react';
import axios from 'axios';

import InputDemo from './InputDemo';
import Nav from './Nav';
import CardsList from './CardsList';
import AddCard, { TempAddCardUnfolded } from './AddCard';

import './App.css';

var apiURL = 'http://127.0.0.1:8000/api/'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            types: ["general", "code"]
        };
    }

    componentDidMount() {
        this.getCards();
    }

    getCards() {
        axios
            .get(apiURL)
            .then(res => {
                this.setState({ cards: res.data });
            })
            .catch(err => {
                console.log(err);
                console.log("caught an error");
            })
    }

    render() {
        return (
            <div className="App">
                <Nav />
                <AddCard types={this.state.types} />
                <TempAddCardUnfolded types={this.state.types} />
                <CardsList
                    cards={this.state.cards}
                    types={this.state.types}
                 />
                <InputDemo />
            </div>
        );
    }
}

export default App;
