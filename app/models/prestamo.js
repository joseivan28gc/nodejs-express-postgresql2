module.exports = (sequelize, Sequelize) => {
    const Prestamo = sequelize.define('prestamo', {
        numero_pedido: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        codigo_libro: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'libros',  // Asegúrate de que el nombre coincida con la tabla en la base de datos
                key: 'codigo_libro'
            }
        },
        codigo_usuario: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        fecha_salida: {
            type: Sequelize.DATE,
            allowNull: false
        },
        fecha_maxima: {
            type: Sequelize.DATE,
            allowNull: false
        },
        fecha_devolucion: {
            type: Sequelize.DATE,
            allowNull: true
        }
    });

    Prestamo.belongsTo(sequelize.models.libros, { foreignKey: 'codigo_libro' });

    return Prestamo;
};
