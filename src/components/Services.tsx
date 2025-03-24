
import React, { useState } from "react";
import Container from "./ui/Container";
import { Target, Layers, Scale, Rocket, ArrowLeft } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

const services = [{
  icon: <Target size={24} className="text-pink-600" />,
  title: "Strategic Positioning",
  description: "Cointegrity's Strategic Positioning transforms your Web3 vision into market reality. We evaluate your current approach and develop tailored frameworks aligned with your business objectives.",
  fullDescription: "Cointegrity's Strategic Positioning transforms your Web3 vision into market reality. We evaluate your current approach and develop tailored frameworks aligned with your business objectives. Our team analyzes market mechanics to identify opportunities while crafting implementation plans that ensure successful execution. We refine your brand identity, messaging strategy, and competitive positioning to help you stand out in the blockchain ecosystem. Leveraging our extensive global network of specialized partners and experts, we identify your ideal audience and create engagement strategies that connect with key stakeholders. With Cointegrity's strategic positioning expertise, your Web3 project navigates complexity with clarity and purpose."
}, {
  icon: <Layers size={24} className="text-blue-600" />,
  title: "Token Architecture",
  description: "Expert guidance on Web3 transformation, tokenomics design, and blockchain integration strategies for your business."
}, {
  icon: <Scale size={24} className="text-pink-600" />,
  title: "Regulatory Navigation",
  description: "End-to-end DeFi platform development, protocol design, and yield optimization strategies to maximize your financial offerings."
}, {
  icon: <Rocket size={24} className="text-blue-600" />,
  title: "Capital Acceleration",
  description: "Comprehensive security audits, risk assessments, and regulatory compliance frameworks tailored for blockchain businesses."
}];

const Services = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  const handleOpenFullDescription = (service: typeof services[0]) => {
    setSelectedService(service);
    setOpenDialog(true);
  };

  return <section id="services" className="py-20 bg-white relative">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-pink-600 uppercase tracking-wider">Our Services</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-gray-800">Web3 Solutions with Substance</h2>
          <p className="mt-4 text-lg text-gray-600">Navigating digital asset complexity with clarity, from strategy to compliance</p>
        </div>

        {/* Opening description text box */}
        <div className="mb-12 p-8 rounded-2xl bg-gradient-to-r from-pink-50 to-blue-50">
          <p className="text-gray-700 leading-relaxed">Cointegrity bridges traditional business acumen with digital asset innovation as a strategic advisory firm specializing in Web3 transformation. Our methodology harmonizes proven Web2 principles with blockchain's potential, navigating the complex transition between established models and decentralized technologies. Cointegrity provides comprehensive ecosystem support—from securing banking relationships and accounting solutions to optimizing tokenomics, funding strategies, and exit planning. As your trusted navigator in the regulatory landscape, Cointegrity helps screen potential partners and investment opportunities while ensuring compliance across jurisdictions, delivering precision and insight for your blockchain journey.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => <div key={index} className="glass-card hover:translate-y-[-4px]" style={{
          animationDelay: `${0.1 + index * 0.1}s`
        }}>
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-pink-50 to-blue-50 mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{service.title}</h3>
              <p className="text-gray-600">
                {service.description}
                {service.fullDescription && (
                  <button 
                    onClick={() => handleOpenFullDescription(service)}
                    className="ml-1 text-pink-600 hover:text-pink-700 font-medium"
                  >
                    ... more
                  </button>
                )}
              </p>
            </div>)}
        </div>

        {/* Closing description text box */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-16 p-8 md:p-10 rounded-2xl bg-gradient-to-r from-pink-50 to-blue-50">
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-3 text-gray-800">Bring Substance to Your Digital Asset Strategy</h3>
            <p className="text-gray-600 max-w-md">With deep industry roots, spanning founders, traders, and venture capital networks, we are well positioned to help projects stand out in the fast-moving and evolving crypto ecosystem.</p>
          </div>
          <a href="#contact" className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 text-white font-medium shadow-button hover:shadow-lg transition-all">
            Schedule a Consultation
          </a>
        </div>
      </Container>

      {/* Full description dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{selectedService?.title}</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-base text-gray-700 py-4">
            {selectedService?.fullDescription}
          </DialogDescription>
          <div className="mt-4 flex justify-start">
            <button 
              onClick={() => setOpenDialog(false)}
              className="flex items-center text-pink-600 hover:text-pink-700 font-medium"
            >
              <ArrowLeft size={16} className="mr-1" /> Back
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>;
};

export default Services;
