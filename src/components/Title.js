import React, { Component } from 'react'
import '../css/App.css'


class Title extends React.Component {
    render() {
      return <h1 className="title" >{this.props.name}</h1>
    }
}

export default Title