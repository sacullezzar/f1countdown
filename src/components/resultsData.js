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
        if (this.props.results) {
            console.log(this.props.results[0].Results[0].Driver)
            let driver = this.props.results[0].Results[0].Driver
            return(
                <div className="winner">
                <h5>winner</h5>
                <p>{driver.givenName+ ' ' + driver.familyName}</p>
                </div>
            )
        }
    }

    render() {
        
        let { isLoading } = this.props
        if(!isLoading) {
            const results = this.printResults()
            return (
                <div>{results}</div>
            )
        } else {
            return (
                <React.Fragment>Loading!</React.Fragment>
            )
        }
    }
}

export default ResultsData
