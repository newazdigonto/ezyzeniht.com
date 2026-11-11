import React from 'react';
import { useSite } from '../context/SiteContext';
import { 
  FileText, 
  Search, 
  Calculator, 
  Truck, 
  Camera, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export default function WorkflowSection() {
  const { navigateTo } = useSite();

  const steps = [
    {
      num: "01",
      icon: FileText,
      title: "Submit Request",
      desc: "Client submits property address, punch-list, photos, scope, or work order through our secure portal or quick phone intake.",
      badge: "Easy Intake"
    },
    {
      num: "02",
      icon: Search,
      title: "Scope & Review",
      desc: "Our operations desk evaluates urgency, access notes, lockbox code, municipality requirements, and specific trade skills needed.",
      badge: "Fast Assessment"
    },
    {
      num: "03",
      icon: Calculator,
      title: "Estimate & Approval",
      desc: "We provide upfront, transparent pricing or coordinate qualified subcontractor bids with itemized breakdown for quick client sign-off.",
      badge: "Transparent Cost"
    },
    {
      num: "04",
      icon: Truck,
      title: "Dispatch & Schedule",
      desc: "Vetted, insured field contractors are dispatched to the property with strict on-site check-in and quality oversight.",
      badge: "Vetted Trades"
    },
    {
      num: "05",
      icon: Camera,
      title: "Photo Reporting",
      desc: "High-resolution before and after photos, itemized completion notes, and closing verification documents sent directly to your inbox.",
      badge: "Proof of Work"
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zenith-orange/10 border border-zenith-orange/30 text-zenith-orange text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Operational Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#182333] tracking-tight">
            How It Works: Seamless 5-Step Process
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            From initial submission to final completion photos, our structured field service workflow keeps your property on schedule and fully documented.
          </p>
        </div>

        {/* 5 STEPS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between relative group"
              >
                {/* STEP NUMBER BADGE */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-slate-200 group-hover:text-zenith-orange transition-colors">
                    {s.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#182333] text-zenith-orange flex items-center justify-center group-hover:bg-zenith-orange group-hover:text-navy-950 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {s.badge}
                  </span>
                  <h3 className="text-base font-bold text-[#182333] mt-1 mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1 text-[11px] font-semibold text-zenith-orange">
                  <span>Step {idx + 1} of 5</span>
                  {idx < steps.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 ml-auto text-slate-300" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigateTo('request-service')}
            className="inline-flex items-center gap-2 bg-[#182333] hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-xl text-sm transition-all shadow-md group"
          >
            <span>Ready to Dispatch? Submit Your Property Work Order</span>
            <ArrowRight className="w-4 h-4 text-zenith-orange transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
}

