import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode'; // TODO maybe you don't need to import it.

import { Nav } from '../Nav/Nav';
import { Manage } from '../Manage/Manage';
import { Review } from '../Review/Review';

import { apiUrlRoot, axiosInstance } from '../../util/axiosAPI';

import './App.css';

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
let accessToken = localStorage.getItem('access_token');
let refreshToken = null;

function compareFront(a, b) { // TODO messy quick placing, move this
    if (a.front.toLowerCase() < b.front.toLowerCase()) {
        return -1
    };
    return 1;
}

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
        this.handleClickJwtRefresh = this.handleClickJwtRefresh.bind(this); // TODO temp
        this.handleClickPrintAccessToken = this.handleClickPrintAccessToken.bind(this); // TODO temp
        this.handleClickPrintRefreshToken = this.handleClickPrintRefreshToken.bind(this); // TODO temp
        this.handleClickJwtDecode = this.handleClickJwtDecode.bind(this); // TODO temp
        this.handleForceGetCards = this.handleForceGetCards.bind(this); // TODO temp

        this.getJWToken = this.getJWToken.bind(this);
        this.jwtSuccess = this.jwtSuccess.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

        this.sortCardsFront = this.sortCardsFront.bind(this);
    }

    /* TODO create a standalone axios instance to DRY out the code. See
        https://hackernoon.com/110percent-complete-jwt-authentication-with-django-and-react-2020-iejq34ta
        The instance can handle constructing and otherwise dealing with the
        JWT headers. */


    componentDidMount() {
        this.getCards();
//        this.sortCards();
    }

    async getJWToken(username, password) { // Async here is just an easy way to make it return a promise
        await axiosInstance.post(apiUrlGetJWToken, {
            "username": username,
            "password": password
        }).then(this.jwtSuccess, this.jwtFail);
    }

    jwtSuccess(response) {
        accessToken = response.data.access;
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        const decodedAccessToken = jwt_decode(localStorage.getItem('access_token'));
        localStorage.setItem('user_id', decodedAccessToken.user_id); // The API will want it as a number (python int), jwtdecode returns a string
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

    async handleLogout() {
        try {
            const response = await axiosInstance.post("blacklist/", {
                refresh_token : localStorage.getItem("refresh_token")
            });
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("user_id");
            axiosInstance.defaults.headers["Authorization"] = null;
            console.log(response)
            return response;
        }
        catch(error) {
            console.log(error)
            console.log("caught error from App handleLogout()")
        }
    }


    getCards() {
        if (accessToken) {
            axiosInstance
            .get(apiUrlListCards)
            .then(response => {
                this.setState({ cards: response.data });
            })
            .catch(error => {
                console.log("caught an error");
                console.log(JSON.stringify(error));
            })
        } else {
            console.log('aborted getCards() for lack of access token');
        }

    }

    // TODO quick experiment

    sortCardsFront() {
        this.setState({
            cards: this.state.cards.sort(compareFront)
        })
    }

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
        const authHeader = {
            headers: {"Authorization": "Bearer " + localStorage.getItem('access_token')}
        }
        axios.post(apiUrlCreateCard, newCard, authHeader
        ).then(response => {
            console.log("Response from API POST attempt:");
            console.log(response);
            console.log(response.data);
        });
    }

    async updateCard(card, pk) { //TODO add token
        const url = `${apiUrlStemEditCard}/${pk}/`;
        try {
            const response = await axiosInstance.put(url, card)
            console.log(response.data);
            return response;
        }
        catch(error) {
            console.log(`error in updateCard request: ${error}`);
        }

//        axios.put(url, card
//        ).then(response => {
//            console.log("Response from API PUT request:");
//            console.log(response);
//            console.log(JSON.stringify(response.data));
//        })
    }

    deleteCard(pk) { // TODO add token
        const url = `${apiUrlStemDeleteCard}/${pk}/`;
        axios.delete(url
        ).then() /* Re-render after a card was deleted from the DB */
    }

    // TODO -- temp debug buttons

    handleClickJwt(event) {
        localStorage.setItem('access_token', "garbage");
    }

    handleClickJwtRefresh(event) {
        localStorage.setItem('refresh_token', "trash");
    }

    handleClickPrintAccessToken(e) {
        console.log(`access token: ${localStorage.getItem('access_token')}`);
    }

    handleClickPrintRefreshToken(e) {
        console.log(`refresh token: ${localStorage.getItem('refresh_token')}`);
    }

    handleClickJwtDecode(e) {
        let decoded = jwt_decode(localStorage.getItem('access_token'));
        console.log(`full decoded access token: ${JSON.stringify(decoded)}`);
        console.log(`user id for the token is ${decoded.user_id}`);
    }

    handleForceGetCards(e) {
        this.getCards();
    }

    render() {

        return (
            <div className="App">
                <button onClick={this.handleClickJwt}> Clear access token from localStorage </button>
                <button onClick={this.handleClickJwtRefresh}> Clear refresh token from localStorage </button>
                <button onClick={this.handleClickPrintAccessToken}> Print access token to console </button>
                <button onClick={this.handleClickPrintRefreshToken}> Print refresh token to console </button>
                <button onClick={this.handleClickJwtDecode}> Decode JWT and print to console </button>
                <br />
                <button onClick={this.handleForceGetCards}>Force getCards() </button>


                <Nav
                    onSetManageMode={this.setManageMode}
                    onSetReviewMode={this.setReviewMode}
                    user={this.state.user}
                    onSubmitLogin={this.submitLogin}
                    onLogout={this.handleLogout}
                />
                {this.state.mode === 'manage' ?
                    <Manage
                        cards={this.state.cards}
                        types={this.state.categories}
                        onCreateCard={this.createCard}
                        onUpdateCard={this.updateCard}
                        onDeleteCard={this.deleteCard}
                        onSortFront={this.sortCardsFront}
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