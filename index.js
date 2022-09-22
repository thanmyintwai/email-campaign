const express = require('express')
const bodyParser = require('body-parser');


const app = express()

app.use(bodyParser.json())


app.get('/', (req, res)=>{
    res.send({'Hi':  'there'})
})


const PORT = process.env.PORT || 5000
app.listen(PORT)