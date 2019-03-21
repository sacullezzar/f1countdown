import React, { Component } from 'react'
import Timer from '../components/timer'

class App extends Component {
    constructor() {
        super()
        this.state = {
            name: 'hello world',
            number: 1
        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState({ number: this.state.number += 1 })
        return true
    }

    render () {
        return (
            <div>
                <h1>{this.state.name}</h1>
                <button onClick={this.handleClick}>{this.state.number}</button>
                <Timer time={5}/>
            </div>
        )
    }
}

export default App