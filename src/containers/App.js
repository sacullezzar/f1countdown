import React, { Component } from 'react'
import Timer from '../components/timer'
import RaceData from '../components/raceData'
import ResultsData from '../components/resultsData'
import 'babel-polyfill'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            number: 0,
            raceData: null,
            raceId: 1
        }

        this.fetchResults = this.fetchResults.bind(this)
        this.handleTimeChange = this.handleTimeChange.bind(this)
    }

    componentDidMount() {
        if (this.state.isLoading) {
            this.fetchSeasonData()
            this.fetchResults(1)
        }
    }

    async fetchSeasonData() {
        const season = await fetch('https://ergast.com/api/f1/current.json')
        const seasonJson = await season.json()
        this.setState({ isLoading: false, raceData: seasonJson.MRData.RaceTable.Races })
    }

    async fetchResults(roundNumber) {
        let results = await fetch(`https://ergast.com/api/f1/current/${roundNumber}/results.json`)
        let resultsJson = await results.json()
        this.setState({ resultsData: resultsJson.MRData.RaceTable.Races})
    }


    // time = race.date + 'T' + race.time
    handleTimeChange(time) {
        const t1 = new Date
        const t2 = new Date(time)
        const date = Math.round((t2 - t1)/1000)
        this.setState({ number: date})
    }

    

    render () {
        const { number, raceData, resultsData, isLoading } = this.state
        return (
                <React.Fragment>
                    <h1 style={{textAlign: "center"}}>F1 Countdown</h1>
                        <Timer time={number} />
                    {!isLoading && <RaceData raceData={raceData} fetchResults={this.fetchResults} handleTimeChange = {this.handleTimeChange}/>}
                    {number < 0 && 
                    <React.Fragment>
                        <h1 style={{textAlign: "center"}}>F1 Results</h1> 
                        <ResultsData results={resultsData} isLoading={isLoading}/>
                        </React.Fragment>}
                    </React.Fragment>
                )   
            
    }
}

export default App