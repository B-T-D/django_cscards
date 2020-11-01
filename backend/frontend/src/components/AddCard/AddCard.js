import React from 'react';
import { CardDetailForm } from '../CardDetail/CardDetailForm';
import { AddToggleButton } from './AddButton';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { DynamicLabelButton } from '../ReusableButtons/DynamicLabelButton';


/* TODO implement the keyboard shortcuts from old addcard, they should be
        available whenever/wherever the add card button is rendered */
export class AddCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false
        }

        // Method binds
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)

    }

    handleShow() {
        this.setState(
            {show: true}
        )
    }

    handleClose() {
        this.setState(
            {show: false}
        )
    }

   render() {
    return(
        <div>
            <DynamicLabelButton
                className={"btn btn-outline-dark"}
                mainText={"+"}
                hoverText={"Add new card"}
                onClick={this.handleShow}
                lagLeave={0}
            />
            <Modal
                show={this.state.show}
                onHide={this.handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>New card</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CardDetailForm
                        onSubmit={this.props.onCreateCard}
                        onCloseForm={() => {console.log("from the arrow func")}}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close DOESNT INTERACT WITH FORM rn
                    </Button>
                    <Button variant="primary">
                        One of these should be save, other should be cancel
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
   }

}

export class oldAddCard extends React.Component {

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