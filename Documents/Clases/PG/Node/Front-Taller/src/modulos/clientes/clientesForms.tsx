import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Definir la interfaz para el cliente
interface Cliente {
  id?: number;  // 'id' es opcional
  nombre: string;
  apellido: string;
  nit: string;
  telefono: string;
  correo: string;
  estadoCuenta: string;
}

interface ClienteFormProps {
  clienteToEdit: Cliente | null;
  onSave: () => void;
}

const ClienteForm: React.FC<ClienteFormProps> = ({ clienteToEdit, onSave }) => {
  const [formData, setFormData] = useState<Cliente>({
    nombre: '',
    apellido: '',
    nit: '',
    telefono: '',
    correo: '',
    estadoCuenta: '',
  });

  useEffect(() => {
    if (clienteToEdit) {
      setFormData({
        id: clienteToEdit.id,  // Incluimos 'id' solo si existe (al editar)
        nombre: clienteToEdit.nombre,
        apellido: clienteToEdit.apellido,
        nit: clienteToEdit.nit,
        telefono: clienteToEdit.telefono,
        correo: clienteToEdit.correo,
        estadoCuenta: clienteToEdit.estadoCuenta,
      });
    }
  }, [clienteToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (clienteToEdit) {
      // Actualizar cliente existente
      try {
        await axios.put(`http://localhost:4000/api/clientes/${clienteToEdit.id}`, formData);
        alert('Cliente actualizado');
        onSave();
      } catch (error) {
        console.error('Error al actualizar cliente:', error);
      }
    } else {
      // Crear nuevo cliente
      try {
        await axios.post('http://localhost:4000/api/clientes', formData);
        alert('Cliente creado');
        onSave();
      } catch (error) {
        console.error('Error al crear cliente:', error);
      }
    }
  };

  return (
    <div>
      <h2>{clienteToEdit ? 'Editar Cliente' : 'Agregar Cliente'}</h2>
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
          name="nit"
          placeholder="NIT"
          value={formData.nit}
          onChange={handleChange}
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={formData.correo}
          onChange={handleChange}
        />
        <input
          type="text"
          name="estadoCuenta"
          placeholder="Estado de Cuenta"
          value={formData.estadoCuenta}
          onChange={handleChange}
        />
        <button type="submit">{clienteToEdit ? 'Actualizar' : 'Agregar'}</button>
      </form>
    </div>
  );
};

export default ClienteForm;
