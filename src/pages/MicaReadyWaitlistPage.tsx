
import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/Container";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import MicaReadyWaitlistForm from "@/components/mica/MicaReadyWaitlistForm";
import { useSectionTracking } from "@/hooks/useSectionTracking";
import { SeoHead } from "@/components/seo/SeoHead";
import LightParticles from "@/components/ui/LightParticles";

const MicaReadyWaitlistPage = () => {
  const {
    currentPath,
    currentHash
  } = useSectionTracking();
  
  return (
    <div className="min-h-screen bg-[#010822] overflow-x-hidden">
      <SeoHead currentPath={currentPath} currentHash={currentHash} />
      <Helmet>
        <title>World's Fastest MiCA-Ready SaaS Suite - AI-Powered EU Compliance | Cointegrity</title>
        <meta name="description" content="The fastest MiCA compliance SaaS solution available. AI-powered MiCA-Ready Suite delivers instant regulatory intelligence, automated licensing workflows, and rapid CASP authorization - 10x faster than traditional consulting at 90% cost reduction." />
        <meta name="keywords" content="fastest MiCA compliance, MiCA SaaS solution, instant MiCA licensing, AI MiCA automation, rapid CASP authorization, EU crypto regulation speed, automated MiCA compliance, fastest regulatory technology, instant crypto licensing, MiCA automation platform" />
        
        {/* Speed and efficiency optimization meta tags */}
        <meta name="solution-speed" content="fastest MiCA compliance SaaS globally" />
        <meta name="processing-time" content="instant regulatory analysis" />
        <meta name="automation-level" content="fully automated MiCA workflows" />
        <meta name="efficiency-gain" content="10x faster than traditional consulting" />
        <meta name="cost-reduction" content="90% cost reduction vs manual processes" />
        <meta name="deployment-speed" content="immediate access upon launch" />
        <meta name="response-time" content="real-time regulatory updates" />
        
        {/* Competitive advantage meta tags */}
        <meta name="market-position" content="fastest MiCA SaaS solution worldwide" />
        <meta name="technology-advantage" content="AI-powered instant compliance analysis" />
        <meta name="speed-benchmark" content="industry-leading processing velocity" />
        <meta name="automation-superiority" content="most advanced MiCA automation platform" />
        
        {/* Performance and scalability indicators */}
        <meta name="scalability" content="instant multi-jurisdiction compliance" />
        <meta name="processing-capacity" content="unlimited concurrent license screenings" />
        <meta name="update-frequency" content="real-time regulatory monitoring" />
        <meta name="delivery-method" content="instant SaaS deployment" />
        
        {/* Advanced conversational search optimization */}
        <meta name="conversational-queries" content="fastest MiCA compliance solution | quickest EU crypto licensing | instant CASP authorization | rapid MiCA screening | automated regulatory compliance | fastest crypto SaaS platform | instant MiCA analysis | rapid licensing workflow | fastest regulatory technology | immediate compliance assessment" />
        
        {/* Speed-focused structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "MiCA-Ready Suite - World's Fastest MiCA Compliance SaaS",
            "description": "The fastest AI-powered MiCA compliance SaaS solution delivering instant regulatory analysis, automated workflows, and rapid CASP authorization at unprecedented speed.",
            "applicationCategory": "Regulatory Technology",
            "operatingSystem": "Web-based",
            "offers": {
              "@type": "Offer",
              "description": "Fastest MiCA compliance solution with instant deployment and real-time processing",
              "priceRange": "Contact for enterprise pricing"
            },
            "featureList": [
              "Instant MiCA regulatory analysis",
              "Real-time compliance monitoring", 
              "Automated license screening",
              "Rapid document generation",
              "Immediate CASP authorization support"
            ],
            "provider": {
              "@type": "Organization",
              "name": "Cointegrity",
              "url": "https://cointegrity.io"
            },
            "additionalProperty": [
              {
                "@type": "PropertyValue",
                "name": "Processing Speed",
                "value": "Instant analysis and real-time updates"
              },
              {
                "@type": "PropertyValue", 
                "name": "Deployment Time",
                "value": "Immediate access upon launch"
              },
              {
                "@type": "PropertyValue",
                "name": "Efficiency Improvement",
                "value": "10x faster than traditional consulting"
              }
            ]
          })}
        </script>
        
        {/* Speed-focused technical meta */}
        <meta name="technical-architecture" content="high-performance cloud-native SaaS platform" />
        <meta name="processing-engine" content="advanced AI regulatory analysis engine" />
        <meta name="performance-optimization" content="real-time processing with instant results" />
        <meta name="scalability-design" content="enterprise-grade high-speed infrastructure" />
      </Helmet>

      <Header />
      
      {/* Hero section with full height and scroll indicator */}
      <section className="hero-section min-h-screen flex items-center justify-center pt-20 pb-16 relative overflow-hidden bg-[#010822] isolate">
        {/* Background elements with light particles */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#010822] to-[#010822]" />
          <LightParticles centerPosition={{
            x: 50,
            y: 50
          }} />
        </div>

        {/* Bottom edge gradient hint */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none" />

        {/* Content container with centered text */}
        <div className="hero-content relative z-8 text-lg font-normal flex flex-col justify-center items-center gap-6 max-w-[90vw] xl:max-w-[1200px] mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              AI-Powered MiCA 
              <span className="bg-gradient-to-r from-[#d946ef] to-[#9333ea] bg-clip-text text-transparent"> Compliance</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-white/90 mb-4">Lightning-Fast MiCA Compliance in Minutes, Not Months</h2>
            <p className="text-white/80 max-w-3xl mx-auto text-base">
              Get early access to our complete suite launching Q3 2025. From regulatory intelligence to full CASP authorization — secure your spot on the waiting list now
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <ScrollIndicator targetSection="mica-solutions" />
      </section>

      {/* Solution Boxes Section with header and intro text */}
      <section id="mica-solutions" className="py-8 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#010822] to-[#010822]"></div>
          <div className="absolute left-1/4 top-1/3 w-[600px] h-[600px] bg-[#0a1a3a]/10 rounded-full blur-[100px]"></div>
        </div>
        
        <Container className="relative z-10">
          <div className="max-w-7xl mx-auto">
            
            {/* Header Section */}
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Four solutions dedicated to your specific Mica Compliance needs</h2>
              
              
            </div>

            {/* Service Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">
              {/* Box 1: MiCA Intelligence Feed - Blue Theme */}
              <div className="p-6 rounded-lg backdrop-blur-sm hover:translate-y-[-4px] transition-all duration-300 border border-white/30 hover:border-white/50 flex flex-col">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl mb-4" style={{
                background: `linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.3))`
              }}>
                  <svg className="h-8 w-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 17H4l5 5v-5zM12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                  </svg>
                </div>
                <h3 className="text-[clamp(1.1rem,1rem+0.3vw,1.3rem)] font-semibold mb-3 text-white">
                  MiCA Intelligence Feed
                </h3>
                <p className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent mb-4">
                  Stay Informed
                </p>
                
                <p className="text-[clamp(0.8rem,0.75rem+0.2vw,1rem)] leading-[1.3] text-gray-200 mb-6 flex-grow">
                  Get AI-curated MiCA news and regulatory updates delivered to your inbox. Our automated scraper 
                  monitors ESMA and national regulators 24/7, providing timely summaries of developments that impact your business.
                </p>
                
                <div className="mb-6">
                  <div className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent font-semibold text-lg">Free Beta Access</div>
                  <div className="text-white/60 text-sm">Perfect for law firms, consultants, VCs, compliance officers</div>
                </div>
                
                <MicaReadyWaitlistForm serviceInterest="intelligence-feed" buttonText="Put me on the waiting list" buttonClass="w-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity mt-auto" />
              </div>

              {/* Box 2: MiCA License Screening - Purple Theme */}
              <div className="p-6 rounded-lg backdrop-blur-sm hover:translate-y-[-4px] transition-all duration-300 border border-white/30 hover:border-white/50 flex flex-col">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl mb-4" style={{
                background: `linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(147, 51, 234, 0.3))`
              }}>
                  <svg className="h-8 w-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-[clamp(1.1rem,1rem+0.3vw,1.3rem)] font-semibold mb-3 text-white">
                  MiCA License Screening
                </h3>
                <p className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent mb-4">
                  Do You Need a License?
                </p>
                
                <p className="text-[clamp(0.8rem,0.75rem+0.2vw,1rem)] leading-[1.3] text-gray-200 mb-6 flex-grow">
                  Uncertain if your crypto business needs a MiCA license? Our AI-powered screening tool guides you 
                  through a comprehensive decision tree to determine your regulatory obligations.
                </p>
                
                <div className="mb-6">
                  <div className="bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent font-semibold text-lg">Coming - Pay-per-screening</div>
                  <div className="text-white/60 text-sm">Ideal for early-stage projects, uncertain businesses</div>
                </div>
                
                <MicaReadyWaitlistForm serviceInterest="license-screening" buttonText="Put me on the waiting list" buttonClass="w-full bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity mt-auto" />
              </div>

              {/* Box 3: Document Review & Enhancement - Green Theme */}
              <div className="p-6 rounded-lg backdrop-blur-sm hover:translate-y-[-4px] transition-all duration-300 border border-white/30 hover:border-white/50 flex flex-col">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl mb-4" style={{
                background: `linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.3))`
              }}>
                  <svg className="h-8 w-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-[clamp(1.1rem,1rem+0.3vw,1.3rem)] font-semibold mb-3 text-white">
                  Document Review & Enhancement
                </h3>
                <p className="text-lg font-semibold bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent mb-4">
                  Optimize Your Application
                </p>
                
                <p className="text-[clamp(0.8rem,0.75rem+0.2vw,1rem)] leading-[1.3] text-gray-200 mb-6 flex-grow">
                  Already have VASP documentation or business plans? Our AI engine performs gap analysis against 
                  MiCA requirements and suggests enhancements to bring your documents up to compliance standards.
                </p>
                
                <div className="mb-6">
                  <div className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent font-semibold text-lg">Subscription + Manual Hours</div>
                  <div className="text-white/60 text-sm">For companies with existing documentation</div>
                </div>
                
                <MicaReadyWaitlistForm serviceInterest="document-review" buttonText="Put me on the waiting list" buttonClass="w-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity mt-auto" />
              </div>

              {/* Box 4: Full Application Support - Orange Theme */}
              <div className="p-6 rounded-lg backdrop-blur-sm hover:translate-y-[-4px] transition-all duration-300 border border-white/30 hover:border-white/50 flex flex-col">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl mb-4" style={{
                background: `linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(249, 115, 22, 0.3))`
              }}>
                  <svg className="h-8 w-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
                <h3 className="text-[clamp(1.1rem,1rem+0.3vw,1.3rem)] font-semibold mb-3 text-white">
                  Full Application Support
                </h3>
                <p className="text-lg font-semibold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent mb-4">
                  Complete MiCA Solution
                </p>
                
                <p className="text-[clamp(0.8rem,0.75rem+0.2vw,1rem)] leading-[1.3] text-gray-200 mb-6 flex-grow">
                  End-to-end MiCA application preparation with full AI-powered document generation, interactive wizard, 
                  and expert review. Traditional consulting costs €100,000+ - we provide a comprehensive alternative.
                </p>
                
                <div className="mb-6">
                  <div className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent font-semibold text-lg">Contact for Pricing</div>
                  <div className="text-white/60 text-sm">For companies ready for full application</div>
                </div>
                
                <MicaReadyWaitlistForm serviceInterest="full-application" buttonText="Put me on the waiting list" buttonClass="w-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity mt-auto" />
              </div>
            </div>
          </div>
        </Container>
      </section>
      
      <Footer />
    </div>
  );
};

export default MicaReadyWaitlistPage;
