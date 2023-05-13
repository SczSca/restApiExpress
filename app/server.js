const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const dotenv = require('./config/config.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/', routes); //to use the routes


const listener = app.listen(dotenv.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})