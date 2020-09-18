import React from 'react';
import { EditButton } from './EditButton';
import { CardContent } from './CardContent';
import { CardDetailForm } from '../CardDetail/CardDetailForm'

export class CardRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        }

        // Method Binds
        this.toggleExpanded = this.toggleExpanded.bind(this);
    }

    toggleExpanded() {
        this.setState(
            {expanded: (!this.state.expanded)}
        );
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

        const Expanded = () => {return (
                <tr key={this.props.card.id}>
                    <EditButton
                        card={this.props.card}
                        expanded={this.state.expanded}
                        onClick={this.toggleExpanded}
                    />
                    <td>
                    <CardDetailForm
                        card={this.props.card}
                        onSubmit={this.props.onUpdateCard}
                        onDeleteCard={this.props.onDeleteCard}
                    />
                    </td>
                {"Placeholder for Expanded mode"}
                </tr>)
        }

        const CurrentViewMode = this.state.expanded ? Expanded : Collapsed;

        return (
            <CurrentViewMode card={this.props.card} />
        )

    }
}