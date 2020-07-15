const express = require('express')
const bodyParser = require('body-parser')
var path = require('path');
var multer  = require('multer')
var upload = multer({ dest: 'images/' })
var cors = require('cors')
// App
const app = express()


/*var dir = path.join(__dirname, 'public');
app.use(express.static(dir));*/

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//CORS
app.use(cors())


// Routes
app.get('/', (req, res) =>{
    res.json({ message: 'Hola Mundo!'})
})

app.post('/price', (req, res) => {
    console.log("*** REQ BODY ***");
    console.log(req.body)
    console.log("*** REQ BODY ***");
    console.log("*** RES ***");
    console.log(parseInt(req.body['iPermitYear']) + 69.420);
    res.json({price: parseInt(req.body['iPermitYear']) + 69.420})
})

app.post('/damage', upload.single('image'), (req, res) => {
    //res.json({resultImageUrl: 'images/DB5Wasted.png'})
    res.sendFile(path.join(__dirname, 'images', 'DB5Wasted.png'))
})


// Start server
app.listen('1337')