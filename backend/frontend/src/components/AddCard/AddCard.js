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
                <div className="row justify-content-center border">
                    <div className="col-11">
                    <AddToggleButton
                        expanded={this.state.expanded}
                        onClick={this.toggleExpanded}
                    />
                    <CardDetailForm
                        onSubmit={this.props.onCreateCard}
                    />
                    </div>
                </div>
            )
        }

        const Collapsed = () => {
            return (
                <div className="row justify-content-center">
                    <div className="col-11">
                        <AddToggleButton
                            expanded={this.state.expanded}
                            onClick={this.toggleExpanded}
                        />
                    </div>
                </div>
            )
        }

        const CurrentViewMode = this.state.expanded ? Expanded: Collapsed;

        return (
            <div id="wrapper col viewmode border border-primary" className="co1-12">
                <CurrentViewMode />
            </div>
        )
    }
}