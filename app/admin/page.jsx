'use client';

import React, { useState, useEffect } from 'react';
import { useSite } from '@/src/context/SiteContext';
import { 
  LayoutDashboard, 
  Sliders, 
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
  ChevronRight,
  Search,
  ArrowRight,
  ShieldCheck,
  Building2,
  Lock,
  LogOut,
  Menu,
  FileCheck2,
  Clock,
  Camera,
  MapPin
} from 'lucide-react';

export default function AdminPage() {
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
    currentUser,
    userRole,
    login,
    logout
  } = useSite();

  // Authentication state for admin
  const isAdminAuthenticated = currentUser && userRole === 'admin';
  const [adminEmail, setAdminEmail] = useState('admin@ezyzenith.com');
  const [adminPassword, setAdminPassword] = useState('admin123');

  // Navigation tabs (Left Sidebar)
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Search queries
  const [leadSearch, setLeadSearch] = useState('');
  const [serviceSearch, setServiceSearch] = useState('');
  const [reviewSearch, setReviewSearch] = useState('');

  // cPanel Database status
  const [dbStatus, setDbStatus] = useState(null);
  const [checkingDb, setCheckingDb] = useState(false);

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
    if (isAdminAuthenticated) {
      checkDatabase();
    }
  }, [isAdminAuthenticated]);

  // Form states for adding / editing
  const [editingSlide, setEditingSlide] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [editingReview, setEditingReview] = useState(null);
  const [companyForm, setCompanyForm] = useState(siteData?.company || {});
  const [savingCompany, setSavingCompany] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (siteData?.company) {
      setCompanyForm(siteData.company);
    }
  }, [siteData?.company]);

  // Handle Login
  const handleAdminLogin = (e) => {
    e.preventDefault();
    login('admin', adminEmail);
  };

  // --------------------------------------------------------------------------
  // 1. ADMIN AUTHENTICATION GATE (LIGHT VERSION)
  // --------------------------------------------------------------------------
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f1f5f9] flex flex-col justify-center items-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 p-8 sm:p-10 space-y-7">
          
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center p-3 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm mx-auto">
              <img 
                src="/images/logo-color.png" 
                alt="EZY Zenith" 
                className="h-10 w-auto object-contain"
                onError={(e) => { e.target.src = '/images/logo.png'; }}
              />
            </div>
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-zenith-orange bg-zenith-orange/10 px-3 py-1 rounded-full border border-zenith-orange/20">
                Operations Management Portal
              </span>
              <h1 className="text-2xl font-black text-[#0f2446] tracking-tight mt-3">
                Administrator Sign In
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Enter your credentials to access the EZY Zenith backend management desk.
              </p>
            </div>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-zenith-orange bg-slate-50/50"
                  placeholder="admin@ezyzenith.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-zenith-orange bg-slate-50/50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0f2446] hover:bg-navy-900 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 group mt-2"
            >
              <span>Sign In to Dashboard</span>
              <ArrowRight className="w-4 h-4 text-zenith-orange transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          {/* QUICK DEMO ACCESS */}
          <div className="pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => login('admin', 'admin@ezyzenith.com')}
              className="w-full bg-zenith-orange/10 hover:bg-zenith-orange/20 text-[#0f2446] border border-zenith-orange/30 font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-zenith-orange" />
              <span>1-Click Quick Demo Login (Admin)</span>
            </button>
          </div>

          <div className="text-center">
            <a 
              href="/" 
              className="text-xs text-slate-500 hover:text-[#0f2446] font-semibold transition-colors inline-flex items-center gap-1"
            >
              <span>← Return to Public Website</span>
            </a>
          </div>

        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 2. MAIN BACKEND DASHBOARD (PROFESSIONAL LIGHT THEME WITH LEFT SIDEBAR)
  // --------------------------------------------------------------------------

  // Menu items list
  const navMenuItems = [
    { id: 'overview', label: 'Overview & KPIs', icon: LayoutDashboard },
    { id: 'slider', label: 'Hero Slider & Photos', icon: Sliders, badge: siteData?.heroSlides?.length },
    { id: 'services', label: 'Services & Scopes', icon: Wrench, badge: siteData?.services?.length },
    { id: 'reviews', label: 'Google Reviews', icon: Star, badge: siteData?.googleReviews?.length },
    { id: 'leads', label: 'Leads & Work Orders', icon: Inbox, badge: siteData?.leads?.length, alert: true },
    { id: 'database', label: 'cPanel MySQL Status', icon: Database },
    { id: 'settings', label: 'Company Profile', icon: Settings },
  ];

  // Helper file upload
  const handlePhotoUpload = async (e, callback) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImage(true);
    const url = await uploadPhoto(file);
    setUploadingImage(false);
    if (url && callback) {
      callback(url);
    }
  };

  const slides = siteData?.heroSlides || [];
  const services = siteData?.services || [];
  const reviews = siteData?.googleReviews || [];
  const leads = siteData?.leads || [];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex">
      
      {/* ---------------------------------------------------------------- */}
      {/* LEFT SIDEBAR NAVIGATION */}
      {/* ---------------------------------------------------------------- */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200/90 shadow-sm flex flex-col transition-transform duration-300 lg:static lg:translate-x-0 ${
        mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* SIDEBAR HEADER / BRAND */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/images/logo-color.png" 
              alt="EZY Zenith" 
              className="h-9 w-auto object-contain"
              onError={(e) => { e.target.src = '/images/logo.png'; }}
            />
          </div>
          <button 
            onClick={() => setMobileSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SIDEBAR ADMIN BADGE */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-[#0f2446]">Operations Desk</span>
          </div>
          <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600 font-bold">
            v1.4.0
          </span>
        </div>

        {/* NAVIGATION MENUS */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#0f2446] text-white shadow-sm font-bold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-[#0f2446]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-zenith-orange' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : item.alert 
                        ? 'bg-amber-100 text-amber-800' 
                        : 'bg-slate-100 text-slate-600'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* SIDEBAR FOOTER: USER & LOGOUT */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors shadow-2xs"
          >
            <ExternalLink className="w-3.5 h-3.5 text-zenith-orange" />
            <span>View Public Website</span>
          </a>

          <div className="flex items-center justify-between pt-2 px-2 text-xs text-slate-500">
            <div className="truncate max-w-[140px]">
              <div className="font-bold text-[#0f2446] truncate">Admin User</div>
              <div className="text-[10px] text-slate-400 truncate">{currentUser}</div>
            </div>
            <button
              onClick={logout}
              className="text-xs text-red-600 hover:text-red-700 font-bold p-1 rounded hover:bg-red-50 transition-colors flex items-center gap-1"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit</span>
            </button>
          </div>

          <div className="pt-2 px-2 text-[10px] text-slate-400 flex items-center justify-between border-t border-slate-200/60 font-mono">
            <span>Portal Version</span>
            <span className="font-bold text-zenith-orange bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">v1.7.0</span>
          </div>
        </div>

      </aside>

      {/* ---------------------------------------------------------------- */}
      {/* MAIN RIGHT CANVAS */}
      {/* ---------------------------------------------------------------- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* TOPBAR */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 border border-slate-200"
              aria-label="Open Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div>
              <h2 className="text-lg sm:text-xl font-black text-[#0f2446] capitalize">
                {navMenuItems.find(m => m.id === activeTab)?.label || 'Dashboard'}
              </h2>
              <div className="text-xs text-slate-500 hidden sm:block">
                EZY Zenith LLC Operations Desk • Real-time cPanel Synchronization
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* DB STATUS BADGE */}
            <div 
              onClick={checkDatabase}
              title="Click to re-test cPanel MySQL connection"
              className={`cursor-pointer px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
                dbStatus?.connected
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-amber-50 text-amber-800 border-amber-300'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${dbStatus?.connected ? 'bg-emerald-500' : 'bg-amber-500 animate-ping'}`} />
              <span className="hidden sm:inline">
                {checkingDb ? 'Testing DB...' : dbStatus?.connected ? 'MySQL (cPanel)' : 'Local Storage Mode'}
              </span>
              <RefreshCw className={`w-3 h-3 ${checkingDb ? 'animate-spin' : ''}`} />
            </div>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-xs font-bold bg-[#0f2446] text-white hover:bg-navy-900 px-3.5 py-2 rounded-xl transition-all shadow-sm"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-zenith-orange" />
            </a>
          </div>
        </header>

        {/* MAIN BODY CONTENT */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          
          {/* TAB 1: OVERVIEW & KPIS */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* TOP STATS CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
                    <span>Active Services</span>
                    <Wrench className="w-4 h-4 text-zenith-orange" />
                  </div>
                  <div className="text-3xl font-black text-[#0f2446]">{services.length}</div>
                  <div className="text-xs text-slate-500">12 trade capabilities cataloged</div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
                    <span>Work Orders / Leads</span>
                    <Inbox className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-3xl font-black text-[#0f2446]">{leads.length}</div>
                  <div className="text-xs text-emerald-600 font-semibold">Active intake requests</div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
                    <span>Google Reviews</span>
                    <Star className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-3xl font-black text-[#0f2446]">{reviews.length}</div>
                  <div className="text-xs text-amber-600 font-semibold">5.0 Star verified average</div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
                    <span>Hero Slides</span>
                    <Sliders className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-3xl font-black text-[#0f2446]">{slides.length}</div>
                  <div className="text-xs text-slate-500">High-visibility photos</div>
                </div>
              </div>

              {/* QUICK SHORTCUT ACTIONS */}
              <div className="bg-gradient-to-r from-[#0f2446] to-[#1a3660] text-white p-6 sm:p-8 rounded-3xl shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <span className="text-xs uppercase font-extrabold text-zenith-orange tracking-wider">
                    Quick Operational Tools
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black mt-1">
                    Manage Property Scopes, Photos & Client Proof
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-xl">
                    Update hero slider photos, catalog services, publish Google reviews, and review incoming inspection repair requests.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  <button
                    onClick={() => setActiveTab('slider')}
                    className="bg-zenith-orange hover:bg-zenith-orangeHover text-navy-950 font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-sm"
                  >
                    Change Hero Photos
                  </button>
                  <button
                    onClick={() => setActiveTab('services')}
                    className="bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2.5 rounded-xl text-xs border border-white/20 transition-all"
                  >
                    Manage Services
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className="bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2.5 rounded-xl text-xs border border-white/20 transition-all"
                  >
                    Add Google Review
                  </button>
                </div>
              </div>

              {/* RECENT LEADS PREVIEW */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-[#0f2446]">Recent Property Work Orders</h3>
                    <p className="text-xs text-slate-500">Latest service requests and contractor applications</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('leads')}
                    className="text-xs font-bold text-zenith-orange hover:underline flex items-center gap-1"
                  >
                    <span>View All ({leads.length})</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] font-bold border-b border-slate-100">
                      <tr>
                        <th className="py-3 px-4">Contact</th>
                        <th className="py-3 px-4">Property Address</th>
                        <th className="py-3 px-4">Service Scope</th>
                        <th className="py-3 px-4">Urgency</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {leads.slice(0, 5).map((l) => (
                        <tr key={l.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4 font-semibold text-slate-800">
                            <div>{l.name}</div>
                            <div className="text-[11px] text-slate-400 font-normal">{l.phone}</div>
                          </td>
                          <td className="py-3 px-4 text-slate-600 truncate max-w-xs">{l.address || 'Address provided on dispatch'}</td>
                          <td className="py-3 px-4 text-slate-600">{l.service}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              l.urgency?.includes('Urgent') || l.urgency?.includes('Emergency')
                                ? 'bg-red-50 text-red-700 border border-red-200'
                                : 'bg-slate-100 text-slate-700'
                            }`}>
                              {l.urgency || 'Standard'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              l.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' :
                              l.status === 'In Progress' ? 'bg-blue-50 text-blue-700' :
                              'bg-amber-50 text-amber-700'
                            }`}>
                              {l.status || 'New'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HERO SLIDER & PHOTOS */}
          {activeTab === 'slider' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-xl font-black text-[#0f2446]">Hero Slider & Background Photos</h3>
                  <p className="text-xs text-slate-500">Edit slide titles, badges, and upload new property photos in real-time</p>
                </div>
                <button
                  onClick={() => {
                    const newSlide = {
                      id: `slide-${Date.now()}`,
                      badge: 'New Service Highlight',
                      title: 'Property Service Excellence Across U.S. Markets',
                      subtitle: 'Comprehensive property preservation and maintenance dispatch.',
                      image: '/images/Securing-Service-740x556.jpg',
                      primaryCta: 'Request Service',
                      primaryLink: 'request-service',
                      secondaryCta: 'Contact Team',
                      secondaryLink: 'contact',
                      active: true
                    };
                    updateSlider([...slides, newSlide]);
                    showToast('New slide added. Edit details below.', 'success');
                  }}
                  className="bg-zenith-orange hover:bg-zenith-orangeHover text-navy-950 font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-sm flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Slide</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {slides.map((s, idx) => (
                  <div key={s.id || idx} className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col justify-between">
                    
                    {/* PHOTO PREVIEW */}
                    <div className="relative h-48 bg-slate-900 overflow-hidden">
                      <img
                        src={s.image}
                        alt={s.title}
                        className="w-full h-full object-cover brightness-95"
                        onError={(e) => { e.target.src = '/images/Securing-Service-740x556.jpg'; }}
                      />
                      <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] text-zenith-orange font-bold">
                        Slide #{idx + 1}
                      </div>
                      <div className="absolute top-3 right-3 flex items-center gap-2">
                        <button
                          onClick={() => {
                            const updated = slides.map(item => item.id === s.id ? { ...item, active: !item.active } : item);
                            updateSlider(updated);
                          }}
                          className={`text-[10px] font-bold px-2 py-1 rounded-md ${
                            s.active !== false ? 'bg-emerald-500 text-white' : 'bg-slate-600 text-slate-200'
                          }`}
                        >
                          {s.active !== false ? 'Active' : 'Hidden'}
                        </button>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="text-[10px] uppercase font-bold text-zenith-orange">{s.badge}</span>
                        <h4 className="text-sm font-bold truncate drop-shadow">{s.title}</h4>
                      </div>
                    </div>

                    {/* SLIDE DETAILS & EDIT CONTROLS */}
                    <div className="p-5 space-y-4 text-xs">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Badge Copy</label>
                        <input
                          type="text"
                          value={s.badge || ''}
                          onChange={(e) => {
                            const updated = slides.map(item => item.id === s.id ? { ...item, badge: e.target.value } : item);
                            updateSlider(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-zenith-orange bg-slate-50"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Slide Title</label>
                        <input
                          type="text"
                          value={s.title || ''}
                          onChange={(e) => {
                            const updated = slides.map(item => item.id === s.id ? { ...item, title: e.target.value } : item);
                            updateSlider(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-zenith-orange bg-slate-50"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Subtitle</label>
                        <textarea
                          rows={2}
                          value={s.subtitle || ''}
                          onChange={(e) => {
                            const updated = slides.map(item => item.id === s.id ? { ...item, subtitle: e.target.value } : item);
                            updateSlider(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-zenith-orange bg-slate-50"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Photo Image URL or Upload</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={s.image || ''}
                            onChange={(e) => {
                              const updated = slides.map(item => item.id === s.id ? { ...item, image: e.target.value } : item);
                              updateSlider(updated);
                            }}
                            className="flex-1 px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-zenith-orange bg-slate-50 text-[11px]"
                          />
                          <label className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 px-3 py-2 rounded-lg cursor-pointer flex items-center gap-1 font-bold text-[11px] shrink-0">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handlePhotoUpload(e, (url) => {
                                const updated = slides.map(item => item.id === s.id ? { ...item, image: url } : item);
                                updateSlider(updated);
                              })}
                            />
                          </label>
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                        <span className="text-[11px] text-slate-400">Instant auto-save to cPanel & JSON</span>
                        {slides.length > 1 && (
                          <button
                            onClick={() => {
                              if (confirm('Delete this slide?')) {
                                updateSlider(slides.filter(item => item.id !== s.id));
                              }
                            }}
                            className="text-red-500 hover:text-red-700 font-bold flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SERVICES & SCOPES */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-xl font-black text-[#0f2446]">Services & Trade Scopes</h3>
                  <p className="text-xs text-slate-500">Add or edit services, upload photos, turnaround times, and descriptions</p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search services..."
                      value={serviceSearch}
                      onChange={(e) => setServiceSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-zenith-orange bg-white"
                    />
                  </div>
                  <button
                    onClick={() => setEditingService({
                      id: `serv-${Date.now()}`,
                      title: 'New Custom Property Service',
                      category: 'Maintenance',
                      badge: 'Fast Dispatch',
                      turnaround: '24-48 Hours',
                      image: '/images/Securing-Service-740x556.jpg',
                      shortDescription: 'Describe the new property service scope here.',
                      features: ['Scope assessment & pricing', 'Qualified trade subcontractor', 'Photo verification']
                    })}
                    className="bg-zenith-orange hover:bg-zenith-orangeHover text-navy-950 font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-sm flex items-center gap-1.5 shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Service</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services
                  .filter(s => s.title.toLowerCase().includes(serviceSearch.toLowerCase()) || s.category?.toLowerCase().includes(serviceSearch.toLowerCase()))
                  .map((s) => (
                    <div key={s.id} className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col justify-between">
                      <div className="relative h-44 bg-slate-900">
                        <img
                          src={s.image}
                          alt={s.title}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.src = '/images/Securing-Service-740x556.jpg'; }}
                        />
                        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-bold text-zenith-orange">
                          {s.category}
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <h4 className="font-bold text-sm truncate drop-shadow">{s.title}</h4>
                          <span className="text-[10px] text-slate-300">Turnaround: {s.turnaround || 'Standard'}</span>
                        </div>
                      </div>

                      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between text-xs">
                        <p className="text-slate-600 line-clamp-2">{s.shortDescription}</p>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                          <button
                            onClick={() => setEditingService(s)}
                            className="bg-slate-100 hover:bg-zenith-orange hover:text-navy-950 text-slate-700 font-bold px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-1.5"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit Service & Photo</span>
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete service "${s.title}"?`)) {
                                updateServices(services.filter(item => item.id !== s.id));
                              }
                            }}
                            className="text-red-500 hover:text-red-700 p-1.5 rounded"
                            title="Delete"
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

          {/* TAB 4: GOOGLE REVIEWS HUB */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-xl font-black text-[#0f2446]">Google Reviews Management</h3>
                  <p className="text-xs text-slate-500">Add new client reviews, edit ratings, or remove obsolete testimonials</p>
                </div>
                <button
                  onClick={() => setEditingReview({
                    id: `rev-${Date.now()}`,
                    author: '',
                    role: 'Listing Agent / Realtor',
                    location: 'Wilmington, DE',
                    rating: 5,
                    date: 'Recently verified',
                    text: '',
                    verified: true,
                    source: 'Google Review'
                  })}
                  className="bg-zenith-orange hover:bg-zenith-orangeHover text-navy-950 font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-sm flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Google Review</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((r) => (
                  <div key={r.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < (r.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                          {r.source || 'Google Review'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 italic line-clamp-4">"{r.text}"</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-[#0f2446]">{r.author}</div>
                        <div className="text-[10px] text-slate-400">{r.role} • {r.location}</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setEditingReview(r)}
                          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete review from ${r.author}?`)) {
                              deleteReview(r.id);
                            }
                          }}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                          title="Delete"
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

          {/* TAB 5: LEADS & WORK ORDERS CRM */}
          {activeTab === 'leads' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-xl font-black text-[#0f2446]">Leads & Work Orders Intake</h3>
                  <p className="text-xs text-slate-500">Track client inspection repair requests and vendor onboarding forms</p>
                </div>
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by name, address, phone..."
                    value={leadSearch}
                    onChange={(e) => setLeadSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-zenith-orange bg-white"
                  />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] font-bold border-b border-slate-100">
                      <tr>
                        <th className="py-3 px-4">Type</th>
                        <th className="py-3 px-4">Contact</th>
                        <th className="py-3 px-4">Property Address</th>
                        <th className="py-3 px-4">Service Scope</th>
                        <th className="py-3 px-4">Urgency</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Admin Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {leads
                        .filter(l => 
                          (l.name || '').toLowerCase().includes(leadSearch.toLowerCase()) ||
                          (l.address || '').toLowerCase().includes(leadSearch.toLowerCase()) ||
                          (l.phone || '').includes(leadSearch) ||
                          (l.service || '').toLowerCase().includes(leadSearch.toLowerCase())
                        )
                        .map((l) => (
                          <tr key={l.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-4">
                              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                                {l.type === 'vendor_application' ? 'Vendor' : 'Service'}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="font-bold text-slate-800">{l.name}</div>
                              <div className="text-[11px] text-slate-400">{l.phone}</div>
                              <div className="text-[11px] text-slate-400 truncate max-w-[150px]">{l.email}</div>
                            </td>
                            <td className="py-3 px-4 text-slate-700 max-w-xs">{l.address || '—'}</td>
                            <td className="py-3 px-4 text-slate-700">{l.service}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                l.urgency?.includes('Urgent') || l.urgency?.includes('Emergency')
                                  ? 'bg-red-50 text-red-700'
                                  : 'bg-slate-100 text-slate-700'
                              }`}>
                                {l.urgency || 'Standard'}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <select
                                value={l.status || 'New'}
                                onChange={(e) => updateLeadStatus(l.id, e.target.value, l.adminNotes)}
                                className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-none ${
                                  l.status === 'Completed' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                                  l.status === 'In Progress' ? 'bg-blue-50 text-blue-800 border-blue-300' :
                                  'bg-amber-50 text-amber-800 border-amber-300'
                                }`}
                              >
                                <option value="New">New</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                              </select>
                            </td>
                            <td className="py-3 px-4">
                              <input
                                type="text"
                                defaultValue={l.adminNotes || ''}
                                placeholder="Add notes..."
                                onBlur={(e) => updateLeadStatus(l.id, l.status, e.target.value)}
                                className="w-full px-2.5 py-1 rounded border border-slate-200 text-[11px] focus:outline-none focus:border-zenith-orange bg-slate-50/50"
                              />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: CPANEL MYSQL DATABASE */}
          {activeTab === 'database' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-xl font-black text-[#0f2446]">cPanel MySQL Database Connection</h3>
                  <p className="text-xs text-slate-500">Live database connectivity status and phpMyAdmin setup instructions</p>
                </div>
                <button
                  onClick={checkDatabase}
                  disabled={checkingDb}
                  className="bg-[#0f2446] hover:bg-navy-900 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-sm flex items-center gap-2"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${checkingDb ? 'animate-spin' : ''}`} />
                  <span>Test Connection Now</span>
                </button>
              </div>

              {/* STATUS CARD */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    dbStatus?.connected ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                  }`}>
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#0f2446]">
                      Engine: {dbStatus?.engine || 'Checking...'}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {dbStatus?.message || 'Testing MySQL server and local fallback...'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Database Host</span>
                    <span className="font-mono font-bold text-slate-700">{dbStatus?.host || 'localhost'}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Database Name</span>
                    <span className="font-mono font-bold text-slate-700">{dbStatus?.dbName || 'ezyzenith_db'}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Storage State</span>
                    <span className={`font-bold ${dbStatus?.connected ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {dbStatus?.connected ? 'Live Connected' : 'Auto Local JSON Fallback'}
                    </span>
                  </div>
                </div>
              </div>

              {/* CPANEL SETUP INSTRUCTIONS */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4">
                <h4 className="text-base font-bold text-[#0f2446]">1-Click cPanel phpMyAdmin Setup Guide</h4>
                <ol className="list-decimal pl-5 text-xs text-slate-600 space-y-2 leading-relaxed">
                  <li>Log in to your <strong>cPanel</strong> dashboard.</li>
                  <li>Click <strong>MySQL® Databases</strong> and create database <code>ezyzenith_db</code>.</li>
                  <li>Create a database user, set a strong password, and assign <strong>ALL PRIVILEGES</strong> to the user on that database.</li>
                  <li>Open <strong>phpMyAdmin</strong> from cPanel, select <code>ezyzenith_db</code>, click <strong>Import</strong>, choose <code>database.sql</code> from the project root folder, and click <strong>Go</strong>.</li>
                  <li>In <code>.env.local</code> (or cPanel Node.js environment variables), set:
                    <pre className="mt-2 p-3 bg-slate-900 text-slate-100 rounded-xl font-mono text-[11px] overflow-x-auto">
                      DB_HOST=localhost&#10;DB_USER=your_cpanel_db_user&#10;DB_PASSWORD=your_cpanel_db_password&#10;DB_NAME=your_cpanel_db_name&#10;DB_PORT=3306
                    </pre>
                  </li>
                </ol>
              </div>
            </div>
          )}

          {/* TAB 7: COMPANY PROFILE SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-xl font-black text-[#0f2446]">Company Profile & Contact Information</h3>
                  <p className="text-xs text-slate-500">Edit business phone, dispatch hotline, email, and operations address</p>
                </div>
                <button
                  onClick={async () => {
                    setSavingCompany(true);
                    await updateCompany(companyForm);
                    setSavingCompany(false);
                  }}
                  disabled={savingCompany}
                  className="bg-zenith-orange hover:bg-zenith-orangeHover text-navy-950 font-bold px-5 py-2.5 rounded-xl text-xs transition-all shadow-sm flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{savingCompany ? 'Saving Changes...' : 'Save Company Profile'}</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Company Name</label>
                    <input
                      type="text"
                      value={companyForm.name || ''}
                      onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-zenith-orange"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Primary Tagline</label>
                    <input
                      type="text"
                      value={companyForm.tagline || ''}
                      onChange={(e) => setCompanyForm({ ...companyForm, tagline: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-zenith-orange"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Dispatch Phone Hotline</label>
                    <input
                      type="text"
                      value={companyForm.phone || ''}
                      onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-zenith-orange"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Operations Email</label>
                    <input
                      type="email"
                      value={companyForm.email || ''}
                      onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-zenith-orange"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Support Email</label>
                    <input
                      type="email"
                      value={companyForm.supportEmail || ''}
                      onChange={(e) => setCompanyForm({ ...companyForm, supportEmail: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-zenith-orange"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Operating Hours</label>
                    <input
                      type="text"
                      value={companyForm.hours || ''}
                      onChange={(e) => setCompanyForm({ ...companyForm, hours: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-zenith-orange"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Business Address / Market Footprint</label>
                  <input
                    type="text"
                    value={companyForm.address || ''}
                    onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-zenith-orange"
                  />
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* MODAL: EDIT SERVICE */}
      {/* ---------------------------------------------------------------- */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#0f2446]">
                {services.find(s => s.id === editingService.id) ? 'Edit Service' : 'Add New Service'}
              </h3>
              <button onClick={() => setEditingService(null)} className="p-1 rounded text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Service Title</label>
                <input
                  type="text"
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-zenith-orange"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={editingService.category}
                    onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-zenith-orange bg-white"
                  >
                    <option value="Preservation">Preservation</option>
                    <option value="Realtor Support">Realtor Support</option>
                    <option value="Property Management">Property Management</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Trades">Trades</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Turnaround</label>
                  <input
                    type="text"
                    value={editingService.turnaround}
                    onChange={(e) => setEditingService({ ...editingService, turnaround: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-zenith-orange"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Photo Image URL or Upload</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingService.image}
                    onChange={(e) => setEditingService({ ...editingService, image: e.target.value })}
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-zenith-orange text-[11px]"
                  />
                  <label className="bg-slate-100 hover:bg-slate-200 border border-slate-300 px-3 py-2 rounded-xl cursor-pointer font-bold text-[11px] shrink-0 flex items-center gap-1">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handlePhotoUpload(e, (url) => setEditingService({ ...editingService, image: url }))}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={editingService.shortDescription}
                  onChange={(e) => setEditingService({ ...editingService, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-zenith-orange"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="px-4 py-2 text-slate-600 hover:text-slate-900 font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const exists = services.find(s => s.id === editingService.id);
                  const updated = exists 
                    ? services.map(s => s.id === editingService.id ? editingService : s)
                    : [...services, editingService];
                  updateServices(updated);
                  setEditingService(null);
                }}
                className="bg-zenith-orange hover:bg-zenith-orangeHover text-navy-950 font-bold px-5 py-2.5 rounded-xl shadow-sm"
              >
                Save Service
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* MODAL: EDIT GOOGLE REVIEW */}
      {/* ---------------------------------------------------------------- */}
      {editingReview && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#0f2446]">
                {reviews.find(r => r.id === editingReview.id) ? 'Edit Google Review' : 'Add New Google Review'}
              </h3>
              <button onClick={() => setEditingReview(null)} className="p-1 rounded text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Author Name *</label>
                <input
                  type="text"
                  required
                  value={editingReview.author}
                  onChange={(e) => setEditingReview({ ...editingReview, author: e.target.value })}
                  placeholder="e.g. Jessica Miller"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-zenith-orange"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Author Role</label>
                  <input
                    type="text"
                    value={editingReview.role}
                    onChange={(e) => setEditingReview({ ...editingReview, role: e.target.value })}
                    placeholder="e.g. Listing Agent"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-zenith-orange"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={editingReview.location}
                    onChange={(e) => setEditingReview({ ...editingReview, location: e.target.value })}
                    placeholder="e.g. Wilmington, DE"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-zenith-orange"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Star Rating (1-5)</label>
                <select
                  value={editingReview.rating}
                  onChange={(e) => setEditingReview({ ...editingReview, rating: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-zenith-orange bg-white"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                  <option value={3}>⭐⭐⭐ (3 Stars)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Review Text *</label>
                <textarea
                  rows={4}
                  required
                  value={editingReview.text}
                  onChange={(e) => setEditingReview({ ...editingReview, text: e.target.value })}
                  placeholder="Write client testimonial text..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-zenith-orange"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="verifiedCheck"
                  checked={editingReview.verified !== false}
                  onChange={(e) => setEditingReview({ ...editingReview, verified: e.target.checked })}
                  className="rounded text-zenith-orange focus:ring-zenith-orange"
                />
                <label htmlFor="verifiedCheck" className="text-xs text-slate-700 font-semibold cursor-pointer">
                  Display "Verified Review" badge
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingReview(null)}
                className="px-4 py-2 text-slate-600 hover:text-slate-900 font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  if (!editingReview.author || !editingReview.text) {
                    showToast('Please provide author name and review text', 'error');
                    return;
                  }
                  await saveReview(editingReview);
                  setEditingReview(null);
                }}
                className="bg-zenith-orange hover:bg-zenith-orangeHover text-navy-950 font-bold px-5 py-2.5 rounded-xl shadow-sm"
              >
                Save Review
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

