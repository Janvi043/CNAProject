import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <>
      <Header active="dashboard" />
      <div className="container">
        <div className="header">
          <h1>Genomics Dashboard</h1>
          <p className="subtitle">
            Parental & Relatives DNA analysis with disease risk assessment
          </p>
        </div>

        <div className="grid">
          <Link to="/upload" className="card-btn">
            DNA Upload
            <div style={{ fontSize: '32px', marginTop: '8px' }}>🧬</div>
          </Link>

          <Link to="/streaming" className="card-btn">
            Streaming Analysis
            <div style={{ fontSize: '30px', marginTop: '8px' }}>📡</div>
          </Link>

          <Link to="/disease" className="card-btn">
            Disease Marker Detection
            <div style={{ fontSize: '30px', marginTop: '8px' }}>🧪</div>
          </Link>

          <Link to="/query" className="card-btn">
            Real-Time Query Interface
            <div style={{ fontSize: '30px', marginTop: '8px' }}>🔍</div>
          </Link>

          <Link to="/priority" className="card-btn">
            Priority Alerts
            <div style={{ fontSize: '30px', marginTop: '8px' }}>🚨</div>
          </Link>

          <Link to="/summary" className="card-btn">
            Analysis Summary & PDF
            <div style={{ fontSize: '30px', marginTop: '8px' }}>📄</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Dashboard;