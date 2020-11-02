import React from 'react';
import { EditButton } from '../ReusableButtons/EditButton';
import { CardContent } from './CardContent';
import { CardDetailFormModal } from '../CardDetail/CardDetailForm';

export class CardRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        }

        // Method Binds
        this.toggleExpanded = this.toggleExpanded.bind(this);
        this.collapse = this.collapse.bind(this);
    }

    toggleExpanded() {
        this.setState(
            {expanded: (!this.state.expanded)}
        );
    }

    collapse() {
        this.setState({
            expanded: false,
        })
    }

    render() {

        const Collapsed = () => {
            return (
            <tr key={this.props.card.id}>
                <EditButton
                    card={this.props.card}
                    expanded={this.state.expanded}
                    onClick={this.toggleExpanded}
                />
                <CardContent card={this.props.card} />
            </tr>
            );
        }

        const Expanded = () => {
            return (
                <tr
                    key={this.props.card.id}
                    className="row border"
                >
                    <td
                        className="col-1 align-self-center"
                    >
                        <div className="row justify-content-center">
                        <CardDetailFormModal
                            location="manage"
                            mode="update"
                            onSubmit={this.props.onUpdateCard}
                            onDeleteCard={this.props.onDeleteCard}
                            card={this.props.card}
                        />
                        </div>
                    </td>
                    <td
                        className="col border-left"
                    >
                        <h3 className="row">
                            {this.props.card.front}
                        </h3>
                        <p className="row">
                            {this.props.card.back}
                    </p>
                    </td>
                </tr>)
        }

        const CurrentViewMode = Expanded;

        return (
            <CurrentViewMode card={this.props.card} />
        )

    }
}