// Importar módulos requeridos
require("dotenv").config(); // Cargar variables de entorno
const Sequelize = require("sequelize");

// Establecer conexión con la base de datos
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false, // Deshabilitar logging para una salida más limpia
  }
);

// Definir el modelo SubRegion
const SubRegion = sequelize.define(
  "SubRegion",
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    subRegion: Sequelize.STRING,
    region: Sequelize.STRING,
  },
  { timestamps: false }
);

// Definir el modelo Country
const Country = sequelize.define(
  "Country",
  {
    id: { type: Sequelize.STRING, primaryKey: true },
    commonName: Sequelize.STRING,
    officialName: Sequelize.STRING,
    nativeName: Sequelize.STRING,
    currencies: Sequelize.STRING,
    capital: Sequelize.STRING,
    languages: Sequelize.STRING,
    openStreetMaps: Sequelize.STRING,
    population: Sequelize.INTEGER,
    area: Sequelize.INTEGER,
    landlocked: Sequelize.BOOLEAN,
    coatOfArms: Sequelize.STRING,
    flag: Sequelize.STRING,
    subRegionId: Sequelize.INTEGER,
  },
  { timestamps: false }
);

// Establecer relaciones
Country.belongsTo(SubRegion, { foreignKey: "subRegionId" });

/**
 * Inicializar la base de datos sincronizando los modelos.
 */
function initialize() {
  return sequelize
    .sync()
    .then(() => console.log("Base de datos sincronizada"))
    .catch((err) => Promise.reject("Error al inicializar la base de datos: " + err));
}

/**
 * Recuperar todos los países de la base de datos.
 */
function getAllCountries() {
  return Country.findAll({
    include: [SubRegion],
  })
    .then((countries) => Promise.resolve(countries))
    .catch(() => Promise.reject("No se encontraron países."));
}

/**
 * Recuperar un país específico por su ID.
 */
function getCountryById(id) {
  return Country.findOne({
    where: { id },
    include: [SubRegion],
  })
    .then((country) => {
      if (!country) throw new Error("País no encontrado");
      return Promise.resolve(country);
    })
    .catch(() => Promise.reject("País no encontrado con id: " + id));
}

/**
 * Recuperar países por subregión.
 */
function getCountriesBySubRegion(subRegion) {
  return Country.findAll({
    include: [SubRegion],
    where: { "$SubRegion.subRegion$": { [Sequelize.Op.iLike]: `%${subRegion}%` } },
  })
    .then((countries) => {
      if (countries.length === 0) throw new Error();
      return Promise.resolve(countries);
    })
    .catch(() =>
      Promise.reject("No se encontraron países en la subregión: " + subRegion)
    );
}

/**
 * Recuperar países por región.
 */
function getCountriesByRegion(region) {
  return Country.findAll({
    include: [SubRegion],
    where: { "$SubRegion.region$": { [Sequelize.Op.iLike]: `%${region}%` } },
  })
    .then((countries) => {
      if (countries.length === 0) throw new Error();
      return Promise.resolve(countries);
    })
    .catch(() => Promise.reject("No se encontraron países en la región: " + region));
}

/**
 * Eliminar un país por su ID.
 */
function deleteCountry(id) {
  return Country.destroy({
    where: { id },
  })
    .then((deleted) => {
      if (deleted === 0) throw new Error("País no encontrado");
      return Promise.resolve();
    })
    .catch((err) => Promise.reject("Error al eliminar el país: " + err.message));
}

// Exportar las funciones para usarlas en otros archivos
module.exports = {
  initialize,
  getAllCountries,
  getCountryById,
  getCountriesBySubRegion,
  getCountriesByRegion,
  deleteCountry, // Exportar la función deleteCountry
};
