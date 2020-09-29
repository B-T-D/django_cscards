import React from 'react';
import PropTypes from 'prop-types';

import { RightWrongButtons } from './RightWrongButtons';
import { EditButton } from '../EditButton/EditButton';
import { CardDetailForm } from '../CardDetail/CardDetailForm';

// TODO need to use context / effect, the prop drilling is getting tedious e.g. with passing the same props to CardDetailForm

export class Back extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
        }

        // Method Binds
        this.toggleEditMode = this.toggleEditMode.bind(this);
    }

    toggleEditMode() {
        this.setState({
            editMode: !this.state.editMode
        })
    }


    render() {

        if (this.state.editMode) {
            return(
                <CardDetailForm
                    card={this.props.card}
                    onSubmit={this.props.onUpdateCard}
                    onDeleteCard={this.props.onDeleteCard}
                />
            )
        }

        return (
            <div className="container-fluid">
                <EditButton
                    onClick={this.toggleEditMode}
                />
                <div className="row">
                    <p className="col-12">{this.props.card.back}</p>
                </div>
                <RightWrongButtons
                    onIncrementRight={this.props.onIncrementRight}
                    onIncrementWrong={this.props.onIncrementWrong}
                />
            </div>
        );
    }
}

Back.propTypes = {
    card: PropTypes.exact({
        id: PropTypes.number,
        type: PropTypes.number,
        front: PropTypes.string,
        back: PropTypes.string,
        known: PropTypes.bool,
        controlErroneousProperty: PropTypes.bool
    }).isRequired,
    onIncrementRight: PropTypes.func.isRequired,
    onIncrementWrong: PropTypes.func.isRequired,
    onUpdateCard: PropTypes.func.isRequired,
    onDeleteCard: PropTypes.func.isRequired,
}