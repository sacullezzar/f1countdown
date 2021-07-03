import React, { Component } from 'react'
import ResultsChart from '../components/resultsChart'


class DriversChamp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: props.isLoading,
            standingsData: props.standingsData,
        }
    }

    render () {
        const { standingsData, isLoading } = this.state
        const { raceResults } = this.props
        const lights = []
        for(let i=0; i<5;i++){
            lights.push(
            <div className="spinner-grow text-danger mx-1" key={i}>
                <span className="sr-only">Loading...</span>
            </div>)
        }
        if (standingsData[0].DriverStandings.length && !isLoading) {
            return (
                <div className="main wrapper">
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Position</th>
                                    <th>Driver</th>
                                    <th>Points</th>
                                </tr>
                            </thead>
                            <tbody>
                        {standingsData[0].DriverStandings.map((driver) => {
                            return (
                                <tr key={driver.position}>
                                    <td>{driver.position}</td>
                                    <td>{driver.Driver.givenName + ' ' + driver.Driver.familyName}</td>
                                    <td>{driver.points}</td>
                                </tr>
                            )
                        })}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <ResultsChart data={raceResults} drivers={standingsData[0].DriverStandings} />
                    </div>
                </div>
            )
        } else {
            return (
                <div className="lightbar my-2" style={{ textAlign: 'center' }}>
                        {lights.map(function(light){
                            return light
                        })}
                </div>
            )
        }
    }
}

export default DriversChamp