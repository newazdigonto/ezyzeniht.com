import React, { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  PhoneCall, 
  FileCheck2,
  CheckCircle2,
  Camera
} from 'lucide-react';

export default function HeroSlider() {
  const { siteData, navigateTo, submitLead, showToast } = useSite();
  const rawSlides = siteData?.heroSlides || [];
  const slides = rawSlides.filter(s => s.active !== false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Hero Lead Form State
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    address: '',
    service: 'Realtor Listing Prep & Inspection Repairs',
    urgency: 'Urgent (< 48 hrs)'
  });
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const handleHeroLeadSubmit = async (e) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone || !leadForm.address) {
      showToast('Please provide your name, phone, and property address', 'error');
      return;
    }
    setLeadSubmitting(true);
    const res = await submitLead({
      type: 'hero_fast_quote',
      email: 'lead@ezyzenith-intake.com',
      notes: `Hero Fast Intake Form | Urgency: ${leadForm.urgency}`,
      ...leadForm
    });
    setLeadSubmitting(false);
    if (res.success) {
      setLeadSubmitted(true);
    }
  };

  // Auto-advance slider every 6.5s
  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  if (!slides.length) return null;

  const currentSlide = slides[currentIndex] || slides[0];

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % slides.length);
  };

  const phone = siteData?.company?.phone || '302-244-5523';

  return (
    <section 
      className="relative w-full overflow-hidden bg-slate-950 text-white min-h-[720px] lg:min-h-[780px] pt-36 sm:pt-44 pb-20 flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* BACKGROUND IMAGE - FULLY VISIBLE & VIBRANT */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id || idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          } transform transition-transform duration-1000`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center brightness-[0.94] contrast-[1.05]"
            onError={(e) => {
              e.target.src = '/images/Securing-Service-740x556.jpg';
            }}
          />
          {/* Gentle directional scrim only on the left text side, keeping the property photo vividly visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#07111e]/90 via-[#0a182c]/65 to-black/20 lg:w-[60%] w-full pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07111e]/85 via-transparent to-black/25 pointer-events-none" />
        </div>
      ))}

      {/* CONTENT WRAPPER */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* LEFT SLIDE TEXT (Col 1-8) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* ANIMATED BORDER BADGE */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0f2446]/80 border border-zenith-orange/60 text-zenith-orange text-xs sm:text-sm font-semibold tracking-wide shadow-sm backdrop-blur-md animate-border-pulse">
              <span className="w-2 h-2 rounded-full bg-zenith-orange animate-ping" />
              <span>{currentSlide.badge || 'Property Preservation • Maintenance • Listing Support'}</span>
            </div>

            {/* HEADLINE */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-white leading-[1.15] tracking-tight drop-shadow-md">
              {currentSlide.title}
            </h1>

            {/* SUBHEADLINE */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal drop-shadow">
              {currentSlide.subtitle}
            </p>

            {/* CTA BUTTONS */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigateTo(currentSlide.primaryLink || 'request-service')}
                className="bg-zenith-orange hover:bg-zenith-orangeHover text-navy-950 font-bold px-7 py-4 rounded-xl text-base shadow-accent transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 group"
              >
                <span>{currentSlide.primaryCta || 'Request Service'}</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => navigateTo(currentSlide.secondaryLink || 'become-vendor')}
                className="bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold px-6 py-4 rounded-xl text-base backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-0.5"
              >
                {currentSlide.secondaryCta || 'Partner With Us'}
              </button>
            </div>

            {/* KEY TRUST BULLETS UNDER HERO */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-zenith-orange" />
                <span>Single Point of Coordination</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-zenith-orange" />
                <span>Detailed Photo Documentation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-zenith-orange" />
                <span>Qualified Subcontractors</span>
              </div>
            </div>

          </div>

          {/* RIGHT LEAD COLLECT FORM IN HERO SECTION (WITH ANIMATED BORDER) */}
          <div className="lg:col-span-4">
            <div className="animated-gradient-border-dark shadow-2xl">
              <div className="bg-[#0f2446]/95 rounded-2xl p-6 sm:p-7 backdrop-blur-xl text-slate-200 space-y-4">
                
                {/* HEADER */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-700/80">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-400">
                      Instant Dispatch Desk
                    </span>
                  </div>
                  <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                    24/7 Available
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-white tracking-tight">
                    Fast Property Work Order
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Get rapid pricing, contractor scheduling, and completion photo updates.
                  </p>
                </div>

                {/* FORM OR SUCCESS STATE */}
                {leadSubmitted ? (
                  <div className="py-8 text-center space-y-3 bg-slate-900/60 rounded-xl p-4 border border-emerald-800/80">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-white">Work Order Dispatched!</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Our dispatch desk has received your request for <strong>{leadForm.address}</strong>. A coordinator will call you at <strong>{leadForm.phone}</strong> shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setLeadSubmitted(false);
                        setLeadForm({
                          name: '',
                          phone: '',
                          address: '',
                          service: 'Realtor Listing Prep & Inspection Repairs',
                          urgency: 'Urgent (< 48 hrs)'
                        });
                      }}
                      className="text-xs text-zenith-orange hover:underline font-bold pt-1 block mx-auto"
                    >
                      Submit Another Property Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleHeroLeadSubmit} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-bold text-slate-300 mb-1">
                        Property Address (Street, City, State, Zip) *
                      </label>
                      <input
                        type="text"
                        required
                        value={leadForm.address}
                        onChange={(e) => setLeadForm({ ...leadForm, address: e.target.value })}
                        placeholder="e.g. 742 Evergreen Ave, Wilmington, DE"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-zenith-orange transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 mb-1">
                        Service Needed *
                      </label>
                      <select
                        value={leadForm.service}
                        onChange={(e) => setLeadForm({ ...leadForm, service: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-white focus:outline-none focus:border-zenith-orange transition-colors"
                      >
                        <option value="Realtor Listing Prep & Inspection Repairs">Realtor Listing Prep & Inspection Repairs</option>
                        <option value="Property Preservation & Securing">Property Preservation & Securing</option>
                        <option value="Tenant Turnover & Make-Ready">Tenant Turnover & Make-Ready</option>
                        <option value="Trash-Out & Debris Removal">Trash-Out & Debris Removal</option>
                        <option value="Lawn Care & Curb Appeal">Lawn Care & Curb Appeal</option>
                        <option value="Roofing, Siding & Gutter Repairs">Roofing, Siding & Gutter Repairs</option>
                        <option value="General Handyman & Carpentry">General Handyman & Carpentry</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="block font-bold text-slate-300 mb-1">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={leadForm.name}
                          onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                          placeholder="Your Name"
                          className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-zenith-orange transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-300 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={leadForm.phone}
                          onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                          placeholder="(302) 555-0199"
                          className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-zenith-orange transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 mb-1">
                        Timeline / Urgency
                      </label>
                      <select
                        value={leadForm.urgency}
                        onChange={(e) => setLeadForm({ ...leadForm, urgency: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-white focus:outline-none focus:border-zenith-orange transition-colors"
                      >
                        <option value="Urgent (< 48 hrs)">Urgent (Under 48 Hours)</option>
                        <option value="Emergency (< 24 hrs)">Emergency (Same-Day / Under 24h)</option>
                        <option value="Standard (2-3 Days)">Standard (2-3 Business Days)</option>
                        <option value="Scheduled">Scheduled for Next Week</option>
                      </select>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={leadSubmitting}
                        className="w-full bg-zenith-orange hover:bg-zenith-orangeHover text-navy-950 font-bold py-3.5 rounded-xl text-xs sm:text-sm transition-all shadow-accent text-center flex items-center justify-center gap-2 group disabled:opacity-50"
                      >
                        <span>{leadSubmitting ? 'Dispatching Work Order...' : 'Request Immediate Service Dispatch'}</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>

                    <div className="text-center pt-1">
                      <a 
                        href={`tel:${phone.replace(/[^0-9]/g, '')}`} 
                        className="text-[11px] text-slate-400 hover:text-white flex items-center justify-center gap-1.5"
                      >
                        <PhoneCall className="w-3 h-3 text-zenith-orange" />
                        <span>Or call dispatch directly: <strong>{phone}</strong></span>
                      </a>
                    </div>
                  </form>
                )}

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* SLIDER CONTROLS (ARROWS & DOTS) */}
      {slides.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-zenith-orange hover:text-navy-950 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-200"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-zenith-orange hover:text-navy-950 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-200"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* DOTS INDICATOR */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex 
                    ? 'w-7 h-2 bg-zenith-orange' 
                    : 'w-2 h-2 bg-white/40 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* PHOTO THUMBNAIL PREVIEWS TO CLEARLY SEE ALL PROPERTY PHOTOS */}
          <div className="hidden lg:flex items-center gap-2.5 absolute bottom-4 right-8 z-20 bg-slate-950/85 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-2xl">
            <div className="text-[11px] font-bold text-slate-300 px-2 flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-zenith-orange" />
              <span>Photos:</span>
            </div>
            {slides.map((s, idx) => (
              <button
                key={s.id || idx}
                onClick={() => setCurrentIndex(idx)}
                className={`group relative rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  idx === currentIndex 
                    ? 'border-zenith-orange scale-105 shadow-md shadow-zenith-orange/30 ring-2 ring-zenith-orange/40' 
                    : 'border-white/20 opacity-70 hover:opacity-100 hover:border-white/50'
                }`}
                title={s.title}
              >
                <img 
                  src={s.image} 
                  alt={s.title} 
                  className="w-16 h-11 object-cover"
                  onError={(e) => { e.target.src = '/images/Securing-Service-740x556.jpg'; }}
                />
                <div className={`absolute inset-0 transition-opacity ${idx === currentIndex ? 'bg-transparent' : 'bg-black/30 group-hover:bg-transparent'}`} />
                <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[9px] text-white font-semibold text-center truncate px-1 py-0.5">
                  {s.badge ? s.badge.split(' ')[0] : `Photo ${idx+1}`}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

