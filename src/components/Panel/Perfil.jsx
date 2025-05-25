import React, { useState } from 'react';
import '../Styles/Perfil.css';

const Perfil = ({ user }) => {
  user = user || {
    name: "Nombre de Ejemplo",
    career: "Ingeniería de Sistemas",
    email: "ejemplo@correo.com"
  };
  // Datos simulados
  const [seguidores, setSeguidores] = useState(411);
  const cursos = [
    {
      nombre: "Matemáticas Avanzadas",
      descripcion: "Cálculo diferencial e integral, álgebra lineal...",
      progreso: 75
    },
    {
      nombre: "Programación Web",
      descripcion: "HTML, CSS, JavaScript y frameworks modernos...",
      progreso: 60
    },
    {
      nombre: "Bases de Datos",
      descripcion: "SQL, diseño de bases de datos relacionales...",
      progreso: 45
    }
  ];
  const publicaciones = [
    {
      id: 1,
      titulo: "Insignia Líder a nivel nacional",
      fecha: "Hace 1 semana",
      descripcion: "Reconocimiento por liderazgo en proyectos estudiantiles.",
    },
    {
      id: 2,
      titulo: "Insignia Planificación y Estrategia",
      fecha: "Hace 2 semanas",
      descripcion: "Por la destacada planificación en el desarrollo de software.",
    }
  ];

  return (
    <div className="background-universidad">
      <div className="contenido-blanco">
        <div className="perfil-wrapper">
          <div className="perfil-header">
            <img src={'/IMG_9683.JPG'} alt="Foto de perfil" id="fotoPerfil" />
            <div>
              <h2>{user.name}</h2>
              <p><strong>Carrera:</strong> {user.career}</p>
              <p><strong>Seguidores:</strong> {seguidores}</p>
            </div>
          </div>

          <div className="perfil-info">
            <p><strong>Universidad:</strong> IUSH</p>
            <p><strong>Correo electrónico:</strong> {user.email}</p>
            <p><strong>Teléfono:</strong> +57 300 123 4567</p>
            <p><strong>Semestre actual:</strong> 5° semestre</p>
          </div>

          <div className="perfil-section">
            <h3>Planes de Estudio</h3>
            <div className="cursos-list">
              {cursos.map((curso, index) => (
                <div key={index} className="curso-item">
                  <h4>{curso.nombre}</h4>
                  <p className="curso-desc">{curso.descripcion}</p>
                  <p className="curso-progreso">{curso.progreso}% completado</p>
                </div>
              ))}
            </div>
          </div>

          <div className="perfil-section">
            <div className="subscripcion">
              <h3>Plan Estudiantil Premium</h3>
              <ul>
                <li>Acceso a asesorías ilimitadas de una materia</li>
                <li>Cancelación en cualquier momento</li>
                <li>Mejor plan para estudiantes</li>
                <li>Uso compartido con compañeros</li>
              </ul>
              <button className="subscripcion-btn">Suscribirse</button>
            </div>
          </div>

          <div className="perfil-section">
            <h3>Publicaciones</h3>
            <div className="perfil-publicaciones-list">
              {publicaciones.map((pub) => (
                <div key={pub.id} className="perfil-publicacion-item">
                  <h4>{pub.titulo}</h4>
                  <span className="perfil-publicacion-fecha">{pub.fecha}</span>
                  <p>{pub.descripcion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;