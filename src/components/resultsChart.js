import React, { Component } from 'react';
import CanvasJSReact from '../scripts/canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ResultsChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: props.isLoading,
            ref: {
                season: '',
                data: []
            },
            drivers: props.drivers || [],
            raceNames: [],
            getRaceNames: (races, cb) => {
                const arr = []
                for (let i = 0; i < races.length; i++) {
                    arr.push(races[i].raceName)
                }
                this.setState({
                    raceNames: arr
                }, () => cb())
            },
            options: {
                title: {text: ''},
                data: []
            }
        }
        this.buildTable = this.buildTable.bind(this)
        this.getDriverCodes = this.getDriverCodes.bind(this)
    }

    componentDidMount() {
        if (this.props.data.Races && this.props.data.Races.length) {
            this.setState({
                season: this.props.data.season,
                data: this.props.data.Races
            }, () => this.buildTable(this.state.data))
        }
    }
    
    getDriverCodes(arr) {
        return arr.map((driver) => {
            return driver.Driver.code
        })
    }
    
    buildTable(arr) {
        this.state.getRaceNames(this.state.data, () => {
            const drivers = this.getDriverCodes(this.state.drivers)
            const races = this.state.raceNames
            const output = []
            // console.log(drivers)
            drivers.forEach(driver => {
                const dObj = {
                    showInLegend: true,
                    type: 'line',
                    legendText: driver,
                    score: 0,
                    dataPoints: []
                }
                arr.map((race) => {
                    race.Results.map((position, i) => {
                        if (position.Driver.code == driver) {
                            dObj.score += parseInt(position.points)
                            dObj.dataPoints.push({label: race.raceName, x: race.round - 1, y: dObj.score})
                        }
                    })
                })
                output.push(dObj)
            });
            this.setState({
                options: {
                    legend: {
                        horizontalAlign: "right", // "center" , "right"
                        verticalAlign: "center",  // "top" , "bottom"
                        fontSize: 15
                      },
                    title: {text: this.state.season + " so far"},
                    data: output
                }
            })
        })            
    }



    render() {
        const options = this.state.options

        return (
            <div>
                <CanvasJSChart options = {options} />
            </div>
        )
    }
}

export default ResultsChart