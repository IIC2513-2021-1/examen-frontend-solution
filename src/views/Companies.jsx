import React from 'react';
import Loading from '../components/Loading';

export default function Companies() {
  return (
    <div className="companies">
      <h1>Companies</h1>
      <ul>
        <li>
          <h2>Company 1</h2>
          <Loading />
        </li>
        <li>
          <h2>Company 2</h2>
          <Loading />
        </li>
      </ul>
    </div>
  );
}
