import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ active }) => {
  return (
    <header className="top-nav">
      <div className="top-nav__brand">
        <div className="top-nav__logo-circle">🧬</div>
        <div>
          <div className="top-nav__title">Genomics Detector</div>
        </div>
      </div>

      <nav className="top-nav__links">
        <Link to="/dashboard" className={`top-nav__link ${active === 'dashboard' ? 'top-nav__link--active' : ''}`}>Dashboard</Link>
        <Link to="/upload" className={`top-nav__link ${active === 'upload' ? 'top-nav__link--active' : ''}`}>Upload</Link>
        <Link to="/streaming" className={`top-nav__link ${active === 'streaming' ? 'top-nav__link--active' : ''}`}>Streaming</Link>
        <Link to="/disease" className={`top-nav__link ${active === 'disease' ? 'top-nav__link--active' : ''}`}>Disease</Link>
        <Link to="/query" className={`top-nav__link ${active === 'query' ? 'top-nav__link--active' : ''}`}>Query</Link>
        <Link to="/priority" className={`top-nav__link ${active === 'priority' ? 'top-nav__link--active' : ''}`}>Alerts</Link>
        <Link to="/summary" className={`top-nav__link ${active === 'summary' ? 'top-nav__link--active' : ''}`}>Summary</Link>
        <Link to="/medical" className={`top-nav__link ${active === 'medical' ? 'top-nav__link--active' : ''}`}>Medical</Link>
      </nav>
    </header>
  );
};

export default Header;