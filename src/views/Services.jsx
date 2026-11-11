import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import ServiceModal from '../components/ServiceModal';
import PageHero from '../components/PageHero';
import { 
  Wrench, 
  Search, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Sliders, 
  ChevronRight,
  ShieldCheck 
} from 'lucide-react';

export default function Services() {
  const { siteData, navigateTo, setSelectedService } = useSite();
  const rawServices = siteData?.services || [];
  const services = rawServices.filter(s => s.active !== false);

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Preservation', 'Realtor Support', 'Property Management', 'Maintenance', 'Trades'];

  const filtered = services.filter(s => {
    const matchesCat = selectedCategory === 'All' || s.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase()) || 
                          s.shortDescription.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* DEDICATED PAGE HERO WITH SERVICE PHOTOS & THUMBNAILS */}
      <PageHero
        badge="Full Trade & Preservation Catalog"
        badgeIcon={Wrench}
        title="Property Services & Field Trade Capabilities"
        subtitle="Explore our complete range of property preservation, turnover, maintenance, and Realtor support services with photo documentation."
        primaryCtaText="Request Service"
        primaryCtaLink="request-service"
        secondaryCtaText="Admin Service Manager"
        secondaryCtaLink="dashboard"
        initialImage={services[0]?.image || '/images/Securing-Service-740x556.jpg'}
        thumbnails={services.slice(0, 8).map(s => ({
          id: s.id,
          title: s.title,
          category: s.category,
          image: s.image
        }))}
        breadcrumbs="Services Catalog"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14 sm:py-18">
        
        {/* HEADER BAR & ADMIN SHORTCUT */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-bold text-[#182333]">All Capabilities ({filtered.length} Services)</h2>
            <p className="text-xs text-slate-500">Filter by category or search specific trade work below</p>
          </div>
          <button
            onClick={() => navigateTo('dashboard')}
            className="text-xs bg-white hover:bg-zenith-orange hover:text-navy-950 font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-2 text-slate-700 border border-slate-300 shadow-soft"
          >
            <Sliders className="w-3.5 h-3.5 text-zenith-orange" />
            <span>Manage Services & Photos</span>
          </button>
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-soft mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* SEARCH INPUT */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search service, repairs, trades..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-zenith-orange"
            />
          </div>

          {/* CATEGORY BUTTONS */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#182333] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* SERVICES CARDS */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center text-slate-500 border border-slate-200">
            No services found matching your criteria. Try adjusting your search term.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((service, idx) => (
              <div
                key={service.id || idx}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  {/* SERVICE IMAGE */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = '/images/Securing-Service-740x556.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider bg-slate-900/80 text-white px-2.5 py-1 rounded-md backdrop-blur-sm">
                        {service.category}
                      </span>
                      {service.badge && (
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-zenith-orange text-navy-950 px-2 py-0.5 rounded shadow">
                          {service.badge}
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 right-3 text-[11px] font-semibold text-slate-200 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm flex items-center gap-1">
                      <Clock className="w-3 h-3 text-zenith-orange" />
                      <span>{service.turnaround || '24-48h'}</span>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#182333] mb-2 group-hover:text-zenith-orange transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {service.fullDescription || service.shortDescription}
                    </p>

                    {/* BULLETS */}
                    {service.features && service.features.length > 0 && (
                      <div className="space-y-1.5 pt-3 border-t border-slate-100">
                        {service.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* FOOTER */}
                <div className="px-6 pb-6 pt-3 flex items-center justify-between gap-3 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="text-xs font-bold text-slate-700 hover:text-zenith-orange flex items-center gap-1"
                  >
                    <span>Inspect Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => navigateTo('request-service', { service: service.title })}
                    className="bg-zenith-orange hover:bg-zenith-orangeHover text-navy-950 font-bold px-4 py-2 rounded-lg text-xs transition-colors shadow-sm"
                  >
                    Request Service
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* BOTTOM DISCLAIMER */}
        <div className="mt-16 bg-white rounded-2xl p-6 border border-slate-200 flex items-center gap-4 text-xs text-slate-600">
          <ShieldCheck className="w-6 h-6 text-zenith-orange shrink-0" />
          <p>
            <strong>Subcontractor Trade Standards:</strong> Any specialized trade work requiring professional licensing (electrical, plumbing, HVAC, structural repairs) is performed by qualified, properly licensed, and insured subcontractors where required by state and local jurisdiction.
          </p>
        </div>

      </div>

      <ServiceModal />
    </div>
  );
}
