
import React, { useEffect } from "react"
import { Toaster } from "sonner"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import ErrorBoundary from "./components/app/ErrorBoundary"
import { initializeCacheManagement } from "./utils/cacheManager"
import { initServiceWorker } from "./utils/serviceWorkerInit"

// Page imports
import Index from "./pages/Index"
import NotFound from "./pages/NotFound"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import AboutPage from "./pages/AboutPage"
import ServicesPage from "./pages/ServicesPage"
import PartnersPage from "./pages/PartnersPage"
import ProcessPage from "./pages/ProcessPage"
import TeamPage from "./pages/TeamPage"
import TestimonialsPage from "./pages/TestimonialsPage"
import ContactPage from "./pages/ContactPage"
import GlossaryPage from "./pages/GlossaryPage"
import ThankYouPage from "./pages/ThankYouPage"
import BlogPage from "./pages/BlogPage"
import GuidesPage from "./pages/GuidesPage"
import CaseStudiesPage from "./pages/CaseStudiesPage"
import MicaReadyWaitlistPage from "./pages/MicaReadyWaitlistPage"

import './index.css'
import './App.css'

const App = () => {
  // PHASE 3: Initialize enhanced caching system after React is fully ready
  useEffect(() => {
    // Initialize cache management first
    initializeCacheManagement();
    
    // Initialize service worker after cache management
    setTimeout(() => {
      initServiceWorker();
    }, 300);
    
    // Listen for app updates
    const handleAppUpdate = (event: CustomEvent) => {
      console.log('App update notification received:', event.detail);
      // Could show a toast notification here if needed
    };
    
    window.addEventListener('app-update-available', handleAppUpdate as EventListener);
    
    return () => {
      window.removeEventListener('app-update-available', handleAppUpdate as EventListener);
    };
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter>
          <div className="app-container">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/web3-consulting" element={<Index />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/partners" element={<PartnersPage />} />
              <Route path="/process" element={<ProcessPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/glossary" element={<GlossaryPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/guides" element={<GuidesPage />} />
              <Route path="/case-studies" element={<CaseStudiesPage />} />
              <Route path="/thank-you" element={<ThankYouPage />} />
              <Route path="/mica-ready-waitlist" element={<MicaReadyWaitlistPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster 
              position="top-center" 
              closeButton
              toastOptions={{
                className: "toast-blur-container",
                style: {
                  background: "transparent",
                  border: "none",
                  boxShadow: "none",
                }
              }}
            />
          </div>
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;
