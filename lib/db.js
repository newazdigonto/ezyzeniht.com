import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

let pool = null;
let isMySQLLive = false;
let dbStatusMessage = 'Initializing database...';

const rootDir = process.cwd();
const dataFilePath = path.join(rootDir, 'data', 'site-data.json');

// Initialize MySQL pool safely
function getPool() {
  if (pool) return pool;

  const dbHost = process.env.DB_HOST || 'localhost';
  const dbPort = parseInt(process.env.DB_PORT || '3306', 10);
  const dbUser = process.env.DB_USER;
  const dbPassword = process.env.DB_PASSWORD || '';
  const dbName = process.env.DB_NAME;

  if (!dbUser || !dbName) {
    isMySQLLive = false;
    dbStatusMessage = 'MySQL environment variables (DB_USER, DB_NAME) not set. Running in resilient JSON storage mode.';
    return null;
  }

  try {
    pool = mysql.createPool({
      host: dbHost,
      port: dbPort,
      user: dbUser,
      password: dbPassword,
      database: dbName,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      connectTimeout: 5000,
    });
    return pool;
  } catch (err) {
    console.warn('Could not initialize MySQL pool:', err.message);
    isMySQLLive = false;
    dbStatusMessage = `MySQL Init Error: ${err.message}`;
    return null;
  }
}

// Check MySQL connection
export async function testConnection() {
  const p = getPool();
  if (!p) {
    return {
      connected: false,
      engine: 'Local JSON File Mode',
      message: dbStatusMessage,
      dbName: process.env.DB_NAME || 'None',
      host: process.env.DB_HOST || 'localhost'
    };
  }

  try {
    const connection = await p.getConnection();
    await connection.ping();
    connection.release();
    isMySQLLive = true;
    dbStatusMessage = 'Connected to cPanel MySQL database successfully.';
    return {
      connected: true,
      engine: 'MySQL (cPanel Ready)',
      message: dbStatusMessage,
      dbName: process.env.DB_NAME,
      host: process.env.DB_HOST
    };
  } catch (err) {
    isMySQLLive = false;
    dbStatusMessage = `MySQL Connection failed (${err.code || err.message}). Fallback to local JSON storage.`;
    return {
      connected: false,
      engine: 'Local JSON File Mode (Fallback)',
      message: dbStatusMessage,
      dbName: process.env.DB_NAME || 'None',
      host: process.env.DB_HOST || 'localhost',
      error: err.message
    };
  }
}

// Read site data from local JSON
function readLocalData() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return null;
    }
    const raw = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading local JSON:', err);
    return null;
  }
}

// Write site data to local JSON
function writeLocalData(data) {
  try {
    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing local JSON:', err);
    return false;
  }
}

// GET FULL SITE DATA (MySQL first, fallback to JSON)
export async function getFullSiteData() {
  const p = getPool();
  if (p) {
    try {
      // 1. Company Settings
      const [settingsRows] = await p.query('SELECT * FROM company_settings LIMIT 1');
      // 2. Hero Slides
      const [slidesRows] = await p.query('SELECT * FROM hero_slides ORDER BY sort_order ASC, id ASC');
      // 3. Services
      const [servicesRows] = await p.query('SELECT * FROM services ORDER BY sort_order ASC, id ASC');
      // 4. Google Reviews
      const [reviewsRows] = await p.query('SELECT * FROM google_reviews ORDER BY sort_order ASC, id ASC');
      // 5. Leads
      const [leadsRows] = await p.query('SELECT * FROM leads ORDER BY created_at DESC');

      const company = settingsRows[0] ? {
        name: settingsRows[0].company_name,
        tagline: settingsRows[0].tagline,
        phone: settingsRows[0].phone,
        email: settingsRows[0].email,
        supportEmail: settingsRows[0].support_email,
        website: settingsRows[0].website,
        hours: settingsRows[0].hours,
        address: settingsRows[0].address,
        logo: settingsRows[0].logo,
        experienceYears: settingsRows[0].experience_years,
        disclaimer: settingsRows[0].disclaimer
      } : null;

      const heroSlides = slidesRows.map(r => ({
        id: r.slide_key || `slide-${r.id}`,
        dbId: r.id,
        badge: r.badge,
        title: r.title,
        subtitle: r.subtitle,
        image: r.image_url,
        primaryCta: r.primary_cta,
        primaryLink: r.primary_link,
        secondaryCta: r.secondary_cta,
        secondaryLink: r.secondary_link,
        sortOrder: r.sort_order,
        active: Boolean(r.is_active)
      }));

      const services = servicesRows.map(r => {
        let features = [];
        try {
          features = typeof r.features_json === 'string' ? JSON.parse(r.features_json) : (r.features_json || []);
        } catch (e) {
          features = [];
        }
        return {
          id: r.service_key || `serv-${r.id}`,
          dbId: r.id,
          title: r.title,
          category: r.category,
          badge: r.badge,
          image: r.image_url,
          shortDescription: r.short_description,
          fullDescription: r.full_description,
          features: features,
          turnaround: r.turnaround,
          active: Boolean(r.is_active)
        };
      });

      const googleReviews = reviewsRows.map(r => ({
        id: r.review_key || `rev-${r.id}`,
        dbId: r.id,
        author: r.author_name,
        role: r.author_role,
        location: r.location,
        rating: Number(r.rating) || 5,
        date: r.review_date,
        avatar: r.avatar_url,
        text: r.review_text,
        verified: Boolean(r.is_verified),
        source: r.source_platform || 'Google Review'
      }));

      const leads = leadsRows.map(r => ({
        id: `lead-${r.id}`,
        dbId: r.id,
        type: r.type,
        name: r.name,
        company: r.company,
        email: r.email,
        phone: r.phone,
        address: r.property_address,
        service: r.service_needed,
        urgency: r.urgency,
        notes: r.notes,
        status: r.status,
        adminNotes: r.admin_notes,
        createdAt: r.created_at
      }));

      // Merge with non-relational static parts (coverage, faqs, etc.)
      const local = readLocalData() || {};

      return {
        company: company || local.company,
        heroSlides: heroSlides.length ? heroSlides : local.heroSlides,
        services: services.length ? services : local.services,
        googleReviews: googleReviews.length ? googleReviews : local.googleReviews,
        leads: leads.length ? leads : (local.leads || []),
        beforeAfterGallery: local.beforeAfterGallery || [],
        workflow: local.workflow || [],
        coverageStates: local.coverageStates || [],
        faqs: local.faqs || [],
        dataSource: 'MySQL (cPanel)'
      };
    } catch (err) {
      console.warn('MySQL query error, using local fallback:', err.message);
    }
  }

  // Fallback to local JSON
  const local = readLocalData() || {};
  return {
    ...local,
    dataSource: 'Local Storage (Import database.sql into cPanel MySQL when ready)'
  };
}

// SAVE HERO SLIDES (MySQL + JSON sync)
export async function saveHeroSlides(slides) {
  // Sync to local JSON
  const local = readLocalData() || {};
  local.heroSlides = slides;
  writeLocalData(local);

  const p = getPool();
  if (p) {
    try {
      await p.query('DELETE FROM hero_slides');
      for (let i = 0; i < slides.length; i++) {
        const s = slides[i];
        await p.query(
          `INSERT INTO hero_slides (slide_key, badge, title, subtitle, image_url, primary_cta, primary_link, secondary_cta, secondary_link, sort_order, is_active)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            s.id || `slide-${i + 1}`,
            s.badge || '',
            s.title || '',
            s.subtitle || '',
            s.image || '',
            s.primaryCta || 'Request Service',
            s.primaryLink || 'request-service',
            s.secondaryCta || 'Partner With Us',
            s.secondaryLink || 'become-vendor',
            i + 1,
            s.active !== false ? 1 : 0
          ]
        );
      }
    } catch (err) {
      console.warn('MySQL save hero slides error:', err.message);
    }
  }
  return true;
}

// SAVE SERVICES (MySQL + JSON sync)
export async function saveServices(services) {
  // Sync to local JSON
  const local = readLocalData() || {};
  local.services = services;
  writeLocalData(local);

  const p = getPool();
  if (p) {
    try {
      await p.query('DELETE FROM services');
      for (let i = 0; i < services.length; i++) {
        const s = services[i];
        await p.query(
          `INSERT INTO services (service_key, title, category, badge, image_url, short_description, full_description, features_json, turnaround, sort_order, is_active)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            s.id || `serv-${i + 1}`,
            s.title || '',
            s.category || 'General',
            s.badge || '',
            s.image || '',
            s.shortDescription || '',
            s.fullDescription || '',
            JSON.stringify(s.features || []),
            s.turnaround || '24-48 Hours',
            i + 1,
            s.active !== false ? 1 : 0
          ]
        );
      }
    } catch (err) {
      console.warn('MySQL save services error:', err.message);
    }
  }
  return true;
}

// SAVE / ADD / UPDATE GOOGLE REVIEW
export async function saveGoogleReview(review) {
  const local = readLocalData() || {};
  if (!local.googleReviews) local.googleReviews = [];

  let updatedList = [...local.googleReviews];
  const reviewId = review.id || `rev-${Date.now()}`;

  const formattedReview = {
    id: reviewId,
    author: review.author || 'Verified Client',
    role: review.role || 'Property Manager / Realtor',
    location: review.location || 'United States',
    rating: Number(review.rating) || 5,
    date: review.date || 'Recent',
    avatar: review.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    text: review.text || '',
    verified: review.verified !== undefined ? Boolean(review.verified) : true,
    source: review.source || 'Google Review'
  };

  const existingIdx = updatedList.findIndex(r => r.id === reviewId);
  if (existingIdx >= 0) {
    updatedList[existingIdx] = { ...updatedList[existingIdx], ...formattedReview };
  } else {
    updatedList.unshift(formattedReview);
  }

  local.googleReviews = updatedList;
  writeLocalData(local);

  const p = getPool();
  if (p) {
    try {
      await p.query(
        `INSERT INTO google_reviews (review_key, author_name, author_role, location, rating, review_date, avatar_url, review_text, is_verified, source_platform)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE 
           author_name = VALUES(author_name),
           author_role = VALUES(author_role),
           location = VALUES(location),
           rating = VALUES(rating),
           review_date = VALUES(review_date),
           avatar_url = VALUES(avatar_url),
           review_text = VALUES(review_text),
           is_verified = VALUES(is_verified)`,
        [
          formattedReview.id,
          formattedReview.author,
          formattedReview.role,
          formattedReview.location,
          formattedReview.rating,
          formattedReview.date,
          formattedReview.avatar,
          formattedReview.text,
          formattedReview.verified ? 1 : 0,
          formattedReview.source
        ]
      );
    } catch (err) {
      console.warn('MySQL review error:', err.message);
    }
  }

  return updatedList;
}

// DELETE GOOGLE REVIEW
export async function deleteGoogleReview(reviewId) {
  const local = readLocalData() || {};
  if (!local.googleReviews) local.googleReviews = [];
  local.googleReviews = local.googleReviews.filter(r => r.id !== reviewId);
  writeLocalData(local);

  const p = getPool();
  if (p) {
    try {
      await p.query('DELETE FROM google_reviews WHERE review_key = ?', [reviewId]);
    } catch (err) {
      console.warn('MySQL delete review error:', err.message);
    }
  }

  return local.googleReviews;
}

// GET LEADS LIST
export async function getLeads() {
  const p = getPool();
  if (p) {
    try {
      const [leadsRows] = await p.query('SELECT * FROM leads ORDER BY created_at DESC');
      if (leadsRows && leadsRows.length) {
        return leadsRows.map(r => ({
          id: `lead-${r.id}`,
          dbId: r.id,
          type: r.type,
          name: r.name,
          company: r.company,
          email: r.email,
          phone: r.phone,
          address: r.property_address,
          service: r.service_needed,
          urgency: r.urgency,
          notes: r.notes,
          status: r.status,
          adminNotes: r.admin_notes,
          createdAt: r.created_at
        }));
      }
    } catch (err) {
      console.warn('MySQL getLeads error, falling back to JSON:', err.message);
    }
  }
  const local = readLocalData() || {};
  return local.leads || [];
}

// ADD NEW LEAD (SERVICE REQUEST / VENDOR APPLICATION)
export async function createLead(lead) {
  const local = readLocalData() || {};
  if (!local.leads) local.leads = [];

  const newLead = {
    id: `lead-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'New',
    ...lead
  };

  local.leads.unshift(newLead);
  writeLocalData(local);

  const p = getPool();
  if (p) {
    try {
      await p.query(
        `INSERT INTO leads (type, name, company, email, phone, property_address, service_needed, urgency, access_notes, notes, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          newLead.type || 'service_request',
          newLead.name || '',
          newLead.company || '',
          newLead.email || '',
          newLead.phone || '',
          newLead.address || '',
          newLead.service || '',
          newLead.urgency || 'Standard',
          newLead.accessNotes || '',
          newLead.notes || '',
          'New'
        ]
      );
    } catch (err) {
      console.warn('MySQL create lead error:', err.message);
    }
  }

  return newLead;
}

// UPDATE LEAD STATUS
export async function updateLeadStatus(leadId, status, adminNotes) {
  const local = readLocalData() || {};
  if (!local.leads) local.leads = [];

  const idx = local.leads.findIndex(l => l.id === leadId);
  if (idx !== -1) {
    if (status) local.leads[idx].status = status;
    if (adminNotes !== undefined) local.leads[idx].adminNotes = adminNotes;
    writeLocalData(local);
  }

  const p = getPool();
  if (p) {
    try {
      const numId = leadId.replace(/^lead-/, '');
      await p.query(
        'UPDATE leads SET status = ?, admin_notes = ? WHERE id = ? OR id = ?',
        [status, adminNotes || '', numId, leadId]
      );
    } catch (err) {
      console.warn('MySQL update lead status error:', err.message);
    }
  }

  return local.leads[idx] || null;
}

