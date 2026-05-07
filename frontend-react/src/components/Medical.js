import React, { useState } from 'react';
import Header from './Header';

const Medical = () => {
  const [disease, setDisease] = useState('');
  const [marker, setMarker] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!disease.trim() || !marker.trim() || !description.trim()) {
      setStatus('Please complete all fields.');
      return;
    }

    try {
      const validateResponse = await fetch('/api/diseases');
      const existingDiseases = await validateResponse.json();
      const duplicate = existingDiseases.some((item) => item.disease.toLowerCase() === disease.trim().toLowerCase());

      if (duplicate) {
        setStatus('Disease already exists in the record.');
        return;
      }

      const response = await fetch('/api/add-disease', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ disease, marker, description })
      });

      const result = await response.json();
      if (response.ok) {
        setStatus(result.message || 'Disease added successfully.');
        setDisease('');
        setMarker('');
        setDescription('');
      } else {
        setStatus(result.error || 'Could not add disease.');
      }
    } catch (error) {
      setStatus('Error saving disease data.');
    }
  };

  return (
    <>
      <Header active="medical" />
      <div className="container">
        <div className="header">
          <h1>Medical Data Management</h1>
          <p className="subtitle">
            Add new disease markers and descriptions for genomic detection.
          </p>
        </div>

        <div className="card upload-card">
          <h3>Add New Disease</h3>
          <form onSubmit={handleSubmit} className="medical-form">
            <label className="file-label">Disease Name</label>
            <input
              type="text"
              value={disease}
              onChange={(e) => setDisease(e.target.value)}
              placeholder="e.g. Rare Genetic Disorder"
            />

            <label className="file-label">Marker Sequence</label>
            <input
              type="text"
              value={marker}
              onChange={(e) => setMarker(e.target.value)}
              placeholder="DNA marker sequence"
            />

            <label className="file-label">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A short disease description"
              rows={4}
            />

            <button type="submit" className="primary-btn">
              Save Disease
            </button>
          </form>
          {status && <p className="status">{status}</p>}
        </div>
      </div>
    </>
  );
};

export default Medical;
