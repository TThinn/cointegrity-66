
import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ScrollArea } from "@/components/ui/scroll-area";
import Container from "@/components/ui/Container";
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
                  <h2 className="text-2xl font-semibold text-white mb-4">1. Overview</h2>
                  <p className="mb-4">
                    This Privacy Policy explains how Cointegrity AS ("we," "us," or "our") collects, uses, 
                    and protects your personal information when you use our website (cointegrity.com) and services. 
                    We respect your privacy and are committed to protecting your personal data.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
                  <h3 className="text-xl font-semibold text-white mb-2">2.1 Information You Provide</h3>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Contact information (name, email address, phone number)</li>
                    <li>Company information (company name, position, industry)</li>
                    <li>Communication preferences and interests</li>
                    <li>Information provided in forms, surveys, or correspondence</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold text-white mb-2">2.2 Automatically Collected Information</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Device information (IP address, browser type, operating system)</li>
                    <li>Usage data (pages visited, time spent, interactions)</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
                  <p className="mb-4">We use your information for the following purposes:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Providing and improving our services</li>
                    <li>Communicating about our services and updates</li>
                    <li>Analyzing and enhancing our website performance</li>
                    <li>Complying with legal obligations</li>
                    <li>Protecting against fraudulent or unauthorized activity</li>
                    <li>Processing your requests and transactions</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">4. Legal Basis for Processing</h2>
                  <p className="mb-4">We process your personal data based on:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Your consent</li>
                    <li>Contractual necessity</li>
                    <li>Legal obligations</li>
                    <li>Legitimate business interests</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">5. Data Sharing and Transfers</h2>
                  <p className="mb-4">
                    We may share your information with:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Service providers and business partners</li>
                    <li>Legal authorities when required by law</li>
                    <li>Professional advisors and consultants</li>
                  </ul>
                  <p className="mt-4">
                    Your data may be transferred to countries outside your residence. We ensure appropriate 
                    safeguards are in place for such transfers.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">6. Data Security</h2>
                  <p className="mb-4">
                    We implement appropriate technical and organizational measures to protect your personal data 
                    against unauthorized access, alteration, disclosure, or destruction.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">7. Your Rights</h2>
                  <p className="mb-4">You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access your personal data</li>
                    <li>Rectify inaccurate data</li>
                    <li>Request erasure of your data</li>
                    <li>Object to processing</li>
                    <li>Data portability</li>
                    <li>Withdraw consent</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">8. Data Retention</h2>
                  <p>
                    We retain your personal data only for as long as necessary to fulfill the purposes for 
                    which it was collected, including legal, accounting, or reporting requirements.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">9. Cookies Policy</h2>
                  <p>
                    We use cookies and similar technologies to enhance your browsing experience. You can 
                    control cookie preferences through your browser settings.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">10. Changes to This Policy</h2>
                  <p>
                    We may update this Privacy Policy periodically. We will notify you of any material 
                    changes by posting the new policy on this page.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">11. Contact Us</h2>
                  <p>
                    If you have questions about this Privacy Policy or our data practices, please contact us at:
                    <br />
                    <a href="mailto:privacy@cointegrity.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                      privacy@cointegrity.com
                    </a>
                  </p>
                </section>

                <section className="pt-8 border-t border-white/10">
                  <p className="text-sm">
                    Last updated: April 25, 2025
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
