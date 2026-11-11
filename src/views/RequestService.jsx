import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import PageHero from '../components/PageHero';
import { 
  Send, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Upload, 
  PhoneCall, 
  FileCheck2,
  AlertCircle 
} from 'lucide-react';

export default function RequestService() {
  const { siteData, selectedService, submitLead, showToast, uploadPhoto } = useSite();
  const phone = siteData?.company?.phone || '302-244-5523';

  const defaultService = selectedService?.title || 'Inspection Repair List (Realtor Support)';

  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    address: '',
    service: defaultService,
    urgency: 'Standard (2-3 Business Days)',
    accessNotes: '',
    notes: '',
    photoUrl: ''
  });

  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const serviceOptions = [
    'Inspection Repair List (Realtor Support)',
    'Listing Prep & Cosmetic Punch-List',
    'Property Preservation & Securing',
    'Tenant Turnover & Make-Ready',
    'Trash-Out & Debris Removal',
    'Lawn Care & Curb Appeal Restoration',
    'Roofing Inspection & Repair Coordination',
    'Flooring Repairs & Installation',
    'Painting & Drywall Repairs',
    'Gutter Cleaning & Maintenance',
    'Appliance Maintenance & Repairs',
    'General Handyman & Carpentry',
    'Other Custom Scope / Full Estimate'
  ];

  const urgencyOptions = [
    'Emergency (< 24 Hours)',
    'Urgent (24-48 Hours)',
    'Standard (2-3 Business Days)',
    'Scheduled for Later Date'
  ];

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadPhoto(file);
    setUploading(false);
    if (url) {
      setForm(prev => ({ ...prev, photoUrl: url }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email || !form.address) {
      showToast('Please fill in required fields (Name, Phone, Email, Property Address)', 'error');
      return;
    }

    setSubmitting(true);
    const res = await submitLead({
      type: 'service_request',
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
        badge="Fast Property Dispatch"
        badgeIcon={FileCheck2}
        title="Request Service & Dispatch Field Support"
        subtitle="Tell us what the property needs. Our operations desk will review the scope, verify contractor availability, and follow up promptly with pricing and scheduling."
        primaryCtaText="Dispatch Hotline"
        primaryCtaLink="tel:302-244-5523"
        secondaryCtaText="Realtor Support"
        secondaryCtaLink="realtor-support"
        initialImage="/images/Securing-Service-740x556.jpg"
        breadcrumbs="Request Service"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: WORK ORDER FORM (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-soft">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#182333]">Work Order Received!</h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto">
                    Your request has been logged. Our dispatch desk is reviewing your property address and trade requirements. We will contact you at <strong>{form.phone}</strong> or <strong>{form.email}</strong>.
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
                        service: serviceOptions[0],
                        urgency: 'Standard (2-3 Business Days)',
                        accessNotes: '',
                        notes: '',
                        photoUrl: ''
                      });
                    }}
                    className="bg-[#182333] text-white px-6 py-2.5 rounded-xl text-xs font-bold"
                  >
                    Submit Another Work Order
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-slate-100 pb-4 mb-2">
                    <h3 className="text-xl font-bold text-[#182333]">Property Service Work Order</h3>
                    <p className="text-xs text-slate-500 mt-1">Fields marked with * are required.</p>
                  </div>

                  {/* NAME & COMPANY */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Amanda Blake"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-zenith-orange"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Company / Brokerage / Agency
                      </label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="e.g. Berkshire Hathaway / Self"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-zenith-orange"
                      />
                    </div>
                  </div>

                  {/* PHONE & EMAIL */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="(302) 555-0144"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-zenith-orange"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="amanda@realestate.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-zenith-orange"
                      />
                    </div>
                  </div>

                  {/* PROPERTY ADDRESS */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Target Property Address (Street, City, State, Zip) *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      placeholder="e.g. 142 Elmwood Ave, Wilmington, DE 19805"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-zenith-orange"
                    />
                  </div>

                  {/* SERVICE NEEDED & URGENCY */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Service Needed *
                      </label>
                      <select
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-zenith-orange"
                      >
                        {serviceOptions.map((opt, idx) => (
                          <option key={idx} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Project Urgency *
                      </label>
                      <select
                        value={form.urgency}
                        onChange={(e) => setForm({ ...form, urgency: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-zenith-orange"
                      >
                        {urgencyOptions.map((opt, idx) => (
                          <option key={idx} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* ACCESS NOTES */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Property Access / Lockbox Instructions
                    </label>
                    <input
                      type="text"
                      value={form.accessNotes}
                      onChange={(e) => setForm({ ...form, accessNotes: e.target.value })}
                      placeholder="e.g. Supra lockbox on front railing, or Combo: 2490, gate code: 1234"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-zenith-orange"
                    />
                  </div>

                  {/* PHOTO / DOCUMENT UPLOAD */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Upload Property Photo, Punch-List or Inspection Amendment
                    </label>
                    <div className="flex items-center gap-3">
                      <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-300 flex items-center gap-2 transition-colors">
                        <Upload className="w-4 h-4 text-zenith-orange" />
                        <span>{uploading ? 'Uploading...' : 'Choose File (Photo or PDF)'}</span>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                      {form.photoUrl && (
                        <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> File attached!
                        </span>
                      )}
                    </div>
                  </div>

                  {/* SCOPE DETAILS */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Scope Details, Repair Description or Work Order Items
                    </label>
                    <textarea
                      rows={4}
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      placeholder="List repair items, room locations, paint colors, or specific instructions for our team..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-zenith-orange"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-zenith-orange hover:bg-zenith-orangeHover text-navy-950 font-bold py-4 rounded-xl text-sm transition-all shadow-accent flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? 'Submitting Work Order...' : 'Submit Work Order / Request Dispatch'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* RIGHT: TRUST & DISPATCH INFO (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#182333] rounded-2xl p-7 text-white space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-zenith-orange font-bold text-xs uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>24/7 Operations Desk</span>
              </div>
              <h3 className="text-xl font-bold">Fast Turnaround On Every Request</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Whether you need same-day securing for a vacant asset or a multi-trade punch-list quote for a real estate closing, we prioritize speed, communication, and clear deliverables.
              </p>

              <div className="pt-2 border-t border-slate-700/80 space-y-2 text-xs">
                <div className="flex items-center justify-between py-1 text-slate-300">
                  <span>Phone Dispatch Hotline:</span>
                  <a href={`tel:${phone.replace(/[^0-9]/g, '')}`} className="font-bold text-zenith-orange">
                    {phone}
                  </a>
                </div>
                <div className="flex items-center justify-between py-1 text-slate-300">
                  <span>Direct Intake Email:</span>
                  <span className="font-mono text-white">{siteData?.company?.email || 'contact@ezyzenith.com'}</span>
                </div>
                <div className="flex items-center justify-between py-1 text-slate-300">
                  <span>Standard Response:</span>
                  <span className="text-emerald-400 font-bold">&lt; 2 Hours Business Hours</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft space-y-3">
              <h4 className="text-sm font-bold text-[#182333]">Documentation Guarantee</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every service ticket includes high-resolution before, during, and after photos with timestamps for complete underwriter, escrow, or asset manager verification.
              </p>
              <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Subcontractors vetted for GL insurance & W-9</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
