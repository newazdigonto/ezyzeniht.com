import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const dataFilePath = path.join(rootDir, 'data', 'site-data.json');
const uploadsDir = path.join(rootDir, 'public', 'uploads');

// Ensure directories exist
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static images and uploads
app.use('/images', express.static(path.join(rootDir, 'public', 'images')));
app.use('/uploads', express.static(uploadsDir));

// Multer storage for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname) || '.jpg';
    const cleanBase = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9-_]/g, '_');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e6);
    cb(null, `${cleanBase}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 15 * 1024 * 1024 } // 15MB
});

// Helper to read data safely
function readSiteData() {
  try {
    const raw = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading site data:', err);
    return null;
  }
}

// Helper to write data safely
function writeSiteData(data) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing site data:', err);
    return false;
  }
}

// GET all content
app.get('/api/content', (req, res) => {
  const data = readSiteData();
  if (!data) {
    return res.status(500).json({ error: 'Failed to read site data' });
  }
  res.json(data);
});

// UPDATE entire content or section
app.post('/api/content', (req, res) => {
  const updatedData = req.body;
  if (!updatedData) {
    return res.status(400).json({ error: 'No data provided' });
  }
  const current = readSiteData() || {};
  const merged = { ...current, ...updatedData };
  if (writeSiteData(merged)) {
    res.json({ success: true, message: 'Content updated successfully', data: merged });
  } else {
    res.status(500).json({ error: 'Failed to save content' });
  }
});

// SLIDER PHOTO & CONTENT MANAGEMENT
app.post('/api/content/slider', (req, res) => {
  const { slides } = req.body;
  if (!Array.isArray(slides)) {
    return res.status(400).json({ error: 'Slides must be an array' });
  }
  const current = readSiteData() || {};
  current.heroSlides = slides;
  if (writeSiteData(current)) {
    res.json({ success: true, message: 'Slider updated successfully', slides: current.heroSlides });
  } else {
    res.status(500).json({ error: 'Failed to save slider' });
  }
});

// SERVICES & SERVICE PHOTO MANAGEMENT
app.post('/api/content/services', (req, res) => {
  const { services } = req.body;
  if (!Array.isArray(services)) {
    return res.status(400).json({ error: 'Services must be an array' });
  }
  const current = readSiteData() || {};
  current.services = services;
  if (writeSiteData(current)) {
    res.json({ success: true, message: 'Services updated successfully', services: current.services });
  } else {
    res.status(500).json({ error: 'Failed to save services' });
  }
});

// GOOGLE REVIEWS MANAGEMENT (Add, Update, Delete)
app.get('/api/content/reviews', (req, res) => {
  const current = readSiteData() || {};
  res.json(current.googleReviews || []);
});

app.post('/api/content/reviews', (req, res) => {
  const { review, reviews } = req.body;
  const current = readSiteData() || {};
  if (!current.googleReviews) current.googleReviews = [];

  if (Array.isArray(reviews)) {
    // Replace all reviews
    current.googleReviews = reviews;
  } else if (review) {
    if (review.id) {
      // Update existing or add new with specified ID
      const index = current.googleReviews.findIndex(r => r.id === review.id);
      if (index >= 0) {
        current.googleReviews[index] = { ...current.googleReviews[index], ...review };
      } else {
        current.googleReviews.unshift(review);
      }
    } else {
      // Create new review
      const newReview = {
        id: 'rev-' + Date.now(),
        author: review.author || 'Verified Client',
        role: review.role || 'Property Owner / Partner',
        location: review.location || 'United States',
        rating: Number(review.rating) || 5,
        date: review.date || 'Just now',
        avatar: review.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        text: review.text || '',
        verified: review.verified !== undefined ? review.verified : true,
        source: review.source || 'Google Review'
      };
      current.googleReviews.unshift(newReview);
    }
  } else {
    return res.status(400).json({ error: 'Must provide review object or reviews array' });
  }

  if (writeSiteData(current)) {
    res.json({ success: true, message: 'Google Reviews updated successfully', reviews: current.googleReviews });
  } else {
    res.status(500).json({ error: 'Failed to save reviews' });
  }
});

// DELETE Google Review
app.delete('/api/content/reviews/:id', (req, res) => {
  const { id } = req.params;
  const current = readSiteData() || {};
  if (!current.googleReviews) current.googleReviews = [];
  current.googleReviews = current.googleReviews.filter(r => r.id !== id);
  if (writeSiteData(current)) {
    res.json({ success: true, message: 'Review deleted', reviews: current.googleReviews });
  } else {
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

// PHOTO UPLOAD ENDPOINT
app.post('/api/upload', upload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({
    success: true,
    url: fileUrl,
    filename: req.file.filename,
    size: req.file.size
  });
});

// SUBMIT NEW LEAD / WORK ORDER / VENDOR APPLICATION
app.post('/api/leads', (req, res) => {
  const leadData = req.body;
  if (!leadData || !leadData.name) {
    return res.status(400).json({ error: 'Name and details are required' });
  }

  const current = readSiteData() || {};
  if (!current.leads) current.leads = [];

  const newLead = {
    id: 'lead-' + Date.now(),
    createdAt: new Date().toISOString(),
    status: 'New',
    ...leadData
  };

  current.leads.unshift(newLead);
  if (writeSiteData(current)) {
    res.json({ success: true, message: 'Your request has been received. Our coordination team will contact you shortly.', lead: newLead });
  } else {
    res.status(500).json({ error: 'Failed to save submission' });
  }
});

// UPDATE LEAD STATUS
app.patch('/api/leads/:id', (req, res) => {
  const { id } = req.params;
  const { status, adminNotes } = req.body;
  const current = readSiteData() || {};
  if (!current.leads) current.leads = [];

  const leadIndex = current.leads.findIndex(l => l.id === id);
  if (leadIndex === -1) {
    return res.status(404).json({ error: 'Lead not found' });
  }

  if (status) current.leads[leadIndex].status = status;
  if (adminNotes !== undefined) current.leads[leadIndex].adminNotes = adminNotes;

  if (writeSiteData(current)) {
    res.json({ success: true, lead: current.leads[leadIndex] });
  } else {
    res.status(500).json({ error: 'Failed to update lead' });
  }
});

// Serve frontend in production build if dist exists
const distDir = path.join(rootDir, 'dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api') && !req.path.startsWith('/uploads')) {
      res.sendFile(path.join(distDir, 'index.html'));
    }
  });
}

app.listen(PORT, () => {
  console.log(`EZY Zenith API Server running on port ${PORT}`);
});

