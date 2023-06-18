import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Breadcrumbs() {
  const location = useLocation();
  const paths = location.pathname.split('/').filter((path) => path !== '');

  // Check if the current path is the root path ("/")
  if (paths.length === 0) {
    return null; // Render nothing if it's the root path
  }

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        {paths.map((path, index) => (
          <li
            className={`breadcrumb-item ${index === paths.length - 1 ? 'active' : ''}`}
            aria-current={index === paths.length - 1 ? 'page' : ''}
            key={index}
          >
            {index === paths.length - 1 ? (
              <span>{path}</span>
            ) : (
              <Link to={`/${paths.slice(0, index + 1).join('/')}`}>{path}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
