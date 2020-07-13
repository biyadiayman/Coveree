const express = require('express')
const bodyParser = require('body-parser')

// App
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Routes
app.get('/', (req, res) =>{
    res.json({ message: 'Hola Mundo!'})
})

app.get('/price', (req, res) => {
    console.log("*** REQ BODY ***");
    console.log(req.body)
    console.log(req.body['car'])
    console.log("*** REQ BODY ***");
    res.json({price: req.body['salary'] + 69.420})
})

// Start server
app.listen('1337')