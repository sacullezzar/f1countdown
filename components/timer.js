import React, { Component } from 'react'
import { tsConstructSignatureDeclaration } from '@babel/types';

class Timer extends Component {
    constructor(props) {
        super(props)

        this.formatTimer = this.formatTimer.bind(this)
        this.timer = this.timer.bind(this)
        this.state = {
            time: null,
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
            return "Days: 0 - Hours: 0 - Minutes: 0 - Seconds: 0"
        }
        let days
        let hours
        let minutes
        let seconds
        let trackedSeconds = initialSeconds

        days = Math.floor(trackedSeconds / (60 * 60 * 24))
        trackedSeconds -= days * (60 * 60 * 24)
        hours = Math.floor(trackedSeconds / (60 * 60))
        trackedSeconds -= hours * (60 * 60)
        minutes = Math.floor(trackedSeconds / 60)
        trackedSeconds -= minutes * 60
        seconds = trackedSeconds

        let format = "Days: " + days + " - Hours: " + hours + " - Minutes: " + minutes + " - Seconds: " + seconds
        return format
    }

    timer(seconds) {
        const self = this
        this.interval = setInterval(function() {
            self.setState( { time: self.formatTimer(seconds) } )
            seconds -= 1
          }, 1000, self)
    }

    render () {
        return (
            <div>
                <h1>
                    {this.state.time}
                </h1>
            </div>
        )
    }
}

export default Timer