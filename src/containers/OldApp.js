import React, { Component, Fragment } from 'react'
import Timer from '../components/timer'
import RaceData from '../components/raceSelect'
import ResultsData from '../components/resultsData'
import '../css/App.css'
import 'babel-polyfill'


class OldApp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            counter: 0,
            raceData: null,
            raceId: 1,
            visible: false
        }
        this.fetchResults = this.fetchResults.bind(this)
        this.handleTimeChange = this.handleTimeChange.bind(this)
        this.showResults = this.showResults.bind(this)
    }

    componentDidMount() {
            this.fetchResults(this.state.raceId)
            this.fetchSeasonData()
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
        this.setState({ counter: date})
    }

    showResults() {
        let i
        this.state.visible ? i = 1 : i = 0
        i === 1 ? this.setState({ visible: false }) : this.setState({ visible: true })
    }

    

    render () {
        const { counter,
            raceData,
            resultsData,
            isLoading,
            visible } = this.state
        return (
            <Fragment>
            <div className="main">
                    <h1 className='title'>F1 Countdown</h1>
                    <div className="wrapper">
                        <Timer time={counter} />
                    {!isLoading && 
                    <Fragment>
                    <RaceData raceData={raceData} fetchResults={this.fetchResults} handleTimeChange = {this.handleTimeChange}/>
                    <button onClick={this.showResults}>Show Results</button>
                    </Fragment>}
                    {(visible && counter <= 0 && !isLoading) && 
                    <Fragment>
                        <h1 className='title' style={{textAlign: "center"}}>F1 Results</h1> 
                    <ResultsData results={resultsData} isLoading={isLoading}/>
                    </Fragment>}
                </div>
            </div>
                    </Fragment>
                )   
            
    }
}

export default OldApp