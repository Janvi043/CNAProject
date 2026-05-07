import React, { useState } from 'react';
import Header from './Header';
import './Upload.css';

const Upload = () => {
  const [fatherFile, setFatherFile] = useState(null);
  const [motherFile, setMotherFile] = useState(null);
  const [relativeFile, setRelativeFile] = useState(null);
  const [relation, setRelation] = useState("Father's Brother");
  const [status, setStatus] = useState('');

  const uploadParents = async () => {
    if (!fatherFile || !motherFile) {
      alert('Please select both Father and Mother DNA files');
      return;
    }

    const formData = new FormData();
    formData.append('father', fatherFile);
    formData.append('mother', motherFile);

    try {
      const response = await fetch('/api/upload-parent-dna', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      setStatus(data.message);
    } catch (error) {
      setStatus('Error uploading files');
    }
  };

  const uploadRelative = async () => {
    if (!relativeFile) {
      alert('Please select a relative DNA file');
      return;
    }

    const formData = new FormData();
    formData.append('relation', relation);
    formData.append('file', relativeFile);

    try {
      const response = await fetch('/api/upload-relative-dna', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      setStatus(data.message);
    } catch (error) {
      setStatus('Error uploading file');
    }
  };

  return (
    <>
      <Header active="upload" />
      <div className="container">
        <div className="header">
          <h1>Genomic Data Upload</h1>
          <p className="subtitle">
            Upload DNA sequences to initiate real-time genomic analysis
          </p>
        </div>

        <div className="card upload-card">
          <h3>Step 1 · Parent DNA (Required)</h3>
          <p className="note">
            Both parent DNA sequences are mandatory for inheritance and disease analysis.
          </p>

          <div className="upload-grid">
            <div className="file-field">
              <span className="file-label">Father DNA File</span>
              <label className="file-btn">
                🧬 Choose DNA File
                <input type="file" onChange={(e) => setFatherFile(e.target.files[0])} hidden />
              </label>
              <span className="file-name">{fatherFile ? fatherFile.name : 'No file selected'}</span>
            </div>

            <div className="file-field">
              <span className="file-label">Mother DNA File</span>
              <label className="file-btn">
                🧬 Choose DNA File
                <input type="file" onChange={(e) => setMotherFile(e.target.files[0])} hidden />
              </label>
              <span className="file-name">{motherFile ? motherFile.name : 'No file selected'}</span>
            </div>
          </div>

          <button onClick={uploadParents} className="primary-btn">
            Upload Parent DNA
          </button>
        </div>

        <div className="card upload-card">
          <h3>Step 2 · Relative DNA (Optional)</h3>
          <p className="note">
            Upload relative DNA to enrich comparative and priority-based analysis.
          </p>

          <label className="file-label">Relationship Type</label>
          <select value={relation} onChange={(e) => setRelation(e.target.value)}>
            <option>Father's Brother</option>
            <option>Father's Sister</option>
            <option>Mother's Brother</option>
            <option>Mother's Sister</option>
            <option>Other Relative</option>
          </select>

          <div className="file-field">
            <span className="file-label">Relative DNA File</span>
            <label className="file-btn">
              🧬 Choose DNA File
              <input type="file" onChange={(e) => setRelativeFile(e.target.files[0])} hidden />
            </label>
            <span className="file-name">{relativeFile ? relativeFile.name : 'No file selected'}</span>
          </div>

          <button onClick={uploadRelative} className="primary-btn">
            Upload Relative DNA
          </button>
        </div>

        {status && <p id="status">{status}</p>}
      </div>
    </>
  );
};

export default Upload;