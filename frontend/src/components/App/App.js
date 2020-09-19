import React, { Component } from 'react';
import axios from 'axios';

import InputDemo from '../../InputDemo';
import { Nav } from '../Nav/Nav';
import { CardsList } from '../CardsList/CardsList';
import { AddCard, TempAddCardUnfolded } from '../AddCard/AddCard';
import { Manage } from '../Manage/Manage';
import { Review } from '../Review/Review';

import './App.css';

const apiUrlRoot = 'http://127.0.0.1:8000/api/v1/';
const apiUrlCreateCard = apiUrlRoot + 'create/';
const apiUrlListCards = apiUrlRoot + 'list/';
const apiUrlStemEditCard = apiUrlRoot + 'edit'; /* Last part of url is integer representing the card's pk. */
const apiUrlStemDeleteCard = apiUrlRoot + 'delete'; /* Final characters are integer pk + '/' */

/* TODO something needs to tell it to re-fetch the cards set upon the render
    of some component. So that it doesn't require a page refresh to e.g. see
    a newly added card and see the total-cards counter increment. Would guess
    you do this by calling the api-fetcher function with the right lifecycle
    method. */

/* TODO add a settings model on the backend. Can store e.g. whether app starts as
    manage or review. Careful though about muddling in view logic with database logic. */


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [{}],
            categories: ["general", "code"], // TODO rename to "categories" throughout. Some in <Manage/> were left as "types" for now.
            mode: 'review'
        };

        // Method Binds:
        this.setManageMode = this.setManageMode.bind(this);
        this.setReviewMode = this.setReviewMode.bind(this);
        this.createCard = this.createCard.bind(this);
        this.updateCard = this.updateCard.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
        this.getCards = this.getCards.bind(this);
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
            .get(apiUrlListCards)
            .then(res => {
                this.setState({ cards: res.data });
            })
            .catch(err => {
                console.log(err);
                console.log("caught an error");
            })
    }

    setManageMode() {
        this.setState(
            {mode: 'manage'}
        );
    }

    setReviewMode() {
        this.setState(
            {mode: 'review'}
        );
    }

    /**postCard(): Makes HTTP POST request to the backend API to add a new
        card to the database.

        Args:
            newCard (object): A JS object with all fields expected by the API
                (i.e. type, front, back, and known--backend assigns the pk).
        Returns:
            None
    */
    createCard(newCard) {
        axios.post(apiUrlCreateCard, newCard
        ).then(response => {
            console.log("Response from API POST attempt:");
            console.log(response);
            console.log(response.data);
        });
    }

    updateCard(card, pk) {
        const url = `${apiUrlStemEditCard}/${pk}/`;
        axios.put(url, card
        ).then(response => {
            console.log("Response from API PUT request:");
            console.log(response);
            console.log(JSON.stringify(response.data));
        })
    }

    deleteCard(pk) {
        const url = `${apiUrlStemDeleteCard}/${pk}/`;
        axios.delete(url
        ).then() /* Re-render after a card was deleted from the DB */
    }

    render() {
        const CurrentMode = (this.state.mode === 'manage') ? Manage : Review;

        return (
            <div className="App">
                <Nav
                    onSetManageMode={this.setManageMode}
                    onSetReviewMode={this.setReviewMode}
                />
                {this.state.mode === 'manage' ?
                    <Manage
                        cards={this.state.cards}
                        types={this.state.categories}
                        onCreateCard={this.createCard}
                        onUpdateCard={this.updateCard}
                        onDeleteCard={this.deleteCard}
                    />
                        :
                    <Review
                        cards={this.state.cards}
                        categories={this.state.categories}
                        onUpdateCard={this.updateCard}
                        onDeleteCard={this.deleteCard}
                     />
                }
            </div>
        )
    }
}

export default App;