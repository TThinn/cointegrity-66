
import React from 'react';
import { Container } from './ui/Container';

export const Services = () => {
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive consulting services for businesses navigating the digital asset ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            title="Tokenomics Design"
            icon="💹"
            description="Design sustainable token economic models that align incentives across your ecosystem while ensuring compliance with evolving regulations."
          />
          <ServiceCard
            title="Regulatory Compliance"
            icon="📜"
            description="Navigate complex regulatory frameworks including MiCA, ensuring your blockchain initiatives meet all legal and compliance requirements."
          />
          <ServiceCard
            title="Strategy Consulting"
            icon="🧠"
            description="Develop comprehensive Web3 strategies tailored to your business objectives, from token launches to decentralized governance structures."
          />
          <ServiceCard
            title="Technical Implementation"
            icon="⚙️"
            description="Expert guidance on blockchain selection, smart contract development, and security best practices for your digital asset initiatives."
          />
          <ServiceCard
            title="Market Analysis"
            icon="📊"
            description="Data-driven insights into market trends, competitor analysis, and opportunity identification in the rapidly evolving Web3 landscape."
          />
          <ServiceCard
            title="Education & Training"
            icon="🎓"
            description="Customized workshops and training programs to build internal capabilities and understanding of blockchain technologies."
          />
        </div>
      </Container>
    </section>
  );
};

const ServiceCard = ({ title, icon, description }: { title: string; icon: string; description: string }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

// Export as default as well to maintain compatibility
export default Services;
