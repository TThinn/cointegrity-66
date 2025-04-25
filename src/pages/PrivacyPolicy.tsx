
import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ScrollArea } from "@/components/ui/scroll-area";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Cointegrity</title>
        <meta name="description" content="Privacy Policy for Cointegrity - Learn how we protect and handle your data" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-[#000624] to-[#282c2f] py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Link to="/" className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            
            <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
            
            <ScrollArea className="rounded-lg bg-white/5 p-8 backdrop-blur-lg border border-white/10">
              <div className="space-y-8 text-white/80">
                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
                  <p className="mb-4">
                    At Cointegrity, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
                    disclose, and safeguard your information when you visit our website or use our services.
                  </p>
                  <p>
                    Please read this privacy policy carefully. By accessing and using our services, you acknowledge 
                    that you have read and understand this policy.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
                  <p className="mb-4">We collect information that you provide directly to us, including:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Name and contact information</li>
                    <li>Company details and business information</li>
                    <li>Communication preferences</li>
                    <li>Any other information you choose to provide</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
                  <p className="mb-4">We use the information we collect to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide and maintain our services</li>
                    <li>Respond to your inquiries and requests</li>
                    <li>Send you technical notices and support messages</li>
                    <li>Communicate with you about products, services, and events</li>
                    <li>Protect against fraudulent or illegal activity</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">4. Data Protection</h2>
                  <p className="mb-4">
                    We implement appropriate technical and organizational measures to protect your personal data 
                    against unauthorized or unlawful processing, accidental loss, destruction, or damage.
                  </p>
                  <p>
                    While we take reasonable steps to protect your information, please be aware that no security 
                    measures are perfect or impenetrable.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">5. Your Rights</h2>
                  <p className="mb-4">You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access your personal data</li>
                    <li>Correct inaccurate personal data</li>
                    <li>Request deletion of your personal data</li>
                    <li>Object to processing of your personal data</li>
                    <li>Request restriction of processing your personal data</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">6. Contact Us</h2>
                  <p>
                    If you have any questions about this Privacy Policy or our data practices, please contact us at:
                    <br />
                    <a href="mailto:privacy@cointegrity.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                      privacy@cointegrity.com
                    </a>
                  </p>
                </section>
              </div>
            </ScrollArea>
          </div>
        </Container>
      </div>
    </>
  );
};

export default PrivacyPolicy;
