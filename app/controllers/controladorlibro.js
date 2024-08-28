const db = require('../config/db.config.js');
const Libro = db.Libro;

exports.createLibro = (req, res) => {
    const libro = {
        nombre_libro: req.body.nombre_libro,
        editorial: req.body.editorial,
        autor: req.body.autor,
        genero: req.body.genero,
        pais_autor: req.body.pais_autor,
        numero_paginas: req.body.numero_paginas,
        anio_edicion: req.body.anio_edicion,
        precio_libro: req.body.precio_libro
    };

    Libro.create(libro)
        .then(result => {
            res.status(200).json({
                message: "Libro creado exitosamente con id = " + result.codigo_libro,
                libro: result,
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al crear el libro!",
                error: error.message
            });
        });
};

exports.getAllLibros = (req, res) => {
    Libro.findAll()
        .then(libroInfos => {
            res.status(200).json({
                message: "Se obtuvieron todos los libros exitosamente.",
                libros: libroInfos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener los libros!",
                error: error.message
            });
        });
};

exports.getLibrosByNombre = (req, res) => {
    const nombreLibro = req.params.nombre;
    Libro.findAll({ where: { nombre_libro: nombreLibro } })
        .then(libros => {
            res.status(200).json({
                message: "Libros obtenidos exitosamente con el nombre = " + nombreLibro,
                libros: libros
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener los libros!",
                error: error.message
            });
        });
};

exports.updateLibro = async (req, res) => {
    try {
        const libroId = req.params.id;
        const libro = await Libro.findByPk(libroId);

        if (!libro) {
            res.status(404).json({
                message: "No se encontró el libro para actualizar con id = " + libroId,
                libro: "",
                error: "404"
            });
        } else {
            const updatedObject = {
                nombre_libro: req.body.nombre_libro,
                editorial: req.body.editorial,
                autor: req.body.autor,
                genero: req.body.genero,
                pais_autor: req.body.pais_autor,
                numero_paginas: req.body.numero_paginas,
                anio_edicion: req.body.anio_edicion,
                precio_libro: req.body.precio_libro
            };
            const [updatedCount, [updatedLibro]] = await Libro.update(updatedObject, {
                returning: true,
                where: { codigo_libro: libroId }
            });

            if (updatedCount === 0) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar el libro con id = " + libroId,
                    error: "No se pudo actualizar"
                });
            } else {
                res.status(200).json({
                    message: "Libro actualizado exitosamente con id = " + libroId,
                    libro: updatedLibro
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar el libro con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteLibro = async (req, res) => {
    try {
        const libroId = req.params.id;
        const libro = await Libro.findByPk(libroId);

        if (!libro) {
            res.status(404).json({
                message: "No existe un libro con id = " + libroId,
                error: "404"
            });
        } else {
            await libro.destroy();
            res.status(200).json({
                message: "Libro eliminado exitosamente con id = " + libroId,
                libro: libro
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo eliminar el libro con id = " + req.params.id,
            error: error.message
        });
    }
};