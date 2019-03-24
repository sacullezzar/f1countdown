import React, { Component } from 'react'
import Timer from '../components/timer'
import RaceData from '../components/raceData'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'hello world',
            number: 1,
            raceData: null
        }

        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        fetch('https://ergast.com/api/f1/current.json')
            .then(response => response.json())
            .then(response => this.setState({ raceData: response }));
    }

    handleChange(event) {
        console.log(event.key)
        if (event.key === 'Enter') {
            this.setState({ number: event.target.value })
        }
    }

    render () {
        const { name, number, raceData } = this.state
        return (
            <div>
                <h1>{name}</h1>
                <input id='input' type="text" onKeyPress={this.handleChange}></input>
                <Timer time={number}/>
                <RaceData raceData={raceData}/>
            </div>
        )
    }
}

export default App