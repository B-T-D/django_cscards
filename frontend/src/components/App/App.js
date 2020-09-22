import React, { Component } from 'react';
import axios from 'axios';

import { Nav } from '../Nav/Nav';
import { Manage } from '../Manage/Manage';
import { Review } from '../Review/Review';

import './App.css';

const apiUrlRoot = 'http://127.0.0.1:8000/api/v1/';
const apiUrlCreateCard = apiUrlRoot + 'create/';
const apiUrlListCards = apiUrlRoot + 'list/';
const apiUrlStemEditCard = apiUrlRoot + 'edit'; /* Last part of url is integer representing the card's pk. */
const apiUrlStemDeleteCard = apiUrlRoot + 'delete'; /* Final characters are integer pk + '/' */

/* TODO add a settings model on the backend. Can store e.g. whether app starts as
    manage or review. Careful though about muddling in view logic with database logic.
    Should prob tie it to the "user".
    */



/* TODO refactor the JWT handling stuff into a separate utility file to keep this one clean and readable,
    and to keep the auth handling as modular and maintainable as possible. */

const apiUrlGetJwtToken = apiUrlRoot + 'token/';
let accessToken = '';
let refreshToken = '';

const tempHardCodedCreds = {
    username: "testuser",
    password: "testpass123",
}
function getJwtToken() {
        axios.post(
            apiUrlGetJwtToken, {
                username: tempHardCodedCreds.username,
                password: tempHardCodedCreds.password
                }
        )
        .then(response => {
            alert(`response was ${JSON.stringify(response)}`);
            accessToken = response.data.access;
        })
        .then(alert(`accessToken is now ${accessToken}, with type ${typeof accessToken}`));
    }




class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [{}],
            categories: ["general", "code"], // TODO rename to "categories" throughout. Some in <Manage/> were left as "types" for now.
            mode: 'manage'
        };

        // Method Binds:
        this.setManageMode = this.setManageMode.bind(this);
        this.setReviewMode = this.setReviewMode.bind(this);
        this.createCard = this.createCard.bind(this);
        this.updateCard = this.updateCard.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
        this.getCards = this.getCards.bind(this);

        this.handleClickJwt = this.handleClickJwt.bind(this); // TODO temp

//        this.sortCards = this.sortCards.bind(this);
    }

    componentDidMount() {
        this.getCards();
//        this.sortCards();
    }

    handleClickJwt(event) {
        getJwtToken();
        this.getCards();
    }

    getCards() {
        axios
            .get(apiUrlListCards, {
                headers: {
                    "Authorization": "Bearer " + accessToken,
                }

            })
            .then(response => {
                alert(`response to GET card was ${JSON.stringify(response)}`);
                this.setState({ cards: response.data });
            })
            .catch(err => {
                console.log(err);
                console.log("caught an error");
            })
    }

    // TODO quick experiment

//    sortCards() {
//        alert("sortCards was called");
//        this.state.cards.sort();
        /*
        this.setState( // TODO if this works it'll still be calling render redundantly maybe
            {cards: this.state.cards.sort((a, b) => (a.front > b.front) ? 1 : -1)}
        );
        */
//    }


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

        return (
            <div className="App">
                <button onClick={this.handleClickJwt}> JWT token test </button>

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