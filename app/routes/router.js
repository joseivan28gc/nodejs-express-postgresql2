let express = require('express');
let router = express.Router();

const controladorlibro = require('../controllers/controladorlibro.js');
const controladorprestamo = require('../controllers/controladorprestamo.js');

// Rutas de controlador Libro
router.post('/api/libro/create', controladorlibro.createLibro);
router.get('/api/libro/all', controladorlibro.getAllLibros);
router.get('/api/libro/nombre/:nombre', controladorlibro.getLibrosByNombre);
router.put('/api/libro/update/:id', controladorlibro.updateLibro);
router.delete('/api/libro/delete/:id', controladorlibro.deleteLibro);

// Rutas de controlador Prestamo
router.post('/api/prestamo/create', controladorprestamo.createPrestamo);
router.get('/api/prestamo/all', controladorprestamo.getAllPrestamos);
router.get('/api/prestamo/libro/:id', controladorprestamo.getPrestamosbyid);
router.put('/api/prestamo/update/:id', controladorprestamo.updatePrestamo);
router.delete('/api/prestamo/delete/:id', controladorprestamo.deletePrestamo);

module.exports = router;