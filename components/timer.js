import React, { Component } from 'react'

class Timer extends Component {
    constructor(props) {
        super(props)

        this.formatTimer = this.formatTimer.bind(this)
        this.timer = this.timer.bind(this)
        this.state = {
            time: null,
            isLoading: false,
            seconds: props.time
        }
    }

    componentDidMount() {
        this.timer(this.state.seconds)
    }

    componentDidUpdate(prevProps) {
        if (this.props.time !== prevProps.time) {
            this.setState( { seconds: this.props.time })
            clearInterval(this.interval)
            this.timer(this.props.time)
        }
    }

    formatTimer(initialSeconds) {
        if (initialSeconds <= 0) {
            clearInterval(this.interval)
            return "Weeks: 0 - Days: 0 - Hours: 0 - Minutes: 0 - Seconds: 0"
        }
        let weeks
        let days
        let hours
        let minutes
        let seconds
        let trackedSeconds = initialSeconds

        weeks = Math.floor(trackedSeconds / (60 * 60 * 24 * 7))
        trackedSeconds -= weeks * (60 * 60 * 24 * 7)
        days = Math.floor(trackedSeconds / (60 * 60 * 24))
        trackedSeconds -= days * (60 * 60 * 24)
        hours = Math.floor(trackedSeconds / (60 * 60))
        trackedSeconds -= hours * (60 * 60)
        minutes = Math.floor(trackedSeconds / 60)
        trackedSeconds -= minutes * 60
        seconds = trackedSeconds

        let format = "Weeks: " + weeks + " - Days: " + days + " - Hours: " + hours + " - Minutes: " + minutes + " - Seconds: " + seconds
        return format
    }

    timer(seconds) {
        const self = this
        this.setState( { isLoading: true })
        this.interval = setInterval(function() {
            self.setState( { time: self.formatTimer(seconds) } )
            self.setState( { isLoading: false })
            seconds -= 1
          }, 1000, self)
    }



    render () {
        let lights = []
        for(let i=0; i<5;i++){
            lights.push(
            <div className="spinner-grow text-danger mx-1" key={i}>
                <span className="sr-only">Loading...</span>
            </div>)
        }
        if(this.state.isLoading) {
            return  (
                <div className="my-2" style={{ textAlign: 'center' }}>
                        {lights.map(function(light){
                            return light
                        })}
                </div>
            )
        } else {
            if (this.state.time === "Weeks: 0 - Days: 0 - Hours: 0 - Minutes: 0 - Seconds: 0") {
                return (
                <React.Fragment>
                    <h3 className="mx-auto my-2 w-50" style={{ textAlign: 'center' }}>
                        Past Race <br></br><a href={""}>View results</a>
                    </h3>
                </React.Fragment>
                )
            } else {
                return (
                <React.Fragment>
                    <h3 className="mx-auto my-2 w-50" style={{ textAlign: 'center' }}>
                        {this.state.time}
                    </h3>
                </React.Fragment>
                )
            }
        }     
    }
}

export default Timer