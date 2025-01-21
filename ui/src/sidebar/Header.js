import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

function Header({ onMenuClick }) {
  return (
    <header className="header">
      <button className="menu-button" onClick={onMenuClick}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <center style={{marginLeft:"22%"}}>I.K. Gujral Punjab Technical University</center>
    </header>
  );
}

export default Header;
