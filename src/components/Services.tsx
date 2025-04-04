import React, { useState } from "react";
import Container from "./ui/Container";
import { Target, Layers, Scale, Rocket, ArrowLeft } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import Button from "./ui/CustomButtonComponent";
const services = [{
  icon: <Target size={24} className="text-pink-600" />,
  title: "Strategic Positioning",
  description: "Cointegrity's Strategic Positioning transforms your Web3 vision into market reality. We evaluate your current approach and develop tailored frameworks aligned with your business objectives.",
  fullDescription: "Cointegrity's Strategic Positioning transforms your Web3 vision into market reality. We evaluate your current approach and develop tailored frameworks aligned with your business objectives. Our team analyzes market mechanics to identify opportunities while crafting implementation plans that ensure successful execution. We refine your brand identity, messaging strategy, and competitive positioning to help you stand out in the blockchain ecosystem. Leveraging our extensive global network of specialized partners and experts, we identify your ideal audience and create engagement strategies that connect with key stakeholders. With Cointegrity's strategic positioning expertise, your Web3 project navigates complexity with clarity and purpose."
}, {
  icon: <Layers size={24} className="text-violet-500" />,
  title: "Token Architecture",
  description: "Cointegrity's Token Architecture service delivers optimized tokenomics models that drive real business value. We analyze your Web3 commercial architecture and infrastructure.",
  fullDescription: "Cointegrity's Token Architecture service delivers optimized tokenomics models that drive real business value. We analyze your Web3 commercial architecture and infrastructure, ensuring solid technical foundations. Our experts review and enhance your tokenomics model, balancing utility, incentives, and economic sustainability. We conduct thorough regulatory compliance assessments to mitigate risks across jurisdictions. Drawing on our extensive global network of specialized partners, we develop tailored frameworks that align with your strategic objectives while maximizing token utility. Our approach ensures your token design achieves product-market fit and creates meaningful engagement within your ecosystem, positioning your project for long-term success in the evolving digital asset landscape."
}, {
  icon: <Scale size={24} className="text-pink-600" />,
  title: "Regulatory Navigation",
  description: "Cointegrity's Regulatory Navigation service guides you through the complex and evolving digital asset compliance landscape. We provide comprehensive regulatory assessments.",
  fullDescription: "Cointegrity's Regulatory Navigation service guides you through the complex and evolving digital asset compliance landscape. We provide comprehensive regulatory assessments, with a particular focus on the new MiCA framework in Europe. Our team develops robust compliance frameworks tailored to your specific needs, incorporating risk mitigation strategies that protect your project's integrity. We offer expert implementation guidance, ensuring your operations align with current and emerging regulations. Leveraging our extensive network of global collaborators, we provide nuanced insights into country-specific interpretations of digital asset laws. Our service includes critical tax evaluations and assessments, recognizing their make-or-break potential for Web3 projects. With Cointegrity's regulatory expertise, you can navigate compliance challenges confidently, turning potential obstacles into strategic advantages in the digital asset space."
}, {
  icon: <Rocket size={24} className="text-blue-600" />,
  title: "Capital Acceleration",
  description: "Cointegrity's Capital Acceleration service transforms promising Web3 projects into well-funded ventures. We craft targeted community building strategies.",
  fullDescription: "Cointegrity's Capital Acceleration service transforms promising Web3 projects into well-funded ventures. We craft targeted community building strategies that create engaged ecosystems around your offering. Our team ensures your product achieves market fit before approaching investors, maximizing your funding potential. We identify and engage your ideal audience, creating momentum that attracts capital. Drawing on our extensive network of VCs, angel investors, family offices, and investment funds, we connect you with the right financial partners for your stage and vision. Our expert collaborators across global markets provide specialized insights for different investment landscapes. With Cointegrity's guidance, your project gains access to capital sources that align with your long-term objectives, accelerating your growth in the digital asset ecosystem."
}];
const Services = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const handleOpenFullDescription = (service: typeof services[0]) => {
    setSelectedService(service);
    setOpenDialog(true);
  };
  return <section id="services" className="py-20 bg-gradient-to-b from-[#f8f9fa] to-[#f0f2f5] relative">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm text-pink-600 uppercase tracking-wider font-medium">Our Services</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-gray-800">Web3 Solutions with Substance</h2>
          <p className="mt-4 text-lg text-gray-600">Navigating digital asset complexity with clarity, from strategy to compliance</p>
        </div>

        {/* Opening description text box */}
        <div className="mb-12 p-8 rounded-2xl bg-gradient-to-r from-pink-50 to-blue-50">
          <p className="text-gray-700 leading-relaxed">Cointegrity delivers strategic advisory services bridging traditional business with blockchain innovation. We navigate the digital asset landscape, providing ecosystem support across regulatory compliance, tax optimization, banking solutions, tokenomics, and funding strategies. Our expertise extends to blockchain-AI intersections, including MCP implementation and AI agent utilization. In short; We simplify complexity and amplify impact!</p>
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
                {service.fullDescription && <button onClick={() => handleOpenFullDescription(service)} className="ml-1 text-pink-600 hover:text-pink-700 font-medium">
                    ... more
                  </button>}
              </p>
            </div>)}
        </div>

        {/* Closing description text box */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-16 p-8 md:p-10 rounded-2xl bg-[#080112] text-white">
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-3 text-white">Bring Substance to Your Digital Asset Strategy</h3>
            <p className="text-white/80 max-w-md">Take your Web3 project to the next level with our expert guidance</p>
          </div>
          <a href="#contact" className="inline-flex items-center">
            <Button variant="cta-primary">
              Schedule a Consultation
            </Button>
          </a>
        </div>
      </Container>

      {/* Full description dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-[#120825] to-[#1D0D35] border-0 text-white shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">{selectedService?.title}</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-base text-white/80 py-4 rounded-lg p-5">
            {selectedService?.fullDescription}
          </DialogDescription>
          <div className="mt-4 flex justify-start">
            <button onClick={() => setOpenDialog(false)} className="flex items-center text-pink-400 hover:text-pink-300 font-medium">
              <ArrowLeft size={16} className="mr-1" /> Back
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>;
};
export default Services;