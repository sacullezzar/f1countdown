import React, { Component } from 'react'
import Timer from '../components/timer'
import RaceData from '../components/raceData'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            number: 0,
            raceData: null
        }

        this.handleTimeChange = this.handleTimeChange.bind(this)
    }

    componentDidMount() {
        fetch('https://ergast.com/api/f1/current.json')
            .then(response => response.json())
            .then(response => this.setState({ isLoading: false, raceData: response }))
            .catch(() => {
                console.error(error)
            })
    }

    handleTimeChange(time) {
        const t1 = new Date
        const t2 = new Date(time)
        const date = Math.round((t2 - t1)/1000)
        this.setState({ number: date})
    }

    render () {
        const { number, raceData } = this.state
        const spinnerStyle = {
            position: 'fixed',
            left: '50%',
            top: '50%'
        }
        return (
            <React.Fragment>
                <h1 style={{textAlign: "center"}}>F1 Countdown</h1>
                <Timer time={number}/>
                {!this.state.isLoading && <RaceData raceData={raceData} handleTimeChange={this.handleTimeChange}/>}
            </React.Fragment>
        )
    }
}

export default App