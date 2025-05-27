import React, { useState } from 'react';
import { FaBook, FaChalkboardTeacher, FaCalendarAlt } from 'react-icons/fa';

const Navbar = ({ activeSection, onSectionChange, onLogout }) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-logo">Tandemu</span>
      </div>
      <div className="navbar-center">
        <a
          href="#"
          onClick={e => { e.preventDefault(); onSectionChange('inicio'); }}
          className={activeSection === 'inicio' ? 'active' : ''}
        >
          Inicio
        </a>
        {/* Agrupación académica */}
        <div
          className="navbar-dropdown"
          onMouseEnter={() => setOpenDropdown(true)}
          onMouseLeave={() => setOpenDropdown(false)}
        >
          <a href="#" className="agrupacion-btn">
            Académico ▼
          </a>
          {openDropdown && (
            <div className="dropdown-menu">
              <a
                href="#"
                onClick={e => { e.preventDefault(); onSectionChange('materias'); setOpenDropdown(false); }}
                className={activeSection === 'materias' ? 'active' : ''}
              >
                <FaBook style={{ marginRight: 6 }} /> Materias
              </a>
              <a
                href="#"
                onClick={e => { e.preventDefault(); onSectionChange('asesorias'); setOpenDropdown(false); }}
                className={activeSection === 'asesorias' ? 'active' : ''}
              >
                <FaChalkboardTeacher style={{ marginRight: 6 }} /> Asesorías
              </a>
              <a
                href="#"
                onClick={e => { e.preventDefault(); onSectionChange('calendario'); setOpenDropdown(false); }}
                className={activeSection === 'calendario' ? 'active' : ''}
              >
                <FaCalendarAlt style={{ marginRight: 6 }} /> Calendario Académico
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="navbar-right">
        <a
          href="#"
          onClick={e => { e.preventDefault(); onSectionChange('perfil'); }}
          className={activeSection === 'perfil' ? 'active' : ''}
        >
          Perfil
        </a>
        <a
          href="#"
          onClick={e => { e.preventDefault(); onLogout(); }}
          className="salir"
        >
          Salir
        </a>
      </div>
    </nav>
  );
};

export default Navbar;