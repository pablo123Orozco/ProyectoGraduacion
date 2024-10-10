import React, { useState } from 'react';
import ClienteList from './clientesList';
import ClienteForm from './clientesForms';
import axios from 'axios';

interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  nit: string;
  telefono: string;
  correo: string;
  estadoCuenta: string;
}

const ClienteModule: React.FC = () => {
  const [clienteToEdit, setClienteToEdit] = useState<Cliente | null>(null);  // Definir tipo Cliente o null
  const [refresh, setRefresh] = useState<boolean>(false);  // Tipo booleano para refresh

  const handleEdit = (cliente: Cliente) => {  // Declarar explícitamente el tipo del parámetro cliente
    setClienteToEdit(cliente);
  };

  const handleDelete = async (id: number) => {  // Declarar explícitamente el tipo del parámetro id
    try {
      await axios.delete(`http://localhost:4000/api/clientes/${id}`);
      alert('Cliente eliminado');
      setRefresh(!refresh);  // Forzar refrescar la lista de clientes
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
    }
  };

  const handleSave = () => {
    setClienteToEdit(null);
    setRefresh(!refresh);  // Forzar refrescar la lista de clientes
  };

  return (
    <div>
      <ClienteForm clienteToEdit={clienteToEdit} onSave={handleSave} /> {/* Propiedad clienteToEdit se pasa a ClienteForm */}
      <ClienteList onEdit={handleEdit} onDelete={handleDelete} /> {/* ClienteList solo necesita onEdit y onDelete */}
    </div>
  );
};

export default ClienteModule;
