
import { MapPin, Zap, Shield, Award } from "lucide-react";
import React from "react";

export interface ProcessStep {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    id: 1,
    icon: <MapPin className="text-[#cb46b3] w-8 h-8" />,
    title: "DISCOVER",
    description: "First it's important to understand who you, your team and your company are, What are your objectives, what problems are you solving and which challenges are you facing. Our team will go through a comprehensive screening together with you."
  }, 
  {
    id: 2,
    icon: <Zap className="text-[#cb46b3] w-8 h-8" />,
    title: "STRATEGIZE",
    description: "Together we'll develop a tailored roadmap that aligns all your Web3 related concerns with compliance planning, strategic positioning  and go-to-market to maximize your impact and reach all your goals in an emerging market.  "
  }, 
  {
    id: 3,
    icon: <Shield className="text-[#cb46b3] w-8 h-8" />,
    title: "IMPLEMENT",
    description: "Our team guides you through execution, ensuring that there is constant felt progress and confidence in internal decision making. We will make you comfortable operating in the Web3 market."
  }, 
  {
    id: 4,
    icon: <Award className="text-[#cb46b3] w-8 h-8" />,
    title: "SCALE",
    description: "We help accelerate growth through capital raising, community building, and ongoing optimization, with continuous guidance to adapt to regulatory changes and new opportunities."
  }
];

// Constants for particle effects
export const CTA_PARTICLE_COUNT_DESKTOP = 15;
export const CTA_PARTICLE_COUNT_MOBILE = 3;
