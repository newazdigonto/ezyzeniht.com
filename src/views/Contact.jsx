import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import PageHero from '../components/PageHero';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  FileText 
} from 'lucide-react';

export default function Contact() {
  const { siteData, submitLead, showToast } = useSite();
  const phone = siteData?.company?.phone || '302-244-5523';
  const email = siteData?.company?.email || 'contact@ezyzenith.com';
  const supportEmail = siteData?.company?.supportEmail || 'info@ezyzenith.com';
  const hours = siteData?.company?.hours || '24/7 Coordination & Dispatch Support';

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    notes: '',
    service: 'General Inquiry'
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.notes) {
      showToast('Please fill in required fields', 'error');
      return;
    }
    setSubmitting(true);
    const res = await submitLead({
      type: 'contact_message',
      ...form
    });
    setSubmitting(false);
    if (res.success) {
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* DEDICATED PAGE HERO WITH PHOTO & THUMBNAILS */}
      <PageHero
        badge="Get in Touch"
        badgeIcon={Phone}
        title="Contact EZY Zenith Operations"
        subtitle="Have questions about coverage, want to schedule an intro call, or need urgent property dispatch? Connect directly with our field operations team."
        primaryCtaText="Request Service"
        primaryCtaLink="request-service"
        initialImage="/images/Power-washing-driveways-sidewalks-and-building-exteriors-740x556.jpg"
        breadcrumbs="Contact Operations"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* CONTACT INFO TILES (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-soft space-y-6">
              <h3 className="text-xl font-bold text-[#182333]">Contact Information</h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-zenith-orange flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold block text-xs">Direct Dispatch Hotline</span>
                    <a href={`tel:${phone.replace(/[^0-9]/g, '')}`} className="font-extrabold text-[#182333] text-base hover:text-zenith-orange transition-colors">
                      {phone}
                    </a>
                    <span className="text-[11px] text-emerald-600 block mt-0.5">24/7 Emergency Lines Open</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold block text-xs">General & Quotes</span>
                    <a href={`mailto:${email}`} className="font-bold text-[#182333] hover:text-zenith-orange transition-colors">
                      {email}
                    </a>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Support: <a href={`mailto:${supportEmail}`} className="hover:underline">{supportEmail}</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold block text-xs">Operations Hours</span>
                    <span className="font-bold text-[#182333]">{hours}</span>
                    <div className="text-[11px] text-slate-400 mt-0.5">Nationwide vendor dispatch</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold block text-xs">Entity Jurisdiction</span>
                    <span className="font-bold text-[#182333]">United States Registered Entity</span>
                    <div className="text-[11px] text-slate-400 mt-0.5">Coordinating field services across multi-state markets</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#182333] rounded-2xl p-6 text-white text-xs space-y-2.5 shadow-xl">
              <span className="text-zenith-orange font-bold uppercase tracking-wider block">Real Estate Agents & Brokers</span>
              <p className="text-slate-300 leading-relaxed">
                If you have an active contract deadline with an inspection repair response due within 48 hours, please mark your request as urgent or call <strong>{phone}</strong> directly for priority dispatch.
              </p>
            </div>
          </div>

          {/* CONTACT FORM (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-soft">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#182333]">Message Sent!</h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto">
                    Thank you for reaching out to EZY Zenith LLC. Our team will review your message and reply via email or phone shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: '', email: '', phone: '', company: '', notes: '', service: 'General Inquiry' });
                    }}
                    className="bg-[#182333] text-white px-6 py-2.5 rounded-xl text-xs font-bold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-slate-100 pb-4 mb-2">
                    <h3 className="text-xl font-bold text-[#182333]">Send Us a Message</h3>
                    <p className="text-xs text-slate-500 mt-1">We typically reply within 1-2 business hours.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-zenith-orange"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="Realty Group / Asset Co"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-zenith-orange"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-zenith-orange"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="(302) 555-0100"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-zenith-orange"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Topic / Service of Interest
                    </label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-zenith-orange"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Realtor Partnership">Realtor / Listing Partnership</option>
                      <option value="Property Management Turnover">Property Management Turnovers</option>
                      <option value="Preservation & Securing">Property Preservation & REO Securing</option>
                      <option value="Subcontractor Onboarding">Subcontractor / Vendor Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      How Can We Help You? *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      placeholder="Write your message or describe your property questions here..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-zenith-orange"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#182333] hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4 text-zenith-orange" />
                    <span>{submitting ? 'Sending Message...' : 'Send Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
