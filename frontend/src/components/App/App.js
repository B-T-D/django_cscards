import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode'; // TODO maybe you don't need to import it.

import { Nav } from '../Nav/Nav';
import { Manage } from '../Manage/Manage';
import { Review } from '../Review/Review';
import { Footer } from '../Footer/Footer';

import Container from 'react-bootstrap/Container';

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

// Sort Utility Functions

function compareFront(a, b) { // TODO messy quick placing, move this
    if (a.front.toLowerCase() < b.front.toLowerCase()) {
        return -1
    };
    return 1;
}

function compareId(a, b) {
    if (a.id < b.id) {
        return -1
    };
    return 1;
}

function compareDateAdded(a, b) {
    if (a["date_added"] < b["date_added"]) {
        return -1
    };
    return 1;
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: null,
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
        this.handleLogout = this.handleLogout.bind(this);

        this.reverseCards = this.reverseCards.bind(this);
        this.sortCardsFront = this.sortCardsFront.bind(this);
        this.sortCardsPk = this.sortCardsPk.bind(this);
        this.sortCardsDateAdded = this.sortCardsDateAdded.bind(this);
    }

    /* TODO create a standalone axios instance to DRY out the code. See
        https://hackernoon.com/110percent-complete-jwt-authentication-with-django-and-react-2020-iejq34ta
        The instance can handle constructing and otherwise dealing with the
        JWT headers. */


    componentDidMount() {
        this.getCards();
//        this.sortCards();
    }

    //// API Authentication Methods

    getJWToken(username, password) {
        /** Returns a Promise that resolves to true if credentials parameters
            successfuly obtained a token pair, else resolves to false. **/
        let outcome = axiosInstance.post(apiUrlGetJWToken, {
            "username": username,
            "password": password
        }).then(this.jwtSuccess)
        .catch(this.jwtFail);
        return outcome;
    }

    async jwtSuccess(response) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        const decodedAccessToken = jwt_decode(localStorage.getItem('access_token'));
        localStorage.setItem('user_id', decodedAccessToken.user_id); // The API will want it as a number (python int), jwtdecode returns a string
        localStorage.setItem('username', decodedAccessToken.username)
        this.setState({
            user: localStorage.getItem('username')
        })
        await this.getCards()
        return Promise.resolve(true);
    }

    jwtFail(error) {
        return Promise.reject(false);
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
            this.setState({
                cards: null,
            })
            return response;
        }
        catch(error) {
            console.log(error)
            console.log("caught error from App handleLogout()")
        }
    }

    //// API Content CRUD Methods

    getCards() {
        if (localStorage.getItem("access_token")) {
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

    createCard(newCard) { //TODO add access token to request header
        axiosInstance.post(
            apiUrlCreateCard,
            newCard
        );
    }

    async updateCard(card, pk) {
        const url = `${apiUrlStemEditCard}/${pk}/`;
        try {
            const response = await axiosInstance.put(url, card)
            console.log(response.data);
            return response;
        }
        catch(error) {
            console.log(`error in updateCard request: ${error}`);
        }

    }

    deleteCard(pk) { // TODO do through axiosInstance to use token
        alert("Frontend deletion temporarily disabled for security.")
        return
        const url = `${apiUrlStemDeleteCard}/${pk}/`;
        axios.delete(url
        ).then() /* Re-render after a card was deleted from the DB */
    }

    //// Card-Sort Methods

    reverseCards() {
        /** However cards are currently ordered, reverse them. */
        this.setState({
            cards: this.state.cards.reverse(),
        })
    }

    sortCardsFront() {
        this.setState({
            cards: this.state.cards.sort(compareFront)
        })
    }

    sortCardsPk() {
        this.setState({
            cards: this.state.cards.sort(compareId)
        })
    }

    sortCardsDateAdded() {
        this.setState({
            cards: this.state.cards.sort(compareDateAdded)
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

    // Main Content mode selector methods

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

    /* TODO redo and rationalize the gridding to use react-bootstrap addin all
        the way down the tree */

    render() {
        /* Not sufficient to have App be the whole-thing container-fluid,
            needs to be the next thing up in index.js or index.html, otherwise
            there's a gap in the DOM between where App ends and the bottom of
            the page */
        return (
            <Container fluid>
                <div id="row dev toolbar" className="row">
                    <button onClick={this.handleClickJwt}> Clear access token from localStorage </button>
                    <button onClick={this.handleClickJwtRefresh}> Clear refresh token from localStorage </button>
                    <button onClick={this.handleClickPrintAccessToken}> Print access token to console </button>
                    <button onClick={this.handleClickPrintRefreshToken}> Print refresh token to console </button>
                    <button onClick={this.handleClickJwtDecode}> Decode JWT and print to console </button>
                </div>

                <div id="row wrapper navbar">
                    <Nav
                        onSetManageMode={this.setManageMode}
                        onSetReviewMode={this.setReviewMode}
                        user={this.state.user}
                        onSubmitLogin={this.getJWToken}
                        onLogout={this.handleLogout}
                    />
                </div>

                <div id="row main content" className="row">
                    {this.state.cards ?
                        this.state.mode === 'manage' ?
                            <Manage
                                cards={this.state.cards}
                                types={this.state.categories}
                                onCreateCard={this.createCard}
                                onUpdateCard={this.updateCard}
                                onDeleteCard={this.deleteCard}
                                onSortFront={this.sortCardsFront}
                                onSortPk={this.sortCardsPk}
                                onSortDateAdded={this.sortCardsDateAdded}
                                onReverse={this.reverseCards}
                            />
                            :
                            <Review
                                cards={this.state.cards}
                                categories={this.state.categories}
                                onUpdateCard={this.updateCard}
                                onDeleteCard={this.deleteCard}
                             />
                        :
                        <p className="col">Log in to access cards database</p>
                    }

                </div>

                <div id="row footer" className="row">
                    <Footer
                        mode={this.state.mode}
                    />
                </div>
            </Container>
        )
    }
}

export default App;