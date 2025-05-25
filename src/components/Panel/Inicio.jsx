import React, { useState } from 'react';
import '../Styles/Inicio.css';
import PQR from './PQR';

const Inicio = ({ onSectionChange }) => {
  const [publicaciones, setPublicaciones] = useState([
    {
      id: 1,
      nombre: "Maria Becerra",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      fecha: "Hace 2 horas",
      texto: "¡Qué rico sería estar bajo los efectos de un sueldo de 15 millones de pesos!",
      imagen: null,
      guardado: false
    },
    // Otras publicaciones...
  ]);

  const [nuevaPublicacion, setNuevaPublicacion] = useState('');
  const [activeMenu, setActiveMenu] = useState('inicio');

  const userName = localStorage.getItem('userName') || 'Usuario';
  const userAvatar = '/IMG_9683.JPG'; // Cambia esto si tienes la URL de la foto en localStorage

  // Guardar publicación
  const toggleGuardar = (id) => {
    setPublicaciones(pubs =>
      pubs.map(pub =>
        pub.id === id ? { ...pub, guardado: !pub.guardado } : pub
      )
    );
  };

  const publicar = () => {
    if (nuevaPublicacion.trim()) {
      const nueva = {
        id: publicaciones.length + 1,
        nombre: "Tú",
        avatar: "IMG_9683.JPG",
        fecha: "Ahora mismo",
        texto: nuevaPublicacion,
        imagen: null,
        guardado: false
      };
      setPublicaciones([nueva, ...publicaciones]);
      setNuevaPublicacion('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="background-universidad">
      <div className="contenido-blanco">
        <div className="inicio-layout">
          <aside className="menu-lateral">
            <div className="perfil-menu-lateral" style={{cursor: 'pointer'}} onClick={() => onSectionChange('perfil')}>
              <img src={userAvatar} alt="avatar" className="avatar-menu-lateral" />
              <div className="nombre-menu-lateral">{userName}</div>
            </div>
            <div className="menu-titulo tandemu-cursiva">Tandemu</div>
            <ul>
              <li
                className={activeMenu === 'inicio' ? 'active' : ''}
                onClick={() => {
                  setActiveMenu('inicio');
                  scrollToTop();
                }}
              >
                Inicio
              </li>
              <li className={activeMenu === 'vacantes' ? 'active' : ''} onClick={() => setActiveMenu('vacantes')}>Vacantes</li>
              <li className={activeMenu === 'memes' ? 'active' : ''} onClick={() => setActiveMenu('memes')}>Memes</li>
              <li className={activeMenu === 'guardados' ? 'active' : ''} onClick={() => setActiveMenu('guardados')}>Guardados</li>
              <li
                className={activeMenu === 'pqr' ? 'active' : ''}
                onClick={() => onSectionChange('pqr')}
              >
                PQR
              </li>
            </ul>
            <div className="recomendadas-box">
              <h4>Publicaciones recomendadas</h4>
              <div className="recomendadas-list">
                {/* Ejemplo de publicaciones recomendadas */}
                <div className="recomendada-card">
                  <div className="recomendada-titulo">Vacante: Monitor de matemáticas</div>
                  <div className="recomendada-desc">¡Aplica para ser monitor y ayuda a otros estudiantes!</div>
                </div>
                <div className="recomendada-card">
                  <div className="recomendada-titulo">Meme del día</div>
                  <div className="recomendada-desc">¿Ya viste el meme de la semana? 😂</div>
                </div>
                {/* Puedes mapear un array si quieres hacerlo dinámico */}
              </div>
            </div>
          </aside>
          <main className="feed-main">
            {activeMenu === 'pqr' ? (
              <PQR />
            ) : (
              <>
                <div className="crear-publicacion">
                  <textarea
                    placeholder="¿Qué deseas publicar hoy?"
                    value={nuevaPublicacion}
                    onChange={e => setNuevaPublicacion(e.target.value)}
                    style={{width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ddd'}}
                  />
                  <button style={{marginTop: 10}} onClick={publicar}>Publicar</button>
                </div>
                <div className="feed-publicaciones">
                  {publicaciones.map(pub => (
                    <div className="publicacion-card" key={pub.id}>
                      <div className="publicacion-header">
                        <img src={pub.avatar} alt="avatar" className="publicacion-avatar" />
                        <div>
                          <div className="publicacion-nombre">{pub.nombre}</div>
                          <div className="publicacion-fecha">{pub.fecha}</div>
                        </div>
                      </div>
                      <div className="publicacion-texto">{pub.texto}</div>
                      {pub.imagen && <img src={pub.imagen} alt="publicacion" className="publicacion-imagen" />}
                      <div className="publicacion-acciones">
                        <button>👍 Me gusta</button>
                        <button>💬 Comentar</button>
                        <button onClick={() => toggleGuardar(pub.id)}>
                          {pub.guardado ? 'Guardado' : 'Guardar'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Inicio;