const express = require('express');
const respuesta = require('../../src/red/respuesta');
const controlador = require('./index');  

const router = express.Router();


router.get('/', uno);   
router.get('/:id', todos);
router.post('/', agregar);
router.put('/:id', actualizar);
router.delete('/:id', eliminar);

// Funciones asociadas a las rutas
async function uno(req, res, next) {
    try {
        const vehiculos = await controlador.uno();
        respuesta.success(req, res, vehiculos, 200);
    } catch (err) {
        next(err);
    }
}

async function todos(req, res, next) {
    try {
        const vehiculo = await controlador.todos(req.params.id);
        respuesta.success(req, res, vehiculo, 200);
    } catch (err) {
        next(err);
    }
}

async function agregar(req, res, next) {
    try {
        const nuevoVehiculo = await controlador.agregar(req.body);
        respuesta.success(req, res, 'Vehículo creado con éxito', 201);
    } catch (err) {
        next(err);
    }
}

async function actualizar(req, res, next) {
    try {
        const vehiculoActualizado = await controlador.actualizar(req.params.id, req.body);
        respuesta.success(req, res, 'Vehículo actualizado con éxito', 200);
    } catch (err) {
        next(err);
    }
}

async function eliminar(req, res, next) {
    try {
        await controlador.eliminar(req.params.id);
        respuesta.success(req, res, 'Vehículo eliminado con éxito', 200);
    } catch (err) {
        next(err);
    }
}

module.exports = router;
