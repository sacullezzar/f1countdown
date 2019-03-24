import React from 'react'

class RaceData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            titles: [],
            dates: [],
            times: []
        }
        this.raceList = this.raceList.bind(this)
    }

    componentDidUpdate(){
        const { titles, dates, times } = this.state
        const { raceData } = this.props
        for(let i=0; i<raceData.MRData.RaceTable.Races.length; i++){
            titles.push(raceData.MRData.RaceTable.Races[i].raceName)
            dates.push(raceData.MRData.RaceTable.Races[i].date)
            times.push(raceData.MRData.RaceTable.Races[i].time)
        }
    }

    raceList() {
        let races = this.state.titles.map((item, index) => {
            <li key={index}>{item}</li>
        })
        console.log(races)
        return (
            <ul>{races}</ul> || null
        )
    }
        
    render() {
        return(this.raceList())
    }
}

export default RaceData