import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket } from '@fortawesome/free-solid-svg-icons';
import jwtDecode from 'jwt-decode';
import useAuth from '../../hooks/useAuth';
import useOption from '../../hooks/useOption';

function Header() {
  const { currentUser, handleUserLogout } = useAuth();
  const { option, toggleOption } = useOption();
  const userEmail = useMemo(() => {
    const { email } = jwtDecode(currentUser.access_token);
    return email;
  }, [currentUser]);

  return (
    <header className="app-header">
      <Link className="brand" to="/">
        <div>
          <FontAwesomeIcon icon={faRocket} />
          <h1>Examen IIC2513 2021-1</h1>
        </div>
      </Link>
      <button type="button" onClick={toggleOption}>
        Mostrar
        {' '}
        {option === 'milestones' ? 'stats' : 'milestones'}
      </button>
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
