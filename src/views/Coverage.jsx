import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import PageHero from '../components/PageHero';
import { MapPin, Search, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Coverage() {
  const { siteData, navigateTo } = useSite();
  const states = siteData?.coverageStates || [];
  const [query, setQuery] = useState('');

  const filteredStates = states.filter(s => 
    s.name.toLowerCase().includes(query.toLowerCase()) || 
    s.code.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* DEDICATED PAGE HERO WITH PHOTO & THUMBNAILS */}
      <PageHero
        badge="Multi-Market Footprint"
        badgeIcon={MapPin}
        title="Multi-Market Property Service Coordination"
        subtitle="EZY Zenith LLC supports property service coordination across multiple U.S. markets through a growing, verified subcontractor and field vendor network."
        primaryCtaText="Request Service in Your State"
        primaryCtaLink="request-service"
        secondaryCtaText="Become a Vendor Partner"
        secondaryCtaLink="become-vendor"
        initialImage="/images/Landscaping-740x556.jpg"
        breadcrumbs="Coverage Footprint"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14 sm:py-18">
        {/* SEARCH & STATUS GUIDE */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search state name or abbreviation (e.g. DE, PA, FL, TX)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-zenith-orange"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Active Service Hubs
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Coordinated Network
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Expanding Markets
            </span>
          </div>
        </div>

        {/* STATES GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-16">
          {filteredStates.map((st, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-4 border border-slate-200 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl font-black text-[#182333] group-hover:text-zenith-orange transition-colors">
                  {st.code}
                </span>
                <span className={`w-2 h-2 rounded-full ${
                  st.status.includes('Hub') ? 'bg-emerald-500' :
                  st.status.includes('Active') ? 'bg-blue-500' : 'bg-amber-500'
                }`} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">{st.name}</h4>
                <span className="text-[11px] text-slate-500">{st.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* COVERAGE AVAILABILITY NOTICE (FROM SLIDES) */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-soft space-y-4">
          <div className="flex items-center gap-2 text-zenith-orange font-bold text-sm uppercase tracking-wider">
            <ShieldCheck className="w-5 h-5" />
            <span>Coverage & Network Disclaimer</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Coverage availability may vary by specific service type, property location, vendor availability, state licensing requirements, and client timeline. For urgent requests in unlisted counties or rural zip codes, our coordination desk conducts rapid contractor sourcing to support your portfolio.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigateTo('request-service')}
              className="bg-[#182333] hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all"
            >
              Check Coverage for Your Property
            </button>
            <button
              onClick={() => navigateTo('become-vendor')}
              className="bg-zenith-orange hover:bg-zenith-orangeHover text-navy-950 font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-accent"
            >
              Apply as a Local Vendor in Your State
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
