import React, { Component } from 'react';
import Popup from './Popup.js'

class RecHeader extends Component {
    constructor() {
        super();

        this.state = {
            text: '',
            name: '',
            clicked: false
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            clicked: (!this.state.clicked ? true : false)
        })
        console.log(this.state.clicked);
    }


    render() {
        const popup = <Popup />
        return (
            <div>
                <h2>Add Recommendation</h2>
                <button onClick={this.handleClick}>Click to Add</button>
                {
                this.state.clicked
                ?
                popup
                :
                null
                }
            </div>

        )
    }
}

export default RecHeader;