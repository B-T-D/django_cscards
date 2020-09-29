import React from 'react';
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
        this.expand = this.expand.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown)
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown)
    }

    handleKeyDown(e) {
        // e.preventDefault() not working to suppress Chrome ctrl-n for new window.

        if (e.ctrlKey && e.key === 'a') {
            e.preventDefault();
            this.expand();
        }
    }

    toggleExpanded() {
        this.setState(
            {expanded: (!this.state.expanded)}
        );
    }

    expand() {
        this.setState({
            expanded: true,
        })
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
                        onCloseForm={this.toggleExpanded}
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
                            onCtrlN={this.expand}
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