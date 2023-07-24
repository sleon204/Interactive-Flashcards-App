import React from 'react';
import { Link } from 'react-router-dom';

function Breadcrumbs({ links }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {links.map((link, index) => (
          <li key={index} className={`breadcrumb-item${index === links.length - 1 ? ' active' : ''}`}>
            <Link to={link.url}>{link.label}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;