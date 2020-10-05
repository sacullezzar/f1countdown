import React from 'react'
import Results from './Results'

class RaceSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            selectedRace: null,
            raceResults: [{}]
        }
        this.selector = this.selector.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        let selectedRace = event.target.value
        
        this.props.seasonData.map(race => {
            if (race.round === selectedRace) {
                this.setState({
                    selectedRace: race
                }, () => this.fetchResults(this.state.selectedRace))
            }
        })
    }

    async fetchResults(race) {
        const results = await fetch(`https://ergast.com/api/f1/current/${race.round}/results.json`)
        const raceResults = await results.json()
        this.setState({ isLoading: false, raceResults: raceResults.MRData.RaceTable.Races })
    }

    selector() {
        return this.props.seasonData.map(race =>
            <option 
            key={race.round} 
            className="dropdown-item" 
            value={race.round}
            placeholder="Select Race">
            {race.raceName}
            </option>
        )      
    }
        
    render() {
        const { raceResults, isLoading, selectedRace } = this.state
        return(
            <>
            <div className="input-group w-50 m-auto">
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Races</label>
                </div>
                <select className="custom-select" onChange={this.handleChange}>
                <option value="">Select Race</option>{this.selector()}</select>
            </div>
            <div>
                <Results race={raceResults[0]} selectedRace={selectedRace}/>
            </div>
            </>
        )
    }
}

export default RaceSelect