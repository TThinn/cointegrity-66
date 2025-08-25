
import React from "react";
import { Target, Layers, Scale, Rocket } from "lucide-react";

export interface ServiceData {
  icon: React.ReactNode;
  title: string;
  items: string[];
  color: string;
}

// Create a function that returns the icons as React elements
// This avoids using JSX directly in the .ts file
const createIcon = (Icon: any) => React.createElement(Icon, { size: 24, className: "text-[#cb46b3]" });

export const services: ServiceData[] = [{
  icon: createIcon(Target),
  title: "DIGITAL STRATEGY",
  items: ["Product Market Fit", "Go-To-Market", "Messaging", "Partnerships", "Ecosystem Mapping", "Market Insight Report", "Advisory Board"],
  color: "#cb46b3"
}, {
  icon: createIcon(Layers),
  title: "WEB3 INFRASTRUCTURE",
  items: ["Tokenomics", "Smart Contracts", "Web3 Development", "Community Development", "Exchange Listings", "Whitepaper", "Ecosystem Audit"],
  color: "#cb46b3"
}, {
  icon: createIcon(Scale),
  title: "MICA COMPLIANCE SUITE",
  items: ["AI-Powered License Screening", "CASP Authorization Support", "Real-time Regulatory Updates", "Multi-Jurisdiction Analysis", "Automated Document Generation", "Compliance Monitoring", "Expert Consultation"],
  color: "#cb46b3"
}, {
  icon: createIcon(Rocket),
  title: "GROWTH CAPITAL",
  items: ["Investor Network Access", "Investor Relations Support", "Market Making", "Grants", "Pitch Coaching", "Collateral", "Data Room"],
  color: "#cb46b3"
}];
