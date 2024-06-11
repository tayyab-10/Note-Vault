const connectToMongo = require('./db');
const express = require('express');

connectToMongo();
const app = express();
const port = 3000;

//middleware to send and receive json type data
app.use(express.json());

//avialable routes 
app.use('/api/auth', require('./Routes/auth'))
app.use('/api/notes', require('./Routes/notes'))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})