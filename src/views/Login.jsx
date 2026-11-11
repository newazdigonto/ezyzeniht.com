import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { 
  Shield, 
  Wrench, 
  UserCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Eye,
  EyeOff
} from 'lucide-react';

export default function Login() {
  const { login, navigateTo } = useSite();
  const [role, setRole] = useState('admin'); // 'admin' | 'vendor' | 'client'
  const [email, setEmail] = useState('admin@ezyzenith.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    if (newRole === 'admin') {
      setEmail('admin@ezyzenith.com');
      setPassword('admin123');
    } else if (newRole === 'vendor') {
      setEmail('contractor@apexservices.com');
      setPassword('vendor123');
    } else {
      setEmail('realtor@kwrealty.com');
      setPassword('client123');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(role, email);
  };

  const handleQuickLogin = (selectedRole) => {
    const defaultEmail = selectedRole === 'admin' 
      ? 'admin@ezyzenith.com' 
      : selectedRole === 'vendor' 
        ? 'contractor@apexservices.com' 
        : 'realtor@kwrealty.com';
    login(selectedRole, defaultEmail);
  };

  return (
    <div className="pt-36 sm:pt-44 pb-20 px-4 sm:px-8 min-h-[90vh] flex items-center justify-center bg-[#fafbfc]">
      <div className="w-full max-w-xl">
        
        {/* LOGO & MINIMALIST HEADER */}
        <div className="text-center mb-8 space-y-3">
          <button 
            onClick={() => navigateTo('home')} 
            className="inline-block focus:outline-none group mb-2"
          >
            <img 
              src="/images/logo-color.png" 
              alt="EZY Zenith" 
              className="h-12 sm:h-14 w-auto mx-auto object-contain transition-transform group-hover:scale-105"
            />
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f2446] tracking-tight">
            Portal Access & Authentication
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
            Secure multi-role portal for operations administrators, field vendors, and real estate clients.
          </p>
        </div>

        {/* ANIMATED BORDER LOGIN CARD */}
        <div className="animated-gradient-border shadow-minimal overflow-hidden">
          <div className="p-8 sm:p-10 bg-white rounded-2xl">
            
            {/* ROLE SWITCHER TABS */}
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl mb-8 border border-slate-200/80">
              <button
                type="button"
                onClick={() => handleRoleChange('admin')}
                className={`py-2.5 px-2 rounded-lg text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all ${
                  role === 'admin'
                    ? 'bg-[#0f2446] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Shield className={`w-3.5 h-3.5 ${role === 'admin' ? 'text-zenith-orange' : 'text-slate-400'}`} />
                <span>Admin Access</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange('vendor')}
                className={`py-2.5 px-2 rounded-lg text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all ${
                  role === 'vendor'
                    ? 'bg-[#0f2446] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Wrench className={`w-3.5 h-3.5 ${role === 'vendor' ? 'text-zenith-orange' : 'text-slate-400'}`} />
                <span>Vendor Access</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange('client')}
                className={`py-2.5 px-2 rounded-lg text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all ${
                  role === 'client'
                    ? 'bg-[#0f2446] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <UserCheck className={`w-3.5 h-3.5 ${role === 'client' ? 'text-zenith-orange' : 'text-slate-400'}`} />
                <span>Client Access</span>
              </button>
            </div>

            {/* ROLE DESCRIPTION BANNER */}
            <div className="mb-6 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-zenith-orange shrink-0 mt-1.5" />
              <p className="text-slate-600 leading-relaxed">
                {role === 'admin' && 'Admin Access: Full control over hero slider photos, service descriptions, Google reviews, leads CRM, and MySQL connection.'}
                {role === 'vendor' && 'Vendor Access: Field contractor hub for viewing assigned work orders, uploading completion photos, and tracking W-9/insurance.'}
                {role === 'client' && 'Client Access: Dedicated dashboard for Realtors and Property Managers to track punch-lists, turn progress, and photo reports.'}
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0f2446] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50/70 border border-slate-200 text-sm text-[#0f2446] placeholder-slate-400 focus:outline-none focus:border-zenith-orange focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0f2446] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50/70 border border-slate-200 text-sm text-[#0f2446] placeholder-slate-400 focus:outline-none focus:border-zenith-orange focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* REMEMBER & FORGOT */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded text-zenith-orange focus:ring-zenith-orange"
                  />
                  <span>Keep me signed in</span>
                </label>
                <span className="text-slate-400 hover:text-zenith-orange cursor-pointer">
                  Need access help?
                </span>
              </div>

              {/* SUBMIT BUTTON */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#0f2446] hover:bg-[#1a3b6d] text-white font-bold py-3.5 rounded-xl text-sm transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                >
                  <span>Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}</span>
                  <ArrowRight className="w-4 h-4 text-zenith-orange transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </form>

            {/* 1-CLICK QUICK ACCESS TEST PILLS */}
            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400 block mb-3">
                Quick 1-Click Demo Login
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('admin')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-50 hover:bg-zenith-orange hover:text-navy-950 text-amber-800 border border-amber-200 transition-all flex items-center gap-1.5"
                >
                  <Shield className="w-3 h-3 text-zenith-orange" />
                  <span>Admin Portal</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('vendor')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all flex items-center gap-1.5"
                >
                  <Wrench className="w-3 h-3" />
                  <span>Vendor Portal</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('client')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all flex items-center gap-1.5"
                >
                  <UserCheck className="w-3 h-3" />
                  <span>Client Portal</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM HELP */}
        <div className="text-center mt-6 text-xs text-slate-500">
          <span>Need a new account? </span>
          <button 
            onClick={() => navigateTo('become-vendor')} 
            className="text-[#0f2446] font-bold hover:underline"
          >
            Apply as a Vendor
          </button>
          <span> or </span>
          <button 
            onClick={() => navigateTo('request-service')} 
            className="text-[#0f2446] font-bold hover:underline"
          >
            Submit a Work Order
          </button>
        </div>

      </div>
    </div>
  );
}

