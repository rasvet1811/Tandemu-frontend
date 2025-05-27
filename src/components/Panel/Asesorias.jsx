import React, { useState } from 'react';
import '../Styles/Asesorias.css';

const Asesorias = () => {
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [currentAsesor, setCurrentAsesor] = useState('');
  const [currentCurso, setCurrentCurso] = useState('');
  const [fechaAsesoria, setFechaAsesoria] = useState('');
  const [horaAsesoria, setHoraAsesoria] = useState('09:00 AM');
  const [mensaje, setMensaje] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroMateria, setFiltroMateria] = useState('');
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const [modalidad, setModalidad] = useState('');
  const [intercambio, setIntercambio] = useState('');
  const [carrera, setCarrera] = useState('');
  const [fechasOcupadas, setFechasOcupadas] = useState([]);

  const asesores = [
    {
      nombre: "Juan Pérez",
      materia: "Matemáticas Avanzadas",
      descripcion: "Aprende los conceptos fundamentales de cálculo diferencial e integral, álgebra lineal y sus aplicaciones."
    },
    {
      nombre: "Ana García",
      materia: "Programación Web",
      descripcion: "Domina los fundamentos de HTML, CSS, JavaScript y frameworks modernos para desarrollo web."
    }
  ];

  // Filtros
  const asesoresFiltrados = asesores.filter(a => {
    const cumplePrecio = (!precioMin || a.precio >= precioMin) && (!precioMax || a.precio <= precioMax);
    const cumpleModalidad = !modalidad || a.modalidad === modalidad;
    const cumpleIntercambio = !intercambio || (intercambio === "si" ? a.intercambio : !a.intercambio);
    const cumpleCarrera = !carrera || a.carrera?.toLowerCase().includes(carrera.toLowerCase());

    return (
      a.nombre.toLowerCase().includes(filtroNombre.toLowerCase()) &&
      a.materia.toLowerCase().includes(filtroMateria.toLowerCase()) &&
      cumplePrecio &&
      cumpleModalidad &&
      cumpleIntercambio &&
      cumpleCarrera
    );
  });

  const mostrarCalendario = (asesor, curso) => {
    setCurrentAsesor(asesor);
    setCurrentCurso(curso);
    setShowCalendarModal(true);
  };

  const onFechaInputChange = (e) => {
    setFechaAsesoria(e.target.value);
  };

  const iniciarChat = (asesor) => {
    setCurrentAsesor(asesor);
    setChatMessages([
      {
        sender: asesor,
        text: '¡Hola! ¿En qué puedo ayudarte con tu asesoría?',
        time: new Date().toLocaleTimeString()
      }
    ]);
    setShowChatModal(true);
  };

  const confirmarAgendamiento = () => {
    if (!fechaAsesoria) {
      alert('Por favor selecciona una fecha');
      return;
    }

    alert(`Asesoría agendada correctamente:\n\nAsesor: ${currentAsesor}\nCurso: ${currentCurso}\nFecha: ${fechaAsesoria}\nHora: ${horaAsesoria}`);
    setShowCalendarModal(false);
    setFechaAsesoria('');
    setFechasOcupadas(prev => [
      ...prev,
      { fecha: fechaAsesoria, motivo: `Asesoría con ${currentAsesor} - ${currentCurso}` }
    ]);
  };

  const enviarMensaje = () => {
    if (mensaje.trim()) {
      const newMessage = {
        sender: 'Tú',
        text: mensaje,
        time: new Date().toLocaleTimeString()
      };
      setChatMessages(prev => {
        // Si es el primer mensaje del usuario, agrega el mensaje automático después
        if (prev.filter(m => m.sender === 'Tú').length === 0) {
          return [
            ...prev,
            newMessage,
            {
              sender: currentAsesor,
              text: 'Gracias por tu mensaje, en breve te responderé.',
              time: new Date().toLocaleTimeString()
            }
          ];
        } else {
          return [...prev, newMessage];
        }
      });
      setMensaje('');
    }
  };

  const cerrarModalCalendario = () => {
    setShowCalendarModal(false);
    setFechaAsesoria('');
  };

  return (
    <div className="background-universidad">
      <div className="contenido-blanco">
        <section id="asesorias" className="asesorias-layout">
          {/* Filtros a la izquierda */}
          <div className="filtros-adicionales">
            <h4>Filtrar por:</h4>
            <label>Precio:</label>
            <input
              type="number"
              placeholder="Mínimo"
              value={precioMin}
              onChange={e => setPrecioMin(e.target.value)}
              style={{ width: '45%', marginRight: '5%' }}
            />
            <input
              type="number"
              placeholder="Máximo"
              value={precioMax}
              onChange={e => setPrecioMax(e.target.value)}
              style={{ width: '45%' }}
            />
            <label>Modalidad:</label>
            <select value={modalidad} onChange={e => setModalidad(e.target.value)}>
              <option value="">Todas</option>
              <option value="presencial">Presencial</option>
              <option value="virtual">Virtual</option>
              <option value="hibrido">Híbrido</option>
            </select>
            <label>Intercambio de conocimiento:</label>
            <select value={intercambio} onChange={e => setIntercambio(e.target.value)}>
              <option value="">Todos</option>
              <option value="si">Sí</option>
              <option value="no">No</option>
            </select>
            <label>Carrera:</label>
            <input
              type="text"
              placeholder="Buscar carrera"
              value={carrera}
              onChange={e => setCarrera(e.target.value)}
            />
          </div>
          {/* Asesorías en el centro */}
          <div className="asesorias-lista">
            {asesoresFiltrados.map((asesor, index) => (
              <div key={index} className="course-card">
                <h3 className="course-title">{asesor.materia}</h3>
                <p className="course-description">{asesor.descripcion}</p>
                <p className="course-creator">Asesor: <strong>{asesor.nombre}</strong></p>
                <button onClick={() => mostrarCalendario(asesor.nombre, asesor.materia)}>Agendar Asesoría</button>
                <button onClick={() => iniciarChat(asesor.nombre)}>Contactar</button>
              </div>
            ))}
          </div>
          {/* Calendario a la derecha */}
          <div>
            {/* Calendario a la derecha */}
          </div>

          {/* Modal para calendario */}
          {showCalendarModal && (
            <div id="calendarModal" className="modal active">
              <div className="modal-content">
                <span className="close-btn" onClick={cerrarModalCalendario}>&times;</span>
                <h3 id="modalTitle">Agendar asesoría con <span id="asesorNombre">{currentAsesor}</span></h3>
                <p>Curso: <span id="cursoNombre">{currentCurso}</span></p>
                <div id="calendarPicker">
                  <p>Selecciona una fecha disponible:</p>
                  <input 
                    type="date" 
                    id="fechaAsesoria" 
                    style={{padding: '8px', width: '100%'}}
                    value={fechaAsesoria}
                    onChange={onFechaInputChange}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  <p>Hora: 
                    <select 
                      id="horaAsesoria" 
                      style={{padding: '8px', width: '100%'}}
                      value={horaAsesoria}
                      onChange={(e) => setHoraAsesoria(e.target.value)}
                    >
                      <option>09:00 AM</option>
                      <option>10:00 AM</option>
                      <option>11:00 AM</option>
                      <option>02:00 PM</option>
                      <option>03:00 PM</option>
                      <option>04:00 PM</option>
                    </select>
                  </p>
                </div>
                <button onClick={confirmarAgendamiento}>Confirmar</button>
              </div>
            </div>
          )}

          {/* Modal para chat */}
          {showChatModal && (
            <div id="chatModal" className="modal active">
              <div className="modal-content">
                <span className="close-btn" onClick={() => setShowChatModal(false)}>&times;</span>
                <h3>Chat con <span id="chatAsesor">{currentAsesor}</span></h3>
                <div className="chat-container" id="chatBox">
                  {chatMessages.map((msg, index) => (
                    <p key={index}>
                      <strong>{msg.sender}:</strong> {msg.text} <small>({msg.time})</small>
                    </p>
                  ))}
                </div>
                <input 
                  type="text" 
                  id="mensajeInput" 
                  placeholder="Escribe tu mensaje..." 
                  style={{width: '100%', padding: '8px', marginTop: '10px'}}
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && enviarMensaje()}
                />
                <button onClick={enviarMensaje} style={{marginTop: '10px'}}>Enviar</button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Asesorias;