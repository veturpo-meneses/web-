
//This will automatically read both files and generate two arrays of objects: 
//"countryData" and "subRegionData"
const countryData = require("../data/countryData");
const subRegionData = require("../data/subRegionData");

//store all the country objects
let countries = [];

function initialize() {
    return new Promise((resolve, reject) => {
        try {
            //Loop through each country in the countryData array
            countryData.forEach(country => {
                // Find the matching subRegion object by its ID
                const subRegionObj = subRegionData.find(subRegion => subRegion.id === country.subRegionId);
                // Add the subRegion object to the country data
                countries.push({ ...country, subRegionObj });
            });
            // If everything is successful, solve
            resolve();
        } catch (error) {
            // If there is an error...
            reject("Error initializing country data: " + error);
        }
    });
}

function getAllCountries() {
    return new Promise((resolve, reject) => {
        if (countries.length > 0) {
            resolve(countries);
        } else {
            reject("No countries found.");
        }
    });
}

function getCountryById(id) {
    return new Promise((resolve, reject) => {
        const country = countries.find(c => c.id === id);
        if (country) {
            resolve(country);
        } else {
            reject("Country not found with id: " + id);
        }
    });
}

function getCountriesBySubRegion(subRegion) {
    return new Promise((resolve, reject) => {
        const matchingCountries = countries.filter(country =>
            country.subRegionObj.subRegion.toLowerCase().includes(subRegion.toLowerCase())
        );
        if (matchingCountries.length > 0) {
            resolve(matchingCountries);
        } else {
            reject("No countries found in the sub-region: " + subRegion);
        }
    });
}

function getCountriesByRegion(region) {
    return new Promise((resolve, reject) => {
        const matchingCountries = countries.filter(country =>
            country.subRegionObj.region.toLowerCase().includes(region.toLowerCase())
        );
        if (matchingCountries.length > 0) {
            resolve(matchingCountries);
        } else {
            reject("No countries found in the region: " + region);
        }
    });
}
// Export the functions to use them in other files
module.exports = { initialize, getAllCountries, getCountryById, getCountriesBySubRegion, getCountriesByRegion };
