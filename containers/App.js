import React, { Component } from 'react'
import Timer from '../components/timer'

class App extends Component {
    constructor() {
        super()
        this.state = {
            name: 'hello world',
            number: 1
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        if (event.key === 'Enter') {
            this.setState({ number: event.target.value })
        }
    }

    render () {
        return (
            <div>
                <h1>{this.state.name}</h1>
                <input type="text" onKeyPress={this.handleChange}></input>
                <Timer time={this.state.number}/>
            </div>
        )
    }
}

export default App