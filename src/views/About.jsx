import React from 'react';
import { useSite } from '../context/SiteContext';
import PageHero from '../components/PageHero';
import { 
  Building2, 
  ShieldCheck, 
  Users, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  FileText,
  PhoneCall
} from 'lucide-react';

export default function About() {
  const { siteData, navigateTo } = useSite();
  const phone = siteData?.company?.phone || '302-244-5523';

  return (
    <div className="bg-white min-h-screen">
      {/* DEDICATED PAGE HERO WITH PHOTO & THUMBNAILS */}
      <PageHero
        badge="About EZY Zenith LLC"
        badgeIcon={Building2}
        title="Reliable Field Service Coordination for U.S. Property Needs"
        subtitle="EZY Zenith LLC is a U.S.-registered property service coordination company dedicated to helping Realtors, property managers, investors, and asset managers protect, maintain, and prepare properties with total confidence."
        primaryCtaText="Request Service"
        primaryCtaLink="request-service"
        secondaryCtaText="Contact Team"
        secondaryCtaLink="contact"
        initialImage="/images/Painting-and-siding-repairs-740x556.jpg"
        breadcrumbs="About EZY Zenith"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-20">
        {/* 2-COL STORY & STATS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-20 border-b border-slate-200">
          <div className="lg:col-span-7 space-y-5 text-slate-700 leading-relaxed text-base">
            <h2 className="text-2xl font-extrabold text-[#182333]">
              Protecting Assets, Supporting Sales, and Simplifying Maintenance
            </h2>
            <p>
              At EZY Zenith, we understand that real estate deadlines cannot wait. Whether an agent is staring down a 48-hour buyer inspection repair contingency, a property manager needs a rapid 3-day unit turn, or an REO servicer requires immediate board-up and trash-out, contractor delays cost real money.
            </p>
            <p>
              We established EZY Zenith to provide a <strong>single point of coordination</strong> across diverse trades. Instead of managing multiple unreliable independent contractors, our clients submit one request. We assign vetted local field vendors, verify licensing and insurance, track on-site execution, and deliver comprehensive before-and-after photo documentation.
            </p>
            
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h3 className="text-sm font-bold text-[#182333] uppercase tracking-wider">
                Our Operational Workflow Supports:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Job intake & scope assessment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Subcontractor dispatch & scheduling</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Upfront estimates & trade oversight</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Detailed completion photo review</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-elevated border-2 border-slate-100">
              <img
                src="/images/Securing-Service-740x556.jpg"
                alt="Property Service Coordination"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <div className="text-2xl font-black">10+ Years Experience</div>
                  <div className="text-xs text-slate-300">Coordinating multi-trade field preservation & maintenance</div>
                </div>
              </div>
            </div>

            <div className="bg-[#182333] rounded-2xl p-6 text-white space-y-3 shadow-xl">
              <div className="flex items-center gap-2 text-zenith-orange font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Subcontractor & Licensing Notice</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                EZY Zenith LLC coordinates field work through qualified vendors and subcontractors. Any licensed trade work (electrical, HVAC, plumbing, structural roofing) is strictly performed by qualified, properly licensed, and insured subcontractors where required by law.
              </p>
            </div>
          </div>
        </div>

        {/* WHO WE SERVE 4 TIERS */}
        <div className="py-20 border-b border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <h2 className="text-3xl font-extrabold text-[#182333]">Who We Partner With</h2>
            <p className="text-slate-600 text-sm">Specialized coordination tailored to each client category</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-zenith-orange uppercase">Listing & Buying</span>
              <h3 className="text-lg font-bold text-[#182333]">Realtors & Brokers</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Inspection repair amendments, punch-lists, curb appeal, lockboxes, and fast turnaround to keep transactions closing on schedule.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-zenith-orange uppercase">Rental Portfolios</span>
              <h3 className="text-lg font-bold text-[#182333]">Property Managers</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rapid tenant turns, move-out inspections, drywall, paint, flooring, lock changes, and reliable recurring maintenance dispatch.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-zenith-orange uppercase">REO & Default</span>
              <h3 className="text-lg font-bold text-[#182333]">Asset Managers</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Preserving vacant, foreclosed, or distressed properties with lock changes, boarding, debris removal, grass cuts, and winterization.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-zenith-orange uppercase">Fix & Flip / Buy & Hold</span>
              <h3 className="text-lg font-bold text-[#182333]">Real Estate Investors</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Initial cleanouts, trash-outs, handyman repair coordination, and make-ready work to prepare acquired units for tenants or resale.
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION */}
        <div className="pt-16 text-center space-y-4">
          <h3 className="text-2xl font-bold text-[#182333]">Ready to partner with EZY Zenith?</h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('request-service')}
              className="bg-zenith-orange hover:bg-zenith-orangeHover text-navy-950 font-bold px-7 py-3.5 rounded-xl text-sm shadow-accent transition-all"
            >
              Request Service Online
            </button>
            <a
              href={`tel:${phone.replace(/[^0-9]/g, '')}`}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-6 py-3.5 rounded-xl text-sm transition-all flex items-center gap-2 border border-slate-300"
            >
              <PhoneCall className="w-4 h-4 text-zenith-orange" />
              <span>Call Dispatch ({phone})</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
