import React from 'react'
import ResultsList from './resultsList'
import 'babel-polyfill'

class ResultsData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            raceData: null,
            winner: 'results will go here'
        }
    }

    async componentDidMount() {
        let { raceId } = this.props
        const response = await fetch(`http://ergast.com/api/f1/current/${raceId}/results.json`)
        const responseJson = await response.json()
        this.setState({ isLoading: false, raceData: responseJson })
    }




    render() {
        let { isLoading, winner } = this.state
        if(!isLoading) {
            return (
                <h1>{winner}</h1>
            )
        } else {
            return (
                <React.Fragment>Loading!</React.Fragment>
            )
        }
    }
}

export default ResultsData
