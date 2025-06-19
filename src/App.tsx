
import React, { StrictMode, useEffect } from "react"
import { Toaster } from "sonner"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
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
import { useAnalytics } from "./hooks/useAnalytics"
import { useWebVitals } from "./hooks/useWebVitals"
import { useServiceWorker } from "./hooks/useServiceWorker"
import { AppProviders } from "./components/app/AppProviders"
import ErrorBoundary from "./components/app/ErrorBoundary"
import { validateReactEnvironment } from "./utils/reactDebug"
import './index.css'
import './App.css'

// Create a client
const queryClient = new QueryClient();

// RouteTracker component to handle route changes
const RouteTracker = () => {
  const location = useLocation();
  const { pageView } = useAnalytics();
  
  useEffect(() => {
    // Track page view on route change
    pageView(location.pathname);
  }, [location, pageView]);
  
  return null;
};

// Main app content component
const AppContent = () => {
  // Initialize performance monitoring
  useWebVitals();
  useServiceWorker();

  // Validate React environment on mount
  useEffect(() => {
    console.log('🔍 App mounted, validating React environment...');
    validateReactEnvironment();
  }, []);

  return (
    <BrowserRouter>
      <RouteTracker />
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
    </BrowserRouter>
  );
};

const App = () => {
  console.log('🔍 App component rendering...');
  
  return (
    <ErrorBoundary>
      <StrictMode>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <AppProviders>
              <AppContent />
            </AppProviders>
          </QueryClientProvider>
        </HelmetProvider>
      </StrictMode>
    </ErrorBoundary>
  );
};

export default App;
