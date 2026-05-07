import React, { useState, useEffect } from 'react';
import Header from './Header';

const Priority = () => {
  const [alerts, setAlerts] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/priority-alerts');
      const data = await response.json();
      setAlerts(data);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  return (
    <>
      <Header active="priority" />
      <div className="container">
        <div className="header">
          <h1>Priority Alerts</h1>
          <p className="subtitle">
            Critical genomic alerts and notifications
          </p>
        </div>

        <div className="card">
          <h3>Alert Summary</h3>
          {loading ? (
            <p>Loading alerts...</p>
          ) : alerts ? (
            <div className="alert-lists">
              {['high', 'medium', 'low'].map((level) => (
                <div key={level} className={`alert-group alert-group--${level}`}>
                  <div className="alert-group__title">{level.charAt(0).toUpperCase() + level.slice(1)} Priority</div>
                  {alerts[level] && alerts[level].length ? (
                    <ul className="result-list">
                      {alerts[level].map((disease) => (
                        <li key={`${level}-${disease}`} className="result-item">
                          {disease}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="note">None</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No alerts available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Priority;