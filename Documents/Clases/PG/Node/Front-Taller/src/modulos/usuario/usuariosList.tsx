import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Definir la interfaz para el usuario
interface User {
  id: number;
  nombre: string;
  apellido: string;
  nombreUsuario: string;
  estado: boolean;
  rol: string;
}

interface UserListProps {
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserList: React.FC<UserListProps> = ({ onEdit, onDelete }) => {
  const [users, setUsers] = useState<User[]>([]);  // Inicializamos con un arreglo vacío
  const [loading, setLoading] = useState<boolean>(true);  // Estado de carga
  const [error, setError] = useState<string | null>(null);  // Estado de error

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/usuarios');
      console.log('Respuesta completa de la API:', response);

      if (Array.isArray(response.data.body)) {
        setUsers(response.data.body);  // Establecemos los usuarios desde el cuerpo de la respuesta
      } else {
        console.warn('La respuesta de la API no es un arreglo:', response.data);
        setError('La estructura de la respuesta no es válida.');
      }
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      setError('Error al obtener los usuarios.');
    } finally {
      setLoading(false);  // Desactivar el estado de carga al finalizar
    }
  };

  if (loading) {
    return <div>Cargando usuarios...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Usuario</th>
            <th>Estado</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nombre}</td>
                <td>{user.apellido}</td>
                <td>{user.nombreUsuario}</td>
                <td>{user.estado ? 'Activo' : 'Inactivo'}</td>
                <td>{user.rol}</td>
                <td>
                  <button onClick={() => onEdit(user)}>Editar</button>
                  <button onClick={() => onDelete(user.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No hay usuarios disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
