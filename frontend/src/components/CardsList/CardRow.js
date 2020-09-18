import React from 'react';
import { EditButton } from './EditButton';
import { CardContent } from './CardContent';

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
                <EditButton card={this.props.card} />
                <CardContent card={this.props.card} />
            </tr>
            );
        }

        const Expanded = () => {return (
                <tr>{"Placeholder for Expanded mode"}</tr>)
        }

        const CurrentViewMode = this.state.expanded ? Expanded : Collapsed;

        return (
            <tr key={this.props.card.id}>
                <EditButton card={this.props.card} />
                <CardContent card={this.props.card}/>
            </tr>
        )

    }
}