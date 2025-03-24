
import React from "react";
import Container from "./ui/Container";
import Button from "./ui/button";

const Hero = () => {
  return (
    <section id="hero" className="relative py-36 bg-[#080112] overflow-hidden">
      <img src="/gradient-blob.svg" className="absolute -top-1/2 -left-1/2 w-[150%] opacity-20" />
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
              Navigating the Future of Web3 with Clarity
            </h1>
            <p className="text-lg text-gray-400 mb-8">
              Strategic advisory for blockchain ventures, bridging innovation with sustainable growth.
            </p>
            <div className="space-x-4">
              <Button size="lg" href="#services">Explore Services</Button>
              <Button variant="secondary" size="lg" isGlowing href="#contact">Get in Touch</Button>
            </div>
          </div>
          <div className="relative">
            <img
              src="/hero-image.png"
              alt="Web3 Innovation"
              className="rounded-2xl shadow-2xl mx-auto"
              style={{ maxWidth: '500px' }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
