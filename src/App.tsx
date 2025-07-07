
import React, { useEffect } from "react"
import { Toaster } from "sonner"
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import ErrorBoundary from "./components/app/ErrorBoundary"
import { initializeCacheManagement } from "./utils/cacheManager"
import { initServiceWorker } from "./utils/serviceWorkerInit"
import { initializeErrorHandling } from "./utils/errorLogger"
import { scrollToTop, initializeScrollManager, initializeUrlUpdater } from "./utils/scrollManager"
import { 
  preloadCriticalResources, 
  initPerformanceMonitoring, 
  optimizeFontLoading,
  setupAdvancedCaching,
  scheduleNonCriticalTasks
} from "./utils/performanceOptimizer"

// Page imports
import Index from "./pages/Index"
import NotFound from "./pages/NotFound"
import PrivacyPolicy from "./pages/PrivacyPolicy"
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
    // Critical initialization (immediately)
    initializeErrorHandling();
    preloadCriticalResources();
    optimizeFontLoading();
    
    // High priority initialization (next tick)
    setTimeout(() => {
      initializeCacheManagement();
      initializeScrollManager();
      initializeUrlUpdater();
    }, 0);
    
    // Medium priority initialization (when main thread is free)
    scheduleNonCriticalTasks([
      () => initPerformanceMonitoring(),
      () => setupAdvancedCaching(),
      () => initServiceWorker()
    ]);
    
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
              
              {/* Removed section redirects to fix Google Search Console indexing issues */}
              
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
