import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function Loading({ large = false, fullscreen = false }) {
  const className = `loading loading-${large ? 'lg' : 'sm'}`;
  const loadingComponent = <FontAwesomeIcon className={className} icon={faSpinner} />;

  if (!fullscreen) return loadingComponent;

  return (
    <div className="loading-container">
      {loadingComponent}
    </div>
  );
}
