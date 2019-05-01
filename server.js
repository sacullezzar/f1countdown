const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 8080
const app = express()

app.use(express.static(__dirname, 'index.html'))

app.get('*', (req, res) => {
    res.sendFile([path.resolve(__dirname, 'index.html')])
})

app.listen(PORT)