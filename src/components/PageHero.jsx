import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { 
  Camera, 
  ArrowRight, 
  PhoneCall, 
  ShieldCheck, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';

const DEFAULT_FIELD_PHOTOS = [
  {
    id: 'securing',
    title: 'Securing & Rekeying',
    category: 'Preservation',
    image: '/images/Securing-Service-740x556.jpg',
  },
  {
    id: 'painting',
    title: 'Painting & Siding Repairs',
    category: 'Realtor Prep',
    image: '/images/Painting-and-siding-repairs-740x556.jpg',
  },
  {
    id: 'flooring',
    title: 'Flooring & Turnover Prep',
    category: 'Property Turn',
    image: '/images/Flooring-repairs-and-installations-740x556.jpg',
  },
  {
    id: 'trashout',
    title: 'Debris Removal & Trash-Out',
    category: 'Cleanout',
    image: '/images/Trush-Out-740x556.jpg',
  },
  {
    id: 'roofing',
    title: 'Roofing & Exterior Repairs',
    category: 'Trade Work',
    image: '/images/Roofing-740x556.jpg',
  },
  {
    id: 'landscaping',
    title: 'Lawn Care & Curb Appeal',
    category: 'Grounds',
    image: '/images/Landscaping-740x556.jpg',
  }
];

export default function PageHero({
  badge = 'Property Service Coordination',
  badgeIcon: BadgeIcon = ShieldCheck,
  title,
  subtitle,
  primaryCtaText = 'Request Service',
  primaryCtaLink = 'request-service',
  secondaryCtaText = null,
  secondaryCtaLink = 'contact',
  initialImage = null,
  thumbnails = DEFAULT_FIELD_PHOTOS,
  breadcrumbs = null
}) {
  const { siteData, navigateTo } = useSite();
  const phone = siteData?.company?.phone || '302-244-5523';

  const [activePhoto, setActivePhoto] = useState(
    initialImage 
      ? (thumbnails.find(t => t.image === initialImage) || { image: initialImage, title: title, category: 'Featured' }) 
      : thumbnails[0]
  );

  return (
    <section className="relative w-full bg-gradient-to-b from-[#0c182b] via-[#0f2446] to-[#0a1628] text-white pt-36 sm:pt-40 md:pt-44 pb-14 sm:pb-18 overflow-hidden border-b border-slate-800">
      {/* BACKGROUND AMBIENT GLOW */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-zenith-orange/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-navy-800/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* BREADCRUMB / MINI NAV */}
        {breadcrumbs && (
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 font-medium">
            <button onClick={() => navigateTo('home')} className="hover:text-zenith-orange transition-colors">
              Home
            </button>
            <span>/</span>
            <span className="text-slate-200">{breadcrumbs}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT: TEXT CONTENT & CTAS */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* BADGE WITH ANIMATED BORDER */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#122238] border border-zenith-orange/60 text-zenith-orange text-xs sm:text-sm font-semibold tracking-wide shadow-sm animate-border-pulse">
              <BadgeIcon className="w-3.5 h-3.5 text-zenith-orange" />
              <span>{badge}</span>
            </div>

            {/* PAGE TITLE */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-[1.18] tracking-tight drop-shadow-md">
              {title}
            </h1>

            {/* SUBTITLE */}
            {subtitle && (
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl drop-shadow">
                {subtitle}
              </p>
            )}

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => navigateTo(primaryCtaLink)}
                className="bg-zenith-orange hover:bg-zenith-orangeHover text-navy-950 font-bold px-6 py-3.5 rounded-xl text-sm sm:text-base shadow-accent transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 group"
              >
                <span>{primaryCtaText}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {secondaryCtaText ? (
                <button
                  onClick={() => navigateTo(secondaryCtaLink)}
                  className="bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold px-5 py-3.5 rounded-xl text-sm sm:text-base backdrop-blur-sm transition-all duration-300"
                >
                  {secondaryCtaText}
                </button>
              ) : (
                <a
                  href={`tel:${phone.replace(/[^0-9]/g, '')}`}
                  className="bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold px-5 py-3.5 rounded-xl text-sm sm:text-base backdrop-blur-sm transition-all duration-300 flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-zenith-orange" />
                  <span>Call {phone}</span>
                </a>
              )}
            </div>

            {/* TRUST BULLETS */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 pt-3 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-zenith-orange" />
                <span>Single Point of Dispatch</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-zenith-orange" />
                <span>Time-Stamped Photo Proof</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-zenith-orange" />
                <span>Verified Trade Network</span>
              </div>
            </div>

          </div>

          {/* RIGHT: FEATURED PROPERTY PHOTO & THUMBNAIL GALLERY */}
          <div className="lg:col-span-5 space-y-3">
            
            {/* MAIN FEATURED PHOTO CARD (WITH ANIMATED BORDER) */}
            <div className="animated-gradient-border-dark shadow-2xl rounded-2xl overflow-hidden">
              <div className="bg-[#0f2446] p-2 rounded-2xl">
                <div className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden bg-slate-900">
                  <img
                    src={activePhoto.image}
                    alt={activePhoto.title}
                    className="w-full h-full object-cover object-center brightness-[0.95] contrast-[1.05] transition-all duration-500"
                    onError={(e) => {
                      e.target.src = '/images/Securing-Service-740x556.jpg';
                    }}
                  />
                  {/* Photo Title & Category Overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-4 flex items-end justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-zenith-orange tracking-wider">
                        {activePhoto.category || 'Field Service Documentation'}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-white drop-shadow truncate">
                        {activePhoto.title}
                      </h3>
                    </div>
                    <div className="shrink-0 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-[10px] text-emerald-300 font-semibold flex items-center gap-1">
                      <Camera className="w-3 h-3 text-emerald-400" />
                      <span>Verified Photo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* THUMBNAIL PHOTO SELECTOR STRIP */}
            {thumbnails && thumbnails.length > 1 && (
              <div className="bg-[#0c182b]/90 backdrop-blur-md p-2.5 rounded-xl border border-slate-700/80 shadow-lg">
                <div className="flex items-center justify-between px-1 pb-1.5 text-[11px] font-bold text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-zenith-orange" />
                    <span>Property Photo Showcase:</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Click photo to preview</span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {thumbnails.map((item, idx) => {
                    const isSelected = activePhoto.image === item.image;
                    return (
                      <button
                        key={item.id || idx}
                        onClick={() => setActivePhoto(item)}
                        className={`group relative rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          isSelected
                            ? 'border-zenith-orange scale-105 shadow-md shadow-zenith-orange/30 ring-2 ring-zenith-orange/50'
                            : 'border-slate-700 opacity-60 hover:opacity-100 hover:border-slate-500'
                        }`}
                        title={item.title}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-11 sm:h-12 object-cover"
                          onError={(e) => {
                            e.target.src = '/images/Securing-Service-740x556.jpg';
                          }}
                        />
                        <div className={`absolute inset-0 ${isSelected ? 'bg-transparent' : 'bg-black/20 group-hover:bg-transparent'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}

