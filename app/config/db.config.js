// config/db.config.js
const env = require('./env.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: env.pool
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar los modelos
db.Libro = require('../models/Libros.js')(sequelize, Sequelize);
db.prestamo = require('../models/prestamo.js')(sequelize, Sequelize);

// Definir asociaciones
db.Libro.hasMany(db.prestamo, { foreignKey: 'codigo_libro' });
db.prestamo.belongsTo(db.Libro, { foreignKey: 'codigo_libro' });

module.exports = db;
