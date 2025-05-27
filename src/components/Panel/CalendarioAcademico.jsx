import React, { useState } from 'react';
import CalendarioAsesorias from './CalendarioAsesorias';
import '../Styles/CalendarioAcademico.css';

const CalendarioAcademico = ({ fechasOcupadas, tareasPorFecha, asesoriasPorFecha }) => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const cambiarMes = (delta) => {
    let newMonth = currentMonth + delta;
    let newYear = currentYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  console.log("Renderizando calendario", { currentMonth, currentYear, fechasOcupadas });

  return (
    <div className="background-universidad">
      <div className="contenido-blanco">
        <section id="calendario-academico" className="calendario-academico-layout">
          <div className="calendario-academico-box">
            <h2>
              <span style={{ verticalAlign: 'middle', marginRight: 8 }}>
                <svg width="24" height="24" fill="#5e35b1" viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zm0-13H5V6h14v1z"/></svg>
              </span>
              Calendario Académico
            </h2>
            <CalendarioAsesorias
              currentMonth={currentMonth}
              currentYear={currentYear}
              cambiarMes={cambiarMes}
              fechasOcupadas={fechasOcupadas}
              fechaSeleccionada={fechaSeleccionada}
              setFechaSeleccionada={setFechaSeleccionada}
              tareasPorFecha={tareasPorFecha}
              asesoriasPorFecha={asesoriasPorFecha}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default CalendarioAcademico;
