import { Sequelize } from 'sequelize'
import fs from 'fs'
import * as path from 'path'

import { config } from 'dotenv'
config()

const { HEROKU_POSTGRES, DB_USER, DB_PASSWORD, DB_HOST } = process.env

const sequelize = new Sequelize(
  `${HEROKU_POSTGRES}`,
  //   `${HEROKU_POSTGRES}` ||
  //     `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/gamesapi`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
)
const basename = path.basename(__filename)

const modelDefiners = []

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)))
  })

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize))
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models)
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1]
])
sequelize.models = Object.fromEntries(capsEntries)

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Game, Gencant } = sequelize.models

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

const recursos = {
  ...sequelize.models, // para poder importar los modelos así: import{ Game, Gencant } from './db.js';
  conn: sequelize // para importar la conexión { conn } = require('./db.js');
}

export default recursos
