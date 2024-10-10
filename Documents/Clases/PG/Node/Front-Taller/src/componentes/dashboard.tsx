import React, { useState } from 'react';
import Navbar from './navbar';
import Sidebar from './Sidebar';
import './dashboard.css'

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = (isOpen: boolean): void => {
    setIsSidebarOpen(isOpen);
  };

  return (
    <div className="dashboard-wrapper">
      <Navbar isSidebarOpen={isSidebarOpen} /> {/* Pasar el estado del sidebar al Navbar */}
      <div className={`dashboard-container${isSidebarOpen ? ' dashboard-container--shift' : ''}`}>
        <Sidebar toggleSidebar={toggleSidebar} /> {/* Manejar el estado del sidebar */}
        <div className="content">
          <h1>Bienvenido al Dashboard</h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
