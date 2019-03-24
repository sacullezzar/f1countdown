import React from 'react'

class RaceData extends React.Component {
    constructor(props) {
        super(props)
        this.selector = this.selector.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.props.handleTimeChange(event.target.value)
    }

    selector() {
        return this.props.raceData.MRData.RaceTable.Races.map( x =>
            <option value={x.date + 'T' + x.time}>{x.raceName}</option>
        )      
    }
        
    render() {
        return(
            <select onChange={this.handleChange}>{this.selector()}</select>
        )
    }
}

export default RaceData