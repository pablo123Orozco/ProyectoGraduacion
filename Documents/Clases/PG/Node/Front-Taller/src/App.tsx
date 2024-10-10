import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './componentes/login';
import Dashboard from './componentes/dashboard';
import UserModule from './modulos/usuario/usuarios';  // Módulo de usuarios
import ClienteModule from './modulos/clientes/clientes';  // Módulo de clientes
import ProveedoresModule from './modulos/proveedores/proveedores';


function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/usuarios" element={<UserModule />} />  {/* Ruta para el módulo de usuarios */}
        <Route path="/clientes" element={<ClienteModule />} />  {/* Ruta para el módulo de clientes */}
        <Route path="/proveedores" element={<ProveedoresModule />} />  {/* Ruta para el módulo de clientes */}
      </Routes>
    </Router>
  );
}

export default App;
