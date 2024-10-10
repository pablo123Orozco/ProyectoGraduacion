const TABLA = 'ordenesservicio';

module.exports = function (dbinyectada) {
    let db = dbinyectada;
    if (!db) {
        db = require('../../src/DB/mysql'); // Asegúrate de que esta ruta es correcta
    }

    // Obtener todas las órdenes de servicio
    async function todos() {
        return db.todos(TABLA); // Consulta para obtener todas las órdenes de servicio
    }

    // Obtener una orden de servicio por su ID
    async function uno(id) {
        return db.uno(TABLA, id); // Consulta para obtener una orden de servicio por su ID
    }

    // Agregar una nueva orden de servicio
    async function agregar(body) {
        const orden = {
            detalleReparacion: body.detalleReparacion,
            costoEstimado: body.costoEstimado,
            estado: body.estado,
            idVehiculo: body.idVehiculo            // Clave foránea a la tabla vehiculos
        };

        return db.agregar(TABLA, orden); // Insertar una nueva orden de servicio
    }

    // Actualizar una orden de servicio existente
    async function actualizar(id, body) {
        const orden = {
            detalleReparacion: body.detalleReparacion,
            costoEstimado: body.costoEstimado,
            estado: body.estado,
            idVehiculo: body.idVehiculo
        };

        return db.actualizar(TABLA, orden, { id: id }); // Actualizar una orden de servicio existente
    }

    // Eliminar una orden de servicio
    async function eliminar(id) {
        return db.eliminar(TABLA, id); // Eliminar una orden de servicio por ID
    }

    return {
        uno,
        todos,
        agregar,
        actualizar,
        eliminar
    };
};
