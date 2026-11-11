import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import HeroSlider from '../components/HeroSlider';
import TrustStats from '../components/TrustStats';
import ValueProposition from '../components/ValueProposition';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import WorkflowSection from '../components/WorkflowSection';
import GoogleReviewsSection from '../components/GoogleReviewsSection';
import FAQSection from '../components/FAQSection';
import ServiceModal from '../components/ServiceModal';
import { 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  PhoneCall,
  Sliders
} from 'lucide-react';

export default function Home() {
  const { siteData, navigateTo, setSelectedService } = useSite();
  const rawServices = siteData?.services || [];
  const services = rawServices.filter(s => s.active !== false);

  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Preservation', 'Realtor Support', 'Property Management', 'Maintenance', 'Trades'];

  const filteredServices = activeCategory === 'All' 
    ? services 
    : services.filter(s => s.category.toLowerCase() === activeCategory.toLowerCase());

  const phone = siteData?.company?.phone || '302-244-5523';

  return (
    <div className="min-h-screen">
      {/* 1. DYNAMIC HERO SLIDER */}
      <HeroSlider />

      {/* 2. TRUST STATS STRIP */}
      <TrustStats />

      {/* 3. VALUE PROPOSITION */}
      <ValueProposition />

      {/* 4. CORE SERVICES SECTION */}
      <section className="py-20 bg-white border-b border-slate-200/80" id="services-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-zenith-orange font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>End-to-End Capabilities</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#182333] tracking-tight">
                Complete Property Services & Preservation
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Whether preparing a listing for market, resolving buyer repair requests, or managing vacant REO assets, our coordinated field network has you covered.
              </p>
            </div>
          </div>

          {/* CATEGORY TABS */}
          <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-slate-200">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#182333] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* SERVICES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, idx) => (
              <div
                key={service.id || idx}
                className="card-hover-illuminate bg-white rounded-2xl overflow-hidden shadow-subtle hover:shadow-minimal transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f2446]/80 via-transparent to-transparent" />
                    
                    {/* BADGE */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-[#0f2446]/90 text-white px-2.5 py-1 rounded-md backdrop-blur-sm">
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
                    <h3 className="text-xl font-bold text-[#0f2446] mb-2 group-hover:text-zenith-orange transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {service.shortDescription}
                    </p>

                    {/* BULLETS */}
                    {service.features && service.features.length > 0 && (
                      <div className="space-y-1.5 pt-2 border-t border-slate-100">
                        {service.features.slice(0, 3).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* CARD FOOTER */}
                <div className="px-6 pb-6 pt-2 flex items-center justify-between gap-3 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="text-xs font-bold text-slate-700 hover:text-zenith-orange flex items-center gap-1"
                  >
                    <span>Full Scope</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => navigateTo('request-service', { service: service.title })}
                    className="bg-[#0f2446] group-hover:bg-zenith-orange group-hover:text-navy-950 text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors shadow-sm"
                  >
                    Request Trade
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* VIEW ALL SERVICES BUTTON */}
          <div className="mt-14 text-center">
            <button
              onClick={() => navigateTo('services')}
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-[#182333] font-bold px-8 py-4 rounded-xl text-sm transition-all border border-slate-300"
            >
              <span>Explore All Specialized Service Categories</span>
              <ArrowRight className="w-4 h-4 text-zenith-orange" />
            </button>
          </div>

        </div>
      </section>

      {/* 5. INTERACTIVE BEFORE & AFTER SLIDER */}
      <BeforeAfterSlider />

      {/* 6. OPERATIONAL 5-STEP WORKFLOW */}
      <WorkflowSection />

      {/* 7. DYNAMIC GOOGLE REVIEWS SECTION */}
      <GoogleReviewsSection />

      {/* 8. REALTOR SPECIALIZED HIGHLIGHT BANNER WITH ANIMATED BORDER */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="animated-gradient-border-dark shadow-2xl">
          <div className="bg-[#0f2446] rounded-2xl p-8 sm:p-12 text-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zenith-orange/15 border border-zenith-orange/30 text-zenith-orange text-xs font-bold uppercase tracking-wider">
                <span>High Conversion Solution for Brokers</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Inspection Repair List Hand-off for Real Estate Agents
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
                Don't lose a closing over home inspection repair requests. Send us your buyer or seller inspection amendment. We coordinate every line item, source licensed trades where required, and supply photo proof before escrow closing.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                onClick={() => navigateTo('realtor-support')}
                className="bg-zenith-orange hover:bg-zenith-orangeHover text-navy-950 font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-accent text-center"
              >
                Learn Realtor Support
              </button>
              <button
                onClick={() => navigateTo('request-service')}
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-6 py-3.5 rounded-xl text-sm transition-all text-center"
              >
                Upload Inspection Report
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ SECTION */}
      <FAQSection />

      {/* 10. MODAL (IF ANY SERVICE CLICKED) */}
      <ServiceModal />
    </div>
  );
}
