import React, { useState } from 'react';
import Header from './Header';

const Query = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleQuery = async () => {
    if (!question.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });
      const data = await response.json();
      setAnswer(data.answer || JSON.stringify(data));
    } catch (error) {
      setAnswer('Error processing query');
    }
    setLoading(false);
  };

  return (
    <>
      <Header active="query" />
      <div className="container">
        <div className="header">
          <h1>Real-Time Query Interface</h1>
          <p className="subtitle">
            Ask questions about the genomic analysis
          </p>
        </div>

        <div className="card">
          <h3>Ask a Question</h3>
          <div className="query-box">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question..."
            />
            <button onClick={handleQuery} disabled={loading}>
              {loading ? 'Processing...' : 'Ask'}
            </button>
          </div>
          {answer && (
            <div className="answer-box">
              {answer}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Query;