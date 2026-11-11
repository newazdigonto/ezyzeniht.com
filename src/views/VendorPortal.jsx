import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { 
  Wrench, 
  CheckCircle2, 
  Clock, 
  Upload, 
  MapPin, 
  FileText, 
  ShieldCheck, 
  LogOut,
  Camera,
  AlertCircle
} from 'lucide-react';

export default function VendorPortal() {
  const { siteData, currentUser, logout, navigateTo, uploadPhoto, showToast } = useSite();
  const leads = siteData?.leads || [];
  const [uploading, setUploading] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const vendorJobs = leads.filter(l => l.type === 'service_request');

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadPhoto(file);
    setUploading(false);
    if (url) {
      showToast('Field completion photo uploaded to job record!');
    }
  };

  return (
    <div className="pt-36 sm:pt-40 pb-16 bg-slate-900 min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b border-slate-800 gap-4">
          <div className="flex items-center gap-4">
            <img 
              src="/images/logo-white.png" 
              alt="EZY Zenith" 
              className="h-10 sm:h-12 w-auto object-contain shrink-0" 
            />
            <div>
              <div className="flex items-center gap-2 text-zenith-orange font-bold text-xs uppercase tracking-wider">
                <Wrench className="w-3.5 h-3.5" />
                <span>Field Contractor Dispatch Portal</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                Vendor Workspace
              </h1>
              <p className="text-slate-400 text-xs">
                Logged in as: <strong className="text-white">{currentUser?.email || 'contractor@apexservices.com'}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('home')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              Public Site
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-200 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* COMPLIANCE STATUS BAR */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider block">GL Insurance</span>
              <span className="text-sm font-bold text-emerald-400">Verified & Active</span>
            </div>
          </div>

          <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider block">W-9 Form</span>
              <span className="text-sm font-bold text-emerald-400">On File</span>
            </div>
          </div>

          <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-950 text-zenith-orange border border-amber-800 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider block">Assigned Work Orders</span>
              <span className="text-sm font-bold text-white">{vendorJobs.length} Jobs Ready</span>
            </div>
          </div>
        </div>

        {/* WORK ORDERS FEED */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Dispatched Work Orders</h2>
            <span className="text-xs text-slate-400">Upload time-stamped completion photos upon finishing</span>
          </div>

          {vendorJobs.map((job, idx) => (
            <div 
              key={job.id || idx}
              className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-md space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700 pb-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-zenith-orange bg-amber-950 px-2.5 py-1 rounded border border-amber-800">
                    {job.service}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Urgency: <strong className="text-white">{job.urgency || 'Standard'}</strong>
                  </span>
                </div>
                <div className="text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Status: {job.status}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="text-slate-400 font-semibold mb-0.5">Property Location & Access:</div>
                  <div className="font-bold text-white text-sm flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-zenith-orange shrink-0" />
                    <span>{job.address}</span>
                  </div>
                  {job.accessNotes && (
                    <div className="mt-2 bg-slate-900 p-2.5 rounded-lg border border-slate-700 text-slate-300">
                      <strong>Lockbox / Access Code:</strong> {job.accessNotes}
                    </div>
                  )}
                </div>

                <div>
                  <div className="text-slate-400 font-semibold mb-0.5">Work Order Scope:</div>
                  <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-700 text-slate-300">
                    {job.notes || 'Standard preservation inspection & punch-list requirements.'}
                  </div>
                </div>
              </div>

              {/* ACTION: UPLOAD COMPLETION PHOTO */}
              <div className="pt-3 border-t border-slate-700 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer bg-zenith-orange hover:bg-zenith-orangeHover text-navy-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-colors">
                    <Camera className="w-4 h-4" />
                    <span>{uploading ? 'Uploading...' : 'Upload Completion Photos'}</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handlePhotoUpload} 
                      className="hidden" 
                    />
                  </label>
                  <span className="text-[11px] text-slate-400">Date/time stamped photos required</span>
                </div>

                <button
                  onClick={() => showToast('Invoice submitted to EZY Zenith accounting for review!')}
                  className="bg-slate-700 hover:bg-slate-600 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors"
                >
                  Submit Invoice / Sign-off
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

