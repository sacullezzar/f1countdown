const express = require('express')
const path = require('path')
const port = process.env.PORT || 8080
const app = express()

const home = __dirname + '/dist'

app.use(express.static(home))

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(home, 'index.html'))
})

app.listen(port, () => {
  console.log(`Counting down on ${port}`)
})