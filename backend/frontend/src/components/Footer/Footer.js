import React from 'react';

import preval from 'preval.macro';

import './footer.css';
import DRFLogo from './drf_logo.png';
import ReactLogo from './react_logo.png';

const buildTimeStamp = preval`module.exports = new Date().toLocaleString();`

export class Footer extends React.Component {

    constructor(props) {
        super(props);
        this.parentFooterClassReview = "row fixed-bottom bg-dark";
        this.parentFooterClassManage = "row bg-dark";

    }

    /* Could not easily to get the footer to behave as desired using plain
        bootstrap and mild supplementary CSS. Desired is to stick to the bottom
        of the page regardless of where the content ends. Without fixed bottom
        it renders at the end of the content, rather than the end of the page
        which looks bad in review mode. Using fixed-bottom looked correct in review
        but then clutters up manage mode--there, want the footer to only show on
        scrolling all the way to the bottom. */

    render() {
        return(
            <footer class={this.props.mode === 'review' ? this.parentFooterClassReview : this.parentFooterClassManage}>
                <div className="col-12">
                    <div id="row logos" className="row justify-content-center">
                        <div id="col DRF logo" className="col-2 align-self-center">
                            <a href="https://www.django-rest-framework.org/">
                            <img src={DRFLogo} alt="Django REST Framework logo" className="bg-light" style={{"border-radius":"7.5%"}}/>
                            </a>
                        </div>
                        <div id="col React logo" className="col-2 align-self-center">
                            <a href="https://reactjs.org/">
                                <img src={ReactLogo} alt="ReactJS logo"/>
                            </a>
                        </div>
                    </div>

                    <div id="row build info" className="row text-light justify-content-center">
                        <p className="col-12 text-center">Site build: {buildTimeStamp}</p>
                    </div>
                </div>
            </footer>
        )
    }
}