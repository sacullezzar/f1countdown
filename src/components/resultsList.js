import React, { Component } from 'react'

class ResultsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            raceName: '',
            winner: ''
        }
    }



    render() {
        return(

            <div className="winner">{this.winner()}</div>
        )
    }
}

export default ResultsList