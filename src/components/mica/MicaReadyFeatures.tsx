
import React from "react";
import Container from "@/components/ui/Container";
import { Shield, FileCheck, AlertTriangle, BarChart3, Users, Clock } from "lucide-react";

const MicaReadyFeatures = () => {
  const features = [
    {
      icon: Shield,
      title: "Regulatory Compliance",
      description: "Complete MiCA compliance framework with automated monitoring and reporting capabilities.",
      details: ["Authorization support", "Ongoing compliance", "Regulatory updates"]
    },
    {
      icon: FileCheck,
      title: "Documentation Suite",
      description: "Pre-built templates and automated documentation generation for all MiCA requirements.",
      details: ["Policy templates", "Procedure documents", "Audit trails"]
    },
    {
      icon: AlertTriangle,
      title: "Risk Management",
      description: "Advanced risk assessment tools and real-time monitoring for operational and market risks.",
      details: ["Risk matrices", "Monitoring dashboards", "Alert systems"]
    },
    {
      icon: BarChart3,
      title: "Reporting Tools",
      description: "Automated regulatory reporting with customizable dashboards and analytics.",
      details: ["Automated reports", "Custom dashboards", "Data analytics"]
    },
    {
      icon: Users,
      title: "Client Protection",
      description: "Built-in safeguards and procedures to ensure client asset protection and segregation.",
      details: ["Asset segregation", "Client onboarding", "Protection measures"]
    },
    {
      icon: Clock,
      title: "Real-time Updates",
      description: "Stay ahead with automatic regulatory updates and compliance requirement changes.",
      details: ["Live updates", "Change notifications", "Compliance calendar"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#1a1a3a] to-[#2a2a4a]">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything You Need for MiCA Compliance
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Our comprehensive suite covers all aspects of MiCA regulation, 
              from initial authorization to ongoing compliance management.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:transform hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg">
                    <feature.icon className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white ml-3">
                    {feature.title}
                  </h3>
                </div>
                
                <p className="text-white/70 mb-4 leading-relaxed">
                  {feature.description}
                </p>
                
                <ul className="space-y-2">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center text-sm text-white/60">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          {/* Additional info section */}
          <div className="mt-16 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Why Choose Our MiCA-Ready Suite?
                </h3>
                <p className="text-white/80 mb-6">
                  Built by compliance experts with deep knowledge of EU financial regulation 
                  and extensive experience in digital asset compliance.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-white/70">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    Expert-designed compliance framework
                  </li>
                  <li className="flex items-center text-white/70">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    Continuous regulatory monitoring
                  </li>
                  <li className="flex items-center text-white/70">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    Dedicated support team
                  </li>
                  <li className="flex items-center text-white/70">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    Regular updates and improvements
                  </li>
                </ul>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-1">100+</div>
                  <div className="text-sm text-white/60">Compliance Checks</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-1">24/7</div>
                  <div className="text-sm text-white/60">Expert Support</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">30 Min</div>
                  <div className="text-sm text-white/60">Quick Setup</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">99%</div>
                  <div className="text-sm text-white/60">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default MicaReadyFeatures;
