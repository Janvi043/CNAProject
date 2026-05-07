import React, { useState, useEffect } from 'react';
import Header from './Header';

const Streaming = () => {
  const [status, setStatus] = useState('Waiting for DNA upload and analysis...');
  const [streamingActive, setStreamingActive] = useState(true);

  const performStreaming = async () => {
    setStreamingActive(true);
    setStatus('Live streaming DNA comparison in progress...');

    try {
      const diseaseRes = await fetch('/api/disease-analysis');
      const alertRes = await fetch('/api/priority-alerts');

      if (!diseaseRes.ok || !alertRes.ok) {
        throw new Error('Live analysis request failed');
      }

      await diseaseRes.json();
      await alertRes.json();
      setStatus('Streaming done.');
    } catch (error) {
      console.error(error);
      setStatus('Streaming failed. Check DNA upload and backend connection.');
    } finally {
      setStreamingActive(false);
    }
  };

  useEffect(() => {
    performStreaming();
  }, []);

  return (
    <>
      <Header active="streaming" />
      <div className="container">
        <div className="header">
          <h1>Streaming Analysis</h1>
          <p className="subtitle">
            Real-time DNA sequence comparison and analysis
          </p>
        </div>

        <div className="card streaming-card streaming-card--simple">
          <div className="streaming-visual">
            {streamingActive ? (
              <div className="helix">
                {Array.from({ length: 12 }, (_, index) => (
                  <span key={index} className="helix-dot" style={{ animationDelay: `${index * 0.08}s` }} />
                ))}
              </div>
            ) : (
              <div className="helix helix--done">
                <span>✔</span>
              </div>
            )}
            <div className="streaming-info">
              <h3>Live Stream Status</h3>
              <p>{status}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Streaming;