const connectToMongo = require('./db');
const express = require('express');
const app = express();

connectToMongo().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    })
});
