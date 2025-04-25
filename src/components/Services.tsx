import React from "react";
import Container from "./ui/Container";
import { Target, Layers, Scale, Rocket } from "lucide-react";
import Button from "./ui/CustomButtonComponent";
const services = [{
  icon: <Target size={24} className="text-blue-500" />,
  title: "STRATEGIC POSITIONING",
  items: ["Product Market Fit", "Go-To-Market", "Messaging", "Partnerships", "Ecosystem Mapping", "Market Insight Report", "Advisory Board"],
  color: "blue"
}, {
  icon: <Layers size={24} className="text-indigo-500" />,
  title: "WEB3 INFRASTRUCTURE",
  items: ["Tokenomics", "Smart Contracts", "Web3 Development", "Community Development", "Exchange Listings", "Whitepaper", "Ecosystem Audit"],
  color: "indigo"
}, {
  icon: <Scale size={24} className="text-blue-500" />,
  title: "REGULATORY NAVIGATION",
  items: ["MiCA", "Crypto Tax Returns", "Tax & Legal Mapping", "Banking, Accounting & Auditing", "Due Diligence Reports", "Crypto Compliance", "AML/KYC/CFT"],
  color: "blue"
}, {
  icon: <Rocket size={24} className="text-indigo-500" />,
  title: "CAPITAL ACCELERATION",
  items: ["Investor Network Access", "Investor Relations Support", "Market Making", "Grants", "Pitch Coaching", "Collateral", "Data Room"],
  color: "indigo"
}];
const Services = () => {
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
          {services.map((service, index) => <div key={index} className="service-card p-6 backdrop-blur-sm hover:translate-y-[-4px] transition-all duration-300" style={{
          animationDelay: `${0.1 + index * 0.1}s`
        }}>
              <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-${service.color}-50 to-${service.color}-100 mb-0`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{service.title}</h3>
              <ul className="text-gray-600 leading-[1.15]">
                {service.items.map((item, itemIndex) => <li key={itemIndex} className="flex items-start">
                    <span className={`text-${service.color}-500 mr-2`}>•</span>
                    <span>{item}</span>
                  </li>)}
              </ul>
            </div>)}
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