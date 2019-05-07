import React from 'react'
import ResultsList from './resultsList'
import 'babel-polyfill'

class ResultsData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true
        }
    }

    printResults() {
        console.log(this.props)
        if (this.props.results && this.props.results[0]) {
            let raceInfo = this.props.results[0].Results
            let winner = raceInfo[0].Driver
            let topTen = (driver) => {
                return <li>{driver.Driver.givenName}</li>
            }
            return(
                <div className="winner">
                <h4>First Place:</h4>
                <p>{winner.givenName+ ' ' + winner.familyName}</p>
                <ol>{this.props.results[0].Results.map(topTen)}</ol>
                </div>
            )
        }
    }

    render() {
        let { isLoading } = this.props
        let results = this.printResults()
        return (
            <React.Fragment>
                {!isLoading && results}
            </React.Fragment>
        )
    }
}

export default ResultsData
