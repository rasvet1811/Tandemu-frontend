import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';
import Inicio from './Inicio';
import Asesorias from './Asesorias';
import Materias from './Materias';
import PQR from './PQR';
import Perfil from './Perfil';
import '../Styles/Panel.css';

const Panel = ({ user }) => {
  const [activeSection, setActiveSection] = useState('inicio');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpiar datos de sesión
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    // Redirigir al login
    navigate('/');
  };

  const sections = {
    inicio: <Inicio onSectionChange={setActiveSection} />,
    asesorias: <Asesorias />,
    materias: <Materias />,
    pqr: <PQR />,
    perfil: <Perfil user={user} />
  };

  return (
    <div className="panel-container">
      <Header />
      <Navbar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
        onLogout={handleLogout}
      />
      <main>
        {sections[activeSection]}
      </main>
    </div>
  );
};

export default Panel;