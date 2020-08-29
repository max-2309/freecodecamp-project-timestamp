const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204
app.use(express.static('public'));

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/hello", function (req, res) {
    res.json({greeting: 'hello API'});
});

app.get('/api/timestamp/:date_string', (req, res) => {
    let date_params = req.params.date_string;
    if (!isNaN(Number(date_params))) {
        date_params = Number.parseInt(date_params);
    }
    const date = new Date(date_params)
    if (date.toString() === 'Invalid Date') {
        return res.json({error: "Invalid Date"});
    }
    res.json({unix: date.getTime(), utc: date.toUTCString()})
});

app.get('/api/timestamp', (req, res) => {
    const date = new Date();
    res.json({unix: date.getTime(), utc: date.toUTCString()})
});

const listener = app.listen(process.env.PORT || 3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
