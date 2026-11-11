import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import PageHero from '../components/PageHero';
import { 
  Users, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  PhoneCall,
  Truck,
  Send
} from 'lucide-react';

export default function BecomeVendor() {
  const { siteData, submitLead, showToast } = useSite();
  const phone = siteData?.company?.phone || '302-244-5523';

  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    address: '', // Service areas / states
    service: 'Trash-out, Lawn Care & Handyman',
    urgency: 'Ready to Onboard',
    notes: '',
    hasInsurance: true,
    hasW9: true
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const trades = [
    'Trash-out, Lawn Care & Handyman',
    'Property Preservation & Securing / Boarding',
    'Turnover Cleaning & Maid Service',
    'Drywall, Painting & Finish Carpentry',
    'Roofing & Siding Repairs',
    'Licensed Electrical (Subcontractor)',
    'Licensed Plumbing (Subcontractor)',
    'Licensed HVAC (Subcontractor)',
    'Flooring & Carpet Installation',
    'Pressure Washing & Exterior Maintenance'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email) {
      showToast('Please fill in required fields', 'error');
      return;
    }
    setSubmitting(true);
    const res = await submitLead({
      type: 'vendor_application',
      ...form,
      notes: `Insurance: ${form.hasInsurance ? 'Yes' : 'No'} | W-9: ${form.hasW9 ? 'Yes' : 'No'} | Notes: ${form.notes}`
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
        badge="Subcontractor & Vendor Partnerships"
        badgeIcon={Users}
        title="Join Our Trusted Field Vendor Network"
        subtitle="We partner with reliable contractors, handymen, cleaning crews, lawn maintenance teams, and licensed specialty trades for steady work orders across the United States."
        primaryCtaText="Apply to Onboard"
        primaryCtaLink="become-vendor"
        secondaryCtaText="Contact Operations"
        secondaryCtaLink="contact"
        initialImage="/images/Trush-Out-740x556.jpg"
        breadcrumbs="Vendor Network"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: REQUIREMENTS & BENEFITS (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-soft space-y-5">
              <h3 className="text-xl font-bold text-[#182333]">Why Partner With EZY Zenith?</h3>
              
              <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-zenith-orange flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#182333]">Consistent Local Work Orders</h4>
                    <p className="mt-0.5">Steady assignments from Realtors, rental managers, and REO preservation clients without spending on advertising.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#182333]">Prompt, Reliable Invoicing</h4>
                    <p className="mt-0.5">Streamlined approval and fast payment processing once completed photo logs are submitted.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#182333]">Clear Work Order Scopes</h4>
                    <p className="mt-0.5">Itemized checklists, clear lockbox instructions, and dedicated dispatch coordinators available by phone.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* COMPLIANCE CHECKLIST */}
            <div className="bg-[#182333] rounded-2xl p-7 text-white space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-zenith-orange font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Onboarding Requirements</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Valid Business Entity & Signed W-9 Form</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>General Liability Insurance ($1M / $2M preferred)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Smart phone for date-and-time stamped photos</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Applicable Trade License (for electrical, plumbing, HVAC)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT: APPLICATION FORM (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-soft">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#182333]">Application Submitted!</h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto">
                    Thank you for applying to the EZY Zenith Vendor Network. Our onboarding team will review your capabilities and reach out with compliance packet instructions.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: '',
                        company: '',
                        email: '',
                        phone: '',
                        address: '',
                        service: trades[0],
                        urgency: 'Ready to Onboard',
                        notes: '',
                        hasInsurance: true,
                        hasW9: true
                      });
                    }}
                    className="bg-[#182333] text-white px-6 py-2.5 rounded-xl text-xs font-bold"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-slate-100 pb-4 mb-2">
                    <h3 className="text-xl font-bold text-[#182333]">Vendor Onboarding Application</h3>
                    <p className="text-xs text-slate-500 mt-1">Please provide your trade details and coverage area.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Contact Person Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Smith"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-zenith-orange"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Company Name / LLC
                      </label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="Apex Field Services LLC"
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
                        placeholder="contact@apexservices.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-zenith-orange"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="(302) 555-0199"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-zenith-orange"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Primary Service Area (Counties, Cities, or Zip Codes) *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      placeholder="e.g. New Castle County, DE & Chester County, PA"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-zenith-orange"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Primary Trade Capability *
                    </label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-zenith-orange"
                    >
                      {trades.map((t, idx) => (
                        <option key={idx} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  {/* CHECKBOXES */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <label className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.hasInsurance}
                        onChange={(e) => setForm({ ...form, hasInsurance: e.target.checked })}
                        className="rounded text-zenith-orange focus:ring-zenith-orange"
                      />
                      <span>Active General Liability Insurance</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.hasW9}
                        onChange={(e) => setForm({ ...form, hasW9: e.target.checked })}
                        className="rounded text-zenith-orange focus:ring-zenith-orange"
                      />
                      <span>W-9 Available Upon Request</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Experience, Crew Size & Reference Notes
                    </label>
                    <textarea
                      rows={3}
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      placeholder="Briefly describe your crew size, trucks/equipment, and experience in property preservation, turnovers, or repairs..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-zenith-orange"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-zenith-orange hover:bg-zenith-orangeHover text-navy-950 font-bold py-3.5 rounded-xl text-sm transition-all shadow-accent flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? 'Submitting Application...' : 'Submit Vendor Application'}</span>
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
