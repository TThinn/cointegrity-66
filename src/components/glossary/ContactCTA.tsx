
import React from "react";
import { Button } from "@/components/ui/button";

export const ContactCTA: React.FC = () => {
  return (
    <div className="mt-16 max-w-3xl mx-auto text-center">
      <h3 className="text-xl font-semibold mb-4">Need Expert Guidance on Web3, Blockchain or AI?</h3>
      <p className="mb-6">Our consultants specialize in translating complex concepts into actionable strategies for your business.</p>
      <Button size="lg" asChild>
        <a href="/contact">Contact Our Experts</a>
      </Button>
    </div>
  );
};
