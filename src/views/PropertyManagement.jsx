import React from 'react';
import { useSite } from '../context/SiteContext';
import PageHero from '../components/PageHero';
import { 
  Building, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Key, 
  Paintbrush, 
  Wrench, 
  FileCheck, 
  Sparkles,
  PhoneCall
} from 'lucide-react';

export default function PropertyManagement() {
  const { siteData, navigateTo } = useSite();
  const phone = siteData?.company?.phone || '302-244-5523';

  const turnServices = [
    {
      icon: Paintbrush,
      title: "Full Unit Painting & Drywall Patching",
      desc: "Touch-up paint, wall gouge repairs, door frame scuffs, and full interior fresh paint to get units market-ready quickly."
    },
    {
      icon: Key,
      title: "Rekeying & Smart Lock Installation",
      desc: "Fast lock replacement between tenant departures, master keying, deadbolt adjustments, and key transfer coordination."
    },
    {
      icon: Wrench,
      title: "Flooring, Trim & Carpentry Repairs",
      desc: "LVP plank replacements, carpet steam or removal, baseboard fixes, cabinet door alignment, and drawer track repairs."
    },
    {
      icon: Sparkles,
      title: "Deep Sanitization & Move-In Cleaning",
      desc: "Oven deep clean, refrigerator defrost, bathroom tile scrubbing, window sills, and broom-swept sanitization."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* DEDICATED PAGE HERO WITH PHOTO & THUMBNAILS */}
      <PageHero
        badge="For Property Managers & Landlords"
        badgeIcon={Building}
        title="Property Management Maintenance & Tenant Turnover Support"
        subtitle="We support property managers with turns, make-ready services, vendor follow-up, photo documentation, and work order processing. Cut your vacancy days with streamlined field coordination."
        primaryCtaText="Request Turnover Support"
        primaryCtaLink="request-service"
        secondaryCtaText="Call Coordination Desk"
        secondaryCtaLink="contact"
        initialImage="/images/Flooring-repairs-and-installations-740x556.jpg"
        breadcrumbs="Property Management"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-20">

        {/* 4 TURNOVER PILLARS */}
        <div className="py-16 border-t border-b border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <h2 className="text-3xl font-extrabold text-[#182333]">Complete Make-Ready Checklist</h2>
            <p className="text-slate-600 text-sm">Everything needed to restore rental units to pristine condition</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {turnServices.map((t, idx) => {
              const Icon = t.icon;
              return (
                <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#182333] text-zenith-orange flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-[#182333] mb-2">{t.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{t.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-200 text-xs font-semibold text-emerald-600 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Included in turnover scope</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM WORK ORDER CALL */}
        <div className="pt-16 text-center space-y-4">
          <h3 className="text-2xl font-bold text-[#182333]">Have a unit turning over this week?</h3>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Submit your property address, key instructions, and requested scope. We'll handle scheduling and vendor follow-through.
          </p>
          <button
            onClick={() => navigateTo('request-service', { service: 'Tenant Turnover & Make-Ready' })}
            className="bg-[#182333] hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-xl text-sm transition-all shadow-md"
          >
            Submit Make-Ready Work Order
          </button>
        </div>

      </div>
    </div>
  );
}
