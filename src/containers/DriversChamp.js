import React, { Component } from 'react'
import Title from '../components/Title'
import Timer from '../components/timer'
import SimpleMap from '../components/SimpleMap'
// import '../css/App.css'


class DriversChamp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: props.isLoading,
            standingsData: props.standingsData,
        }
    }

    componentDidMount() {

    }

    render () {
        const { standingsData, isLoading } = this.state
        const lights = []
        for(let i=0; i<5;i++){
            lights.push(
            <div className="spinner-grow text-danger mx-1" key={i}>
                <span className="sr-only">Loading...</span>
            </div>)
        }
        if (standingsData[0].DriverStandings.length) {
            return (
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