import React, { useState } from 'react';
import { FaBook, FaChalkboardTeacher, FaCalendarAlt, FaHome, FaUser, FaSignOutAlt, FaBell, FaCommentDots, FaChevronDown } from 'react-icons/fa';

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
          <FaHome style={{ marginRight: 6 }} /> Inicio
        </a>
        <div className="navbar-dropdown">
          <a
            href="#"
            className={`agrupacion-btn${activeSection === 'materias' || activeSection === 'asesorias' || activeSection === 'calendario' ? ' active-dropdown' : ''}`}
            onClick={e => { e.preventDefault(); setOpenDropdown(v => !v); }}
          >
            Gestión Académica <FaChevronDown style={{ marginLeft: 4, fontSize: 12 }} />
          </a>
          {openDropdown && (
            <div className="dropdown-menu">
              <a
                href="#"
                onClick={e => { e.preventDefault(); onSectionChange('asesorias'); setOpenDropdown(false); }}
                className={activeSection === 'asesorias' ? 'active' : ''}
              >
                <FaChalkboardTeacher style={{ marginRight: 6 }} /> Asesorías
              </a>
              <a
                href="#"
                onClick={e => { e.preventDefault(); onSectionChange('materias'); setOpenDropdown(false); }}
                className={activeSection === 'materias' ? 'active' : ''}
              >
                <FaBook style={{ marginRight: 6 }} /> Materias
              </a>
              <a
                href="#"
                onClick={e => { e.preventDefault(); onSectionChange('calendario'); setOpenDropdown(false); }}
                className={activeSection === 'calendario' ? 'active' : ''}
              >
                <FaCalendarAlt style={{ marginRight: 6 }} /> Calendario
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
          <FaUser style={{ marginRight: 6 }} /> Perfil
        </a>
        <a
          href="#"
          onClick={e => { e.preventDefault(); onLogout(); }}
          className="salir"
        >
          <FaSignOutAlt style={{ marginRight: 6 }} /> Salir
        </a>
        <div className="navbar-icons">
          <FaBell className="navbar-icon" />
          <FaCommentDots className="navbar-icon" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;