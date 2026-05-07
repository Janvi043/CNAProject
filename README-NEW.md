# Genomics Detector - React & Node.js Version

This is the converted version of the Genomics Detector web application, now built with React.js frontend and Node.js backend, while keeping the DSA (Data Structures and Algorithms) part in Python.

## Architecture

- **Frontend**: React.js with React Router for navigation
- **Backend**: Node.js with Express.js
- **DSA**: Python (sliding window, validation algorithms)
- **Data**: MongoDB (seeded from CSV files)

## Project Structure

```
genomics_detector/
├── backend/                    # Original Python backend (DSA)
│   ├── dsa/                   # Python algorithms
│   ├── scripts/               # Python scripts called by Node.js
│   ├── services/              # Python services
│   └── data/                  # CSV data files
├── backend-node/              # New Node.js backend
│   ├── server.js              # Express server
│   └── package.json
├── frontend-react/            # New React frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── App.js             # Main app with routing
│   │   └── index.js
│   ├── public/
│   └── package.json
└── README.md
```

## Features

- DNA sequence upload (parent and relative)
- Disease marker detection using sliding window algorithm
- Real-time query interface
- Priority alerts
- PDF report generation
- Responsive UI matching the original design

## Setup and Running

### Prerequisites

- Node.js (v14 or higher)
- Python 3.x
- npm

### Installation

1. **Install backend dependencies:**
   ```bash
   cd backend-node
   npm install
   ```

2. **Install Python dependencies:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Install frontend dependencies:**
   ```bash
   cd frontend-react
   npm install
   ```

### Running the Application

1. **Seed MongoDB:**
   ```bash
   cd backend
   python scripts/seed_mongodb.py
   ```
   This imports the disease markers and disease information into MongoDB.

2. **Start the Node.js backend:**
   ```bash
   cd backend-node
   npm start
   ```
   The backend will run on http://localhost:3001

3. **Start the React frontend:**
   ```bash
   cd frontend-react
   npm start
   ```
   The frontend will run on http://localhost:3000 and proxy API calls to the backend.

### Usage

1. Open http://localhost:3000 in your browser
2. Click anywhere on the landing page to enter the dashboard

> If MongoDB is not on the default localhost port, set `MONGODB_URI` before running the seed script and app.
> Example: `export MONGODB_URI="mongodb://127.0.0.1:27017"`
3. Upload parent DNA sequences
4. Optionally upload relative DNA
5. Navigate through different sections:
   - Disease detection
   - Query interface
   - Priority alerts
   - Generate PDF report

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/upload-parent-dna` - Upload parent DNA files
- `POST /api/upload-relative-dna` - Upload relative DNA file
- `GET /api/disease-analysis` - Get disease analysis
- `GET /api/priority-alerts` - Get priority alerts
- `POST /api/query` - Query the system
- `GET /api/generate-report` - Generate PDF report

## DSA (Python)

The core algorithms remain in Python:
- Sliding window analysis
- DNA sequence validation
- Disease marker matching

These are called from the Node.js backend using child processes.

## Original Functionality

All original features have been preserved:
- Sliding window algorithm for pattern matching
- Disease marker detection from CSV data
- Inheritance analysis
- Comparative streaming (placeholder for now)
- PDF report generation</content>
<parameter name="filePath">c:\Users\subas\OneDrive\Desktop\CNA App\genomics_detector\README-NEW.md