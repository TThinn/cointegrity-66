import React from "react";
import { CheckCircle, Zap, Shield, Clock, Globe, Users } from "lucide-react";
import Container from "@/components/ui/Container";
import ServicesCTA from "@/components/services/ServicesCTA";

const reasons = [
  {
    icon: <Zap className="h-6 w-6 text-[#cb46b3]" />,
    title: "10x Faster Implementation",
    description: "AI-powered solutions deliver results in 2-6 months vs traditional 6-18 month timelines"
  },
  {
    icon: <Shield className="h-6 w-6 text-[#cb46b3]" />,
    title: "Regulatory Expertise",
    description: "20+ years combined experience across all 27 EU member states and global jurisdictions"
  },
  {
    icon: <Clock className="h-6 w-6 text-[#cb46b3]" />,
    title: "90% Cost Reduction",
    description: "Automated compliance processes reduce costs from €300k-€1M+ to €75k-€200k"
  },
  {
    icon: <Globe className="h-6 w-6 text-[#cb46b3]" />,
    title: "Global Network",
    description: "Partnerships with Fortune 500 companies, government agencies, and leading crypto exchanges"
  },
  {
    icon: <Users className="h-6 w-6 text-[#cb46b3]" />,
    title: "Multidisciplinary Team",
    description: "Developers, economists, AI specialists and industry experts working together seamlessly"
  },
  {
    icon: <CheckCircle className="h-6 w-6 text-[#cb46b3]" />,
    title: "Proven Success",
    description: "100+ successful Web3 implementations across government, corporate, and crypto sectors"
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#FEFCFD] to-[#FDF9FC]">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm uppercase tracking-wider font-medium text-[#cb46b3] mb-4">
            Why Choose Cointegrity
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-800 mb-6">
            Europe's Leading Web3 Consultancy
          </h3>
          <p className="text-gray-600">
            We combine proven expertise with innovative technology to deliver results that traditional consultancies simply cannot match.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div 
              key={index}
              className="p-6 bg-white/20 backdrop-blur-sm rounded-lg hover:translate-y-[-4px] transition-all duration-300"
              style={{
                animationDelay: `0.1s`,
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.7)"
              }}
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl mb-4" 
                  style={{ background: `linear-gradient(135deg, #cb46b320, #cb46b340)` }}>
                {reason.icon}
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                {reason.title}
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <div className="inline-flex items-center gap-1 text-sm text-gray-500 mb-2">
            <CheckCircle className="h-4 w-4 text-[#cb46b3]" />
            <span>Trusted by Fortune 500 companies and government agencies</span>
          </div>
          
          <ServicesCTA />
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;