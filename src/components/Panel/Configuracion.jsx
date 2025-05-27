import React from 'react';

const Configuracion = ({ theme, setTheme }) => (
  <div>
    <h2>Configuración</h2>
    <p>Ajusta tus preferencias aquí.</p>
    <div style={{ marginTop: '24px' }}>
      <button
        className="toggle-theme-btn"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? '☀️ Modo claro' : '🌙 Modo oscuro'}
      </button>
    </div>
  </div>
);

export default Configuracion;
