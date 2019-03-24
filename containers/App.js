import React, { Component } from 'react'
import Timer from '../components/timer'
import RaceData from '../components/raceData'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            name: 'hello world',
            number: 0,
            raceData: null
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleTimeChange = this.handleTimeChange.bind(this)
    }

    componentDidMount() {
        fetch('https://ergast.com/api/f1/current.json')
            .then(response => response.json())
            .then(response => this.setState({ isLoaded: true, raceData: response }));
    }

    handleTimeChange(time) {
        const t1 = new Date
        const t2 = new Date(time)
        const date = Math.round((t2 - t1)/1000)
        this.setState({ number: date})
    }

    handleChange(event) {
        if (event.key === 'Enter') {
            this.setState({ number: event.target.value })
        }
    }

    render () {
        const { name, number, raceData } = this.state
        if(!this.state.isLoaded) {
            return  (
            <div>Loading...</div>
            )
        } else {
            return (
                <div>
                    <h1>{name}</h1>
                    <input id='input' type="text" onKeyPress={this.handleChange}></input>
                    <Timer time={number}/>
                    <RaceData raceData={raceData} handleTimeChange={this.handleTimeChange}/>
                </div>
            )
        }
    }
}

export default App