import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import useAuth from '../../hooks/useAuth';

function Header() {
  const { currentUser, handleUserLogout } = useAuth();
  const userEmail = useMemo(() => {
    const { email } = jwtDecode(currentUser.access_token);
    return email;
  }, [currentUser]);

  return (
    <header className="app-header">
      <div className="brand">
        <Link to="/"><h1>Examen IIC2513 2021-1</h1></Link>
      </div>
      {currentUser && (
        <ul>
          <li>{userEmail}</li>
          <li>
            <button type="button" onClick={handleUserLogout}>
              Salir
            </button>
          </li>
        </ul>
      )}
    </header>
  );
}

export default Header;
