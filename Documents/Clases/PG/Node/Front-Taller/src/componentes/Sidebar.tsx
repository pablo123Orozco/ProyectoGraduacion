import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importa Link para la navegación
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faCogs, faUser, faTable, faList } from '@fortawesome/free-solid-svg-icons';
import './sidebar.css';

interface SidebarProps {
  toggleSidebar: (isOpen: boolean) => void; // Especificamos el tipo para la función toggleSidebar
}

const Sidebar: React.FC<SidebarProps> = ({ toggleSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleTrigger = () => {
    setIsOpen(!isOpen);
    toggleSidebar(!isOpen); // Llamamos a toggleSidebar para informar el estado al componente padre
  };

  return (
    <div className={`sidebar${isOpen ? ' sidebar--open' : ''}`}>
      <div className="trigger" onClick={handleTrigger}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </div>

      <div className="sidebar-items">
        <div className="sidebar-position">
          <FontAwesomeIcon icon={faUser} />
          {isOpen && (
            <Link to="/usuarios">
              <span>Usuarios</span>
            </Link>
          )}
        </div>
        <div className="sidebar-position">
          <FontAwesomeIcon icon={faCogs} />
          {isOpen && (
            <Link to="/clientes">
              <span>Clientes</span>
            </Link>
          )}
        </div>
        <div className="sidebar-position">
          <FontAwesomeIcon icon={faTable} />
          {isOpen && (
            <Link to="/proveedores">
              <span>Priveedores</span>
            </Link>
          )}
        </div>
        <div className="sidebar-position">
          <FontAwesomeIcon icon={faList} />
          {isOpen && <span>Reportes</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
