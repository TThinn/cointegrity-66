import React from "react";
import Container from "./ui/Container";
import ServiceCard from "./services/ServiceCard";
import ServicesCTA from "./services/ServicesCTA";
import { services } from "./services/servicesData";
const Services = () => {
  const isDarkBackground = false;
  return <section id="services" className="py-20 bg-gradient-to-b from-[#FEFCFD] to-[#FDF9FC] relative">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm uppercase tracking-wider font-medium text-[#cb46b3]">Our Services</h2>
          <h3 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-gray-800">Strategic Consulting &amp; Web3 Infrastructure Solutions</h3>
          <p className="mt-2 text-lg text-gray-600">Cointegrity delivers expert consulting across Government, Web3, and Corporate sectors. While our services are rooted in a close personal collaboration with our team, we focus on enhancing service delivery through AI-powered automation solutions, and potentially create custom AI solutions that scale with your organization.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => <ServiceCard key={index} icon={service.icon} title={service.title} items={service.items} color={service.color} isDarkBackground={isDarkBackground} />)}
        </div>

        <ServicesCTA />
      </Container>
    </section>;
};
export default Services;