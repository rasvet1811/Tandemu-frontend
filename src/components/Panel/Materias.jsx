import React, { useState } from 'react';
import CalendarioTareas from '../Panel/CalendarioMaterias';
import '../Styles/Materias.css';

const Materias = ({ fechasTareas, setFechasTareas, tareasPorFecha, setTareasPorFecha }) => {
  const [activeMateria, setActiveMateria] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [archivosPorMateria, setArchivosPorMateria] = useState({});
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [vistaActiva, setVistaActiva] = useState('materias'); // 'materias' o 'calendario'
  const [materias, setMaterias] = useState([
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
  ]);
  const [showModal, setShowModal] = useState(false);
  const [nuevaMateria, setNuevaMateria] = useState({ nombre: '', descripcion: '' });
  const [showTareaModal, setShowTareaModal] = useState(false);
  const [tareaData, setTareaData] = useState({ materiaId: '', fecha: '', hora: '', descripcion: '' });

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

  // Nueva función para agregar materia desde el modal
  const handleAgregarMateria = (e) => {
    e.preventDefault();
    if (!nuevaMateria.nombre.trim() || !nuevaMateria.descripcion.trim()) return;
    setMaterias(prev => [
      ...prev,
      {
        id: Date.now(),
        nombre: nuevaMateria.nombre,
        descripcion: nuevaMateria.descripcion,
        icono: '📚'
      }
    ]);
    setNuevaMateria({ nombre: '', descripcion: '' });
    setShowModal(false);
  };

  const abrirModalTarea = (materiaId) => {
    setTareaData({ materiaId, fecha: '', hora: '', descripcion: '' });
    setShowTareaModal(true);
  };

  const handleAsignarTarea = (e) => {
    e.preventDefault();
    if (!tareaData.fecha || !tareaData.hora || !tareaData.descripcion) return;
    const fechaHora = `${tareaData.fecha}T${tareaData.hora}`;
    // Agrega la fecha si no existe
    if (!fechasTareas.includes(tareaData.fecha)) {
      setFechasTareas(prev => [...prev, tareaData.fecha]);
    }
    // Agrega la tarea a la fecha
    setTareasPorFecha(prev => ({
      ...prev,
      [tareaData.fecha]: [...(prev[tareaData.fecha] || []), `${tareaData.descripcion} (${tareaData.hora})`]
    }));
    setShowTareaModal(false);
  };

  return (
    <div className="background-universidad">
      <div className="contenido-blanco">
        <main className="main-content">
          <div className="materias-header">
            <h2>Mis Materias</h2>
          </div>
          <button onClick={() => setShowModal(true)} style={{ display: 'block', margin: '18px auto 0 auto', padding: '8px 18px', borderRadius: 8, background: '#a020f0', color: '#fff', border: 'none', fontWeight: 600, fontSize: '1em', cursor: 'pointer' }}>
            + Agregar Materia
          </button>

          {/* Modal para agregar materia */}
          {showModal && (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <form onSubmit={handleAgregarMateria} style={{ background: '#fff', borderRadius: 16, padding: 32, minWidth: 320, boxShadow: '0 8px 32px rgba(160,32,240,0.18)' }}>
                <h3 style={{ marginTop: 0, color: '#a020f0' }}>Agregar Materia</h3>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Nombre:</label>
                  <input type="text" value={nuevaMateria.nombre} onChange={e => setNuevaMateria({ ...nuevaMateria, nombre: e.target.value })} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} required />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Descripción:</label>
                  <textarea value={nuevaMateria.descripcion} onChange={e => setNuevaMateria({ ...nuevaMateria, descripcion: e.target.value })} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', minHeight: 60 }} required />
                </div>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => setShowModal(false)} style={{ background: '#eee', color: '#a020f0', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 600, cursor: 'pointer' }}>Cancelar</button>
                  <button type="submit" style={{ background: '#a020f0', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 600, cursor: 'pointer' }}>Agregar</button>
                </div>
              </form>
            </div>
          )}
          <div className="materias-cards-grid">
            {materias.map(materia => (
              <div key={materia.id} className="materia-card-big">
                <div className="materia-card-header">
                  <div className="materia-card-title">{materia.nombre}</div>
                  <div className="materia-card-icon">{materia.icono}</div>
                </div>
                <div className="materia-card-desc">{materia.descripcion}</div>
                <div className="materia-card-actions">
                  <button onClick={() => abrirModalTarea(materia.id)}>Asignar Tarea</button>
                  <button>Ver tus tareas</button>
                  <button>Archivos</button>
                  <label style={{ background: '#1976d2', color: '#fff', borderRadius: 6, padding: '6px 16px', cursor: 'pointer', fontSize: '0.98em', marginLeft: 8 }}>
                    Subir Archivo
                    <input type="file" style={{ display: 'none' }} onChange={e => alert(`Archivo seleccionado: ${e.target.files[0]?.name || 'Ninguno'}`)} />
                  </label>
                </div>
              </div>
            ))}
          </div>

          {/* Modal para asignar tarea */}
          {showTareaModal && (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <form onSubmit={handleAsignarTarea} style={{ background: '#fff', borderRadius: 16, padding: 32, minWidth: 320, boxShadow: '0 8px 32px rgba(160,32,240,0.18)' }}>
                <h3 style={{ marginTop: 0, color: '#a020f0' }}>Asignar Tarea</h3>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Fecha:</label>
                  <input type="date" value={tareaData.fecha} onChange={e => setTareaData({ ...tareaData, fecha: e.target.value })} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} required />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Hora:</label>
                  <input type="time" value={tareaData.hora} onChange={e => setTareaData({ ...tareaData, hora: e.target.value })} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} required />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Descripción:</label>
                  <textarea value={tareaData.descripcion} onChange={e => setTareaData({ ...tareaData, descripcion: e.target.value })} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', minHeight: 60 }} required />
                </div>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => setShowTareaModal(false)} style={{ background: '#eee', color: '#a020f0', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 600, cursor: 'pointer' }}>Cancelar</button>
                  <button type="submit" style={{ background: '#a020f0', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 600, cursor: 'pointer' }}>Asignar</button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Materias;