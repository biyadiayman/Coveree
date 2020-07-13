const express = require('express')

// App
const app = express()

// Routes
app.get('/', (req, res) =>{
    res.json({ message: 'Hola Mundo!'})
})

// Start server
app.listen('1337')