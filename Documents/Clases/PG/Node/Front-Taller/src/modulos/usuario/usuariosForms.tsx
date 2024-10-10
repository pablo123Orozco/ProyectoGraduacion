import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Definir la interfaz para el usuario
interface User {
  id?: number;  // 'id' es opcional
  nombre: string;
  apellido: string;
  nombreUsuario: string;
  contraseña?: string;  // 'contraseña' es opcional
  estado: boolean;
  rol: string;
}

interface UserFormProps {
  userToEdit: User | null;
  onSave: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ userToEdit, onSave }) => {
  const [formData, setFormData] = useState<User>({
    nombre: '',
    apellido: '',
    nombreUsuario: '',
    contraseña: '',
    estado: true,
    rol: 'usuario',
  });

  useEffect(() => {
    if (userToEdit) {
      setFormData({
        id: userToEdit.id,  // Incluimos 'id' solo si existe (al editar)
        nombre: userToEdit.nombre,
        apellido: userToEdit.apellido,
        nombreUsuario: userToEdit.nombreUsuario,
        contraseña: '',  // Contraseña vacía al editar (no queremos sobrescribir si no se cambia)
        estado: userToEdit.estado,
        rol: userToEdit.rol,
      });
    }
  }, [userToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userToEdit) {
      // Actualizar usuario existente
      try {
        const updatedUser = { ...formData };  // Clonamos el formData
        // Eliminar la contraseña si está vacía, ya que no queremos cambiarla si no se proporciona
        if (!updatedUser.contraseña) {
          delete updatedUser.contraseña;
        }
        // Asegúrate de que el id está en la URL correcta
        await axios.put(`http://localhost:4000/api/usuarios/${userToEdit.id}`, updatedUser);
        alert('Usuario actualizado');
        onSave();  // Reseteamos el formulario al guardar
      } catch (error) {
        console.error('Error al actualizar usuario:', error);
      }
    } else {
      // Crear nuevo usuario
      try {
        await axios.post('http://localhost:4000/api/usuarios', formData);  // Crear nuevo usuario
        alert('Usuario creado');
        onSave();
      } catch (error) {
        console.error('Error al crear usuario:', error);
      }
    }
  };

  return (
    <div>
      <h2>{userToEdit ? 'Editar Usuario' : 'Agregar Usuario'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleChange}
        />
        <input
          type="text"
          name="nombreUsuario"
          placeholder="Nombre de Usuario"
          value={formData.nombreUsuario}
          onChange={handleChange}
        />
        <input
          type="password"
          name="contraseña"
          placeholder="Contraseña"
          value={formData.contraseña}
          onChange={handleChange}
        />
        <select name="rol" value={formData.rol} onChange={handleChange}>
          <option value="usuario">Usuario</option>
          <option value="admin">Admin</option>
        </select>
        <label>
          <input
            type="checkbox"
            name="estado"
            checked={formData.estado}
            onChange={(e) => setFormData({ ...formData, estado: e.target.checked })}
          />
          Activo
        </label>
        <button type="submit">{userToEdit ? 'Actualizar' : 'Agregar'}</button>
      </form>
    </div>
  );
};

export default UserForm;
