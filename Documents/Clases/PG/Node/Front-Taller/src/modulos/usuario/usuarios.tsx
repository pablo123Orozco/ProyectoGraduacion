import React, { useState } from 'react';
import UserList from './usuariosList';
import UserForm from './usuariosForms';
import axios from 'axios';

// Definir la interfaz para el usuario, incluyendo 'contraseña' como opcional
interface User {
  id: number;
  nombre: string;
  apellido: string;
  nombreUsuario: string;
  contraseña?: string;  // Hacer opcional la contraseña
  estado: boolean;
  rol: string;
}

const UserModule: React.FC = () => {
  const [userToEdit, setUserToEdit] = useState<User | null>(null);  // Definir tipo User o null
  const [refresh, setRefresh] = useState<boolean>(false);  // Tipo booleano para refresh

  const handleEdit = (user: User) => {
    setUserToEdit(user);  // Al seleccionar un usuario para editar, se llena el formulario
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/api/usuarios`, { data: { id } });
      alert('Usuario eliminado');
      setRefresh(!refresh);  // Forzar refrescar la lista de usuarios
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  const handleSave = () => {
    setUserToEdit(null);  // Reseteamos el formulario al guardar
    setRefresh(!refresh);  // Forzar refrescar la lista de usuarios
  };

  return (
    <div>
      <UserForm userToEdit={userToEdit} onSave={handleSave} />
      <UserList onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default UserModule;
