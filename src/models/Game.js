const { DataTypes } = require('sequelize');


// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {

    // defino el modelo
    sequelize.define('game', {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        thumbnail: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        thumbnail_half: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        short_description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        game_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        platform: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        publisher: {
            type: DataTypes.STRING,
        },
        developer: {
            type: DataTypes.STRING,
        },
        release_date: {
            type: DataTypes.STRING,
        },
        freetogame_profile_url: {
            type: DataTypes.STRING,
        },
    });
};