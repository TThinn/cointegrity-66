
import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MicaReadyHero from "@/components/mica/MicaReadyHero";
import MicaReadyWaitlistForm from "@/components/mica/MicaReadyWaitlistForm";
import MicaReadyFeatures from "@/components/mica/MicaReadyFeatures";
import Container from "@/components/ui/Container";

const MicaReadyWaitlistPage = () => {
  return (
    <>
      <Helmet>
        <title>MiCA-Ready Suite - Early Access Waitlist | Cointegrity</title>
        <meta 
          name="description" 
          content="Join the waitlist for Cointegrity's MiCA-Ready Suite - comprehensive compliance solutions for digital asset service providers under the EU's Markets in Crypto-Assets regulation."
        />
        <meta 
          name="keywords" 
          content="MiCA, Markets in Crypto-Assets, EU regulation, crypto compliance, digital assets, waitlist"
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-[#0a0a23] via-[#1a1a3a] to-[#2a2a4a]">
        <Header />
        
        <main>
          {/* Hero Section */}
          <MicaReadyHero />
          
          {/* Features Section */}
          <MicaReadyFeatures />
          
          {/* Waitlist Form Section */}
          <section className="py-20 bg-gradient-to-b from-[#2a2a4a] to-[#1a1a3a]">
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
              </div>
            </Container>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default MicaReadyWaitlistPage;
