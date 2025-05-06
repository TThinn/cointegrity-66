
import React from "react";
import { Target, Layers, Scale, Rocket } from "lucide-react";

export interface ServiceData {
  icon: React.ReactNode;
  title: string;
  items: string[];
  color: string;
}

export const services: ServiceData[] = [{
  icon: <Target size={24} className="text-[#cb46b3]" />,
  title: "STRATEGIC POSITIONING",
  items: ["Product Market Fit", "Go-To-Market", "Messaging", "Partnerships", "Ecosystem Mapping", "Market Insight Report", "Advisory Board"],
  color: "#cb46b3"
}, {
  icon: <Layers size={24} className="text-[#cb46b3]" />,
  title: "WEB3 INFRASTRUCTURE",
  items: ["Tokenomics", "Smart Contracts", "Web3 Development", "Community Development", "Exchange Listings", "Whitepaper", "Ecosystem Audit"],
  color: "#cb46b3"
}, {
  icon: <Scale size={24} className="text-[#cb46b3]" />,
  title: "Tax & Compliance",
  items: ["MiCA", "Crypto Tax Returns", "Tax & Legal Mapping", "Banking, Accounting & Auditing", "Due Diligence Reports", "Crypto Compliance", "AML/KYC/CFT"],
  color: "#cb46b3"
}, {
  icon: <Rocket size={24} className="text-[#cb46b3]" />,
  title: "CAPITAL ACCELERATION",
  items: ["Investor Network Access", "Investor Relations Support", "Market Making", "Grants", "Pitch Coaching", "Collateral", "Data Room"],
  color: "#cb46b3"
}];
