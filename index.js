const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(express.static('public'));
app.use(bodyParser.text());

app.post("/submitForm", (req, res) => {

    const params = new URLSearchParams({q: req.body,
                                        appid: process.env.API_KEY,
                                        units: "metric", 
                                        lang: "pt_br"}).toString();


    axios.get(`https://api.openweathermap.org/data/2.5/weather?${params}`)
    .then((apiResponse) => {
        res.json(apiResponse.data)
    })
    .catch((error) => {
        res.json(error.response.data)
    })
})

app.listen(process.env.PORT, () => {
    console.log(`servidor ligado na porta ${process.env.PORT}`)
})



