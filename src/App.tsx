
import React, { StrictMode, useEffect } from "react"
import { TooltipProvider } from "@/components/ui/tooltip"
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
import './index.css'
import './App.css'

// Create a client
const queryClient = new QueryClient();

// Error boundary component for Helmet-related errors
class HelmetErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.warn('Helmet error caught:', error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('Helmet error details:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI without Helmet functionality
      return this.props.children;
    }

    return this.props.children;
  }
}

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

const App = () => {
  // Initialize performance monitoring
  useWebVitals();
  useServiceWorker();

  return (
    <StrictMode>
      <HelmetErrorBoundary>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
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
              </BrowserRouter>
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
            </TooltipProvider>
          </QueryClientProvider>
        </HelmetProvider>
      </HelmetErrorBoundary>
    </StrictMode>
  );
};

export default App;
