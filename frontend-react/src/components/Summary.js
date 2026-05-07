import React, { useState } from 'react';
import Header from './Header';

const Summary = () => {
  const [loading, setLoading] = useState(false);

  const generateReport = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate-report');
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Genomic_Report.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert('Error generating report');
      }
    } catch (error) {
      alert('Error generating report');
    }
    setLoading(false);
  };

  return (
    <>
      <Header active="summary" />
      <div className="container">
        <div className="header">
          <h1>Analysis Summary & PDF</h1>
          <p className="subtitle">
            Generate comprehensive genomic analysis report
          </p>
        </div>

        <div className="card">
          <h3>Report Generation</h3>
          <p>Click the button below to generate and download a PDF report of the genomic analysis.</p>
          <button onClick={generateReport} disabled={loading}>
            {loading ? 'Generating...' : 'Generate PDF Report'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Summary;