const respuesta = require('./respuesta');

function errors(err, req, res, next){
    console.error('[error]',err);
    const messaje = err.message || 'Error interno';
    const status = err.statusCode || 500;
    respuesta.error(req, res, message,status);
}
module.exports = errors;