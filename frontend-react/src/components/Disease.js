import React, { useState, useEffect } from 'react';
import Header from './Header';

const Disease = () => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const fetchAnalysis = async () => {
    setLoading(true);
    setStatus('Running disease analysis...');
    try {
      const response = await fetch('/api/disease-analysis');
      if (!response.ok) {
        throw new Error('Disease analysis request failed');
      }
      const data = await response.json();
      setAnalysis(data);
      setStatus(data && data.length ? 'Analysis complete.' : 'No diseases detected.');
    } catch (error) {
      console.error('Error fetching analysis:', error);
      setStatus('Unable to fetch analysis. Ensure DNA files are uploaded and try again.');
      setAnalysis(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAnalysis();
  }, []);

  return (
    <>
      <Header active="disease" />
      <div className="container">
        <div className="header">
          <h1>Disease Marker Detection</h1>
          <p className="subtitle">
            Analyze DNA sequences for potential disease markers
          </p>
        </div>

        <div className="card">
          <h3>Disease Analysis Results</h3>
          <p className="note">{status}</p>
          <button className="primary-btn" onClick={fetchAnalysis} disabled={loading}>
            {loading ? 'Analyzing...' : 'Re-run Analysis'}
          </button>
          {analysis && Array.isArray(analysis) && analysis.length ? (
            <ul className="result-list">
              {analysis.map((item, index) => (
                <li key={`${item.disease}-${index}`} className="result-item">
                  <div className="result-title">{item.disease}</div>
                  <div className="result-meta">Source: {item.source}</div>
                </li>
              ))}
            </ul>
          ) : (
            !loading && <p>No analysis available. Please upload DNA sequences first.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Disease;