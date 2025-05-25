import React from 'react';
// import './CalendarioAsesorias.css';  // <-- Elimina o comenta esta línea

const CalendarioAsesorias = ({
  currentMonth,
  currentYear,
  cambiarMes,
  fechasOcupadas,
  fechaSeleccionada,
  setFechaSeleccionada
}) => {
  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

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
          const ocupada = fechasOcupadas.includes(fecha);
          days.push(
            <td
              key={`day-${day}`}
              className={
                ocupada
                  ? 'fecha-ocupada'
                  : fecha === fechaSeleccionada
                  ? 'fecha-seleccionada'
                  : 'fecha-libre'
              }
              onClick={() => !ocupada && setFechaSeleccionada(fecha)}
              style={{ cursor: ocupada ? 'not-allowed' : 'pointer' }}
            >
              {day}
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
      <div className="calendar-header">
        <button onClick={() => cambiarMes(-1)}>❮</button>
        <h3>{meses[currentMonth]} {currentYear}</h3>
        <button onClick={() => cambiarMes(1)}>❯</button>
      </div>
      <table className="calendar">
        <thead>
          <tr>
            <th>Lun</th><th>Mar</th><th>Mié</th><th>Jue</th><th>Vie</th><th>Sáb</th><th>Dom</th>
          </tr>
        </thead>
        <tbody>
          {generarCalendario()}
        </tbody>
      </table>
      <div className="leyenda">
        <span className="cuadro-libre"></span> Libre
        <span className="cuadro-ocupado"></span> Ocupada
        <span className="cuadro-seleccionada"></span> Seleccionada
      </div>
    </div>
  );
};

export default CalendarioAsesorias;
