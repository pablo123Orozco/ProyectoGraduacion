import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Definir la interfaz para el cliente
interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  nit: string;
  telefono: string;
  correo: string;
  estadoCuenta: string;
}

interface ClienteListProps {
  onEdit: (cliente: Cliente) => void;
  onDelete: (id: number) => void;
}

const ClienteList: React.FC<ClienteListProps> = ({ onEdit, onDelete }) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);  // Inicializamos con un arreglo vacío
  const [loading, setLoading] = useState<boolean>(true);  // Estado de carga
  const [error, setError] = useState<string | null>(null);  // Estado de error

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/clientes');
      console.log('Respuesta completa de la API:', response);

      // Accedemos a los clientes en response.data.body
      if (Array.isArray(response.data.body)) {
        setClientes(response.data.body);  // Establecemos los clientes desde el cuerpo de la respuesta
      } else {
        console.warn('La respuesta de la API no es un arreglo:', response.data);
        setError('La estructura de la respuesta no es válida.');
      }
    } catch (error) {
      console.error('Error al obtener clientes:', error);
      setError('Error al obtener los clientes.');
    } finally {
      setLoading(false);  // Desactivar el estado de carga al finalizar
    }
  };

  if (loading) {
    return <div>Cargando clientes...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Lista de Clientes</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>NIT</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Estado de Cuenta</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.length > 0 ? (
            clientes.map(cliente => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.apellido}</td>
                <td>{cliente.nit}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.correo}</td>
                <td>{cliente.estadoCuenta}</td>
                <td>
                  <button onClick={() => onEdit(cliente)}>Editar</button>
                  <button onClick={() => onDelete(cliente.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8}>No hay clientes disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClienteList;
