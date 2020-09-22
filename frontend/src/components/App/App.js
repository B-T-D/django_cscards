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

const apiUrlGetJWToken = apiUrlRoot + 'token/';
let accessToken = null;
let refreshToken = null;



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [{}],
            categories: ["general", "code"], // TODO rename to "categories" throughout. Some in <Manage/> were left as "types" for now.
            mode: 'manage',
            user: ''
        };

        // Method Binds:
        this.setManageMode = this.setManageMode.bind(this);
        this.setReviewMode = this.setReviewMode.bind(this);
        this.createCard = this.createCard.bind(this);
        this.updateCard = this.updateCard.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
        this.getCards = this.getCards.bind(this);

        this.handleClickJwt = this.handleClickJwt.bind(this); // TODO temp

        this.getJWToken = this.getJWToken.bind(this);
        this.jwtSuccess = this.jwtSuccess.bind(this);
        this.submitLogin = this.submitLogin.bind(this);

//        this.sortCards = this.sortCards.bind(this);
    }

    componentDidMount() {
        this.getCards();
//        this.sortCards();
    }

    async getJWToken(username, password) { // Async here is just an easy way to make it return a promise
        await axios.post(apiUrlGetJWToken, {
            "username": username,
            "password": password
        }).then(this.jwtSuccess, this.jwtFail);
    }

    jwtSuccess(response) {
        alert("jwtSuccess() called");
        accessToken = response.data.access;
        this.getCards();
    }

    jwtFail() {
        alert("jwtFail() called--bad login request");
    }

    async submitLogin(username, password) {
        /* Makes a POST request to the API's JWT endpoint with the provided
            credentials. */
        await this.getJWToken(username, password);
        if (accessToken) {
            this.setState({
                user: username
            })
        }
        // TODO set state.user to username iff and only iff a valid JWT came back.
    }

    handleClickJwt(event) {
        this.getJWToken(this.state.user, "testpass123")
        .then(this.getCards());
    }

    getCards() {
        if (accessToken) {
            axios
            .get(apiUrlListCards, {
                headers: {
                    "Authorization": "Bearer " + accessToken,
                }

            })
            .then(response => {
                this.setState({ cards: response.data });
            })
            .catch(err => {
                console.log(err);
                console.log("caught an error");
            })
        } else {
            console.log('aborted getCards() for lack of access token');
        }

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
    createCard(newCard) { //TODO add access token to request header
        axios.post(apiUrlCreateCard, newCard
        ).then(response => {
            console.log("Response from API POST attempt:");
            console.log(response);
            console.log(response.data);
        });
    }

    updateCard(card, pk) { //TODO add token
        const url = `${apiUrlStemEditCard}/${pk}/`;
        axios.put(url, card
        ).then(response => {
            console.log("Response from API PUT request:");
            console.log(response);
            console.log(JSON.stringify(response.data));
        })
    }

    deleteCard(pk) { // TODO add token
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
                    user={this.state.user}
                    onSubmitLogin={this.submitLogin}
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