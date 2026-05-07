import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <div className="dna-bg">
        {Array.from({ length: 20 }, (_, i) => (
          <span key={i}>🧬</span>
        ))}
      </div>
      <div className="landing-center no-click">
        <div className="landing-dna-main">🧬</div>
        <h1 className="landing-title">GENOMICS DETECTOR</h1>
        <p className="landing-hint">Choose your workflow below</p>

        <div className="landing-actions">
          <button className="landing-btn" onClick={() => navigate('/upload')}>
            DNA Upload
          </button>
          <button className="landing-btn landing-btn--secondary" onClick={() => navigate('/medical')}>
            Medical Representative
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;