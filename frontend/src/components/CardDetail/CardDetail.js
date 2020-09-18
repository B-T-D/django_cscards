/* Deleteable-- cut out of the hierarchy in favor of going straight to CardDetailForm */

import React from 'react';
import { CardDetailForm } from './CardDetailForm';

/* TODO rename to something like CardEditor. Intent is an umbrella card editor
    that handles inputs and sends back a newCard JSO for create and update alike */
export class CardDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newCard: {
                newCardType: null,
                newFront: '',
                newBack: ''
            },
        }

        // Method Binds
        this.onChangeFront = this.onChangeFront.bind(this);

    }

    onChangeFront(text) {
        this.setState(
            {newCard: {
                newFront: text
                }
            }
        );
    }

    render() {
        return (
            <div>
                <CardDetailForm
                    card={this.props.card}
                    onChangeFront={this.onChangeFront}
                />
            </div>
        );
    }
}

/*
CardDetail.propTypes = {
    card: React.PropTypes.object.isRequired
}
*/