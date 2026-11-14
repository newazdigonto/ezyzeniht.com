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
      className="relative w-full overflow-hidden bg-slate-950 text-white min-h-[580px] lg:min-h-[620px] xl:h-[calc(100vh-10px)] max-h-[760px] pt-24 sm:pt-28 pb-4 flex items-center justify-center"
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

      {/* CONTENT WRAPPER - COMPACT ABOVE-THE-FOLD FIT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-2 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* LEFT SLIDE TEXT (Col 1-7) */}
          <div className="lg:col-span-7 space-y-3.5 xl:space-y-4">
            
            {/* ANIMATED BORDER BADGE */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0f2446]/85 border border-zenith-orange/60 text-zenith-orange text-[11px] sm:text-xs font-semibold tracking-wide shadow-sm backdrop-blur-md animate-border-pulse">
              <span className="w-2 h-2 rounded-full bg-zenith-orange animate-ping" />
              <span>{currentSlide.badge || 'Property Preservation • Maintenance • Listing Support'}</span>
            </div>

            {/* HEADLINE */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] xl:text-[40px] font-black text-white leading-[1.18] tracking-tight drop-shadow-md">
              {currentSlide.title}
            </h1>

            {/* SUBHEADLINE */}
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl font-normal drop-shadow line-clamp-3">
              {currentSlide.subtitle}
            </p>

            {/* CTA BUTTONS */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => navigateTo(currentSlide.primaryLink || 'request-service')}
                className="bg-zenith-orange hover:bg-zenith-orangeHover text-navy-950 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-accent transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 group"
              >
                <span>{currentSlide.primaryCta || 'Request Service'}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => navigateTo(currentSlide.secondaryLink || 'become-vendor')}
                className="bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold px-4 py-2.5 rounded-xl text-xs sm:text-sm backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-0.5"
              >
                {currentSlide.secondaryCta || 'Partner With Us'}
              </button>
            </div>

            {/* KEY TRUST BULLETS UNDER HERO */}
            <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 pt-1 text-[11px] sm:text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-zenith-orange" />
                <span>Single Point of Coordination</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-zenith-orange" />
                <span>Detailed Photo Documentation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-zenith-orange" />
                <span>Qualified Subcontractors</span>
              </div>
            </div>

          </div>

          {/* RIGHT LEAD COLLECT FORM IN HERO SECTION (COMPACT & SLEEK) */}
          <div className="lg:col-span-5">
            <div className="animated-gradient-border-dark shadow-xl">
              <div className="bg-[#0f2446]/92 rounded-2xl p-4 sm:p-5 backdrop-blur-xl text-slate-200 space-y-2.5">
                
                {/* HEADER */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-700/80">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] uppercase font-extrabold tracking-wider text-emerald-400">
                      Instant Dispatch Desk
                    </span>
                  </div>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                    24/7 Available
                  </span>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                    Fast Property Work Order
                  </h3>
                  <p className="text-[11px] text-slate-300">
                    Get rapid pricing, contractor scheduling & photo updates.
                  </p>
                </div>

                {/* FORM OR SUCCESS STATE */}
                {leadSubmitted ? (
                  <div className="py-6 text-center space-y-2.5 bg-slate-900/60 rounded-xl p-4 border border-emerald-800/80">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-white">Work Order Dispatched!</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Our dispatch desk received your request for <strong>{leadForm.address}</strong>. A coordinator will call you at <strong>{leadForm.phone}</strong> shortly.
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
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleHeroLeadSubmit} className="space-y-2.5 text-xs">
                    <div>
                      <label className="block font-bold text-slate-300 mb-0.5 text-[11px]">
                        Property Address *
                      </label>
                      <input
                        type="text"
                        required
                        value={leadForm.address}
                        onChange={(e) => setLeadForm({ ...leadForm, address: e.target.value })}
                        placeholder="e.g. 742 Evergreen Ave, Wilmington, DE"
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-zenith-orange transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 mb-0.5 text-[11px]">
                        Service Needed *
                      </label>
                      <select
                        value={leadForm.service}
                        onChange={(e) => setLeadForm({ ...leadForm, service: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700 text-white text-xs focus:outline-none focus:border-zenith-orange transition-colors"
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

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-bold text-slate-300 mb-0.5 text-[11px]">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={leadForm.name}
                          onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                          placeholder="Your Name"
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-zenith-orange transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-300 mb-0.5 text-[11px]">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={leadForm.phone}
                          onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                          placeholder="(302) 555-0199"
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-zenith-orange transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 mb-0.5 text-[11px]">
                        Timeline / Urgency
                      </label>
                      <select
                        value={leadForm.urgency}
                        onChange={(e) => setLeadForm({ ...leadForm, urgency: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700 text-white text-xs focus:outline-none focus:border-zenith-orange transition-colors"
                      >
                        <option value="Urgent (< 48 hrs)">Urgent (Under 48 Hours)</option>
                        <option value="Emergency (< 24 hrs)">Emergency (Same-Day / Under 24h)</option>
                        <option value="Standard (2-3 Days)">Standard (2-3 Business Days)</option>
                        <option value="Scheduled">Scheduled for Next Week</option>
                      </select>
                    </div>

                    <div className="pt-1">
                      <button
                        type="submit"
                        disabled={leadSubmitting}
                        className="w-full bg-zenith-orange hover:bg-zenith-orangeHover text-navy-950 font-bold py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-accent text-center flex items-center justify-center gap-1.5 group disabled:opacity-50"
                      >
                        <span>{leadSubmitting ? 'Dispatching...' : 'Request Immediate Service Dispatch'}</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>

                    <div className="text-center pt-0.5">
                      <a 
                        href={`tel:${phone.replace(/[^0-9]/g, '')}`} 
                        className="text-[10px] text-slate-400 hover:text-white flex items-center justify-center gap-1"
                      >
                        <PhoneCall className="w-3 h-3 text-zenith-orange" />
                        <span>Or call dispatch directly: <strong className="text-slate-200">{phone}</strong></span>
                      </a>
                    </div>
                  </form>
                )}

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* SLIDER CONTROLS (ARROWS & DOTS & THUMBNAILS - COMPACT AT BOTTOM) */}
      {slides.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-zenith-orange hover:text-navy-950 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-200"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-zenith-orange hover:text-navy-950 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-200"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* DOTS INDICATOR */}
          <div className="absolute bottom-3 left-4 sm:left-10 z-20 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex 
                    ? 'w-6 h-1.5 bg-zenith-orange' 
                    : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* PHOTO THUMBNAIL PREVIEWS */}
          <div className="hidden lg:flex items-center gap-2 absolute bottom-2.5 right-4 sm:right-10 z-20 bg-slate-950/85 backdrop-blur-md p-1.5 rounded-xl border border-white/20 shadow-xl">
            <div className="text-[10px] font-bold text-slate-300 px-1.5 flex items-center gap-1">
              <Camera className="w-3 h-3 text-zenith-orange" />
              <span>Photos:</span>
            </div>
            {slides.map((s, idx) => (
              <button
                key={s.id || idx}
                onClick={() => setCurrentIndex(idx)}
                className={`group relative rounded-lg overflow-hidden border transition-all duration-300 ${
                  idx === currentIndex 
                    ? 'border-zenith-orange scale-105 shadow-md shadow-zenith-orange/30 ring-1 ring-zenith-orange/50' 
                    : 'border-white/20 opacity-70 hover:opacity-100 hover:border-white/50'
                }`}
                title={s.title}
              >
                <img 
                  src={s.image} 
                  alt={s.title} 
                  className="w-13 h-8.5 object-cover"
                  onError={(e) => { e.target.src = '/images/Securing-Service-740x556.jpg'; }}
                />
                <div className={`absolute inset-0 transition-opacity ${idx === currentIndex ? 'bg-transparent' : 'bg-black/30 group-hover:bg-transparent'}`} />
                <span className="absolute bottom-0 inset-x-0 bg-black/85 text-[8px] text-white font-semibold text-center truncate px-1 py-0.2">
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

