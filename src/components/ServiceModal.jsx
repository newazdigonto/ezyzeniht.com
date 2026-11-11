import React from 'react';
import { useSite } from '../context/SiteContext';
import { X, CheckCircle2, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

export default function ServiceModal() {
  const { selectedService, setSelectedService, navigateTo } = useSite();

  if (!selectedService) return null;

  const handleBook = () => {
    const servTitle = selectedService.title;
    setSelectedService(null);
    navigateTo('request-service', { service: servTitle });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={() => setSelectedService(null)}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/80 text-white hover:bg-zenith-orange hover:text-navy-950 flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* IMAGE */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
          <img
            src={selectedService.image}
            alt={selectedService.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = '/images/Securing-Service-740x556.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-xs uppercase font-extrabold tracking-wider bg-zenith-orange text-navy-950 px-2.5 py-1 rounded-md">
              {selectedService.category}
            </span>
            <h3 className="text-2xl font-black text-white mt-1.5 drop-shadow">
              {selectedService.title}
            </h3>
          </div>
        </div>

        {/* BODY */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Scope of Work
            </h4>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {selectedService.fullDescription || selectedService.shortDescription}
            </p>
          </div>

          {/* FEATURES CHECKLIST */}
          {selectedService.features && selectedService.features.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Included Work & Specifications
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedService.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TURNAROUND & COMPLIANCE BAR */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-zenith-orange" />
              <span>Standard Turnaround: <strong>{selectedService.turnaround || '24-48 Hours'}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Full Photo Documentation</span>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
            <button
              onClick={() => setSelectedService(null)}
              className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-sm transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleBook}
              className="bg-zenith-orange hover:bg-zenith-orangeHover text-navy-950 font-bold px-7 py-3 rounded-xl text-sm transition-all shadow-accent flex items-center gap-2"
            >
              <span>Request Service for This Trade</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

