import React from 'react';
import logo from '../assets/logo.png';
import '../styles/Banner.css';

const Banner = () => {
  return (
    <header className="header">
      <div className="header-right">
        <img
          src={logo}
          alt="Logo"
          className="header-logo"
        />
        <h1 className="header-text">La maison jungle</h1>
      </div>
    </header>
  )
}

export default Banner;
