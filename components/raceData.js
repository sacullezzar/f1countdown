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
            <option className="dropdown-item" value={x.date + 'T' + x.time}>{x.raceName}</option>
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