import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'
import Countdown from '../containers/Countdown'
import RaceSelect from '../components/raceSelect'
import DriversChamp from './DriversChamp'
import TeamChamp from './TeamChamp'
import '../css/App.css'

class App extends Component {
    constructor() {
        super()
        this.state = {
            isLoading: true,
            seasonData: null
        }
        this.fetchData = this.fetchData.bind(this)
    }

    componentDidMount() {
        this.fetchData()
    }

    async fetchData() {
        await this.fetchSeason()
        await this.fetchDriChamp()
        await this.fetchConChamp()
        await this.fetchResults()
    }

    async fetchSeason() {
        const season = await fetch('https://ergast.com/api/f1/current.json')
        const seasonJson = await season.json()
        this.setState({ seasonData: seasonJson.MRData.RaceTable.Races })
    }

    async fetchDriChamp() {
        const standings = await fetch('https://ergast.com/api/f1/current/driverStandings.json')
        const standingsJson = await standings.json()
        this.setState({ standingsData: standingsJson.MRData.StandingsTable.StandingsLists })
    }

    async fetchConChamp() {
        const teamStandings = await fetch('https://ergast.com/api/f1/current/constructorStandings.json')
        const teamStandingsJson = await teamStandings.json()
        this.setState({ teamData: teamStandingsJson.MRData.StandingsTable.StandingsLists})
    }

    async fetchResults() {
        const raceResults = await fetch('https://ergast.com/api/f1/current/results.json?limit=460')
        const raceResultsJson = await raceResults.json()
        this.setState({ isLoading: false, raceResults:raceResultsJson.MRData.RaceTable })
    }


    render() {
        const { seasonData, standingsData, teamData, isLoading, raceResults } = this.state
        return (
            <Router>
            <div>
            <nav className="piano">
                <ul>
                <li>
                    <Link to="/">Countdown</Link>
                </li>
                <li>
                    <Link to="/races">Previous Races</Link>
                </li>
                <li>
                    <Link to="/driversStandings">Driver's Championship Standings</Link>
                </li>
                <li>
                    <Link to="/constructorsStandings">Constructor's Championship Standings</Link>
                </li>
                </ul>
            </nav>
    
            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
                <Route path="/races">
                    {seasonData && seasonData.length ? <RaceSelect  seasonData={seasonData}/> : <h2>Loading...</h2>}
                </Route>
                <Route path="/driversStandings">
                    {standingsData && standingsData.length ? <DriversChamp  standingsData={standingsData} raceResults={raceResults}/> : <h2>Loading...</h2>}
                </Route>
                <Route path="/constructorsStandings">
                    {teamData && teamData.length ? <TeamChamp teamData={teamData}/> : <h2>Loading...</h2>}
                </Route>
                <Route path="/">
                    {seasonData && seasonData.length ? <Countdown seasonData={seasonData} isLoading={isLoading}/> : <h2>Loading...</h2>}
                </Route>
            </Switch>
            </div>
        </Router>
        )
    }
}

export default App