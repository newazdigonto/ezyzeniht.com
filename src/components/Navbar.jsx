import React, { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  ShieldCheck, 
  Wrench, 
  Sliders, 
  Home, 
  FileText, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export default function Navbar() {
  const { siteData, currentPage, navigateTo, currentUser, userRole, logout } = useSite();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const phone = siteData?.company?.phone || '302-244-5523';
  const email = siteData?.company?.email || 'contact@ezyzenith.com';

  const isHomeTransparent = currentPage === 'home' && !isScrolled;

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'realtor-support', label: 'Realtor Support', badge: 'Hot' },
    { id: 'property-management', label: 'Property Management' },
    { id: 'coverage', label: 'Coverage Areas' },
    { id: 'become-vendor', label: 'Become a Vendor' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNav = (page) => {
    navigateTo(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
      isHomeTransparent 
        ? 'bg-gradient-to-b from-black/80 via-black/40 to-transparent' 
        : 'bg-[#0f2446]/95 backdrop-blur-md shadow-lg border-b border-slate-800/80'
    }`}>
      {/* TOP EMERGENCY & TRUST BAR */}
      <div className={`text-xs sm:text-sm py-1.5 px-4 sm:px-8 border-b transition-colors duration-300 ${
        isHomeTransparent 
          ? 'border-white/10 text-slate-300 bg-black/20 backdrop-blur-sm' 
          : 'border-slate-800 bg-[#0a172c] text-slate-300'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-6">
            <a 
              href={`tel:${phone.replace(/[^0-9]/g, '')}`} 
              className="flex items-center gap-1.5 font-semibold text-zenith-orange hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>24/7 Dispatch: <strong className="text-white">{phone}</strong></span>
            </a>
            <a 
              href={`mailto:${email}`} 
              className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-zenith-orange" />
              <span>{email}</span>
            </a>
            <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Nationwide Field Coordination</span>
            </div>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] bg-emerald-950/80 text-emerald-300 px-3 py-1 rounded-full border border-emerald-800 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Insured & Verified Subcontractors
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] bg-navy-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700 font-medium">
              <Clock className="w-3 h-3 text-zenith-orange" /> Rapid 24h Response
            </span>
          </div>
        </div>
      </div>

      {/* MAIN NAV BAR */}
      <nav className={`px-4 sm:px-8 py-3 transition-all duration-300 ${
        isHomeTransparent ? 'bg-transparent' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* OFFICIAL BRAND 2-COLOR LOGO (No White Background) */}
          <button 
            onClick={() => handleNav('home')} 
            className="flex items-center focus:outline-none group py-1"
            aria-label="EZY Zenith Home"
          >
            <img 
              src="/images/logo-color.png" 
              alt="EZY Zenith" 
              className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105 drop-shadow-[0_1px_2px_rgba(255,255,255,0.75)]"
              onError={(e) => {
                e.target.src = '/images/logo.png';
              }}
            />
          </button>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                    isActive 
                      ? 'text-white bg-white/15 backdrop-blur-md shadow-inner' 
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {link.label}
                    {link.badge && (
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 bg-zenith-orange text-navy-950 rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-zenith-orange rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* RIGHT ACTION BUTTONS */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleNav('request-service')}
              className="relative group overflow-hidden bg-gradient-to-r from-zenith-orange to-amber-500 hover:from-amber-500 hover:to-zenith-orange text-navy-950 font-bold px-5 py-2.5 rounded-xl text-sm shadow-accent transition-all duration-300 hover:shadow-lg transform active:scale-95 flex items-center gap-2"
            >
              <span>Request Service</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => handleNav('request-service')}
              className="sm:hidden bg-zenith-orange text-navy-950 font-bold px-3 py-1.5 rounded-md text-xs"
            >
              Request
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg bg-black/40 border border-white/20 focus:outline-none backdrop-blur-md"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* 2-COLOR BRAND ACCENT LINE (Navy + Orange) */}
      <div className="h-[2.5px] w-full bg-gradient-to-r from-zenith-navy via-zenith-orange to-zenith-navy" />

      {/* MOBILE MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0f2446] border-b border-slate-800 px-5 py-4 space-y-2 shadow-2xl animate-fadeIn">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between transition-colors ${
                currentPage === link.id
                  ? 'bg-slate-800 text-zenith-orange border-l-4 border-zenith-orange'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="text-[10px] font-bold px-2 py-0.5 bg-zenith-orange text-navy-950 rounded-full">
                  {link.badge}
                </span>
              )}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-800/80 space-y-2">
            <button
              onClick={() => handleNav('request-service')}
              className="w-full bg-zenith-orange text-navy-950 font-bold py-3 rounded-lg text-center text-sm shadow-accent"
            >
              Request Service Now
            </button>
            <a
              href={`tel:${phone.replace(/[^0-9]/g, '')}`}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-2.5 rounded-lg text-center text-sm flex items-center justify-center gap-2 border border-slate-700"
            >
              <Phone className="w-4 h-4 text-zenith-orange" />
              <span>Call Dispatch: {phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

