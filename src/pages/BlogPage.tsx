
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SeoHead } from "@/components/seo/SeoHead";
import { useSectionTracking } from "@/hooks/useSectionTracking";
import { useNewsletterSignup } from "@/hooks/useNewsletterSignup";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogCard from "@/components/blog/BlogCard";
import { blogArticles, getLatestArticles } from "@/data/blogData";

const BlogPage = () => {
  const { currentPath, currentHash } = useSectionTracking();
  const { email, setEmail, isLoading, subscribe } = useNewsletterSignup();
  const latestArticles = blogArticles;

  return (
    <div className="min-h-screen bg-[#010822] overflow-x-hidden">
      <SeoHead 
        currentPath={currentPath} 
        currentHash={currentHash}
      />
      <Header />
      
      <BlogHeader />
      
      {/* Latest Articles Section */}
      {latestArticles.length > 0 && (
        <section className="py-16 bg-[#010822]">
          <div className="max-w-[90vw] xl:max-w-[1200px] mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Latest Intelligence
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestArticles.map((article) => (
                <BlogCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Signup Section */}
      <section className="py-16 bg-[#010822]">
        <div className="max-w-[90vw] xl:max-w-[1200px] mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Subscribe to The Crypto Circuit
            </h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Get weekly intelligence briefings on Web3 trends, regulatory developments, 
              and institutional crypto adoption delivered to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a 
                href="https://cointegrity.substack.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Subscribe on Substack
              </a>
              <div className="max-w-md">
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
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#010822]">
        <div className="max-w-[90vw] xl:max-w-[1200px] mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Need Expert Web3 Guidance?
          </h3>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Our expert consultants are ready to help with your Web3 strategy, 
            tokenomics design, and regulatory compliance needs.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            Schedule a Consultation
          </a>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default BlogPage;
