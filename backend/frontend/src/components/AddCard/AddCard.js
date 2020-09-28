import React, { useState } from 'react';
import { CardDetailForm } from '../CardDetail/CardDetailForm';
import { AddToggleButton } from './AddButton';

export class AddCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
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
        const Expanded = () => {
        return (
                <div>
                    <AddToggleButton
                        expanded={this.state.expanded}
                        onClick={this.toggleExpanded}
                    />
                    <CardDetailForm
                        onSubmit={this.props.onCreateCard}
                    />
                </div>
            )
        }

        const Collapsed = () => {
            return (
                <AddToggleButton
                    expanded={this.state.expanded}
                    onClick={this.toggleExpanded}
                />
            )
        }

        const CurrentViewMode = this.state.expanded ? Expanded: Collapsed;

        return (
            <div className="col-11">
                <CurrentViewMode />
            </div>
        )
    }
}