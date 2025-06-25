
import React, { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SeoHead } from "@/components/seo/SeoHead";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import { useAnalytics } from "@/hooks/useAnalytics";

const ThankYouPage = () => {
  const location = useLocation();
  const { trackEvent, pageView } = useAnalytics();
  
  useEffect(() => {
    // Track the page view
    pageView('/thank-you');
    
    // Track form submission conversion event
    trackEvent('form_submission_complete', {
      category: 'conversion',
      label: 'contact_form',
      value: 1,
      nonInteraction: false
    });
  }, [pageView, trackEvent]);
  
  return (
    <div className="min-h-screen bg-[#080112]" itemScope itemType="https://schema.org/WebPage">
      <SeoHead 
        currentPath={location.pathname} 
        currentHash={location.hash}
      />
      
      <Header backgroundType="light" />
      
      <main id="main">
        <section className="py-20 bg-gradient-to-b from-[#FEFCFD] to-[#FDF9FC] relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#133a63]/30 rounded-full blur-[90px]"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#010822]/20 rounded-full blur-[70px]"></div>
          </div>
          
          <Container className="relative z-10">
            <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto pt-10">
              <div className="mb-6 text-[#cb46b3] bg-[#cb46b3]/10 p-4 rounded-full">
                <CheckCircle size={48} />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Thank You for Contacting Us!
              </h1>
              
              <p className="text-lg text-gray-600 mb-6">
                We've received your message and our team will get back to you shortly. 
                A confirmation email has been sent to the address you provided.
              </p>
              
              <div className="flex flex-col md:flex-row gap-4 mt-4">
                <Link 
                  to="/" 
                  className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Return to Homepage
                </Link>
                
                <Link 
                  to="/services" 
                  className="px-6 py-3 bg-[#cb46b3] text-white rounded-lg hover:bg-[#cb46b3]/90 transition-colors flex items-center justify-center"
                >
                  Explore Our Services
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYouPage;
