const db = require('../config/db.config.js');
const Prestamo = db.prestamo;
const Libro = db.Libro;

exports.createPrestamo = async (req, res) => {
    try {
        const libro = await Libro.findByPk(req.body.codigo_libro);
        if (!libro) {
            return res.status(404).json({
                message: "No se encuentra el libro con id = " + req.body.codigo_libro,
            });
        }

        const prestamoData = {
            codigo_libro: req.body.codigo_libro,
            codigo_usuario: req.body.codigo_usuario,
            fecha_salida: req.body.fecha_salida,
            fecha_maxima: req.body.fecha_maxima,
            fecha_devolucion: req.body.fecha_devolucion || null
        };

        const prestamo = await Prestamo.create(prestamoData);
        res.status(200).json({
            message: "Préstamo creado exitosamente con id = " + prestamo.numero_pedido,
            prestamo: prestamo,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el préstamo!",
            error: error.message
        });
    }
};
exports.getAllPrestamos = (req, res) => {
    Prestamo.findAll({
        include: [
            {
                model: Libro,
                attributes: ['nombre_libro', 'autor', 'editorial']
            }
        ]
    })
        .then(prestamoInfo => {
            res.status(200).json({
                message: "Se obtuvieron todos los préstamos",
                prestamos: prestamoInfo
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener los préstamos!",
                error: error.message
            });
        });
};

exports.getPrestamosbyid = (req, res) => {
    const codigoLibro = req.params.id;
    Prestamo.findAll({
        where: { codigo_libro: codigoLibro },
        include: [
            {
                model: Libro,
                attributes: ['nombre_libro', 'autor', 'editorial']
            }
        ]
    })
        .then(prestamoInfo => {
            res.status(200).json({
                message: "Se obtuvieron todos los préstamos para el libro con id = " + codigoLibro,
                prestamos: prestamoInfo
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener los préstamos!",
                error: error.message
            });
        });
};

exports.updatePrestamo = async (req, res) => {
    try {
        const prestamoId = req.params.id;
        const prestamo = await Prestamo.findByPk(prestamoId);

        if (!prestamo) {
            return res.status(404).json({
                message: "No se encontró el préstamo para actualizar con id = " + prestamoId,
                prestamo: "",
                error: "404"
            });
        } else {
            const updatedObject = {
                codigo_libro: req.body.codigo_libro,
                codigo_usuario: req.body.codigo_usuario,
                fecha_salida: req.body.fecha_salida,
                fecha_maxima: req.body.fecha_maxima,
                fecha_devolucion: req.body.fecha_devolucion || null
            };
            const [updatedCount, [updatedPrestamo]] = await Prestamo.update(updatedObject, {
                returning: true,
                where: { numero_pedido: prestamoId }
            });

            if (updatedCount === 0) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar el préstamo con id = " + prestamoId,
                    error: "No se pudo actualizar"
                });
            } else {
                res.status(200).json({
                    message: "Préstamo actualizado exitosamente con id = " + prestamoId,
                    prestamo: updatedPrestamo
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar el préstamo con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deletePrestamo = async (req, res) => {
    try {
        const prestamoId = req.params.id;
        const prestamo = await Prestamo.findByPk(prestamoId);

        if (!prestamo) {
            return res.status(404).json({
                message: "No existe un préstamo con id = " + prestamoId,
                error: "404"
            });
        } else {
            await prestamo.destroy();
            res.status(200).json({
                message: "Préstamo eliminado exitosamente con id = " + prestamoId,
                prestamo: prestamo
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo eliminar el préstamo con id = " + req.params.id,
            error: error.message
        });
    }
};