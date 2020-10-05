import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import WebFont from 'webfontloader'
import './css/index.css'

WebFont.load({
    google: {
        families: ['Monoton: cursive,300,400,700', 'Roboto: sans-serif', 'sans-serif']
    }
})
ReactDOM.render(<App />, document.getElementById('app'))