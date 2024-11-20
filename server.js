/********************************************************************************
*  WEB322 – Assignment 05
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Veronika Turpo Meneses Student ID: 147891238 Date: 2024-11-19
*
*  Published URL: 
*
********************************************************************************/

const express = require('express');
const countryService = require('./modules/country-service');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

const PORT = process.env.PORT || 8080;

// Ruta para la página de inicio
app.get("\views\home", (req, res) => {
    res.render("home", { page: 'Home' });
});

// Ruta para la página "Acerca de"
app.get("/about", (req, res) => {
    res.render("about", { page: 'About' });
});

// Ruta de inicialización
app.get('/initialize', (req, res) => {
    countryService.initialize()
        .then(() => {
            res.send('Inicialización exitosa.');
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// Ruta para mostrar todos los países en una tabla
app.get('/countries', (req, res) => {
    countryService.getAllCountries()
        .then(countries => {
            res.render("countries", { countries, page: 'Countries' });
        })
        .catch(err => {
            res.status(500).render("404", { message: "Error al cargar los países" });
        });
});

// Ruta para mostrar los detalles de un país específico
app.get('/countries/:id', (req, res) => {
    countryService.getCountryById(req.params.id)
        .then(country => {
            if (country) {
                res.render("country", { country, page: 'Country' });
            } else {
                res.status(404).render("404", { message: "País no encontrado" });
            }
        })
        .catch(err => {
            res.status(404).render("404", { message: "País no encontrado" });
        });
});

// Ruta para mostrar países por subregión
app.get('/subregion/:subregion', (req, res) => {
    const subregion = req.params.subregion;
    countryService.getCountriesBySubRegion(subregion)
        .then(countries => {
            if (countries.length > 0) {
                res.render("countries", { countries, page: 'Subregion' });
            } else {
                res.status(404).render("404", { message: `No se encontraron países en la subregión: ${subregion}` });
            }
        })
        .catch(err => {
            res.status(500).render("404", { message: `Error al cargar los países de la subregión: ${subregion}` });
        });
});

// Ruta para manejar páginas no encontradas (404)
app.use((req, res) => {
    res.status(404).render("404", { message: "Página no encontrada" });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
