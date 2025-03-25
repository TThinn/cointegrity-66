
import React from "react";
import Container from "./ui/Container";
import { Linkedin, Twitter, Github, Award } from "lucide-react";
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
    bio: "Financial innovator who established the world's first cryptocurrency regulatory task force in 2019, six years ahead of the US. Pioneered AI-driven trading strategies in 2004 when most considered it theoretical...",
    fullBio: "Financial innovator who established the world's first cryptocurrency regulatory task force in 2019, six years ahead of the US. Pioneered AI-driven trading strategies in 2004 when most considered it theoretical. As CFO (\"Master of Coin\") at NBX, grew trading volume from 90M to 1.1B NOK and made NBX Europe's first listed crypto exchange. As CEO at AKJ Group, oversaw trading infrastructure supporting $1.6B in traditional and crypto assets while implementing automation that reduced operational overhead by 50%. MSc Finance (NHH). Consistently ahead of industry curves—from quantitative modeling to regulatory frameworks.",
    image: "/lovable-uploads/48e948b9-5f75-4539-b342-2a4c8eb9f7ed.png",
    social: {
      linkedin: "https://www.linkedin.com/in/torstein-thinn-a745552/"
    }
  },
  {
    name: "Michael Rajput",
    role: "CTO & Smart Contract Expert",
    bio: "Blockchain developer with expertise in Ethereum, Solana, and cross-chain solutions for enterprise applications.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#"
    }
  },
  {
    name: "Alex Thompson",
    role: "COO & DeFi Specialist",
    bio: "Former investment banker specialized in cryptocurrency markets and decentralized finance ecosystem development.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#"
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
                <img 
                  src={founder.image} 
                  alt={founder.name} 
                  className="object-cover w-full h-full" 
                  style={index === 0 ? {
                    objectPosition: "center top", 
                    objectFit: "cover", 
                    transform: "scale(1.2)"
                  } : {}} 
                />
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
              ) : (
                <>
                  <p className="mt-3 text-sm text-gray-600">{founder.bio}</p>
                  <div className="mt-4 flex space-x-3">
                    <a href={founder.social.twitter} className="text-gray-500 hover:text-blue-500 transition-colors">
                      <Twitter size={18} />
                    </a>
                    <a href={founder.social.linkedin} className="text-gray-500 hover:text-blue-700 transition-colors">
                      <Linkedin size={18} />
                    </a>
                    <a href={founder.social.github} className="text-gray-500 hover:text-pink-600 transition-colors">
                      <Github size={18} />
                    </a>
                  </div>
                  <div className="mt-4 flex items-center">
                    <Award size={14} className="text-amber-500 mr-1" />
                    <span className="text-xs text-gray-500">Web3 Expert</span>
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
