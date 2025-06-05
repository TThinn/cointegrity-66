
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/Container";
import { SeoHead } from "@/components/seo/SeoHead";
import { useSectionTracking } from "@/hooks/useSectionTracking";
import { useNewsletterSignup } from "@/hooks/useNewsletterSignup";

const BlogPage = () => {
  const { currentPath, currentHash } = useSectionTracking();
  const { email, setEmail, isLoading, subscribe } = useNewsletterSignup();

  return (
    <div className="min-h-screen bg-[#010822] overflow-x-hidden">
      <SeoHead currentPath={currentPath} currentHash={currentHash} />
      <Header />
      
      {/* Hero section with clean background using consistent color */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 relative overflow-hidden bg-[#010822]">
        {/* Simple gradient background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#010822]" />
        </div>

        {/* Content container */}
        <div className="relative z-10 text-lg font-normal flex flex-col justify-center gap-6 max-w-[90vw] xl:max-w-[1200px] mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Web3 & Blockchain
              <span className="bg-gradient-to-r from-[#d946ef] to-[#9333ea] bg-clip-text text-transparent"> Insights</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Stay ahead with the latest insights on Web3 trends, blockchain technology, 
              tokenomics strategies, and digital asset innovation from our expert consultants.
            </p>
          </div>

          {/* Featured Article Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 mb-12">
            <div className="text-center">
              <div className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                Coming Soon
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Expert Articles & Industry Analysis
              </h2>
              <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                We're preparing comprehensive articles on Web3 strategy, blockchain implementation, 
                regulatory compliance, and market insights. Subscribe to our newsletter to be notified 
                when our first articles go live.
              </p>
              
              {/* Newsletter Signup */}
              <div className="max-w-md mx-auto">
                <form onSubmit={subscribe} className="flex gap-3">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    disabled={isLoading}
                    required
                  />
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Upcoming Topics Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              {
                title: "MiCA Compliance Guide",
                description: "Complete guide to navigating EU's Markets in Crypto-Assets regulation",
                category: "Regulation"
              },
              {
                title: "Tokenomics Design Principles",
                description: "Best practices for creating sustainable token economic models",
                category: "Strategy"
              },
              {
                title: "Web3 Market Analysis",
                description: "Current trends and future outlook for blockchain adoption",
                category: "Market Insights"
              },
              {
                title: "Digital Asset Integration",
                description: "How traditional businesses can successfully adopt blockchain technology",
                category: "Implementation"
              },
              {
                title: "Capital Raising in Web3",
                description: "Strategies for funding blockchain and digital asset projects",
                category: "Finance"
              },
              {
                title: "Blockchain Security Best Practices",
                description: "Essential security considerations for Web3 implementations",
                category: "Security"
              }
            ].map((topic, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-colors">
                <div className="text-pink-400 text-sm font-medium mb-2">
                  {topic.category}
                </div>
                <h3 className="text-white font-semibold mb-3">
                  {topic.title}
                </h3>
                <p className="text-white/70 text-sm">
                  {topic.description}
                </p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Need Immediate Web3 Guidance?
            </h3>
            <p className="text-white/80 mb-8">
              While our blog content is in development, our expert consultants are ready to help 
              with your Web3 strategy, tokenomics design, and regulatory compliance needs.
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              Schedule a Consultation
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default BlogPage;
