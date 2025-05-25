import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Auth/Login.css';

const API_BASE_URL = 'https://3jlcdw4g-5000.use2.devtunnels.ms/api/auth';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error en el inicio de sesión');

      localStorage.setItem('userName', data.name);
      localStorage.setItem('userEmail', data.email);

      alert('Inicio de sesión exitoso');
      navigate('/panel');
    } catch (error) {
      console.error('Error:', error.message);
      setError('Error en el inicio de sesión: ' + error.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error en el registro');

      localStorage.setItem('userName', data.name);
      localStorage.setItem('userEmail', data.email);

      alert('Registro exitoso');
      setIsSignUp(false);
    } catch (error) {
      console.error('Error:', error.message);
      setError('Error en el registro: ' + error.message);
    }
  };

  return (
    <div className={`container ${isSignUp ? 'right-panel-active' : ''}`} id="container">
      {/* Login Form */}
      <div className={`form-container sign-in-container`}>
        <form onSubmit={handleLogin}>
          <h2>Bienvenido a Tandemu</h2>
          <h1>Iniciar sesión</h1>
          {error && <p className="error-message">{error}</p>}
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </form>
      </div>

      {/* Sign Up Form */}
      <div className={`form-container sign-up-container`}>
        <form onSubmit={handleSignUp}>
          <h2>Bienvenido a Tandemu</h2>
          <h1>Crear cuenta</h1>
          {error && <p className="error-message">{error}</p>}
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Registrarse</button>
        </form>
      </div>

      {/* Overlay */}
      <div className="overlay-container">
        <div className="overlay">
          <div className={`overlay-panel overlay-left`}>
            <h2>Bienvenido a Tandemu</h2>
            <h1>¡Hola de nuevo!</h1>
            <p>Inicia sesión con tus datos</p>
            <button className="ghost" onClick={() => setIsSignUp(false)}>
              Iniciar sesión
            </button>
          </div>
          <div className={`overlay-panel overlay-right`}>
            <h2>Bienvenido a Tandemu</h2>
            <h1>¡Hola, amigo!</h1>
            <p>Introduce tus datos personales y empieza tu viaje</p>
            <button className="ghost" onClick={() => setIsSignUp(true)}>
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;