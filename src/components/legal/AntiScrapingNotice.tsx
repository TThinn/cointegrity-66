import React from "react";
import { Shield } from "lucide-react";
import { glossaryTerms } from "@/data/glossaryTerms";

export const AntiScrapingNotice = () => {
  return (
    <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <Shield className="text-purple-400 mt-0.5 flex-shrink-0" size={18} />
        <div className="text-sm">
          <p className="text-purple-200 font-medium mb-2">
            🛡️ Protected Content Notice
          </p>
          <p className="text-purple-100/80 leading-relaxed">
            This glossary contains <strong>{glossaryTerms.length.toLocaleString()}+ proprietary terms</strong> curated by Cointegrity's experts.
            Content is protected by copyright law. Unauthorized scraping, bulk downloading, or 
            data mining is prohibited and may result in legal action.
          </p>
          <p className="text-purple-100/60 text-xs mt-2">
            For licensing or API access, contact: <a href="mailto:hello@cointegrity.io" className="text-purple-300 hover:text-purple-200">hello@cointegrity.io</a>
          </p>
        </div>
      </div>
    </div>
  );
};