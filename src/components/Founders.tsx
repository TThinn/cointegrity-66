
import React from "react";
import Container from "./ui/Container";
import { founders } from "./founders/foundersData";
import FounderCard from "./founders/FounderCard";

const Founders = () => {
  return (
    <section id="founders" className="py-20 bg-gradient-to-b from-[#FEFCFD] to-[#FDF9FC] relative">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#cb46b3]">
            BLOCKCHAIN EXPERTISE & LEADERSHIP
          </h2>
          <h3 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-gray-800">
            The Minds Behind Cointegrity
          </h3>
          <p className="mt-2 text-gray-600">
            Our blockchain-experienced team simplifies Web3 implementation and digital asset development, 
            allowing you to focus on business value creation. With expertise spanning regulatory compliance, 
            technical infrastructure, and strategic market positioning, we transform complex blockchain 
            challenges into practical solutions for enterprise and government.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {founders.map((founder, index) => (
            <FounderCard key={index} founder={founder} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Founders;
