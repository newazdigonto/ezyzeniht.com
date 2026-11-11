import React from 'react';
import { useSite } from '../context/SiteContext';
import { Award, CheckCircle, Clock, MapPin, Building, Users } from 'lucide-react';

export default function TrustStats() {
  const { siteData } = useSite();
  const stats = siteData?.company?.stats || [
    { label: "Years Experience", value: "10+" },
    { label: "Projects Completed", value: "5,400+" },
    { label: "U.S. States Covered", value: "Multi-Market" },
    { label: "Response Time", value: "< 24 Hours" }
  ];

  const icons = [Award, CheckCircle, MapPin, Clock];

  return (
    <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-8">
      <div className="bg-white rounded-2xl shadow-elevated border border-slate-200/80 p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {stats.map((stat, idx) => {
          const IconComponent = icons[idx % icons.length];
          return (
            <div key={idx} className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-zenith-orange border border-amber-200/60 flex items-center justify-center shrink-0 group-hover:bg-zenith-orange group-hover:text-navy-950 transition-all duration-300">
                <IconComponent className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#182333] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
                  {stat.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

