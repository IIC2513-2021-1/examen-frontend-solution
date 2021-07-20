import React from 'react';
import useAuth from '../hooks/useAuth';

export default function Companies() {
  const { currentUser, handleUserLogout } = useAuth();
  return (
    <>
      <h1>Companies</h1>
      {currentUser && (
        <button type="button" onClick={handleUserLogout}>Logout</button>
      )}
    </>
  );
}
