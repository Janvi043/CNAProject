const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { spawn } = require('child_process');
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const MONGO_DB = process.env.MONGODB_DB || 'genomics_detector';
let db;

// Middleware
app.use(cors());
app.use(express.json());

// Multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Session store (simple in-memory for demo)
let sessionStore = {
  father: null,
  mother: null,
  relative: null
};

// Helper to run Python script
function runPythonScript(scriptName, data = {}) {
  return new Promise((resolve, reject) => {
    const defaultPython = 'python';
    const venvPython = path.join(__dirname, '..', '.venv', 'Scripts', 'python.exe');
    const pythonExec = fs.existsSync(venvPython) ? venvPython : defaultPython;
    const pythonProcess = spawn(pythonExec, [path.join(__dirname, '..', 'backend', 'scripts', scriptName + '.py')]);
    let dataStr = '';
    let error = '';

    // Send data to stdin
    pythonProcess.stdin.write(JSON.stringify(data));
    pythonProcess.stdin.end();

    pythonProcess.stdout.on('data', (chunk) => {
      dataStr += chunk.toString();
    });

    pythonProcess.stderr.on('data', (chunk) => {
      error += chunk.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        resolve(dataStr);
      } else {
        const message = error.trim() || `Python script exited with code ${code}`;
        reject(new Error(message));
      }
    });
  });
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Upload parent DNA
app.post('/api/upload-parent-dna', upload.fields([{ name: 'father' }, { name: 'mother' }]), async (req, res) => {
  try {
    const fatherSeq = await extractSequence(req.files.father[0].path);
    const motherSeq = await extractSequence(req.files.mother[0].path);

    sessionStore.father = fatherSeq;
    sessionStore.mother = motherSeq;

    res.json({ message: 'Parent DNA uploaded successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upload relative DNA
app.post('/api/upload-relative-dna', upload.fields([{ name: 'relation' }, { name: 'file' }]), async (req, res) => {
  try {
    const relation = req.body.relation;
    const sequence = await extractSequence(req.files.file[0].path);

    sessionStore.relative = { relation, sequence };

    res.json({ message: `${relation} DNA stored` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Disease analysis
app.get('/api/disease-analysis', async (req, res) => {
  try {
    // Call Python disease detection service
    const result = await runPythonScript('disease_detection', sessionStore);
    res.json(JSON.parse(result));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Priority alerts
app.get('/api/priority-alerts', async (req, res) => {
  try {
    const result = await runPythonScript('priority_alert', sessionStore);
    res.json(JSON.parse(result));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Query
app.post('/api/query', async (req, res) => {
  try {
    const { question } = req.body;
    const data = { ...sessionStore, question };
    const result = await runPythonScript('query', data);
    res.json(JSON.parse(result));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Report generation
app.get('/api/generate-report', async (req, res) => {
  try {
    const result = await runPythonScript('report', sessionStore);
    const payload = JSON.parse(result);
    if (!payload.path) {
      return res.status(500).json({ error: 'Report generation failed.' });
    }

    const reportPath = payload.path;
    res.download(reportPath);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Add or update a disease record in MongoDB
app.post('/api/add-disease', async (req, res) => {
  try {
    const { disease, marker, description } = req.body;
    if (!disease || !marker || !description) {
      return res.status(400).json({ error: 'Disease, marker, and description are all required.' });
    }

    const diseaseName = disease.trim();
    const markerText = marker.trim().toUpperCase();
    const descriptionText = description.trim();

    const existingDisease = await db.collection('disease_markers').findOne({
      disease: { $regex: `^${escapeRegex(diseaseName)}$`, $options: 'i' }
    });

    if (existingDisease) {
      return res.status(409).json({ error: 'Disease already exists.' });
    }

    await db.collection('disease_markers').insertOne({
      disease: diseaseName,
      marker: markerText
    });

    await db.collection('disease_info').insertOne({
      disease: diseaseName,
      description: descriptionText
    });

    res.json({ message: 'Disease record saved.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// List all medical disease records (marker + info)
app.get('/api/diseases', async (req, res) => {
  try {
    const markers = await db.collection('disease_markers').find({}).toArray();
    const info = await db.collection('disease_info').find({}).toArray();
    const infoMap = info.reduce((map, record) => {
      if (record.disease) {
        map[record.disease] = record.description || '';
      }
      return map;
    }, {});

    const merged = markers.map((record) => ({
      disease: record.disease,
      marker: record.marker,
      description: infoMap[record.disease] || ''
    }));

    res.json(merged);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Helper to extract sequence from file
async function extractSequence(filePath) {
  const fs = require('fs').promises;
  const content = await fs.readFile(filePath, 'utf-8');
  return content.split('\n').filter(line => !line.startsWith('>')).join('').trim();
}

async function startServer() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  db = client.db(MONGO_DB);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Connected to MongoDB at ${MONGO_URI}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
