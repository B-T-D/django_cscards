import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export class DemoModal extends React.Component {

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
            <Button variant="primary" onClick={this.handleShow}>
                Launch static backdrop demo modal
            </Button>

            <Modal
                show={this.state.show}
                onHide={this.handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    I will not close if you click outside me. Don't even try to press escape key.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>
        </div>
        )
    }

}