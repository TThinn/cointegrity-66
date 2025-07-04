import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface MicaFaqItemProps {
  question: string;
  answer: string;
  category: string;
  keywords: string[];
  relatedLinks?: { text: string; url: string }[];
}

export const MicaFaqItem: React.FC<MicaFaqItemProps> = ({
  question,
  answer,
  category,
  keywords,
  relatedLinks = []
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-white/20 rounded-lg bg-black/20 backdrop-blur-sm">
      <button
        className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <h3 className="text-lg font-semibold text-white pr-4">{question}</h3>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-purple-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-purple-400 flex-shrink-0" />
        )}
      </button>
      
      {isExpanded && (
        <div className="px-6 pb-6">
          <div className="border-t border-white/10 pt-4">
            <div className="mb-2">
              <span className="inline-block bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full">
                {category}
              </span>
            </div>
            
            <div 
              className="text-white/80 leading-relaxed mb-4"
              dangerouslySetInnerHTML={{ __html: answer }}
            />
            
            {keywords.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {keywords.map((keyword, idx) => (
                    <span key={idx} className="text-xs bg-white/10 text-white/60 px-2 py-1 rounded">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {relatedLinks.length > 0 && (
              <div className="border-t border-white/10 pt-3">
                <p className="text-white/60 text-sm mb-2">Related resources:</p>
                <div className="flex flex-wrap gap-4">
                  {relatedLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      className="text-purple-400 hover:text-purple-300 text-sm opacity-0 hover:opacity-100 transition-opacity"
                    >
                      {link.text}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};