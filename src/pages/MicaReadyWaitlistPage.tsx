
import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/Container";
import MicaReadyWaitlistForm from "@/components/mica/MicaReadyWaitlistForm";
import LightParticles from "@/components/ui/LightParticles";
import { useSectionTracking } from "@/hooks/useSectionTracking";
import { SeoHead } from "@/components/seo/SeoHead";

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
      
      {/* Hero section with consistent styling as Guides page */}
      <section className="hero-section pt-32 pb-16 lg:pt-40 lg:pb-24 relative overflow-hidden bg-[#010822] isolate">
        {/* Background elements - using consistent color */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#010822] to-[#010822]" />
          <LightParticles centerPosition={{ x: 50, y: 60 }} />
        </div>

        {/* Content container with same styling as Hero */}
        <div className="hero-content relative z-8 text-lg font-normal flex flex-col justify-center gap-6 max-w-[90vw] xl:max-w-[1200px] mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              MiCA-Ready
              <span className="bg-gradient-to-r from-[#d946ef] to-[#9333ea] bg-clip-text text-transparent"> Suite</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-white/90 mb-4">
              Simplify Your EU MiCA Compliance Journey
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-6">
              AI-powered solutions to navigate MiCA licensing requirements efficiently and cost-effectively
            </p>
            <p className="text-lg text-white/70 max-w-4xl mx-auto">
              MiCA regulation requires all Crypto-Asset Service Providers to obtain licensing, with only 25 licenses 
              granted EU-wide as of May 2025, indicating a clear market need for streamlined compliance solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Boxes Section */}
      <section className="py-20 bg-[#010822]">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {/* Box 1: MiCA Intelligence Feed */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:transform hover:-translate-y-1">
                <div className="flex items-center mb-6">
                  <div className="p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg">
                    <svg className="h-8 w-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 17H4l5 5v-5zM12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-white mb-1">MiCA Intelligence Feed</h3>
                    <p className="text-lg font-semibold text-blue-400">Stay Informed</p>
                  </div>
                </div>
                
                <p className="text-white/80 mb-6 leading-relaxed">
                  Get AI-curated MiCA news and regulatory updates delivered to your inbox. Our automated scraper 
                  monitors ESMA and national regulators 24/7, providing timely summaries of developments that impact your business.
                </p>
                
                <div className="mb-6">
                  <div className="text-green-400 font-semibold text-lg">Free Beta Access</div>
                  <div className="text-white/60 text-sm">Perfect for law firms, consultants, VCs, compliance officers</div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                  I'm interested - Put me on the waiting list
                </button>
              </div>

              {/* Box 2: MiCA License Screening */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:transform hover:-translate-y-1">
                <div className="flex items-center mb-6">
                  <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
                    <svg className="h-8 w-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-white mb-1">MiCA License Screening</h3>
                    <p className="text-lg font-semibold text-purple-400">Do You Need a License?</p>
                  </div>
                </div>
                
                <p className="text-white/80 mb-6 leading-relaxed">
                  Uncertain if your crypto business needs a MiCA license? Our AI-powered screening tool guides you 
                  through a comprehensive decision tree to determine your regulatory obligations.
                </p>
                
                <div className="mb-6">
                  <div className="text-yellow-400 font-semibold text-lg">Coming - Pay-per-screening</div>
                  <div className="text-white/60 text-sm">Ideal for early-stage projects, uncertain businesses</div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                  I'm interested - Put me on the waiting list
                </button>
              </div>

              {/* Box 3: Document Review & Enhancement */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:transform hover:-translate-y-1">
                <div className="flex items-center mb-6">
                  <div className="p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg">
                    <svg className="h-8 w-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-white mb-1">Document Review & Enhancement</h3>
                    <p className="text-lg font-semibold text-green-400">Optimize Your Application</p>
                  </div>
                </div>
                
                <p className="text-white/80 mb-6 leading-relaxed">
                  Already have VASP documentation or business plans? Our AI engine performs gap analysis against 
                  MiCA requirements and suggests enhancements to bring your documents up to compliance standards.
                </p>
                
                <div className="mb-6">
                  <div className="text-orange-400 font-semibold text-lg">Subscription + Manual Hours</div>
                  <div className="text-white/60 text-sm">For companies with existing documentation</div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                  I'm interested - Put me on the waiting list
                </button>
              </div>

              {/* Box 4: Full Application Support */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:transform hover:-translate-y-1">
                <div className="flex items-center mb-6">
                  <div className="p-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg">
                    <svg className="h-8 w-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-white mb-1">Full Application Support</h3>
                    <p className="text-lg font-semibold text-orange-400">Complete MiCA Solution</p>
                  </div>
                </div>
                
                <p className="text-white/80 mb-6 leading-relaxed">
                  End-to-end MiCA application preparation with full AI-powered document generation, interactive wizard, 
                  and expert review. Traditional consulting costs €100,000+ - we provide a comprehensive alternative.
                </p>
                
                <div className="mb-6">
                  <div className="text-red-400 font-semibold text-lg">Contact for Pricing</div>
                  <div className="text-white/60 text-sm">For companies ready for full application</div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                  I'm interested - Put me on the waiting list
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Waitlist Form Section */}
      <section className="py-20 bg-gradient-to-b from-[#010822] to-[#1a1a3a]">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Get Early Access
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Be among the first to experience our comprehensive MiCA compliance suite. 
                Join our waitlist for priority access and exclusive updates.
              </p>
            </div>
            
            <MicaReadyWaitlistForm />
            
            {/* Privacy Notice */}
            <div className="mt-8 text-center">
              <p className="text-sm text-white/60 max-w-2xl mx-auto">
                Your information is stored securely on AWS infrastructure with SOC 2 compliance roadmap. 
                We respect your privacy and will only use your data to contact you about MiCA-Ready Suite updates. 
                View our <a href="/privacy" className="text-purple-400 hover:text-purple-300 underline">privacy policy</a> for details.
              </p>
            </div>
          </div>
        </Container>
      </section>
      
      <Footer />
    </div>
  );
};

export default MicaReadyWaitlistPage;
