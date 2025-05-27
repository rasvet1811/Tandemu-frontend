import React from 'react';

const ToggleTheme = ({ theme, setTheme }) => {
  return (
    <button
      className="toggle-theme-btn"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'light' ? '🌙 Modo oscuro' : '☀️ Modo claro'}
    </button>
  );
};

export default ToggleTheme;