// models.js

const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Configuración de la conexión a la base de datos
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false, // Desactiva el registro de consultas SQL
  }
);

// Definición del modelo SubRegion
const SubRegion = sequelize.define(
  'SubRegion',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    subRegion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false, // Desactiva las marcas de tiempo automáticas
  }
);

// Definición del modelo Country
const Country = sequelize.define(
  'Country',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    commonName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    officialName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nativeName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    currencies: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    languages: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    openStreetMaps: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    population: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    area: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    landlocked: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    coatOfArms: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    flag: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subRegionId: {
      type: DataTypes.INTEGER,
      references: {
        model: SubRegion,
        key: 'id',
      },
    },
  },
  {
    timestamps: false, // Desactiva las marcas de tiempo automáticas
  }
);

// Establece la relación entre Country y SubRegion
Country.belongsTo(SubRegion, { foreignKey: 'subRegionId' });

// Sincroniza los modelos con la base de datos
sequelize
  .sync()
  .then(() => {
    console.log('Modelos sincronizados con la base de datos.');
  })
  .catch((err) => {
    console.error('Error al sincronizar los modelos:', err);
  });

// Exporta los modelos para su uso en otros módulos
module.exports = {
  Country,
  SubRegion,
  sequelize,
};
