import React, { Component } from 'react';
import axios from 'axios';

import InputDemo from '../../InputDemo';
import { Nav } from '../Nav/Nav';
import { CardsList } from '../CardsList/CardsList';
import { AddCard, TempAddCardUnfolded } from '../AddCard/AddCard';

import './App.css';

var apiURL = 'http://127.0.0.1:8000/api/v1'

/* TODO something needs to tell it to re-fetch the cards set upon the render
    of some component. So that it doesn't require a page refresh to e.g. see
    a newly added card and see the total-cards counter increment. Would guess
    you do this by calling the api-fetcher function with the right lifecycle
    method. */


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

    /* TODO problem here isn't that it doesn't update, it's that an update
        doesn't cause another getCards() call. I think. Because DidMount only
        calls on the first time the component renders. Moving cards state
         down the components tree in any event. */

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
                <TempAddCardUnfolded
                    types={this.state.types}
                    apiURLCreateCard={apiURL}
                />
                <CardsList
                    cards={this.state.cards}
                    types={this.state.types}
                 />
            </div>
        );
    }
}

export default App;