const { DataTypes } = require('sequelize')

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('game', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    thumbnail_half: {
      type: DataTypes.STRING,
      allowNull: false
    },
    data: {
      type: DataTypes.JSONB,
      allowNull: false
    }
  })
}
