import React, { Component } from 'react'
import Title from '../components/Title'
import Timer from '../components/timer'
import SimpleMap from '../components/SimpleMap'
// import '../css/App.css'


class Countdown extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: props.isLoading,
            counter: 0,
            seasonData: props.seasonData,
            nextRace: null
        }
        this.handleTimeChange = this.handleTimeChange.bind(this)
        this.calcTime = this.calcTime.bind(this)
    }

    componentDidMount() {
        this.calcTime()
    }

    handleTimeChange(time) {
        const t1 = new Date
        const t2 = new Date(time)
        const date = Math.round((t2 - t1)/1000)
        this.setState({ counter: date})
    }

    calcTime() {
        if (this.state.seasonData && this.state.seasonData.length) {
            this.setState({ isLoading: false })
            const now = new Date
            for (let i = 0; i < this.state.seasonData.length; i++) {
                if (new Date(this.state.seasonData[i].date) >= new Date) {
                    this.setState({ nextRace: this.state.seasonData[i]}, () => {
                        this.handleTimeChange(this.state.nextRace.date + 'T' + this.state.nextRace.time)
                    })
                    break
                }
            }
        }
    }

    render () {
        const { seasonData, nextRace, counter, isLoading } = this.state
        const lights = []
        for(let i=0; i<5;i++){
            lights.push(
            <div className="spinner-grow text-danger mx-1" key={i}>
                <span className="sr-only">Loading...</span>
            </div>)
        }
        if (nextRace) {
            return (
            <div className="main">
                <div className="wrapper">
                    <Title name="F1Countdown" />
                    <h2>The next F1 race starts in</h2>
                    <Timer time={counter} />
                    <h2>at</h2>
                    <h1>{nextRace.Circuit.circuitName}</h1>
                </div>
                <SimpleMap race={nextRace}/>
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

export default Countdown