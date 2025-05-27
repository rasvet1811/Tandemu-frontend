import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Inicio from './Inicio';
import Asesorias from './Asesorias';
import Materias from './Materias';
import PQR from './PQR';
import Perfil from './Perfil';
import CalendarioAcademico from './CalendarioAcademico';
import '../Styles/Panel.css';

const Panel = ({ user }) => {
  const [activeSection, setActiveSection] = useState('inicio');
  const navigate = useNavigate();
  const [fechasOcupadas, setFechasOcupadas] = useState([
    // { fecha: "2025-05-12", motivo: "Asesoría con Juan Pérez - Matemáticas" }
  ]);
  const [fechasTareas, setFechasTareas] = useState([
    '2025-10-01',
    '2025-10-05',
    '2025-10-10',
    '2025-10-15',
    '2025-10-20',
    '2025-10-25',
    '2025-10-30'
  ]);
  const [tareasPorFecha, setTareasPorFecha] = useState({
    '2025-10-01': ['Tarea de Matemáticas', 'Proyecto de Programación'],
    '2025-10-05': ['Examen de Física'],
    '2025-10-15': ['Entrega de ensayo'],
    '2025-10-20': ['Revisión de proyecto'],
    '2025-10-25': ['Presentación final']
  });
  const [asesoriasPorFecha, setAsesoriasPorFecha] = useState({
    // '2025-10-01': ['Asesoría con Juan Pérez (Matemáticas Avanzadas) 09:00 AM']
  });

  const handleLogout = () => {
    // Limpiar datos de sesión
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    // Redirigir al login
    navigate('/');
  };

  const sections = {
    inicio: <Inicio onSectionChange={setActiveSection} />,
    asesorias: <Asesorias setFechasOcupadas={setFechasOcupadas} fechasOcupadas={fechasOcupadas} asesoriasPorFecha={asesoriasPorFecha} setAsesoriasPorFecha={setAsesoriasPorFecha} />,
    materias: <Materias fechasTareas={fechasTareas} setFechasTareas={setFechasTareas} tareasPorFecha={tareasPorFecha} setTareasPorFecha={setTareasPorFecha} />,
    calendario: <CalendarioAcademico fechasOcupadas={fechasTareas} tareasPorFecha={tareasPorFecha} asesoriasPorFecha={asesoriasPorFecha} />,
    pqr: <PQR />,
    perfil: <Perfil user={user} />
  };

  return (
    <div className="panel-container">
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