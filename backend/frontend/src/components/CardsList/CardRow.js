import React from 'react';
import { EditButton } from '../EditButton/EditButton';
import { CardContent } from './CardContent';
import { CardDetailForm } from '../CardDetail/CardDetailForm';

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
                        onCloseForm={this.collapse}
                    />
                    </td>
                </tr>)
        }

        const CurrentViewMode = this.state.expanded ? Expanded : Collapsed;

        return (
            <CurrentViewMode card={this.props.card} />
        )

    }
}