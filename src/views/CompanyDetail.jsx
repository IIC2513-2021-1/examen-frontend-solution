import React from 'react';
import { useParams } from 'react-router-dom';

export default function Companies() {
  const { id } = useParams();

  return (
    <h1>
      Company Detail #
      {id}
    </h1>
  );
}
