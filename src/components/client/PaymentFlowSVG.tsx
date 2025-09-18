import React from 'react';

const PaymentFlowSVG: React.FC = () => {
  return (
    <svg 
      viewBox="0 0 400 200" 
      className="w-full h-32 md:h-40"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Traditional Flow (Top) */}
      <g>
        {/* India */}
        <rect x="20" y="30" width="60" height="30" rx="15" fill="rgba(32, 128, 141, 0.2)" stroke="#20808D" strokeWidth="2"/>
        <text x="50" y="48" textAnchor="middle" className="text-xs fill-current text-client-text-primary">India</text>
        
        {/* Arrow 1 */}
        <path d="M85 45 L125 45" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed)"/>
        <text x="105" y="40" textAnchor="middle" className="text-xs fill-current text-red-600">3-5 days</text>
        
        {/* Correspondent Bank */}
        <rect x="130" y="20" width="80" height="50" rx="10" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="1"/>
        <text x="170" y="35" textAnchor="middle" className="text-xs fill-current text-red-600">Correspondent</text>
        <text x="170" y="50" textAnchor="middle" className="text-xs fill-current text-red-600">Banks</text>
        <text x="170" y="62" textAnchor="middle" className="text-xs fill-current text-red-600">2-4% fees</text>
        
        {/* Arrow 2 */}
        <path d="M215 45 L255 45" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed)"/>
        
        {/* Africa */}
        <rect x="260" y="30" width="60" height="30" rx="15" fill="rgba(32, 128, 141, 0.2)" stroke="#20808D" strokeWidth="2"/>
        <text x="290" y="48" textAnchor="middle" className="text-xs fill-current text-client-text-primary">Africa</text>
      </g>

      {/* Alternative Flow (Bottom) */}
      <g>
        {/* India */}
        <rect x="20" y="130" width="60" height="30" rx="15" fill="rgba(32, 128, 141, 0.8)" stroke="#20808D" strokeWidth="2"/>
        <text x="50" y="148" textAnchor="middle" className="text-xs fill-white">India</text>
        
        {/* Direct Arrow */}
        <path d="M85 145 Q200 145 255 145" stroke="#20808D" strokeWidth="3" fill="none" markerEnd="url(#arrowBlue)"/>
        <text x="170" y="135" textAnchor="middle" className="text-xs fill-current text-client-accent font-medium">Direct Settlement</text>
        <text x="170" y="150" textAnchor="middle" className="text-xs fill-current text-client-accent">2 minutes</text>
        <text x="170" y="162" textAnchor="middle" className="text-xs fill-current text-client-accent">0.1-0.5% fees</text>
        
        {/* Africa */}
        <rect x="260" y="130" width="60" height="30" rx="15" fill="rgba(32, 128, 141, 0.8)" stroke="#20808D" strokeWidth="2"/>
        <text x="290" y="148" textAnchor="middle" className="text-xs fill-white">Africa</text>
      </g>

      {/* Arrow markers */}
      <defs>
        <marker id="arrowRed" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto" markerUnits="strokeWidth">
          <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444"/>
        </marker>
        <marker id="arrowBlue" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto" markerUnits="strokeWidth">
          <polygon points="0 0, 10 3.5, 0 7" fill="#20808D"/>
        </marker>
      </defs>
      
      {/* Labels */}
      <text x="200" y="15" textAnchor="middle" className="text-sm font-medium fill-current text-red-600">Traditional SWIFT Payment</text>
      <text x="200" y="185" textAnchor="middle" className="text-sm font-medium fill-current text-client-accent">Alternative Payment Rails</text>
    </svg>
  );
};

export default PaymentFlowSVG;