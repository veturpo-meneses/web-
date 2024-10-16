/********************************************************************************
* WEB322 – Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: Veronika Turpo Meneses Student ID: 147891238 Date: 2024-9-28
*
********************************************************************************/


const express = require('express');
const countryService = require('./modules/country-service');
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/initialize', (req, res) => {
    countryService.initialize().then(() => {
        res.send('Initialization successful.');
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.get('/countries', (req, res) => {
    countryService.getAllCountries().then(countries => {
        res.json(countries);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.get('/countries/:id', (req, res) => {
    countryService.getCountryById(req.params.id).then(country => {
        res.json(country);
    }).catch(err => {
        res.status(404).send(err);
    });
});

app.get('/subregion/:subRegion', (req, res) => {
    countryService.getCountriesBySubRegion(req.params.subRegion).then(countries => {
        res.json(countries);
    }).catch(err => {
        res.status(404).send(err);
    });
});

app.get('/region/:region', (req, res) => {
    countryService.getCountriesByRegion(req.params.region).then(countries => {
        res.json(countries);
    }).catch(err => {
        res.status(404).send(err);
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
app.use(express.static('public'));
