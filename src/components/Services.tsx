import React from "react";
import Container from "./ui/Container";
import { Braces, Lightbulb, BarChart3, Shield } from "lucide-react";
const services = [{
  icon: <Braces size={24} className="text-purple-600" />,
  title: "Blockchain Development",
  description: "Custom smart contract development and auditing, dApp development and Web3 infrastructure setup to power your decentralized vision."
}, {
  icon: <Lightbulb size={24} className="text-blue-600" />,
  title: "Strategic Consulting",
  description: "Expert guidance on Web3 transformation, tokenomics design, and blockchain integration strategies for your business."
}, {
  icon: <BarChart3 size={24} className="text-purple-600" />,
  title: "DeFi Solutions",
  description: "End-to-end DeFi platform development, protocol design, and yield optimization strategies to maximize your financial offerings."
}, {
  icon: <Shield size={24} className="text-blue-600" />,
  title: "Security & Compliance",
  description: "Comprehensive security audits, risk assessments, and regulatory compliance frameworks tailored for blockchain businesses."
}];
const Services = () => {
  return <section id="services" className="py-20 bg-white relative">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-purple-600 uppercase tracking-wider">Our Services</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-gray-800">Web3 Solutions with Substance</h2>
          <p className="mt-4 text-lg text-gray-600">Navigating blockchain complexity with clarity, from strategy to compliance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => <div key={index} className="glass-card hover:translate-y-[-4px]" style={{
          animationDelay: `${0.1 + index * 0.1}s`
        }}>
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>)}
        </div>

        <div className="mt-16 flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-16 p-8 md:p-10 rounded-2xl bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-3 text-gray-800">Ready to Transform Your Business?</h3>
            <p className="text-gray-600 max-w-md">
              Our expert team is ready to help you navigate the Web3 landscape with confidence.
            </p>
          </div>
          <a href="#contact" className="inline-flex items-center px-6 py-3 rounded-lg bg-purple-blue-gradient text-white font-medium shadow-button hover:shadow-lg transition-all">
            Schedule a Consultation
          </a>
        </div>
      </Container>
    </section>;
};
export default Services;