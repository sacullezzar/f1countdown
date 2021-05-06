import React, { Component } from 'react'
// import '../css/Timer.css'

class Timer extends Component {
    constructor(props) {
        super(props)

        this.formatTimer = this.formatTimer.bind(this)
        this.timer = this.timer.bind(this)
        this.timerText = this.timerText.bind(this)
        this.state = {
            time: null,
            isLoading: false,
            seconds: props.time
        }
    }

    componentDidMount() {
        this._isMounted = true
        this.timer(this.state.seconds)
    }

    componentDidUpdate(prevProps) {
        if (this._isMounted && this.props.time !== prevProps.time) {
            this.setState( { seconds: this.props.time })
            clearInterval(this.interval)
            this.timer(this.props.time)
        }
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    formatTimer(initialSeconds) {
        if (initialSeconds <= 0) {
            clearInterval(this.interval)
            return "Loading..."
        }

        let trackedSeconds = initialSeconds

        const weeks = this.timerText(Math.floor(trackedSeconds / (60 * 60 * 24 * 7)), 'Week')
            trackedSeconds -= Math.floor(trackedSeconds / (60 * 60 * 24 * 7)) * (60 * 60 * 24 * 7)

        const days = this.timerText(Math.floor(trackedSeconds / (60 * 60 * 24)), 'Day')
            trackedSeconds -= Math.floor(trackedSeconds / (60 * 60 * 24)) * (60 * 60 * 24)

        const hours = this.timerText(Math.floor(trackedSeconds / (60 * 60)), 'Hour')
            trackedSeconds -= Math.floor(trackedSeconds / (60 * 60)) * (60 * 60)

        const minutes = this.timerText(Math.floor(trackedSeconds / 60), 'Minute')
            trackedSeconds -= Math.floor(trackedSeconds / 60) * 60

        const seconds = this.timerText(Math.floor(trackedSeconds), 'Second')
        return `${weeks} ${days} ${hours} ${minutes} ${seconds}`
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

    timerText(value, type) {
        if (type !== 'Second') {
            return value === 1 ? `${value} ${type},` : value === 0 ? `` : `${value} ${type}s,`
        }
        return value === 1 ? `${value} ${type}.` : `${value} ${type}s.`
    }

    render () {
        let {
            isLoading,
            time
        } = this.state
        let lights = []
        for(let i=0; i<5;i++){
            lights.push(
            <div className="spinner-grow text-danger mx-1" key={i}>
                <span className="sr-only">Loading...</span>
            </div>)
        }
        if(isLoading && this._isMounted) {
            return  (
                <div className="lightbar my-2" style={{ textAlign: 'center' }}>
                        {lights.map(function(light){
                            return light
                        })}
                </div>
            )
        } else {
            
            return (
            <React.Fragment>
                <h3 className="mx-auto my-2 w-50" style={{ textAlign: 'center' }}>
                    {time}
                </h3>
            </React.Fragment>
            )
        
        }     
    }
}

export default Timer