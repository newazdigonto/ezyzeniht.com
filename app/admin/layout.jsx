import React from 'react';

export const metadata = {
  title: 'Operations Dashboard | EZY Zenith LLC Admin',
  description: 'Internal operations and content management portal for EZY Zenith LLC.',
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans antialiased">
      {children}
    </div>
  );
}

