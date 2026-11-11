import React from 'react';
import { useSite } from '../context/SiteContext';
import { 
  Layers, 
  Zap, 
  Camera, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  FileCheck 
} from 'lucide-react';

export default function ValueProposition() {
  const { navigateTo } = useSite();

  const values = [
    {
      icon: Layers,
      title: "Single Point of Coordination",
      description: "Eliminate the headache of calling 10 different contractors. We handle job intake, vendor dispatch, scheduling, and invoicing under one reliable team.",
      tag: "Streamlined Workflow"
    },
    {
      icon: Zap,
      title: "Fast Response for Inspection Repairs",
      description: "Closing deadlines can't wait. We coordinate punch-list repairs, Realtor inspection amendments, emergency securing, and tenant turnovers on tight turnarounds.",
      tag: "Rapid Turnaround"
    },
    {
      icon: Camera,
      title: "Before & After Documentation",
      description: "Full accountability on every job. We provide date-and-time stamped photo verification, completion notes, and detailed proof of work for brokers and asset managers.",
      tag: "100% Proof of Work"
    },
    {
      icon: ShieldCheck,
      title: "Licensed Subcontractor Trades",
      description: "Peace of mind and legal compliance. Any specialized trade work (electrical, HVAC, plumbing, structural roofing) is strictly performed by verified, qualified, licensed subcontractors.",
      tag: "Fully Compliant"
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zenith-orange/10 border border-zenith-orange/30 text-zenith-orange text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Why Partners Rely On EZY Zenith</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#182333] tracking-tight">
            Built for Realtors, Property Managers & Asset Teams
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            We bridge the gap between busy property managers, listing agents, and field contractors across U.S. markets with speed, transparency, and accountability.
          </p>
        </div>

        {/* 4 VALUE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, idx) => {
            const IconComponent = v.icon;
            return (
              <div 
                key={idx}
                className="card-hover-illuminate bg-white rounded-2xl p-7 shadow-subtle hover:shadow-minimal transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#182333] text-zenith-orange flex items-center justify-center group-hover:bg-zenith-orange group-hover:text-navy-950 transition-colors shadow-sm">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                      {v.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#182333] mb-2 group-hover:text-zenith-orange transition-colors">
                    {v.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {v.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center text-xs font-bold text-[#182333] group-hover:text-zenith-orange">
                  <span>Learn workflow</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>

        {/* CALLOUT STRIP WITH ANIMATED BORDER */}
        <div className="mt-14 animated-gradient-border-dark shadow-xl">
          <div className="bg-[#0f2446] rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-zenith-orange/20 border border-zenith-orange/40 flex items-center justify-center shrink-0 text-zenith-orange">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white">Have a specific property punch-list or work order?</h4>
                <p className="text-xs sm:text-sm text-slate-300">Upload your PDF inspection report or repair list for a fast estimate.</p>
              </div>
            </div>
            <button
              onClick={() => navigateTo('request-service')}
              className="whitespace-nowrap bg-zenith-orange hover:bg-zenith-orangeHover text-navy-950 font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-accent"
            >
              Upload Repair List / Get Quote
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

