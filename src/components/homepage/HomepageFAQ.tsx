import React from "react";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Container from "@/components/ui/Container";

const faqs = [
  {
    question: "What makes Cointegrity different from other Web3 consultancies?",
    answer: "We combine deep regulatory expertise with cutting-edge AI technology to deliver 10x faster compliance solutions. Our team has 20+ years of experience and we're the only consultancy offering AI-powered MiCA compliance automation."
  },
  {
    question: "How long does Web3 implementation typically take?",
    answer: "Traditional consulting takes 6-18 months. Our AI-powered approach reduces this to 2-6 months for most projects, with MiCA compliance delivered in as little as 3-4 months depending on jurisdiction."
  },
  {
    question: "Do I need MiCA compliance for my crypto business?",
    answer: "If you operate in or target EU markets, issue crypto-assets, or provide crypto services like custody, trading, or portfolio management, you likely need MiCA compliance. Our AI screening tool can determine your exact requirements in minutes."
  },
  {
    question: "What's included in your Web3 consulting process?",
    answer: "We provide end-to-end support including digital strategy, tokenomics design, regulatory compliance, smart contract development, go-to-market strategy, and investor relations. Each engagement is tailored to your specific needs."
  },
  {
    question: "How do you handle regulatory compliance across different jurisdictions?",
    answer: "We have expertise across all 27 EU member states and maintain updated regulatory frameworks. Our AI-powered platform continuously monitors regulatory changes and updates compliance requirements in real-time."
  },
  {
    question: "Can you help with both technical and legal aspects of Web3?",
    answer: "Yes, we provide comprehensive support covering technical development, legal compliance, business strategy, and market entry. Our multidisciplinary team includes lawyers, developers, economists, and industry experts."
  }
];

const HomepageFAQ = () => {
  const [openItems, setOpenItems] = React.useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#FDF9FC] to-[#FEFCFD]">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm uppercase tracking-wider font-medium text-[#cb46b3] mb-4">
            Frequently Asked Questions
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-800 mb-6">
            Everything You Need to Know About Our Web3 Services
          </h3>
          <p className="text-gray-600">
            Get answers to common questions about our consulting process, timelines, and expertise.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Collapsible
              key={index}
              open={openItems.includes(index)}
              onOpenChange={() => toggleItem(index)}
            >
              <CollapsibleTrigger className="w-full text-left p-6 bg-white/60 backdrop-blur-sm rounded-lg border border-white/40 hover:bg-white/80 transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-gray-800 pr-4">
                    {faq.question}
                  </h4>
                  <ChevronDown 
                    className={`h-5 w-5 text-[#cb46b3] transition-transform duration-300 flex-shrink-0 ${
                      openItems.includes(index) ? 'rotate-180' : ''
                    }`} 
                  />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-6 pb-6 bg-white/60 backdrop-blur-sm rounded-b-lg border-x border-b border-white/40 -mt-1">
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help.
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center px-8 py-3 bg-[#cb46b3] text-white rounded-full hover:bg-[#b23d9f] transition-all duration-300 transform hover:scale-105"
          >
            Contact Our Experts
          </a>
        </div>
      </Container>
    </section>
  );
};

export default HomepageFAQ;