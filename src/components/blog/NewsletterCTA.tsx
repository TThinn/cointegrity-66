import React from "react";
import { Link } from "react-router-dom";
import { useNewsletterSignup } from "@/hooks/useNewsletterSignup";

const NewsletterCTA = () => {
  const { email, setEmail, isLoading, subscribe } = useNewsletterSignup();

  return (
    <div className="bg-gradient-to-r from-pink-500/20 to-purple-600/20 backdrop-blur-sm rounded-xl border border-white/10 p-8 text-center">
      <h3 className="text-2xl font-bold text-white mb-4">
        Subscribe to The Crypto Circuit
      </h3>
      <p className="text-white/80 mb-6">
        Get weekly intelligence briefings on Web3 trends, regulatory developments, and institutional crypto adoption.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a 
          href="https://cointegrity.substack.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Subscribe on Substack
        </a>
        <Link 
          to="/contact"
          className="border border-white/20 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
        >
          Schedule Consultation
        </Link>
      </div>
    </div>
  );
};

export default NewsletterCTA;