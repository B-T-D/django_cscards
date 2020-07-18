import React, { Component } from 'react';
import axios from 'axios';
//import logo from './logo.svg';
import './App.css';
import InputDemo from './InputDemo';

var apiURL = 'http://127.0.0.1:8000/api/'

class CardsList extends React.Component {

    render() {
        return (
            <table className="cards-list">
                {this.props.cards.map(item => (
                    <tr key={item.id}>
                        <td>Edit button</td>
                        <td>
                            <h1>{item.front}</h1>
                            <p>{item.back}</p>
                        </td>
                    </tr>
                ))}

            </table>
        )
    }

}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: []
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
            <div>
                <CardsList cards ={this.state.cards}/>
                <InputDemo />
            </div>
        );
    }
}

export default App;
