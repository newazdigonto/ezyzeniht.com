import './globals.css';
import { SiteProvider } from '@/src/context/SiteContext';

export const metadata = {
  title: 'Property Preservation & Maintenance Services | EZY Zenith LLC',
  description: 'EZY Zenith LLC coordinates fast, reliable property maintenance, inspection repairs, turnover services, and preservation work across multiple U.S. markets for Realtors, property managers, and investors.',
  keywords: 'property preservation services, property maintenance coordination, Realtor listing repair support, inspection repair coordination, property turnover services, EZY Zenith LLC',
  icons: {
    icon: '/images/logo-color.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="bg-[#f8fafc] text-slate-800 font-sans antialiased selection:bg-zenith-orange selection:text-white min-h-screen flex flex-col">
        <SiteProvider>
          {children}
        </SiteProvider>
      </body>
    </html>
  );
}

