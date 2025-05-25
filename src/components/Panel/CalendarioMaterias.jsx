import React from 'react';
import '../Styles/Materias.css';

const CalendarioTareas = ({ 
  fechasOcupadas, 
  onProgramarTarea, 
  cambiarMes, 
  currentMonth, 
  currentYear,
  tareasPorFecha // Nuevo prop para las tareas por fecha
}) => {
  // Función para obtener el nombre del día abreviado
  const getNombreDia = (dia) => {
    const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    return dias[dia];
  };

  // Función para generar los días del mes
  const generarDiasMes = (month, year) => {
    const date = new Date(year, month - 1, 1);
    const days = [];
    
    // Obtener el primer día del mes
    const firstDay = date.getDay();
    
    // Obtener el número de días en el mes
    const daysInMonth = new Date(year, month, 0).getDate();
    
    // Obtener el número de días del mes anterior a mostrar
    const diasMesAnterior = firstDay === 0 ? 6 : firstDay - 1;
    
    // Mes anterior
    const lastDayPrevMonth = new Date(year, month - 1, 0).getDate();
    for (let i = diasMesAnterior; i > 0; i--) {
      const day = lastDayPrevMonth - i + 1;
      days.push({
        day,
        date: '',
        isCurrentMonth: false,
        ocupado: false
      });
    }
    
    // Días del mes actual
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = `${year}-${month.toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
      days.push({
        day: i,
        date: currentDate,
        isCurrentMonth: true,
        ocupado: fechasOcupadas.includes(currentDate),
        tareas: tareasPorFecha[currentDate] || []
      });
    }
    
    // Días del siguiente mes a mostrar
    const diasRestantes = 42 - days.length; // 6 semanas
    for (let i = 1; i <= diasRestantes; i++) {
      days.push({
        day: i,
        date: '',
        isCurrentMonth: false,
        ocupado: false
      });
    }
    
    return days;
  };

  const diasMes = generarDiasMes(currentMonth, currentYear);
  const nombresMeses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Agrupar días por semana
  const semanas = [];
  for (let i = 0; i < diasMes.length; i += 7) {
    semanas.push(diasMes.slice(i, i + 7));
  }

  return (
    <div className="google-calendar">
      <div className="calendar-header">
        <h2>{nombresMeses[currentMonth - 1]} {currentYear}</h2>
        <div className="calendar-nav">
          <button onClick={() => cambiarMes('anterior')}>&lt;</button>
          <button onClick={() => cambiarMes('siguiente')}>&gt;</button>
        </div>
      </div>
      
      <div className="calendar-grid">
        {/* Encabezados de días */}
        <div className="calendar-week-header">
          {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((dia) => (
            <div key={dia} className="calendar-day-header">{dia}</div>
          ))}
        </div>
        
        {/* Semanas */}
        {semanas.map((semana, semanaIndex) => (
          <div key={semanaIndex} className="calendar-week">
            {semana.map((dia, diaIndex) => (
              <div 
                key={diaIndex} 
                className={`calendar-day 
                  ${!dia.isCurrentMonth ? 'other-month' : ''} 
                  ${dia.ocupado ? 'occupied' : 'free'}
                `}
                onClick={() => dia.isCurrentMonth && onProgramarTarea(dia.date)}
              >
                <div className="day-number">{dia.day}</div>
                {dia.tareas && dia.tareas.length > 0 && (
                  <div className="tasks-container">
                    {dia.tareas.slice(0, 2).map((tarea, i) => (
                      <div key={i} className="task-event">{tarea}</div>
                    ))}
                    {dia.tareas.length > 2 && (
                      <div className="more-tasks">+{dia.tareas.length - 2} más</div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarioTareas;