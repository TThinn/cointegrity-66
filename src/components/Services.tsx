import React from "react";
import Container from "./ui/Container";
import { Target, Layers, Scale, Rocket } from "lucide-react";
import Button from "./ui/CustomButtonComponent";

const services = [{
  icon: <Target size={24} className="text-[#4884a6]" />,
  title: "STRATEGIC POSITIONING",
  items: ["Product Market Fit", "Go-To-Market", "Messaging", "Partnerships", "Ecosystem Mapping", "Market Insight Report", "Advisory Board"],
  color: "#4884a6"
}, {
  icon: <Layers size={24} className="text-[#cb46b3]" />,
  title: "WEB3 INFRASTRUCTURE",
  items: ["Tokenomics", "Smart Contracts", "Web3 Development", "Community Development", "Exchange Listings", "Whitepaper", "Ecosystem Audit"],
  color: "#cb46b3"
}, {
  icon: <Scale size={24} className="text-[#4884a6]" />,
  title: "REGULATORY NAVIGATION",
  items: ["MiCA", "Crypto Tax Returns", "Tax & Legal Mapping", "Banking, Accounting & Auditing", "Due Diligence Reports", "Crypto Compliance", "AML/KYC/CFT"],
  color: "#4884a6"
}, {
  icon: <Rocket size={24} className="text-[#cb46b3]" />,
  title: "CAPITAL ACCELERATION",
  items: ["Investor Network Access", "Investor Relations Support", "Market Making", "Grants", "Pitch Coaching", "Collateral", "Data Room"],
  color: "#cb46b3"
}];

const Services = () => {
  // Explicitly set this section to have a light background
  const isDarkBackground = false;
  
  return <section id="services" className="py-20 bg-gradient-to-b from-[#fbf9ff] to-[#fdf5fa] relative">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm uppercase tracking-wider font-medium text-[#cb46b3]">Our Services</h2>
          <h3 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-gray-800">Serving a Diversified Market</h3>
          <p className="mt-4 text-lg text-gray-600">
            Our clients are spread across various industries and sectors, including governmental agencies, global consulting firms, launch platforms, gaming companies, VASPs, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="service-card hover:translate-y-[-4px] transition-all duration-300"
              style={{
                animationDelay: `${0.1 + index * 0.1}s`,
                background: "transparent",
                border: "none"
              }}
            >
              <div className={`p-6 rounded-lg backdrop-blur-sm ${isDarkBackground ? 'bg-white/10' : 'bg-white/95'}`} 
                style={{
                  boxShadow: isDarkBackground 
                    ? "0 4px 15px rgba(0, 0, 0, 0.1)" 
                    : "0 4px 15px rgba(0, 0, 0, 0.05)",
                  border: isDarkBackground 
                    ? "1px solid rgba(255, 255, 255, 0.1)" 
                    : "1px solid rgba(230, 230, 230, 0.7)"
                }}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl mb-4" 
                    style={{ background: `linear-gradient(135deg, ${service.color}${isDarkBackground ? '30' : '20'}, ${service.color}${isDarkBackground ? '50' : '40'})` }}>
                  {service.icon}
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${isDarkBackground ? 'text-white' : 'text-gray-800'}`}>{service.title}</h3>
                <ul className={`leading-[1.15] list-none ${isDarkBackground ? 'text-gray-200' : 'text-gray-600'}`}>
                  {service.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span style={{ color: service.color }} className="mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA box - with explicit dark blue to light blue gradient */}
        <div className="mt-16 neo-box-alt flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-16 p-8 md:p-10 rounded-2xl text-white relative overflow-hidden" style={{
        background: "linear-gradient(90deg, #010822 0%, #133a63 100%)"
      }}>
          <div className="flex-1 text-center md:text-left relative z-10">
            <h3 className="text-2xl font-bold mb-3 text-white">Bring Substance to Your Digital Asset Strategy</h3>
          </div>
          <a href="#contact" className="inline-flex items-center relative z-10">
            <Button variant="cta-primary">Let's get started</Button>
          </a>
        </div>
      </Container>
    </section>;
};

export default Services;
