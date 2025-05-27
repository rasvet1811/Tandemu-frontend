import React, { useState } from 'react';
import CalendarioTareas from '../Panel/CalendarioMaterias';
import '../Styles/Materias.css';

const Materias = () => {
  const [activeMateria, setActiveMateria] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [archivosPorMateria, setArchivosPorMateria] = useState({});
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
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [vistaActiva, setVistaActiva] = useState('materias'); // 'materias' o 'calendario'

  const materias = [
    {
      id: 'matematicas',
      nombre: 'Matemáticas',
      icono: '📐',
      archivos: 8,
      descripcion: 'Contenidos: Apuntes de álgebra lineal, ejercicios de cálculo diferencial, guías de geometría analítica y exámenes pasados.',
    },
    {
      id: 'programacion',
      nombre: 'Programación',
      icono: '💻',
      archivos: 12,
      descripcion: 'Contenidos: Ejemplos de código en Python y Java, proyectos prácticos, guías de algoritmos y material de apoyo para HTML/CSS.',
    },
    {
      id: 'fisica',
      nombre: 'Física',
      icono: '⚛️',
      archivos: 5,
      descripcion: 'Contenidos: Apuntes de mecánica clásica, problemas resueltos de termodinámica, guías de laboratorio.',
    },
    {
      id: 'ingles',
      nombre: 'Inglés',
      icono: '🌎',
      archivos: 3,
      descripcion: 'Contenidos: Material de vocabulario técnico, ejercicios de gramática, guías de pronunciación.',
    }
  ];

  const handleProgramarTarea = (nuevaFecha) => {
    const tarea = prompt("Ingrese la tarea para esta fecha:");
    if (tarea) {
      setTareasPorFecha(prev => ({
        ...prev,
        [nuevaFecha]: [...(prev[nuevaFecha] || []), tarea]
      }));
      if (!fechasTareas.includes(nuevaFecha)) {
        setFechasTareas([...fechasTareas, nuevaFecha]);
      }
    }
  };

  const cambiarMes = (direccion) => {
    if (direccion === 'anterior') {
      if (currentMonth === 1) {
        setCurrentMonth(12);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else if (direccion === 'siguiente') {
      if (currentMonth === 12) {
        setCurrentMonth(1);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  return (
    <div className="background-universidad">
      <div className="contenido-blanco">
        <main className="main-content">
          <h2>Mis Materias</h2>
          <div className="materias-cards-grid">
            {materias.map(materia => (
              <div key={materia.id} className="materia-card-big">
                <div className="materia-card-header">
                  <div className="materia-card-title">{materia.nombre}</div>
                  <div className="materia-card-icon">{materia.icono}</div>
                </div>
                <div className="materia-card-desc">{materia.descripcion}</div>
                <div className="materia-card-actions">
                  <button>Ver tus tareas</button>
                  <button>Archivos</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Materias;