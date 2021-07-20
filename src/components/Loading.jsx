import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function Loading({ large = false }) {
  const className = `loading loading-${large ? 'lg' : 'sm'}`;
  return <FontAwesomeIcon className={className} icon={faSpinner} />;
}
