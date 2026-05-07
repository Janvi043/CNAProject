import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import Upload from './components/Upload';
import Streaming from './components/Streaming';
import Disease from './components/Disease';
import Query from './components/Query';
import Priority from './components/Priority';
import Summary from './components/Summary';
import Medical from './components/Medical';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/streaming" element={<Streaming />} />
          <Route path="/disease" element={<Disease />} />
          <Route path="/query" element={<Query />} />
          <Route path="/priority" element={<Priority />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/medical" element={<Medical />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;