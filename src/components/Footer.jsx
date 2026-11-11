import React from 'react';
import { useSite } from '../context/SiteContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Shield, 
  CheckCircle, 
  ArrowUpRight, 
  FileText, 
  Sliders 
} from 'lucide-react';

export default function Footer() {
  const { siteData, navigateTo } = useSite();
  const phone = siteData?.company?.phone || '302-244-5523';
  const email = siteData?.company?.email || 'contact@ezyzenith.com';
  const supportEmail = siteData?.company?.supportEmail || 'info@ezyzenith.com';

  return (
    <footer className="bg-[#0e1724] text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* TOP CTA STRIP */}
        <div className="bg-gradient-to-r from-[#182333] to-[#22354c] rounded-2xl p-8 mb-16 border border-slate-700/80 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-zenith-orange font-bold">Fast Turnaround • Verified Subcontractors</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Need immediate property maintenance or preservation support?
            </h3>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              From emergency re-keying and inspection punch-lists to full tenant turnover and trash-outs, we coordinate everything with full photo reports.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <button
              onClick={() => navigateTo('request-service')}
              className="w-full sm:w-auto bg-zenith-orange hover:bg-zenith-orangeHover text-navy-950 font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-accent"
            >
              Request Service Online
            </button>
            <a
              href={`tel:${phone.replace(/[^0-9]/g, '')}`}
              className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-semibold px-6 py-3.5 rounded-xl text-sm transition-all text-center flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-zenith-orange" />
              <span>Call {phone}</span>
            </a>
          </div>
        </div>

        {/* 4 COLUMNS FOOTER */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* COL 1: BRAND */}
          <div className="space-y-4">
            <button 
              onClick={() => navigateTo('home')} 
              className="text-left focus:outline-none group inline-block"
              aria-label="EZY Zenith Home"
            >
              <img 
                src="/images/logo-white.png" 
                alt="EZY Zenith" 
                className="h-11 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
                onError={(e) => {
                  e.target.src = '/images/logo-color.png';
                }}
              />
            </button>
            <p className="text-xs text-slate-300 leading-relaxed">
              EZY Zenith LLC is a U.S.-registered property service coordination company. We support Realtors, property managers, investors, and asset managers with fast, reliable field service execution.
            </p>
            <div className="pt-2 text-xs space-y-2">
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-zenith-orange shrink-0" />
                <a href={`tel:${phone.replace(/[^0-9]/g, '')}`} className="hover:text-white font-bold text-white">
                  {phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-zenith-orange shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white">
                  {email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Multi-Market Nationwide Coverage</span>
              </div>
            </div>
          </div>

          {/* COL 2: CORE SERVICES */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-zenith-orange pl-2.5">
              Field Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => navigateTo('services')} className="hover:text-zenith-orange transition-colors">
                  Property Preservation & Inspections
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('realtor-support')} className="hover:text-zenith-orange transition-colors">
                  Realtor Listing Prep & Repair Lists
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('property-management')} className="hover:text-zenith-orange transition-colors">
                  Tenant Turnover & Make-Ready Turns
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('services')} className="hover:text-zenith-orange transition-colors">
                  Trash-Out & Foreclosure Cleanouts
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('services')} className="hover:text-zenith-orange transition-colors">
                  Lock Changes & Emergency Boarding
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('services')} className="hover:text-zenith-orange transition-colors">
                  Lawn Care & Curb Appeal Restoration
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('services')} className="hover:text-zenith-orange transition-colors">
                  Roofing, Siding & Gutter Maintenance
                </button>
              </li>
            </ul>
          </div>

          {/* COL 3: NAVIGATION & PORTALS */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-zenith-orange pl-2.5">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-zenith-orange transition-colors">
                  About EZY Zenith LLC
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('coverage')} className="hover:text-zenith-orange transition-colors">
                  Coverage Areas & States
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('become-vendor')} className="hover:text-zenith-orange transition-colors">
                  Join Our Vendor Network
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('request-service')} className="hover:text-zenith-orange transition-colors">
                  Submit Work Order / Request Service
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-zenith-orange transition-colors">
                  Contact & Dispatch Desk
                </button>
              </li>
              <li className="pt-2">
                <button 
                  onClick={() => navigateTo('login')} 
                  className="inline-flex items-center gap-1.5 text-xs text-zenith-orange hover:text-white bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 font-semibold hover:border-zenith-orange transition-all"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Portal Login (Admin • Vendor • Client)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* COL 4: INSURANCE & DISCLOSURE */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-zenith-orange pl-2.5">
              Compliance & Insurance
            </h4>
            <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 text-[11px] leading-relaxed text-slate-300 space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <Shield className="w-3.5 h-3.5" />
                <span>Protected & Compliant</span>
              </div>
              <p>
                Work is coordinated through independent qualified vendors and subcontractors. Any licensed trade work (electrical, plumbing, HVAC, structural) is performed by qualified, properly licensed and insured subcontractors where required by local and state law.
              </p>
              <div className="flex items-center gap-1 text-[10px] text-slate-300 pt-1">
                <CheckCircle className="w-3 h-3 text-zenith-orange" />
                <span>General Liability & W-9 on file for active vendors</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT & LEGAL NOTICE */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div>
            © {new Date().getFullYear()} EZY Zenith LLC. All rights reserved. Registered U.S. Business.
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span>Property Preservation</span>
            <span>•</span>
            <span>Realtor Support</span>
            <span>•</span>
            <span>Maintenance Coordination</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

