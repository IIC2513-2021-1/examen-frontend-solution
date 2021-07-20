/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import authApi from '../api/auth';
import useAuth from '../hooks/useAuth';

function Login() {
  const [payload, setPayload] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const { currentUser, handleUserLogin } = useAuth();

  const handleChange = (event) => {
    setPayload((prevPayload) => ({
      ...prevPayload,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    const { email, password } = payload;
    event.preventDefault();
    setLoading(true);
    try {
      const user = await authApi.login(email, password);
      handleUserLogin(user);
    } catch (error) {
      console.log(error.message); // eslint-disable-line no-console
    } finally {
      setLoading(false);
    }
  };

  if (currentUser) return <Redirect to="/" />;

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h1>Login Examen</h1>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={payload.email}
            />
          </div>
          <div className="field">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={payload.password}
            />
          </div>
          <div className="actions">
            <button disabled={loading} type="submit">Ingresar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
