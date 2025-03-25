
import React from "react";
import Container from "./ui/Container";
import { Linkedin, X } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const founders = [
  {
    name: "Torstein W. Thinn",
    role: "Chairman & Co-Founder",
    bio: "Financial innovator who established the world's first cryptocurrency regulatory task force in 2019. Pioneered AI-driven trading strategies in 2004 when most considered it theoretical...",
    fullBio: "Financial innovator who established the world's first cryptocurrency regulatory task force in 2019. Pioneered AI-driven trading strategies in 2004 when most considered it theoretical. As CFO (\"Master of Coin\") at NBX, grew trading volume from 90M to 1.1B NOK and made NBX Europe's first listed crypto exchange. As CEO at AKJ Group, oversaw trading infrastructure supporting $1.6B in traditional and crypto assets while implementing automation that reduced operational overhead by 50%. MSc Finance (NHH). Consistently ahead of industry curves—from quantitative modeling to regulatory frameworks.",
    image: "/lovable-uploads/2dd79377-6c9c-43cc-8fe1-5d1eb429c567.png",
    social: {
      linkedin: "https://www.linkedin.com/in/torstein-thinn-a745552/"
    }
  },
  {
    name: "Magnus Jones",
    role: "Co-Founder & Regulatory Strategist",
    bio: "Magnus Jones is an international thought leader with 10+ years of blockchain and emerging tech experience, including 9 years as Nordic Blockchain & Innovation Lead at EY...",
    fullBio: "Magnus Jones is an international thought leader with 10+ years of blockchain and emerging tech experience, including 9 years as Nordic Blockchain & Innovation Lead at EY. His expertise spans Web3 taxation, legal frameworks, forensic investigations, smart contract reviews, tokenomics, and government strategies.\n\nMagnus created the world's first DeFi/NFT tax guidance with Norwegian authorities and built the first government metaverse tax office. He serves on boards including Nordic Blockchain Association and European Web3 Organization, while acting as Norwegian Ambassador for GBBC, member of INTERPOL's Metaverse Expert Group and UN Counter-Terrorism Crypto Group.\n\nHe lectures at universities and works with entities ranging from startups and DeFi projects to banks and governments.",
    image: "/lovable-uploads/a2b1c3d2-c3ca-4547-8cae-e6eca459eeaa.png",
    social: {
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "Feliks Olko",
    role: "Co-Founder & Technical Strategist",
    bio: "Metaverse infrastructure pioneer who helped scale one of Web3's most ambitious distributed computing platforms for virtual worlds...",
    fullBio: "Metaverse infrastructure pioneer who helped scale one of Web3's most ambitious distributed computing platforms for virtual worlds. As VP of Commercial Development at MetaGravity, revolutionized how developers build large-scale simulations, securing partnerships with AAA game studios and web3 projects. Previously founded BlockVerse Consulting, bringing enterprise-level solutions to blockchain startups. Built strategic partnerships at Hadean (2018-2021) after beginning career in finance at J.P. Morgan. Combines deep technical knowledge with financial acumen, holding a Harvard University Computer Science certification and MSc in Banking from Bayes Business School. Known for translating complex Web3 technologies into practical business applications.",
    image: "/lovable-uploads/e6a83d86-6685-4904-9bb1-f6d5c0a536dc.png",
    social: {
      linkedin: "#"
    }
  },
  {
    name: "David Park",
    role: "CISO & Security Advisor",
    bio: "Cybersecurity expert with specialization in blockchain security, smart contract auditing, and crypto compliance.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#"
    }
  }
];

const Founders = () => {
  return (
    <section id="founders" className="py-20 bg-gradient-to-b from-white to-purple-50">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-pink-600 uppercase tracking-wider">Our Team</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-gray-800">The Minds Behind Cointegrity</h2>
          <p className="mt-4 text-lg text-gray-600">Seasoned Decision-Makers in the Digital Asset Ecosystem</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {founders.map((founder, index) => (
            <div 
              key={index} 
              className="glass-card flex flex-col items-center text-center hover:translate-y-[-4px]" 
              style={{
                animationDelay: `${0.1 + index * 0.1}s`
              }}
            >
              <div className="relative mb-4 w-24 h-24 overflow-hidden rounded-full">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-10 rounded-full"></div>
                {index === 0 ? (
                  <img 
                    src={founder.image} 
                    alt={founder.name} 
                    className="object-cover w-full h-full" 
                    style={{
                      objectPosition: "center -20%", 
                      transform: "scale(1.7)"
                    }} 
                  />
                ) : index === 1 ? (
                  <img 
                    src={founder.image} 
                    alt={founder.name} 
                    className="object-cover w-full h-full" 
                    style={{
                      objectPosition: "center top", 
                      transform: "scale(1.5)"
                    }} 
                  />
                ) : index === 2 ? (
                  <img 
                    src={founder.image} 
                    alt={founder.name} 
                    className="object-cover w-full h-full" 
                    style={{
                      objectPosition: "center top", 
                      transform: "scale(1.5)"
                    }} 
                  />
                ) : (
                  <img 
                    src={founder.image} 
                    alt={founder.name} 
                    className="object-cover w-full h-full" 
                  />
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{founder.name}</h3>
              <div className="mt-1 text-sm font-medium text-pink-600">{founder.role}</div>
              
              {index === 0 ? (
                <>
                  <p className="mt-3 text-sm text-gray-600">
                    {founder.bio} 
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="text-pink-600 hover:text-pink-800 ml-1 inline-flex items-center text-sm font-medium">
                          more
                        </button>
                      </DialogTrigger>
                      <DialogContent className="bg-gradient-to-r from-pink-50 to-purple-50 border-none max-w-lg">
                        <DialogHeader>
                          <DialogTitle className="text-xl font-semibold text-gray-800">
                            {founder.name}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                          <p className="text-gray-700">{founder.fullBio}</p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </p>
                  <div className="mt-4 flex space-x-3">
                    <a href={founder.social.linkedin} className="text-gray-500 hover:text-blue-700 transition-colors">
                      <Linkedin size={18} />
                    </a>
                  </div>
                </>
              ) : index === 1 ? (
                <>
                  <p className="mt-3 text-sm text-gray-600">
                    {founder.bio}
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="text-pink-600 hover:text-pink-800 ml-1 inline-flex items-center text-sm font-medium">
                          more
                        </button>
                      </DialogTrigger>
                      <DialogContent className="bg-gradient-to-r from-pink-50 to-purple-50 border-none max-w-lg">
                        <DialogHeader>
                          <DialogTitle className="text-xl font-semibold text-gray-800">
                            {founder.name}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                          <p className="text-gray-700 whitespace-pre-line">{founder.fullBio}</p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </p>
                  <div className="mt-4 flex space-x-3">
                    <a href={founder.social.linkedin} className="text-gray-500 hover:text-blue-700 transition-colors">
                      <Linkedin size={18} />
                    </a>
                    <a href={founder.social.twitter} className="text-gray-500 hover:text-gray-900 transition-colors">
                      <X size={18} />
                    </a>
                  </div>
                </>
              ) : index === 2 ? (
                <>
                  <p className="mt-3 text-sm text-gray-600">
                    {founder.bio}
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="text-pink-600 hover:text-pink-800 ml-1 inline-flex items-center text-sm font-medium">
                          more
                        </button>
                      </DialogTrigger>
                      <DialogContent className="bg-gradient-to-r from-pink-50 to-purple-50 border-none max-w-lg">
                        <DialogHeader>
                          <DialogTitle className="text-xl font-semibold text-gray-800">
                            {founder.name}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                          <p className="text-gray-700">{founder.fullBio}</p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </p>
                  <div className="mt-4 flex space-x-3">
                    <a href={founder.social.linkedin} className="text-gray-500 hover:text-blue-700 transition-colors">
                      <Linkedin size={18} />
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <p className="mt-3 text-sm text-gray-600">{founder.bio}</p>
                  <div className="mt-4 flex space-x-3">
                    <a href={founder.social.linkedin} className="text-gray-500 hover:text-blue-700 transition-colors">
                      <Linkedin size={18} />
                    </a>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Founders;
