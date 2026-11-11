import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { Sparkles, ArrowLeftRight, CheckCircle2, ChevronRight } from 'lucide-react';

export default function BeforeAfterSlider() {
  const { siteData, navigateTo } = useSite();
  const items = siteData?.beforeAfterGallery || [];
  const [activeTab, setActiveTab] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);

  if (!items.length) return null;
  const current = items[activeTab] || items[0];

  const handleSliderMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percent);
  };

  const handleTouchMove = (e) => {
    if (!e.touches[0]) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percent);
  };

  return (
    <section className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-zenith-orange font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Proven Field Results</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#182333] tracking-tight">
              Before & After Transformations
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              See the visual documentation and quality standards delivered on every property coordination assignment.
            </p>
          </div>

          {/* TAB BUTTONS */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
            {items.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveTab(idx);
                  setSliderPosition(50);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === idx
                    ? 'bg-[#182333] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {item.category || item.title}
              </button>
            ))}
          </div>
        </div>

        {/* COMPARISON INTERACTIVE CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* SLIDER (8 Cols) */}
          <div className="lg:col-span-8">
            <div
              className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden shadow-elevated border-2 border-slate-200 cursor-ew-resize select-none touch-none"
              onMouseMove={handleSliderMove}
              onTouchMove={handleTouchMove}
            >
              {/* AFTER IMAGE (Full background) */}
              <img
                src={current.afterImg}
                alt={`${current.title} After`}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute top-4 right-4 z-10 bg-emerald-600/90 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md backdrop-blur-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>AFTER COMPLETED</span>
              </div>

              {/* BEFORE IMAGE (Clipped by slider percentage) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                <img
                  src={current.beforeImg}
                  alt={`${current.title} Before`}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute top-4 left-4 z-10 bg-slate-900/90 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md backdrop-blur-sm">
                  BEFORE CONDITION
                </div>
              </div>

              {/* DIVIDER LINE & DRAGGER HANDLE */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl cursor-ew-resize z-20"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-zenith-orange text-navy-950 shadow-xl border-2 border-white flex items-center justify-center font-bold">
                  <ArrowLeftRight className="w-4 h-4" />
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-slate-400 mt-3">
              Drag or move slider horizontally to compare before and after photos
            </p>
          </div>

          {/* SIDE DETAILS (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-7 space-y-4">
              <span className="text-xs uppercase tracking-wider font-extrabold text-zenith-orange">
                {current.category} Scope
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#182333]">
                {current.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {current.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-200 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Time-stamped photo logs before & after</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>City code & HOA compliance checks</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Fast completion turnaround</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => navigateTo('request-service')}
                  className="w-full bg-[#182333] hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Request Similar Service</span>
                  <ChevronRight className="w-4 h-4 text-zenith-orange" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

