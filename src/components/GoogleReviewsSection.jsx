import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { 
  Star, 
  CheckCircle2, 
  Quote, 
  PlusCircle, 
  MapPin, 
  Sparkles,
  Sliders,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function GoogleReviewsSection() {
  const { siteData, navigateTo } = useSite();
  const reviews = siteData?.googleReviews || [];

  return (
    <section className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* TOP GOOGLE RATING HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs uppercase tracking-wider border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Client Satisfaction</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#182333] tracking-tight">
              Trusted by Top Realtors, Asset Managers & Landlords
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Real feedback from brokers, investors, and property management teams who count on EZY Zenith for critical property maintenance and turnover services.
            </p>
          </div>

          {/* GOOGLE BADGE WIDGET */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 flex items-center gap-4 shadow-soft shrink-0">
            <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-lg text-blue-600 shadow-sm">
              <span className="text-blue-500">G</span>
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="font-extrabold text-sm text-[#182333] ml-1">5.0</span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Based on verified U.S. client partnerships
              </div>
            </div>
          </div>
        </div>

        {/* REVIEWS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div 
              key={rev.id || idx}
              className="card-hover-illuminate bg-white rounded-2xl p-7 shadow-subtle hover:shadow-minimal transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
            >
              <div>
                {/* STARS & SOURCE */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${
                          i < (rev.rating || 5) 
                            ? 'fill-amber-400 text-amber-400' 
                            : 'text-slate-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{rev.source || 'Google Review'}</span>
                  </span>
                </div>

                {/* REVIEW TEXT */}
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic relative">
                  <Quote className="w-6 h-6 text-slate-200 absolute -top-3 -left-2 -z-10" />
                  "{rev.text}"
                </p>
              </div>

              {/* AUTHOR INFO */}
              <div className="pt-6 mt-6 border-t border-slate-200/80 flex items-center gap-3">
                <img
                  src={rev.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                  alt={rev.author}
                  className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
                  }}
                />
                <div>
                  <div className="font-bold text-sm text-[#182333] flex items-center gap-1.5">
                    <span>{rev.author}</span>
                    {rev.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" title="Verified Customer" />
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    {rev.role}
                  </div>
                  {rev.location && (
                    <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-zenith-orange" />
                      <span>{rev.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="mt-12 text-center flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => navigateTo('request-service')}
            className="bg-zenith-orange hover:bg-zenith-orangeHover text-navy-950 font-bold px-7 py-3.5 rounded-xl text-sm transition-all shadow-accent"
          >
            Experience Our Service • Request Work Order
          </button>
        </div>

      </div>
    </section>
  );
}

