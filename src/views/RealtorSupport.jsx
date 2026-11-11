import React from 'react';
import { useSite } from '../context/SiteContext';
import PageHero from '../components/PageHero';
import { 
  Home, 
  FileCheck2, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Upload, 
  Camera, 
  ArrowRight,
  PhoneCall,
  Sparkles
} from 'lucide-react';

export default function RealtorSupport() {
  const { siteData, navigateTo } = useSite();
  const phone = siteData?.company?.phone || '302-244-5523';

  const realtorBenefits = [
    {
      title: "Inspection Repair List Resolution",
      desc: "Received a 15-item buyer repair amendment? Send us the inspection report. We break down the trades, provide itemized estimates, and dispatch qualified contractors to get it resolved before closing.",
      badge: "Deal Saver"
    },
    {
      title: "Pre-Listing Curb Appeal & Prep",
      desc: "Pressure washing, fresh front door paint, landscaping touch-ups, mulch, and cosmetic punch-list items that maximize your client's listing price and buyer impressions.",
      badge: "Top Dollar"
    },
    {
      title: "Fast Repair Estimates for Escrow",
      desc: "Need immediate pricing for seller credit negotiations or repair escrow escrow reserves? Our coordination team provides prompt, realistic repair cost breakdowns.",
      badge: "Negotiation Power"
    },
    {
      title: "Before & After Photos for Buyer Verification",
      desc: "Every completed repair item is accompanied by date-and-time stamped before/after photo documentation to satisfy the buyer's agent and loan underwriter.",
      badge: "Underwriter Ready"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* DEDICATED PAGE HERO WITH PHOTO & THUMBNAILS */}
      <PageHero
        badge="Dedicated Partner For Listing Agents & Brokers"
        badgeIcon={Sparkles}
        title="Listing Preparation & Inspection Repair Support for Realtors"
        subtitle="Reduce the stress of managing contractors before listing, buyer repair contingencies, or closing deadlines. Hand off the punch-list and focus on selling."
        primaryCtaText="Upload Inspection Repair List"
        primaryCtaLink="request-service"
        secondaryCtaText="Realtor Direct Call"
        secondaryCtaLink="contact"
        initialImage="/images/Painting-and-siding-repairs-740x556.jpg"
        breadcrumbs="Realtor Support"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-20">

        {/* 4 CORE ADVANTAGES */}
        <div className="py-16 border-t border-b border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <h2 className="text-3xl font-extrabold text-[#182333]">Why Top Producers Rely on EZY Zenith</h2>
            <p className="text-slate-600 text-sm">Engineered specifically around real estate contract timelines</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {realtorBenefits.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl p-7 border border-slate-200 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-zenith-orange bg-amber-100 px-3 py-1 rounded-full">
                      {item.badge}
                    </span>
                    <Clock className="w-4 h-4 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-bold text-[#182333] mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Before/After photo log provided upon completion</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM ACTION FORM CALLOUT */}
        <div className="pt-16 max-w-3xl mx-auto bg-gradient-to-r from-[#182333] to-[#24354b] rounded-2xl p-8 sm:p-10 text-white text-center space-y-6 shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-black">
            Have an active property under contract right now?
          </h3>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Send us the property address and inspection punch-list. We will review scope, confirm scheduling, and coordinate trades immediately.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('request-service', { service: 'Realtor Listing Prep & Inspection Repairs' })}
              className="bg-zenith-orange hover:bg-zenith-orangeHover text-navy-950 font-bold px-8 py-4 rounded-xl text-base shadow-accent transition-all inline-flex items-center gap-2"
            >
              <span>Submit Realtor Work Order</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
