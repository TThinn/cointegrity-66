
import React, { useEffect } from "react"
import { Toaster } from "sonner"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import ErrorBoundary from "./components/app/ErrorBoundary"
import { initializeCacheManagement } from "./utils/cacheManager"
import { initServiceWorker } from "./utils/serviceWorkerInit"
import { initializeErrorHandling } from "./utils/errorLogger"
import { scrollToTop, initializeScrollManager, initializeUrlUpdater } from "./utils/scrollManager"

// Page imports
import Index from "./pages/Index"
import NotFound from "./pages/NotFound"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import AboutPage from "./pages/AboutPage"
import ServicesPage from "./pages/ServicesPage"
import PartnersPage from "./pages/PartnersPage"
import ProcessPage from "./pages/ProcessPage"

import TestimonialsPage from "./pages/TestimonialsPage"
import ContactPage from "./pages/ContactPage"
import GlossaryPage from "./pages/GlossaryPage"
import ThankYouPage from "./pages/ThankYouPage"
import BlogPage from "./pages/BlogPage"
import GuidesPage from "./pages/GuidesPage"
import CaseStudiesPage from "./pages/CaseStudiesPage"
import MicaReadyWaitlistPage from "./pages/MicaReadyWaitlistPage"
import DeploymentTestPage from "./pages/DeploymentTestPage"
import DeploymentDashboard from "./pages/DeploymentDashboard"

import './index.css'
import './App.css'

// Component to handle scroll behavior on route changes
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Only scroll to top for route changes (not hash changes)
    if (!location.hash) {
      scrollToTop();
    }
  }, [location.pathname]);

  return null;
};

const App = () => {
  // Initialize all systems
  useEffect(() => {
    // Initialize error handling first
    initializeErrorHandling();
    
    // Initialize cache management
    initializeCacheManagement();
    
    // Initialize scroll management and URL updating
    initializeScrollManager();
    
    // Initialize URL updater after DOM is ready
    setTimeout(() => {
      initializeUrlUpdater();
    }, 100);
    
    // Initialize service worker with delay
    setTimeout(() => {
      initServiceWorker();
    }, 500);
    
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="app-container">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/web3-consulting" element={<Index />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/partners" element={<PartnersPage />} />
              <Route path="/process" element={<ProcessPage />} />
              
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/glossary" element={<GlossaryPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/guides" element={<GuidesPage />} />
              <Route path="/case-studies" element={<CaseStudiesPage />} />
              <Route path="/thank-you" element={<ThankYouPage />} />
              <Route path="/mica-ready-waitlist" element={<MicaReadyWaitlistPage />} />
              <Route path="/deployment-test" element={<DeploymentTestPage />} />
              <Route path="/deployment-dashboard" element={<DeploymentDashboard />} />
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
