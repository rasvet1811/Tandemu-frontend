import React, { useState } from 'react';
// import './CalendarioAsesorias.css';  // <-- Elimina o comenta esta línea

const CalendarioAsesorias = ({
  currentMonth,
  currentYear,
  cambiarMes,
  fechasOcupadas,
  fechaSeleccionada,
  setFechaSeleccionada,
  tareasPorFecha,
  asesoriasPorFecha
}) => {
  const [modalInfo, setModalInfo] = useState(null); // Para mostrar info de asesoría
  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const getMotivoOcupada = (fecha) => {
    const found = fechasOcupadas.find(f => f.fecha === fecha);
    return found ? found.motivo : '';
  };

  const generarCalendario = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const weeks = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const days = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < (firstDay === 0 ? 6 : firstDay - 1)) || day > daysInMonth) {
          days.push(<td key={`empty-${i}-${j}`}></td>);
        } else {
          const fecha = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const ocupada = Array.isArray(fechasOcupadas)
            ? (fechasOcupadas[0] && typeof fechasOcupadas[0] === 'object'
                ? fechasOcupadas.some(f => f.fecha === fecha)
                : fechasOcupadas.includes(fecha))
            : false;
          days.push(
            <td
              key={`day-${day}`}
              className={
                ocupada
                  ? 'calendario-celda ocupada'
                  : fecha === fechaSeleccionada
                  ? 'calendario-celda seleccionada'
                  : 'calendario-celda'
              }
              onClick={() => {
                if (ocupada) {
                  setModalInfo({ fecha, motivo: getMotivoOcupada(fecha) });
                } else {
                  setFechaSeleccionada(fecha);
                }
              }}
              style={{ cursor: ocupada ? 'pointer' : 'pointer' }}
            >
              <div>{day}</div>
              {tareasPorFecha && tareasPorFecha[fecha] && (
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: '0.85em', color: '#5e35b1' }}>
                  {tareasPorFecha[fecha].map((tarea, idx) => (
                    <li key={idx} style={{ marginTop: 2, whiteSpace: 'pre-line' }}>📌 {tarea}</li>
                  ))}
                </ul>
              )}
              {asesoriasPorFecha && asesoriasPorFecha[fecha] && (
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: '0.85em', color: '#a020f0' }}>
                  {asesoriasPorFecha[fecha].map((asesoria, idx) => (
                    <li key={idx} style={{ marginTop: 2, whiteSpace: 'pre-line' }}>🎓 {asesoria}</li>
                  ))}
                </ul>
              )}
            </td>
          );
          day++;
        }
      }
      weeks.push(<tr key={`week-${i}`}>{days}</tr>);
      if (day > daysInMonth) break;
    }
    return weeks;
  };

  return (
    <div className="calendario-asesorias">
      <div className="calendario-header">
        <button onClick={() => cambiarMes(-1)}>❮</button>
        <h3>{meses[currentMonth]} {currentYear}</h3>
        <button onClick={() => cambiarMes(1)}>❯</button>
      </div>
      <table className="calendario-table">
        <thead>
          <tr>
            <th>Lun</th><th>Mar</th><th>Mié</th><th>Jue</th><th>Vie</th><th>Sáb</th><th>Dom</th>
          </tr>
        </thead>
        <tbody>
          {generarCalendario()}
        </tbody>
      </table>
      <div className="calendario-leyenda">
        <span className="libre"></span> Libre
        <span className="ocupada"></span> Ocupada
        <span className="seleccionada"></span> Seleccionada
      </div>
      {modalInfo && (
        <div className="calendario-modal-backdrop">
          <div className="calendario-modal">
            <h3>Fecha ocupada</h3>
            <div className="fecha">{modalInfo.fecha}</div>
            <div className="motivo">{modalInfo.motivo}</div>
            <button onClick={() => setModalInfo(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarioAsesorias;
