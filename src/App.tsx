
import React, { useEffect } from "react"
import { Toaster } from "sonner"
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import ErrorBoundary from "./components/app/ErrorBoundary"
import { ConsentManager } from "./components/ConsentManager"
import { FEATURES } from "./config/features"
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
import GlossaryTermPage from "./pages/GlossaryTermPage"
import ThankYouPage from "./pages/ThankYouPage"
import BlogPage from "./pages/BlogPage"
import BlogArticlePage from "./pages/BlogArticlePage"
import NewsPage from "./pages/NewsPage"
import { NewsArticlePage } from "./pages/NewsArticlePage"
import GuidesPage from "./pages/GuidesPage"
import CaseStudiesPage from "./pages/CaseStudiesPage"
import MicaReadyWaitlistPage from "./pages/MicaReadyWaitlistPage"
// import ClientHunitPage from "./pages/ClientHunitPage" // Disabled via feature flag

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
          <ConsentManager />
          <ScrollToTop />
          <div className="app-container">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/web3-consulting" element={<Index />} />
              
              {/* MiCA redirect - ensures /mica links redirect to waitlist page */}
              <Route path="/mica" element={<Navigate to="/mica-ready-waitlist" replace />} />
              
              {/* Removed section redirects to fix Google Search Console indexing issues */}
              
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/glossary" element={<GlossaryPage />} />
              <Route path="/glossary/" element={<GlossaryPage />} />
              <Route path="/glossary/:slug" element={<GlossaryTermPage />} />
              <Route path="/glossary/:slug/" element={<GlossaryTermPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogArticlePage />} />
              <Route path="/blog/:slug/" element={<BlogArticlePage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/thank-you" element={<ThankYouPage />} />
              <Route path="/mica-ready-waitlist" element={<MicaReadyWaitlistPage />} />
              {/* Hunit client route - disabled via feature flag */}
              {FEATURES.HUNIT_ENABLED && (
                <Route 
                  path="/client/Hunit" 
                  element={React.createElement(
                    React.lazy(() => import("./pages/ClientHunitPage"))
                  )} 
                />
              )}
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
