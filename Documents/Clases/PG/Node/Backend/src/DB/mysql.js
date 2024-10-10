const mysql = require('mysql');
const config = require('../config');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    port: 3306,
};

let conexion;

function conMysql() {
    conexion = mysql.createConnection(dbconfig);
    conexion.connect((err) => {
        if (err) {
            console.log('[db err]', err);
            setTimeout(conMysql, 2000); // Intervalo para reintentar la conexión
        } else {
            console.log('bd conectada');
        }
    });

    conexion.on('error', (err) => {
        console.log('[db err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            conMysql(); // Reintentar conexión si se pierde
        } else {
            throw err;
        }
    });
}

conMysql(); // Llamar a la función para conectar a la BD

// Obtener todos los registros de una tabla
function todos(tabla) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

// Obtener un registro por su ID
function uno(tabla, id) {
    return new Promise((resolve, reject) => {
        const campoId = tabla === 'usuarios' ? 'id' : 'id';
        conexion.query(`SELECT * FROM ${tabla} WHERE ${campoId} = ?`, [id], (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

// Agregar un nuevo registro a la tabla (INSERT)
function agregar(tabla, data) {
    return new Promise((resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla} SET ?`, [data], (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

/// Actualizar un registro existente en la tabla (UPDATE)
function actualizar(tabla, id, data) {
    return new Promise((resolve, reject) => {
        // Generar la consulta dinámica para actualizar los campos
        const fields = Object.keys(data)
            .map(key => `${key} = ?`)  // Mapeamos cada campo con un valor correspondiente
            .join(', ');
        const values = Object.values(data);
        const consulta = `UPDATE ${tabla} SET ${fields} WHERE id = ?`;

        // Agregar el ID al final de los valores
        values.push(id);

        // Ejecutar la consulta
        conexion.query(consulta, values, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
}

// Eliminar un registro de la tabla (DELETE)
function eliminar(tabla, id) {
    return new Promise((resolve, reject) => {
        const campoId = tabla === 'usuarios' ? 'id' : 'id';
        conexion.query(`DELETE FROM ${tabla} WHERE ${campoId} = ?`, [id], (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

// Realizar consultas personalizadas en la tabla (para login)
function query(tabla, condiciones) {
    return new Promise((resolve, reject) => {
        const keys = Object.keys(condiciones);
        const values = Object.values(condiciones);
        const conditionString = keys.map(key => `${key} = ?`).join(' AND ');

        const sql = `SELECT * FROM ${tabla} WHERE ${conditionString}`;
        
        conexion.query(sql, values, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result[0]);  // Devolvemos solo el primer resultado
        });
    });
}

module.exports = {
    todos,
    uno,
    agregar,
    actualizar,
    eliminar,
    query,  // Se agrega el método query
};
