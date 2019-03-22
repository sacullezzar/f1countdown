import React from 'react'
require('es6-promise').polyfill();
require('isomorphic-fetch');

class Data extends React.Component {
    constructor(props) {
        super(props)
    }
    
    componentDidMount() {
        getInfo()
    }
    
    getInfo = async function(){
        let titles = []
        let dates = []
        let times = []
        let url = "https://ergast.com/api/f1/current.json"
        const response = await fetch(url);
        const json = await response.json();
                console.log('all went well!')
                for(let i = 0; i < json.MRData.RaceTable.Races.length; i++){
                    titles.push(JSON.stringify(json.MRData.RaceTable.Races[i].raceName))
                    dates.push(JSON.stringify(json.MRData.RaceTable.Races[i].date))
                    times.push(JSON.stringify(json.MRData.RaceTable.Races[i].time))
                };
    }
    render() {
    
    function output(arr1, arr2, arr3) {
        for(let i=0; i < arr1.length; i++){
            console.log(`Event ${i+1}: ${arr1[i]}, on ${arr2[i]}, at ${arr3[i]}`)
        }
    }
    

    let races = titles.map((item, key) => <li key={key}>{item}</li>)
    return(
        <>
        <ul>{races}</ul>
        </>
    )

    }
}

export default Data