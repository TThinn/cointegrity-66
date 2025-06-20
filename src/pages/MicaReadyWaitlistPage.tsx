
import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/Container";
import MicaReadyWaitlistForm from "@/components/mica/MicaReadyWaitlistForm";
import { useSectionTracking } from "@/hooks/useSectionTracking";
import { SeoHead } from "@/components/seo/SeoHead";
import LightParticles from "@/components/ui/LightParticles";

const MicaReadyWaitlistPage = () => {
  const { currentPath, currentHash } = useSectionTracking();

  return (
    <div className="min-h-screen bg-[#010822] overflow-x-hidden">
      <SeoHead currentPath={currentPath} currentHash={currentHash} />
      <Helmet>
        <title>MiCA-Ready Suite - Early Access Waitlist | Cointegrity</title>
        <meta 
          name="description" 
          content="Join the waitlist for Cointegrity's MiCA-Ready Suite - AI-powered solutions to navigate MiCA licensing requirements efficiently and cost-effectively."
        />
        <meta 
          name="keywords" 
          content="MiCA, Markets in Crypto-Assets, EU regulation, crypto compliance, digital assets, waitlist, AI-powered compliance"
        />
      </Helmet>

      <Header />
      
      {/* Hero section with full screen height */}
      <section className="hero-section min-h-screen flex items-center justify-center pt-20 pb-16 relative overflow-hidden bg-[#010822] isolate">
        {/* Background elements with light particles */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#010822] to-[#010822]" />
          <LightParticles centerPosition={{ x: 50, y: 50 }} />
        </div>

        {/* Content container with centered text */}
        <div className="hero-content relative z-8 text-lg font-normal flex flex-col justify-center items-center gap-6 max-w-[90vw] xl:max-w-[1200px] mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              MiCA-Ready
              <span className="bg-gradient-to-r from-[#d946ef] to-[#9333ea] bg-clip-text text-transparent"> Suite</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-white/90 mb-4">
              Simplify Your EU MiCA Compliance Journey
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              AI-powered solutions to navigate MiCA licensing requirements efficiently and cost-effectively
            </p>
          </div>
        </div>
      </section>

      {/* MiCA Introduction Section */}
      <section className="py-20 bg-[#010822] relative overflow-hidden">
        <Container className="relative z-10">
          <div className="w-full max-w-4xl mx-auto px-6 text-center">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Do You Need a MiCA License? Find Your EU Crypto Compliance Solution
              </h2>
              
              <div className="text-lg text-white/80 leading-relaxed space-y-4">
                <p>
                  Over 11,000 VASPs across the EU need MiCA licenses to continue operating. 
                  But Europe's largest regulatory expansion also caught thousands of companies that never knew they were crypto businesses—from 
                  gaming studios to payment processors.
                </p>
                
                <p>
                  Whether you're applying for a CASP authorization or just discovered you need 
                  MiCA compliance, we have the right solution for your business.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Solution Boxes Section with consistent card styling */}
      <section className="py-20 bg-[#010822] relative overflow-hidden">
        <Container className="relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {/* Box 1: MiCA Intelligence Feed - Blue Theme */}
              <div className="p-6 rounded-lg backdrop-blur-sm hover:translate-y-[-4px] transition-all duration-300 border border-white/30 hover:border-white/50 flex flex-col">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl mb-4" 
                    style={{ background: `linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.3))` }}>
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
                
                <MicaReadyWaitlistForm 
                  serviceInterest="intelligence-feed"
                  buttonText="I'm interested - Put me on the waiting list"
                  buttonClass="w-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity mt-auto"
                />
              </div>

              {/* Box 2: MiCA License Screening - Purple Theme */}
              <div className="p-6 rounded-lg backdrop-blur-sm hover:translate-y-[-4px] transition-all duration-300 border border-white/30 hover:border-white/50 flex flex-col">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl mb-4" 
                    style={{ background: `linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(147, 51, 234, 0.3))` }}>
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
                
                <MicaReadyWaitlistForm 
                  serviceInterest="license-screening"
                  buttonText="I'm interested - Put me on the waiting list"
                  buttonClass="w-full bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity mt-auto"
                />
              </div>

              {/* Box 3: Document Review & Enhancement - Green Theme */}
              <div className="p-6 rounded-lg backdrop-blur-sm hover:translate-y-[-4px] transition-all duration-300 border border-white/30 hover:border-white/50 flex flex-col">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl mb-4" 
                    style={{ background: `linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.3))` }}>
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
                
                <MicaReadyWaitlistForm 
                  serviceInterest="document-review"
                  buttonText="I'm interested - Put me on the waiting list"
                  buttonClass="w-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity mt-auto"
                />
              </div>

              {/* Box 4: Full Application Support - Orange Theme */}
              <div className="p-6 rounded-lg backdrop-blur-sm hover:translate-y-[-4px] transition-all duration-300 border border-white/30 hover:border-white/50 flex flex-col">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl mb-4" 
                    style={{ background: `linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(249, 115, 22, 0.3))` }}>
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
                
                <MicaReadyWaitlistForm 
                  serviceInterest="full-application"
                  buttonText="I'm interested - Put me on the waiting list"
                  buttonClass="w-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity mt-auto"
                />
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
