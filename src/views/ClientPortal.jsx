import React from 'react';
import { useSite } from '../context/SiteContext';
import { 
  UserCheck, 
  Plus, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Camera, 
  LogOut, 
  FileText,
  ChevronRight,
  ShieldCheck 
} from 'lucide-react';

export default function ClientPortal() {
  const { siteData, currentUser, logout, navigateTo } = useSite();
  const leads = siteData?.leads || [];

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
                <UserCheck className="w-3.5 h-3.5" />
                <span>Realtor & Property Manager Portal</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                Client Property Tracker
              </h1>
              <p className="text-slate-400 text-xs">
                Welcome back, <strong className="text-white">{currentUser?.email || 'Sarah Jenkins (Keller Williams)'}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('request-service')}
              className="bg-zenith-orange hover:bg-zenith-orangeHover text-navy-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-accent transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Submit New Work Order</span>
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* ACTIVE PROPERTIES LIST */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Your Properties Under Management</h2>
            <span className="text-xs text-slate-400">Real-time status updates & closing verification photos</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {leads.slice(0, 4).map((ticket, idx) => (
              <div 
                key={ticket.id || idx}
                className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-md space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-zenith-orange bg-amber-950 px-2.5 py-1 rounded border border-amber-800">
                    {ticket.service}
                  </span>
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{ticket.status}</span>
                  </span>
                </div>

                <div>
                  <div className="text-slate-400 text-xs font-semibold">Target Property:</div>
                  <div className="text-base font-bold text-white flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-4 h-4 text-zenith-orange shrink-0" />
                    <span>{ticket.address || 'Address on file'}</span>
                  </div>
                </div>

                <div className="bg-slate-900 p-3 rounded-xl border border-slate-700 text-xs text-slate-300">
                  <div className="text-slate-500 font-semibold mb-1">Scope / Inspection Punch-list:</div>
                  <p>{ticket.notes || 'Inspection response punch-list underway with coordinated trades.'}</p>
                </div>

                <div className="flex items-center justify-between pt-2 text-xs">
                  <span className="text-slate-400">
                    Urgency: <strong className="text-white">{ticket.urgency || 'Standard'}</strong>
                  </span>
                  <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                    <Camera className="w-3.5 h-3.5" />
                    <span>Photo Proof On File</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

