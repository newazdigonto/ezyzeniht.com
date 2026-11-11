'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const SiteContext = createContext();

export function SiteProvider({ children }) {
  const [siteData, setSiteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedService, setSelectedService] = useState(null);
  const [toast, setToast] = useState(null);

  // Authentication State (Admin, Vendor, Client)
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Check local storage for persistent login session
    try {
      const savedUser = localStorage.getItem('ezy_user');
      const savedRole = localStorage.getItem('ezy_role');
      if (savedUser && savedRole) {
        setCurrentUser(JSON.parse(savedUser));
        setUserRole(savedRole);
      }
    } catch (e) {
      console.warn('Could not read auth from storage', e);
    }
  }, []);

  const login = (role, email, name = '') => {
    const user = {
      email,
      role,
      name: name || (role === 'admin' ? 'Operations Admin' : role === 'vendor' ? 'Apex Maintenance Crew' : 'Sarah Jenkins Realty'),
      loggedAt: new Date().toISOString()
    };
    setCurrentUser(user);
    setUserRole(role);
    try {
      localStorage.setItem('ezy_user', JSON.stringify(user));
      localStorage.setItem('ezy_role', role);
    } catch (e) {}
    showToast(`Logged in successfully as ${role.toUpperCase()}`);
    navigateTo(role === 'admin' ? 'dashboard' : role === 'vendor' ? 'vendor-portal' : 'client-portal');
  };

  const logout = () => {
    setCurrentUser(null);
    setUserRole(null);
    try {
      localStorage.removeItem('ezy_user');
      localStorage.removeItem('ezy_role');
    } catch (e) {}
    showToast('Signed out successfully');
    navigateTo('home');
  };

  // Toast notification helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Fetch initial content
  const fetchContent = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/content');
      if (res.ok) {
        const data = await res.json();
        setSiteData(data);
      } else {
        throw new Error('API request failed');
      }
    } catch (err) {
      console.warn('Could not fetch from server, using local fallback if available', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  // Update hero slides
  const updateSlider = async (newSlides) => {
    try {
      const res = await fetch('/api/content/slider', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slides: newSlides })
      });
      if (res.ok) {
        const result = await res.json();
        setSiteData(prev => ({ ...prev, heroSlides: result.slides }));
        showToast('Hero slides updated successfully!');
        return { success: true };
      }
    } catch (err) {
      console.error(err);
      showToast('Failed to update slider', 'error');
      return { success: false, error: err.message };
    }
  };

  // Update services
  const updateServices = async (newServices) => {
    try {
      const res = await fetch('/api/content/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ services: newServices })
      });
      if (res.ok) {
        const result = await res.json();
        setSiteData(prev => ({ ...prev, services: result.services }));
        showToast('Services updated successfully!');
        return { success: true };
      }
    } catch (err) {
      console.error(err);
      showToast('Failed to update services', 'error');
      return { success: false, error: err.message };
    }
  };

  // Add or update a Google review
  const saveReview = async (review) => {
    try {
      const res = await fetch('/api/content/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ review })
      });
      if (res.ok) {
        const result = await res.json();
        setSiteData(prev => ({ ...prev, googleReviews: result.reviews }));
        showToast(review.id ? 'Google Review updated!' : 'New Google Review added successfully!');
        return { success: true };
      }
    } catch (err) {
      console.error(err);
      showToast('Failed to save Google review', 'error');
      return { success: false, error: err.message };
    }
  };

  // Delete a Google review
  const deleteReview = async (reviewId) => {
    try {
      const res = await fetch(`/api/content/reviews/${reviewId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        const result = await res.json();
        setSiteData(prev => ({ ...prev, googleReviews: result.reviews }));
        showToast('Google Review removed');
        return { success: true };
      }
    } catch (err) {
      console.error(err);
      showToast('Failed to delete review', 'error');
      return { success: false, error: err.message };
    }
  };

  // Photo Upload Handler
  const uploadPhoto = async (file) => {
    try {
      const formData = new FormData();
      formData.append('photo', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        const data = await res.json();
        showToast('Photo uploaded successfully!');
        return data.url;
      } else {
        throw new Error('Upload failed');
      }
    } catch (err) {
      console.error(err);
      showToast('Failed to upload photo', 'error');
      return null;
    }
  };

  // Submit Lead (Service Request, Vendor Application, Contact)
  const submitLead = async (leadData) => {
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      });
      if (res.ok) {
        const result = await res.json();
        setSiteData(prev => ({
          ...prev,
          leads: [result.lead, ...(prev?.leads || [])]
        }));
        showToast('Request submitted successfully! Our team will contact you shortly.');
        return { success: true };
      }
    } catch (err) {
      console.error(err);
      showToast('Submission error. Please call 302-244-5523 directly.', 'error');
      return { success: false, error: err.message };
    }
  };

  // Update Lead Status in Dashboard
  const updateLeadStatus = async (leadId, status, adminNotes) => {
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, adminNotes })
      });
      if (res.ok) {
        const result = await res.json();
        setSiteData(prev => ({
          ...prev,
          leads: prev.leads.map(l => l.id === leadId ? result.lead : l)
        }));
        showToast(`Lead status updated to ${status}`);
        return { success: true };
      }
    } catch (err) {
      console.error(err);
      showToast('Failed to update lead status', 'error');
      return { success: false, error: err.message };
    }
  };

  // Update company information
  const updateCompany = async (companyData) => {
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company: companyData })
      });
      if (res.ok) {
        setSiteData(prev => ({ ...prev, company: companyData }));
        showToast('Company information saved!');
        return { success: true };
      }
    } catch (err) {
      console.error(err);
      showToast('Failed to update company data', 'error');
      return { success: false, error: err.message };
    }
  };

  const navigateTo = (page, service = null) => {
    setCurrentPage(page);
    if (service) {
      setSelectedService(service);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <SiteContext.Provider
      value={{
        siteData,
        loading,
        currentPage,
        selectedService,
        toast,
        currentUser,
        userRole,
        login,
        logout,
        navigateTo,
        setSelectedService,
        updateSlider,
        updateServices,
        saveReview,
        deleteReview,
        uploadPhoto,
        submitLead,
        updateLeadStatus,
        updateCompany,
        showToast
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  return useContext(SiteContext);
}

