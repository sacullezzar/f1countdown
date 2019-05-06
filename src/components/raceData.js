import React from 'react'

class RaceData extends React.Component {
    constructor(props) {
        super(props)
        this.selector = this.selector.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        let selectedRace = event.target.value
        this.props.fetchResults(selectedRace)
        
        this.props.raceData.map(race => {
            if (race.round === selectedRace) {
                this.props.handleTimeChange(race.date + 'T' + race.time)
            }
        })
    }

    selector() {
        return this.props.raceData.map(race =>
            <option 
            key={race.round} 
            className="dropdown-item" 
            value={race.round}>
            {race.raceName}
            </option>
        )      
    }
        
    render() {
        return(
            <div className="input-group w-50 m-auto">
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Races</label>
                </div>
                <select className="custom-select" onChange={this.handleChange}>{this.selector()}</select>
            </div>
        )
    }
}

export default RaceData