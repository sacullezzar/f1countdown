import React from 'react'

function Results(props) {
    if (props.race && props.race.Results && props.race.Results.length) {
        console.log(props)
        const results = props.race.Results
        const listItems = results.map((result) => {
            console.log(result)
            return (
            <tr key={result.position}>
                <td>{result.position}</td>
                <td>{result.Driver.givenName} {result.Driver.familyName}</td>
                <td>{result.Driver.permanentNumber}</td>
                <td>{result.Time && result.Time.time || result.status}</td>
            </tr>
            )
        })
        return (
            <div>
                <h2>{props.race.raceName}</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Position</th>
                        <th>Driver</th>
                        <th>Car Number</th>
                        <th>Race Time</th>
                    </tr>
                    </thead>
                    <tbody>
                {listItems}
                </tbody>
                </table>
            </div>
        )
    } else {
        if (!props.selectedRace) {
            return (
                <p>Please choose a race...</p>
            )
        } else {
            return (
                <p>Waiting for Race Day!</p>
            )
        }
    }
}
export default Results