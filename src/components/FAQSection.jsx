import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { ChevronDown, HelpCircle, PhoneCall, ArrowRight } from 'lucide-react';

export default function FAQSection() {
  const { siteData, navigateTo } = useSite();
  const faqs = siteData?.faqs || [];
  const [openIndex, setOpenIndex] = useState(0);

  const phone = siteData?.company?.phone || '302-244-5523';

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-zenith-orange font-bold text-xs uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#182333] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Everything you need to know about our property preservation, repair coordination, and trade standards.
          </p>
        </div>

        {/* ACCORDION */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-[#182333] hover:text-zenith-orange transition-colors"
                >
                  <span>{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-zenith-orange text-navy-950' : 'text-slate-500'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* EXTRA QUESTION BOX */}
        <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 text-center space-y-3 shadow-soft">
          <h4 className="text-lg font-bold text-[#182333]">Have a specific project scope or urgent deadline?</h4>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Our dispatch desk is available 24/7. Speak directly with a coordination specialist to discuss your property needs.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${phone.replace(/[^0-9]/g, '')}`}
              className="bg-[#182333] hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-zenith-orange" />
              <span>Call {phone}</span>
            </a>
            <button
              onClick={() => navigateTo('contact')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-6 py-3 rounded-xl text-sm transition-all"
            >
              Contact Dispatch Desk
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

