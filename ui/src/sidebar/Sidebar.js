import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

function Sidebar({ isOpen, onClose, links }) {
  return (
    <aside className={`sidebar ${isOpen ? 'show' : ''}`}>
      <button className="close-button" onClick={onClose}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      {/* <span className="dashboard-title">Dashboard</span> */}
      {links.map((link, index) => (
        <Link key={index} className="sidebar-link" to={link.path}>
          <span className="sidebar-item">{link.label}</span>
        </Link>
      ))}
    </aside>
  );
}

export default Sidebar;
