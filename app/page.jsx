'use client';

import React from 'react';
import { useSite } from '@/src/context/SiteContext';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';

// Page Views
import Home from '@/src/views/Home';
import About from '@/src/views/About';
import Services from '@/src/views/Services';
import RealtorSupport from '@/src/views/RealtorSupport';
import PropertyManagement from '@/src/views/PropertyManagement';
import Coverage from '@/src/views/Coverage';
import BecomeVendor from '@/src/views/BecomeVendor';
import RequestService from '@/src/views/RequestService';
import Contact from '@/src/views/Contact';
import Dashboard from '@/src/views/Dashboard';
import Login from '@/src/views/Login';
import VendorPortal from '@/src/views/VendorPortal';
import ClientPortal from '@/src/views/ClientPortal';

import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function MainPage() {
  const { currentPage, loading, toast } = useSite();

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <About />;
      case 'services':
        return <Services />;
      case 'realtor-support':
        return <RealtorSupport />;
      case 'property-management':
        return <PropertyManagement />;
      case 'coverage':
        return <Coverage />;
      case 'become-vendor':
        return <BecomeVendor />;
      case 'request-service':
        return <RequestService />;
      case 'contact':
        return <Contact />;
      case 'dashboard':
        return <Dashboard />;
      case 'login':
        return <Login />;
      case 'vendor-portal':
        return <VendorPortal />;
      case 'client-portal':
        return <ClientPortal />;
      case 'home':
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {loading ? (
          <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-zenith-orange animate-spin" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Loading EZY Zenith Portal...
            </span>
          </div>
        ) : (
          renderPage()
        )}
      </main>

      {/* GLOBAL TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className={`px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-bold border ${
            toast.type === 'error'
              ? 'bg-red-950 text-red-200 border-red-700'
              : 'bg-emerald-950 text-emerald-200 border-emerald-700'
          }`}>
            {toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-red-400" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {currentPage !== 'dashboard' && <Footer />}
    </div>
  );
}
