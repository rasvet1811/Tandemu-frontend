import React, { useState } from 'react';
import '../Styles/Inicio.css';
import PQR from './PQR';

const tiposPublicacion = [
  { value: '', label: 'Todos' },
  { value: 'vacante', label: 'Vacantes' },
  { value: 'meme', label: 'Memes' },
  { value: 'general', label: 'General' },
];

const usuariosEjemplo = [
  'Maria Becerra',
  'Juan Pérez',
  'Ana García',
  'Tú',
];

const Inicio = ({ onSectionChange }) => {
  const [publicaciones, setPublicaciones] = useState([
    {
      id: 1,
      nombre: "Maria Becerra",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      fecha: "Hace 2 horas",
      texto: "¡Qué rico sería estar bajo los efectos de un sueldo de 15 millones de pesos!",
      tipo: 'general',
      imagen: null,
      guardado: false
    },
    {
      id: 2,
      nombre: "Juan Pérez",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      fecha: "Hace 1 hora",
      texto: "Nueva vacante para monitor de matemáticas disponible.",
      tipo: 'vacante',
      imagen: null,
      guardado: false
    },
    {
      id: 3,
      nombre: "Ana García",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      fecha: "Hace 10 minutos",
      texto: "¿Ya viste el meme de la semana? 😂",
      tipo: 'meme',
      imagen: null,
      guardado: false
    },
    // Otras publicaciones...
  ]);

  const [nuevaPublicacion, setNuevaPublicacion] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState('');
  const [busquedaUsuario, setBusquedaUsuario] = useState('');
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [tipoNuevaPublicacion, setTipoNuevaPublicacion] = useState('');
  const [archivo, setArchivo] = useState(null);
  const [archivoPreview, setArchivoPreview] = useState(null);
  const [archivoPreviewType, setArchivoPreviewType] = useState(null);

  // Actualiza resultados en vivo
  React.useEffect(() => {
    if (busquedaUsuario.trim() === '') {
      setUsuariosFiltrados([]);
    } else {
      setUsuariosFiltrados(
        usuariosEjemplo.filter(u =>
          u.toLowerCase().includes(busquedaUsuario.toLowerCase())
        )
      );
    }
  }, [busquedaUsuario]);

  const userName = localStorage.getItem('userName') || 'Usuario';
  const userAvatar = '/IMG_9683.JPG';

  // Guardar publicación
  const toggleGuardar = (id) => {
    setPublicaciones(pubs =>
      pubs.map(pub =>
        pub.id === id ? { ...pub, guardado: !pub.guardado } : pub
      )
    );
  };

  const handleArchivoChange = (e) => {
    const file = e.target.files[0];
    setArchivo(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setArchivoPreview(url);
      setArchivoPreviewType(file.type.startsWith('image') ? 'image' : 'video');
    } else {
      setArchivoPreview(null);
      setArchivoPreviewType(null);
    }
  };

  const publicar = () => {
    if (nuevaPublicacion.trim()) {
      const nueva = {
        id: publicaciones.length + 1,
        nombre: "Tú",
        avatar: "IMG_9683.JPG",
        fecha: "Ahora mismo",
        texto: nuevaPublicacion,
        tipo: tipoNuevaPublicacion || 'general',
        imagen: archivoPreviewType === 'image' ? archivoPreview : null,
        video: archivoPreviewType === 'video' ? archivoPreview : null,
        guardado: false
      };
      setPublicaciones([nueva, ...publicaciones]);
      setNuevaPublicacion('');
      setTipoNuevaPublicacion('');
      setArchivo(null);
      setArchivoPreview(null);
      setArchivoPreviewType(null);
    }
  };

  // Filtro de publicaciones
  const publicacionesFiltradas = publicaciones.filter(pub => {
    const coincideTipo = tipoFiltro ? pub.tipo === tipoFiltro : true;
    return coincideTipo;
  });

  return (
    <div className="background-universidad">
      <div className="contenido-blanco">
        <div style={{ display: 'flex', gap: 32 }}>
          {/* Filtros tipo sidebar */}
          <div className="filtros-sidebar">
            <div className="filtros-titulo">Filtrar<br />publicaciones</div>
            <button
              className={`filtro-btn${tipoFiltro === '' ? ' activo' : ''}`}
              onClick={() => setTipoFiltro('')}
            >
              Todas
            </button>
            <button
              className={`filtro-btn${tipoFiltro === 'academica' ? ' activo' : ''}`}
              onClick={() => setTipoFiltro('academica')}
            >
              Académicas
            </button>
            <button
              className={`filtro-btn${tipoFiltro === 'social' ? ' activo' : ''}`}
              onClick={() => setTipoFiltro('social')}
            >
              Sociales
            </button>
            <button
              className={`filtro-btn${tipoFiltro === 'anuncio' ? ' activo' : ''}`}
              onClick={() => setTipoFiltro('anuncio')}
            >
              Anuncios
            </button>
          </div>
          {/* Feed y barra de búsqueda */}
          <div style={{ flex: 1 }}>
            {/* Filtros y barra de búsqueda en la misma fila (solo búsqueda aquí) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <input
                  type="text"
                  placeholder="Buscar usuarios..."
                  value={busquedaUsuario}
                  onChange={e => setBusquedaUsuario(e.target.value)}
                  style={{ padding: 8, borderRadius: 8, border: '1px solid #ddd', width: '100%' }}
                />
                {busquedaUsuario && usuariosFiltrados.length > 0 && (
                  <div style={{
                    background: '#fff',
                    border: '1px solid #eee',
                    borderRadius: 8,
                    boxShadow: '0 2px 8px #0001',
                    position: 'absolute',
                    zIndex: 10,
                    width: '100%',
                    top: 38
                  }}>
                    {usuariosFiltrados.map((u, i) => (
                      <div key={i} style={{ padding: 8, borderBottom: '1px solid #f0f0f0', cursor: 'pointer' }}>
                        {u}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="crear-publicacion">
              <textarea
                placeholder="¿Qué deseas publicar hoy?"
                value={nuevaPublicacion}
                onChange={e => setNuevaPublicacion(e.target.value)}
              />
              <div className="inputs-row">
                {/* Selector de tipo */}
                <select
                  value={tipoNuevaPublicacion}
                  onChange={e => setTipoNuevaPublicacion(e.target.value)}
                >
                  <option value="">Selecciona tipo</option>
                  <option value="academica">Académica</option>
                  <option value="social">Social</option>
                  <option value="anuncio">Anuncio</option>
                </select>
                {/* Input de archivo oculto y label personalizado */}
                <label className="input-archivo-label">
                  Adjuntar imagen/video
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleArchivoChange}
                    className="input-archivo"
                  />
                </label>
              </div>
              {archivoPreview && (
                <div className="previsualizacion-archivo">
                  {archivoPreviewType === 'image' ? (
                    <img src={archivoPreview} alt="preview" />
                  ) : (
                    <video src={archivoPreview} controls />
                  )}
                </div>
              )}
              <button className="publicar-btn" onClick={publicar}>Publicar</button>
            </div>
            <div className="feed-publicaciones">
              {publicacionesFiltradas.map(pub => (
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
                  {pub.video && <video src={pub.video} controls className="publicacion-imagen" />}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;