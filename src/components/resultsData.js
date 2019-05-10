import React from 'react'
import styled from 'styled-components'
import '../css/Results.css'
import 'babel-polyfill'
import { isExpressionWrapper } from '@babel/types';

const Winner = styled.h2 `
text-align: center
font-size: 1.2em`
const Runnerup = styled.h4 `
font-size: 0.8em
text-align: center`
const Title = styled.h2 `
font-size: 1.2em
color: white`

class ResultsData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true
        }
    }

    printResults() {
        // console.log(this.props)
        if (this.props.results && this.props.results[0]) {
            let raceInfo = this.props.results[0].Results
            let team = raceInfo[0].Constructor.name
            let winner = raceInfo[0].Driver
            let topTen = (driver, i) => {
                while (i >= 1 && i <= 9){
                    return <Runnerup><li>{driver.Driver.givenName[0] +'. ' + driver.Driver.familyName + ' (' + driver.Constructor.name + ')'}</li></Runnerup>
                }
            }
            return(
                <div className="wrapper">
                <div className="winner">
                <Title>First Place:</Title>
                <Winner>{winner.givenName + ' ' + winner.familyName + ' (' + team + ')'}</Winner>
                </div>
                <ol start="2">{this.props.results[0].Results.map(topTen)}</ol>
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
