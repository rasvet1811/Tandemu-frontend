import React from 'react';
import '../Styles/PQR.css';

const Pqr = () => {
  return (
    <div className="background-universidad">
      <div className="contenido-blanco">
        <div className="pqr-wrapper">
          <h2 className="pqr-title">Preguntas Frecuentes</h2>
          <div className="pqr-faqs">
            <div className="pqr-faq-card horarios">
              <h3>Horarios</h3>
              <p><b>1: ¿Cuáles son los horarios de atención?</b><br />
              Lunes a viernes de 8:00 am a 6:00 pm, sábados de 9:00 am a 1:00 pm.</p>
              <p><b>2: ¿Hay atención en festivos?</b><br />
              No, el servicio no opera los días festivos.</p>
            </div>
            <div className="pqr-faq-card asesorias">
              <h3>Asesorías</h3>
              <p><b>1: ¿Cómo agendo una asesoría?</b><br />
              Puedes agendarla directamente en la sección de Asesorías seleccionando un asesor y horario.</p>
              <p><b>2: ¿Puedo cancelar una asesoría?</b><br />
              Sí, con mínimo 24 horas de anticipación desde tu perfil.</p>
            </div>
            <div className="pqr-faq-card contenidos">
              <h3>Contenidos</h3>
              <p><b>1: ¿Cómo subo material de estudio?</b><br />
              En la sección de Materias, selecciona la asignatura y usa el botón "Subir Contenido".</p>
              <p><b>2: ¿Qué tipos de archivo puedo subir?</b><br />
              PDF, Word, PowerPoint, Excel y archivos comprimidos (hasta 10MB).</p>
            </div>
          </div>

          <div className="pqr-form-card">
            <h3>¿No encontraste lo que buscabas?</h3>
            <form>
              <label>Tipo de solicitud:</label>
              <select>
                <option>Selecciona...</option>
                <option>Pregunta</option>
                <option>Queja</option>
                <option>Reclamo</option>
                <option>Sugerencia</option>
              </select>
              <label>Asunto:</label>
              <input type="text" />
              <label>Descripción detallada:</label>
              <textarea rows={4}></textarea>
              <button type="submit">Enviar solicitud</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pqr;