import React, { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { 
  Sliders, 
  Image as ImageIcon, 
  Wrench, 
  Star, 
  Inbox, 
  Settings, 
  Database, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Upload, 
  Save, 
  Eye, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  Mail, 
  X,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function Dashboard() {
  const { 
    siteData, 
    updateSlider, 
    updateServices, 
    saveReview, 
    deleteReview, 
    uploadPhoto, 
    updateLeadStatus, 
    updateCompany, 
    showToast,
    navigateTo 
  } = useSite();

  const [activeTab, setActiveTab] = useState('slider');
  const [dbStatus, setDbStatus] = useState(null);
  const [checkingDb, setCheckingDb] = useState(false);

  // Check Database status
  const checkDatabase = async () => {
    setCheckingDb(true);
    try {
      const res = await fetch('/api/db-status');
      const data = await res.json();
      setDbStatus(data);
    } catch (err) {
      setDbStatus({ connected: false, engine: 'Offline / Error', message: err.message });
    } finally {
      setCheckingDb(false);
    }
  };

  useEffect(() => {
    checkDatabase();
  }, []);

  // SLIDER STATE
  const [slides, setSlides] = useState([]);
  const [editingSlide, setEditingSlide] = useState(null);
  const [uploadingSlidePhoto, setUploadingSlidePhoto] = useState(false);

  // SERVICES STATE
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [uploadingServicePhoto, setUploadingServicePhoto] = useState(false);

  // REVIEWS STATE
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);
  const [isNewReview, setIsNewReview] = useState(false);
  const [uploadingReviewAvatar, setUploadingReviewAvatar] = useState(false);

  // LEADS STATE
  const [leadsFilter, setLeadsFilter] = useState('all');

  // COMPANY STATE
  const [companyForm, setCompanyForm] = useState(null);

  // Sync with siteData
  useEffect(() => {
    if (siteData) {
      setSlides(siteData.heroSlides || []);
      setServices(siteData.services || []);
      setReviews(siteData.googleReviews || []);
      setCompanyForm(siteData.company || {});
    }
  }, [siteData]);

  // =========================================================================
  // 1. HERO SLIDER HANDLERS
  // =========================================================================
  const handleSaveSlide = async (slideData) => {
    let updated;
    const exists = slides.some(s => s.id === slideData.id);
    if (exists) {
      updated = slides.map(s => s.id === slideData.id ? slideData : s);
    } else {
      updated = [...slides, slideData];
    }
    setSlides(updated);
    await updateSlider(updated);
    setEditingSlide(null);
  };

  const handleDeleteSlide = async (slideId) => {
    if (slides.length <= 1) {
      showToast('You must have at least one hero slide', 'error');
      return;
    }
    if (!window.confirm('Delete this hero slide?')) return;
    const updated = slides.filter(s => s.id !== slideId);
    setSlides(updated);
    await updateSlider(updated);
  };

  const handleSlidePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingSlidePhoto(true);
    const url = await uploadPhoto(file);
    setUploadingSlidePhoto(false);
    if (url && editingSlide) {
      setEditingSlide(prev => ({ ...prev, image: url }));
    }
  };

  // =========================================================================
  // 2. SERVICES HANDLERS
  // =========================================================================
  const handleSaveService = async (serviceData) => {
    let updated;
    const exists = services.some(s => s.id === serviceData.id);
    if (exists) {
      updated = services.map(s => s.id === serviceData.id ? serviceData : s);
    } else {
      updated = [...services, serviceData];
    }
    setServices(updated);
    await updateServices(updated);
    setEditingService(null);
  };

  const handleDeleteService = async (serviceId) => {
    if (!window.confirm('Delete this service?')) return;
    const updated = services.filter(s => s.id !== serviceId);
    setServices(updated);
    await updateServices(updated);
  };

  const handleServicePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingServicePhoto(true);
    const url = await uploadPhoto(file);
    setUploadingServicePhoto(false);
    if (url && editingService) {
      setEditingService(prev => ({ ...prev, image: url }));
    }
  };

  // =========================================================================
  // 3. GOOGLE REVIEWS HANDLERS
  // =========================================================================
  const handleSaveReviewSubmit = async (e) => {
    e.preventDefault();
    if (!editingReview.author || !editingReview.text) {
      showToast('Reviewer name and text are required', 'error');
      return;
    }
    await saveReview(editingReview);
    setEditingReview(null);
    setIsNewReview(false);
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Delete this Google review?')) return;
    await deleteReview(reviewId);
  };

  const handleReviewAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingReviewAvatar(true);
    const url = await uploadPhoto(file);
    setUploadingReviewAvatar(false);
    if (url && editingReview) {
      setEditingReview(prev => ({ ...prev, avatar: url }));
    }
  };

  // =========================================================================
  // 4. LEADS HANDLERS
  // =========================================================================
  const handleUpdateLead = async (leadId, newStatus) => {
    await updateLeadStatus(leadId, newStatus);
  };

  // =========================================================================
  // 5. COMPANY HANDLERS
  // =========================================================================
  const handleCompanySave = async (e) => {
    e.preventDefault();
    await updateCompany(companyForm);
  };

  return (
    <div className="pt-36 sm:pt-40 pb-16 bg-slate-900 min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* TOP BAR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b border-slate-800 gap-4">
          <div className="flex items-center gap-4">
            <img 
              src="/images/logo-white.png" 
              alt="EZY Zenith" 
              className="h-10 sm:h-12 w-auto object-contain shrink-0" 
            />
            <div>
              <div className="flex items-center gap-2 text-zenith-orange font-bold text-xs uppercase tracking-wider">
                <Sliders className="w-4 h-4" />
                <span>Admin & Content Management Portal</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                Management Dashboard
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                Change hero slider photos, service descriptions & photos, add Google reviews, and manage leads.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* DATABASE STATUS BADGE */}
            <div 
              onClick={checkDatabase}
              className={`cursor-pointer px-3.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                dbStatus?.connected 
                  ? 'bg-emerald-950/80 border-emerald-700 text-emerald-300'
                  : 'bg-amber-950/80 border-amber-700 text-amber-300'
              }`}
              title="Click to re-test database connection"
            >
              <Database className="w-3.5 h-3.5" />
              <span>
                {checkingDb 
                  ? 'Testing DB...' 
                  : dbStatus?.connected 
                    ? `DB: MySQL (Connected)` 
                    : `DB: File Storage (cPanel Ready)`}
              </span>
              <RefreshCw className={`w-3 h-3 ${checkingDb ? 'animate-spin' : ''}`} />
            </div>

            <button
              onClick={() => navigateTo('home')}
              className="bg-zenith-orange hover:bg-zenith-orangeHover text-navy-950 font-bold px-4 py-2 rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-accent"
            >
              <Eye className="w-4 h-4" />
              <span>View Live Website</span>
            </button>
          </div>
        </div>

        {/* DASHBOARD TABS */}
        <div className="flex flex-wrap items-center gap-2 mb-8 bg-slate-800/80 p-2 rounded-2xl border border-slate-700/80">
          <button
            onClick={() => setActiveTab('slider')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'slider' 
                ? 'bg-zenith-orange text-navy-950 shadow-sm' 
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Slider Photos ({slides.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'services' 
                ? 'bg-zenith-orange text-navy-950 shadow-sm' 
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Services & Photos ({services.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'reviews' 
                ? 'bg-zenith-orange text-navy-950 shadow-sm' 
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <Star className="w-4 h-4" />
            <span>Google Reviews ({reviews.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'leads' 
                ? 'bg-zenith-orange text-navy-950 shadow-sm' 
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Work Orders & Leads ({siteData?.leads?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'settings' 
                ? 'bg-zenith-orange text-navy-950 shadow-sm' 
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Company Info</span>
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'database' 
                ? 'bg-zenith-orange text-navy-950 shadow-sm' 
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>cPanel MySQL Guide</span>
          </button>
        </div>

        {/* =================================================================== */}
        {/* TAB 1: SLIDER MANAGEMENT */}
        {/* =================================================================== */}
        {activeTab === 'slider' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Hero Slider Photos & Headlines</h3>
                <p className="text-xs text-slate-400">Change photos, titles, and call-to-actions shown on the home page slider.</p>
              </div>

              <button
                onClick={() => {
                  setEditingSlide({
                    id: 'slide-' + Date.now(),
                    badge: 'New Promotion / Announcement',
                    title: 'New Headline Title Here',
                    subtitle: 'Add supporting description for this slide...',
                    image: '/images/Securing-Service-740x556.jpg',
                    primaryCta: 'Request Service',
                    primaryLink: 'request-service',
                    secondaryCta: 'Learn More',
                    secondaryLink: 'services',
                    active: true
                  });
                }}
                className="bg-zenith-orange hover:bg-zenith-orangeHover text-navy-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-accent"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Hero Slide</span>
              </button>
            </div>

            {/* SLIDES LIST */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {slides.map((s, idx) => (
                <div 
                  key={s.id || idx}
                  className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-md flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                    <img 
                      src={s.image} 
                      alt={s.title}
                      className="w-full h-full object-cover" 
                      onError={(e) => { e.target.src = '/images/Securing-Service-740x556.jpg'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 bg-slate-900/80 text-zenith-orange text-xs font-bold px-2.5 py-1 rounded">
                      Slide #{idx + 1}
                    </div>
                    {s.active === false && (
                      <div className="absolute top-3 right-3 bg-red-600/90 text-white text-xs font-bold px-2.5 py-1 rounded">
                        Hidden / Inactive
                      </div>
                    )}
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <span className="text-[11px] uppercase tracking-wider text-zenith-orange font-bold">
                        {s.badge}
                      </span>
                      <h4 className="text-lg font-bold truncate">{s.title}</h4>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <p className="text-xs text-slate-300 line-clamp-2">{s.subtitle}</p>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span>CTA: <strong className="text-white">{s.primaryCta}</strong></span>
                      <span>•</span>
                      <span>Target: <strong className="text-white">/{s.primaryLink}</strong></span>
                    </div>

                    <div className="pt-3 border-t border-slate-700/80 flex items-center justify-between">
                      <button
                        onClick={() => setEditingSlide({ ...s })}
                        className="bg-slate-700 hover:bg-slate-600 text-white font-bold px-3.5 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-zenith-orange" />
                        <span>Edit Slide & Photo</span>
                      </button>

                      <button
                        onClick={() => handleDeleteSlide(s.id)}
                        className="text-red-400 hover:text-red-300 p-2 hover:bg-red-950/50 rounded-lg transition-colors"
                        title="Delete Slide"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 2: SERVICES MANAGEMENT */}
        {/* =================================================================== */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Services & Trade Photos</h3>
                <p className="text-xs text-slate-400">Update photos, categories, descriptions, and bullet points for all services.</p>
              </div>

              <button
                onClick={() => {
                  setEditingService({
                    id: 'serv-' + Date.now(),
                    title: 'New Property Service',
                    category: 'Maintenance',
                    badge: 'New',
                    image: '/images/Interior-Carpentry--740x556.jpg',
                    shortDescription: 'Brief description of service capabilities...',
                    fullDescription: 'Comprehensive scope description for this trade...',
                    features: ['Initial Inspection', 'Vetted Crew', 'Photo Documentation'],
                    turnaround: '24-48 Hours',
                    active: true
                  });
                }}
                className="bg-zenith-orange hover:bg-zenith-orangeHover text-navy-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-accent"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Service</span>
              </button>
            </div>

            {/* SERVICES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s, idx) => (
                <div 
                  key={s.id || idx}
                  className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                      <img 
                        src={s.image} 
                        alt={s.title}
                        className="w-full h-full object-cover" 
                        onError={(e) => { e.target.src = '/images/Securing-Service-740x556.jpg'; }}
                      />
                      <div className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        {s.category}
                      </div>
                      {s.badge && (
                        <div className="absolute top-2 right-2 bg-zenith-orange text-navy-950 text-[10px] font-bold px-2 py-0.5 rounded">
                          {s.badge}
                        </div>
                      )}
                    </div>

                    <div className="p-5 space-y-2">
                      <h4 className="text-base font-bold text-white">{s.title}</h4>
                      <p className="text-xs text-slate-300 line-clamp-2">{s.shortDescription}</p>
                      <div className="text-[11px] text-slate-400">
                        Turnaround: <strong className="text-zenith-orange">{s.turnaround || '24-48h'}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-slate-700/60 mt-3 flex items-center justify-between">
                    <button
                      onClick={() => setEditingService({ ...s })}
                      className="bg-slate-700 hover:bg-slate-600 text-white font-bold px-3.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-zenith-orange" />
                      <span>Edit Photo & Scope</span>
                    </button>

                    <button
                      onClick={() => handleDeleteService(s.id)}
                      className="text-red-400 hover:text-red-300 p-1.5 hover:bg-red-950/50 rounded-lg transition-colors"
                      title="Delete Service"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 3: GOOGLE REVIEWS MANAGEMENT */}
        {/* =================================================================== */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Google Reviews & Testimonials</h3>
                <p className="text-xs text-slate-400">Add, edit, or remove customer reviews shown on the website.</p>
              </div>

              <button
                onClick={() => {
                  setIsNewReview(true);
                  setEditingReview({
                    id: 'rev-' + Date.now(),
                    author: '',
                    role: 'Broker / Realtor / Property Manager',
                    location: 'Wilmington, DE',
                    rating: 5,
                    date: 'Just now',
                    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
                    text: '',
                    verified: true,
                    source: 'Google Review'
                  });
                }}
                className="bg-zenith-orange hover:bg-zenith-orangeHover text-navy-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-accent"
              >
                <Plus className="w-4 h-4" />
                <span>Add Google Review</span>
              </button>
            </div>

            {/* REVIEWS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((rev, idx) => (
                <div 
                  key={rev.id || idx}
                  className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-md flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < (rev.rating || 5) ? 'fill-amber-400' : 'text-slate-600'}`} />
                        ))}
                      </div>
                      <span className="text-[11px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded">
                        {rev.date}
                      </span>
                    </div>

                    <p className="text-xs text-slate-200 leading-relaxed italic">
                      "{rev.text}"
                    </p>

                    <div className="flex items-center gap-3 pt-2">
                      <img
                        src={rev.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                        alt={rev.author}
                        className="w-10 h-10 rounded-full object-cover border border-slate-600"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'; }}
                      />
                      <div>
                        <div className="font-bold text-sm text-white flex items-center gap-1">
                          <span>{rev.author}</span>
                          {rev.verified && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />}
                        </div>
                        <div className="text-[11px] text-slate-400">{rev.role}</div>
                        {rev.location && <div className="text-[10px] text-slate-500">{rev.location}</div>}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-700 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setIsNewReview(false);
                        setEditingReview({ ...rev });
                      }}
                      className="bg-slate-700 hover:bg-slate-600 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-zenith-orange" />
                      <span>Edit Review</span>
                    </button>

                    <button
                      onClick={() => handleDeleteReview(rev.id)}
                      className="text-red-400 hover:text-red-300 p-1.5 hover:bg-red-950/50 rounded-lg transition-colors"
                      title="Delete Review"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 4: LEADS & WORK ORDERS CRM */}
        {/* =================================================================== */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">Work Orders & Inquiries Inbox</h3>
                <p className="text-xs text-slate-400">Incoming service requests, Realtor repair lists, and vendor applications.</p>
              </div>

              <div className="flex items-center gap-2">
                {['all', 'New', 'In Progress', 'Completed'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setLeadsFilter(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      leadsFilter === status 
                        ? 'bg-zenith-orange text-navy-950' 
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {status.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* LEADS LIST */}
            {(!siteData?.leads || siteData.leads.length === 0) ? (
              <div className="bg-slate-800 rounded-2xl p-12 text-center text-slate-400 border border-slate-700">
                No work orders received yet. New submissions will appear here in real time.
              </div>
            ) : (
              <div className="space-y-4">
                {siteData.leads
                  .filter(l => leadsFilter === 'all' || l.status === leadsFilter)
                  .map((lead, idx) => (
                    <div 
                      key={lead.id || idx}
                      className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-md space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700 pb-3">
                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-full ${
                            lead.status === 'New' ? 'bg-amber-950 text-amber-300 border border-amber-700' :
                            lead.status === 'In Progress' ? 'bg-blue-950 text-blue-300 border border-blue-700' :
                            'bg-emerald-950 text-emerald-300 border border-emerald-700'
                          }`}>
                            {lead.status || 'New'}
                          </span>
                          <span className="text-xs text-slate-400">
                            {lead.type === 'vendor_application' ? 'Vendor Application' : 'Service Request'}
                          </span>
                          <span className="text-xs text-slate-500">•</span>
                          <span className="text-xs text-slate-400">
                            {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'Recent'}
                          </span>
                        </div>

                        {/* STATUS CHANGER */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400">Status:</span>
                          <select
                            value={lead.status || 'New'}
                            onChange={(e) => handleUpdateLead(lead.id, e.target.value)}
                            className="bg-slate-900 border border-slate-600 rounded-lg text-xs px-2.5 py-1 text-white focus:outline-none focus:border-zenith-orange"
                          >
                            <option value="New">New</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </div>
                      </div>

                      {/* DETAILS */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        <div>
                          <span className="text-slate-500 block">Contact Info:</span>
                          <div className="font-bold text-white text-sm mt-0.5">{lead.name}</div>
                          {lead.company && <div className="text-slate-300">{lead.company}</div>}
                          <div className="text-zenith-orange mt-1">
                            <a href={`tel:${lead.phone}`} className="hover:underline">{lead.phone}</a>
                          </div>
                          <div className="text-slate-400">
                            <a href={`mailto:${lead.email}`} className="hover:underline">{lead.email}</a>
                          </div>
                        </div>

                        <div>
                          <span className="text-slate-500 block">Property & Trade:</span>
                          <div className="font-bold text-white mt-0.5">{lead.address || 'Address not provided'}</div>
                          <div className="text-slate-300 mt-1">Trade: <strong className="text-white">{lead.service}</strong></div>
                          {lead.urgency && (
                            <div className="text-amber-400 font-semibold mt-1">Urgency: {lead.urgency}</div>
                          )}
                          {lead.accessNotes && (
                            <div className="text-slate-400 mt-1">Access: {lead.accessNotes}</div>
                          )}
                        </div>

                        <div>
                          <span className="text-slate-500 block">Notes / Scope:</span>
                          <div className="bg-slate-900 p-3 rounded-xl border border-slate-700/80 text-slate-300 mt-1 leading-relaxed">
                            {lead.notes || 'No extra notes provided.'}
                          </div>
                          {lead.photoUrl && (
                            <div className="mt-2">
                              <a 
                                href={lead.photoUrl} 
                                target="_blank" 
                                rel="noreferrer"
                                className="text-xs text-zenith-orange hover:underline flex items-center gap-1"
                              >
                                <ExternalLink className="w-3 h-3" />
                                <span>View Attached File / Photo</span>
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 5: COMPANY PROFILE SETTINGS */}
        {/* =================================================================== */}
        {activeTab === 'settings' && companyForm && (
          <div className="max-w-2xl bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-md">
            <h3 className="text-xl font-bold text-white mb-1">Company Contact & Brand Settings</h3>
            <p className="text-xs text-slate-400 mb-6">Updates phone, email, and entity information across the entire website.</p>

            <form onSubmit={handleCompanySave} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Company Legal Name</label>
                <input
                  type="text"
                  value={companyForm.name || ''}
                  onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-zenith-orange"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Dispatch Phone Hotline</label>
                  <input
                    type="text"
                    value={companyForm.phone || ''}
                    onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-zenith-orange"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Intake Email</label>
                  <input
                    type="email"
                    value={companyForm.email || ''}
                    onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-zenith-orange"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Operations Hours</label>
                <input
                  type="text"
                  value={companyForm.hours || ''}
                  onChange={(e) => setCompanyForm({ ...companyForm, hours: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-zenith-orange"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Coverage / Entity Text</label>
                <input
                  type="text"
                  value={companyForm.address || ''}
                  onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-zenith-orange"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Tagline</label>
                <input
                  type="text"
                  value={companyForm.tagline || ''}
                  onChange={(e) => setCompanyForm({ ...companyForm, tagline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-zenith-orange"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-zenith-orange hover:bg-zenith-orangeHover text-navy-950 font-bold px-6 py-3 rounded-xl text-xs transition-all shadow-accent flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Company Information</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 6: cPANEL MYSQL DATABASE GUIDE */}
        {/* =================================================================== */}
        {activeTab === 'database' && (
          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Database className="w-5 h-5 text-zenith-orange" />
                  <span>cPanel MySQL Database Connection</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  How EZY Zenith connects to your cPanel MySQL database.
                </p>
              </div>

              <button
                onClick={checkDatabase}
                className="bg-slate-700 hover:bg-slate-600 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${checkingDb ? 'animate-spin' : ''}`} />
                <span>Test Live Connection</span>
              </button>
            </div>

            {/* STATUS BOX */}
            <div className={`p-5 rounded-2xl border ${
              dbStatus?.connected 
                ? 'bg-emerald-950/60 border-emerald-700 text-emerald-200' 
                : 'bg-amber-950/60 border-amber-700 text-amber-200'
            }`}>
              <div className="flex items-center gap-3">
                {dbStatus?.connected ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-amber-400 shrink-0" />
                )}
                <div>
                  <div className="font-bold text-sm">
                    Status: {dbStatus?.engine || 'Checking...'}
                  </div>
                  <div className="text-xs mt-0.5 opacity-90">
                    {dbStatus?.message}
                  </div>
                  <div className="text-[11px] mt-1 font-mono text-slate-300">
                    Host: {dbStatus?.host || 'localhost'} | DB Name: {dbStatus?.dbName || 'ezyzenith_db'}
                  </div>
                </div>
              </div>
            </div>

            {/* STEP BY STEP INSTRUCTIONS */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <h4 className="font-bold text-white text-base">How to Connect to cPanel MySQL in 3 Easy Steps:</h4>

              <div className="space-y-3">
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 space-y-1">
                  <div className="font-bold text-zenith-orange">Step 1: Create Database in cPanel</div>
                  <p className="text-xs text-slate-400">
                    Log in to your cPanel hosting account. Go to <strong>MySQL Databases</strong> (or MySQL Database Wizard). Create a new database, e.g. <code>username_ezyzenith</code>. Create a MySQL user and grant <strong>ALL PRIVILEGES</strong> to this database.
                  </p>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 space-y-1">
                  <div className="font-bold text-zenith-orange">Step 2: Import database.sql via phpMyAdmin</div>
                  <p className="text-xs text-slate-400">
                    In cPanel, click <strong>phpMyAdmin</strong>. Select your newly created database in the left sidebar. Click the <strong>Import</strong> tab at the top. Choose the file <code>database.sql</code> (located in this project root directory) and click <strong>Import / Go</strong>. All tables and pre-loaded slides, services, and reviews will be created in seconds.
                  </p>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 space-y-1">
                  <div className="font-bold text-zenith-orange">Step 3: Configure Environment Variables</div>
                  <p className="text-xs text-slate-400">
                    In your hosting or <code>.env.local</code> file, set:
                  </p>
                  <pre className="bg-black/60 p-3 rounded-lg font-mono text-xs text-emerald-400 overflow-x-auto mt-2">
{`DB_HOST=localhost
DB_PORT=3306
DB_USER=your_cpanel_db_user
DB_PASSWORD=your_cpanel_db_password
DB_NAME=your_cpanel_db_name`}
                  </pre>
                  <p className="text-[11px] text-slate-400 mt-2">
                    * Note: If MySQL is offline or not configured, the website automatically uses resilient local file storage so your site stays 100% online and functional!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* MODAL: EDIT HERO SLIDE */}
        {/* =================================================================== */}
        {editingSlide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
            <div className="bg-slate-800 rounded-2xl max-w-xl w-full p-6 sm:p-8 border border-slate-700 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-zenith-orange" />
                  <span>Edit Hero Slide Photo & Copy</span>
                </h3>
                <button 
                  onClick={() => setEditingSlide(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* CURRENT PHOTO PREVIEW */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Slide Photo</label>
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-700 mb-2">
                  <img 
                    src={editingSlide.image} 
                    alt="Slide preview" 
                    className="w-full h-full object-cover" 
                    onError={(e) => { e.target.src = '/images/Securing-Service-740x556.jpg'; }}
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <label className="w-full sm:w-auto cursor-pointer bg-zenith-orange hover:bg-zenith-orangeHover text-navy-950 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>{uploadingSlidePhoto ? 'Uploading Photo...' : 'Upload New Photo'}</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleSlidePhotoUpload} 
                      className="hidden" 
                    />
                  </label>

                  <input
                    type="text"
                    value={editingSlide.image}
                    onChange={(e) => setEditingSlide({ ...editingSlide, image: e.target.value })}
                    placeholder="Or paste image URL (/images/... or https://...)"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-zenith-orange"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Slide Badge</label>
                <input
                  type="text"
                  value={editingSlide.badge}
                  onChange={(e) => setEditingSlide({ ...editingSlide, badge: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-zenith-orange"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Slide Main Headline</label>
                <input
                  type="text"
                  value={editingSlide.title}
                  onChange={(e) => setEditingSlide({ ...editingSlide, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-zenith-orange"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Subheadline Description</label>
                <textarea
                  rows={3}
                  value={editingSlide.subtitle}
                  onChange={(e) => setEditingSlide({ ...editingSlide, subtitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-zenith-orange"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Primary CTA Button</label>
                  <input
                    type="text"
                    value={editingSlide.primaryCta}
                    onChange={(e) => setEditingSlide({ ...editingSlide, primaryCta: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-zenith-orange"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Target Page</label>
                  <input
                    type="text"
                    value={editingSlide.primaryLink}
                    onChange={(e) => setEditingSlide({ ...editingSlide, primaryLink: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-zenith-orange"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingSlide.active !== false}
                    onChange={(e) => setEditingSlide({ ...editingSlide, active: e.target.checked })}
                    className="rounded text-zenith-orange focus:ring-zenith-orange"
                  />
                  <span>Active (Visible on public slider)</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-700">
                <button
                  onClick={() => setEditingSlide(null)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSaveSlide(editingSlide)}
                  className="bg-zenith-orange hover:bg-zenith-orangeHover text-navy-950 font-bold px-6 py-2.5 rounded-xl text-xs shadow-accent flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Slide</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* MODAL: EDIT SERVICE & PHOTO */}
        {/* =================================================================== */}
        {editingService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
            <div className="bg-slate-800 rounded-2xl max-w-xl w-full p-6 sm:p-8 border border-slate-700 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-zenith-orange" />
                  <span>Edit Service & Photo</span>
                </h3>
                <button 
                  onClick={() => setEditingService(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* PHOTO PREVIEW & UPLOAD */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Service Photo</label>
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-700 mb-2">
                  <img 
                    src={editingService.image} 
                    alt="Service photo preview" 
                    className="w-full h-full object-cover" 
                    onError={(e) => { e.target.src = '/images/Securing-Service-740x556.jpg'; }}
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <label className="w-full sm:w-auto cursor-pointer bg-zenith-orange hover:bg-zenith-orangeHover text-navy-950 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>{uploadingServicePhoto ? 'Uploading Photo...' : 'Upload New Service Photo'}</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleServicePhotoUpload} 
                      className="hidden" 
                    />
                  </label>

                  <input
                    type="text"
                    value={editingService.image}
                    onChange={(e) => setEditingService({ ...editingService, image: e.target.value })}
                    placeholder="Or enter image URL (/images/...)"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-zenith-orange"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Service Title</label>
                  <input
                    type="text"
                    value={editingService.title}
                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-zenith-orange"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Category</label>
                  <select
                    value={editingService.category}
                    onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-zenith-orange"
                  >
                    <option value="Preservation">Preservation</option>
                    <option value="Realtor Support">Realtor Support</option>
                    <option value="Property Management">Property Management</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Trades">Trades</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Short Description</label>
                <input
                  type="text"
                  value={editingService.shortDescription}
                  onChange={(e) => setEditingService({ ...editingService, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-zenith-orange"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Full Detailed Scope</label>
                <textarea
                  rows={3}
                  value={editingService.fullDescription || ''}
                  onChange={(e) => setEditingService({ ...editingService, fullDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-zenith-orange"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Turnaround Time</label>
                  <input
                    type="text"
                    value={editingService.turnaround || '24-48 Hours'}
                    onChange={(e) => setEditingService({ ...editingService, turnaround: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-zenith-orange"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={editingService.badge || ''}
                    onChange={(e) => setEditingService({ ...editingService, badge: e.target.value })}
                    placeholder="e.g. Core Specialty"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-zenith-orange"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-700">
                <button
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSaveService(editingService)}
                  className="bg-zenith-orange hover:bg-zenith-orangeHover text-navy-950 font-bold px-6 py-2.5 rounded-xl text-xs shadow-accent flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Service & Photo</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* MODAL: ADD / EDIT GOOGLE REVIEW */}
        {/* =================================================================== */}
        {editingReview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
            <div className="bg-slate-800 rounded-2xl max-w-xl w-full p-6 sm:p-8 border border-slate-700 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-400" />
                  <span>{isNewReview ? 'Add New Google Review' : 'Edit Google Review'}</span>
                </h3>
                <button 
                  onClick={() => setEditingReview(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveReviewSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Reviewer Name *</label>
                    <input
                      type="text"
                      required
                      value={editingReview.author}
                      onChange={(e) => setEditingReview({ ...editingReview, author: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-zenith-orange"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Role / Company</label>
                    <input
                      type="text"
                      value={editingReview.role}
                      onChange={(e) => setEditingReview({ ...editingReview, role: e.target.value })}
                      placeholder="e.g. Top Producer Realtor, Keller Williams"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-zenith-orange"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Star Rating (1-5)</label>
                    <select
                      value={editingReview.rating}
                      onChange={(e) => setEditingReview({ ...editingReview, rating: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-zenith-orange"
                    >
                      <option value={5}>5 Stars ★★★★★</option>
                      <option value={4}>4 Stars ★★★★☆</option>
                      <option value={3}>3 Stars ★★★☆☆</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Location</label>
                    <input
                      type="text"
                      value={editingReview.location || ''}
                      onChange={(e) => setEditingReview({ ...editingReview, location: e.target.value })}
                      placeholder="Dallas, TX"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-zenith-orange"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Review Date</label>
                    <input
                      type="text"
                      value={editingReview.date}
                      onChange={(e) => setEditingReview({ ...editingReview, date: e.target.value })}
                      placeholder="2 weeks ago"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-zenith-orange"
                    />
                  </div>
                </div>

                {/* AVATAR PHOTO */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Reviewer Avatar / Photo</label>
                  <div className="flex items-center gap-3">
                    <img
                      src={editingReview.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full object-cover border border-slate-600 shrink-0"
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'; }}
                    />

                    <label className="cursor-pointer bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingReviewAvatar ? 'Uploading...' : 'Upload Photo'}</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleReviewAvatarUpload} 
                        className="hidden" 
                      />
                    </label>

                    <input
                      type="text"
                      value={editingReview.avatar}
                      onChange={(e) => setEditingReview({ ...editingReview, avatar: e.target.value })}
                      placeholder="Avatar image URL"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-zenith-orange"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Google Review Text *</label>
                  <textarea
                    rows={4}
                    required
                    value={editingReview.text}
                    onChange={(e) => setEditingReview({ ...editingReview, text: e.target.value })}
                    placeholder="Write or paste customer review feedback here..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-zenith-orange"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingReview.verified !== false}
                      onChange={(e) => setEditingReview({ ...editingReview, verified: e.target.checked })}
                      className="rounded text-zenith-orange focus:ring-zenith-orange"
                    />
                    <span>Verified Customer Checkmark (Blue badge)</span>
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-700">
                  <button
                    type="button"
                    onClick={() => setEditingReview(null)}
                    className="px-4 py-2 rounded-xl text-xs text-slate-300 hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-zenith-orange hover:bg-zenith-orangeHover text-navy-950 font-bold px-6 py-2.5 rounded-xl text-xs shadow-accent flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Review</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
