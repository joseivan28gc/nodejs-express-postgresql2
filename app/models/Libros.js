// models/Libros.js
module.exports = (sequelize, Sequelize) => {
    const Libro = sequelize.define('libros', { // Nombre de la tabla en la base de datos
        codigo_libro: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre_libro: {
            type: Sequelize.STRING(60),
            allowNull: false
        },
        editorial: {
            type: Sequelize.STRING(25),
            allowNull: false
        },
        autor: {
            type: Sequelize.STRING(25),
            allowNull: false
        },
        genero: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        pais_autor: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        numero_paginas: {
            type: Sequelize.STRING
        },
        anio_edicion: {
            type: Sequelize.INTEGER
        },
        precio_libro: {
            type: Sequelize.FLOAT,
            allowNull: false
        }
    });

    return Libro;
};
