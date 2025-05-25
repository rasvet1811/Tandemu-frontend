import React from 'react';

const Navbar = ({ activeSection, onSectionChange, onLogout }) => {
  return (
    <nav>
      <a 
        href="#" 
        onClick={(e) => {
          e.preventDefault();
          onSectionChange('inicio');
        }}
        className={activeSection === 'inicio' ? 'active' : ''}
      >
        Inicio
      </a>
      <a 
        href="#" 
        onClick={(e) => {
          e.preventDefault();
          onSectionChange('asesorias');
        }}
        className={activeSection === 'asesorias' ? 'active' : ''}
      >
        Asesorías
      </a>
      <a 
        href="#" 
        onClick={(e) => {
          e.preventDefault();
          onSectionChange('materias');
        }}
        className={activeSection === 'materias' ? 'active' : ''}
      >
        Materias
      </a>
      <a 
        href="#" 
        onClick={(e) => {
          e.preventDefault();
          onSectionChange('perfil');
        }}
        className={activeSection === 'perfil' ? 'active' : ''}
      >
        Perfil
      </a>
      <a 
        href="#" 
        onClick={(e) => {
          e.preventDefault();
          onLogout();
        }} 
        className="salir"
      >
        Salir
      </a>
    </nav>
  );
};

export default Navbar;