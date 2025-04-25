import React from "react";
import Container from "./ui/Container";
import { Linkedin, Github, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

const founders = [/* your founders data */];

const Founders = () => {
  // Explicitly set this section to have a light background
  const isDarkBackground = false;
  
  return <section id="founders" className="py-20 bg-gradient-to-b from-[#fbf9ff] to-[#fdf5fa] relative">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#cb46b3]">Our Team</h2>
          <h3 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-gray-800">The Minds Behind Cointegrity</h3>
          <p className="mt-2 text-gray-600">Our battle-tested team will amplify your impact by simplifying the complexities of digital asset development, enabling you to focus on creating lasting value.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {founders.map((founder, index) => (
            <div 
              key={index} 
              className="hover:translate-y-[-4px] transition-all duration-300"
              style={{
                animationDelay: `${0.1 + index * 0.1}s`,
                background: "transparent",
                border: "none"
              }}
            >
              <div className={`p-6 rounded-lg backdrop-blur-sm text-center ${isDarkBackground ? 'bg-white/15' : 'bg-white/20'}`} 
                style={{
                  boxShadow: isDarkBackground 
                    ? "0 4px 15px rgba(0, 0, 0, 0.1)" 
                    : "0 4px 15px rgba(0, 0, 0, 0.05)",
                  border: isDarkBackground 
                    ? "1px solid rgba(255, 255, 255, 0.15)" 
                    : "1px solid rgba(255, 255, 255, 0.7)"
                }}
              >
                <div className="relative mb-4 w-24 h-24 overflow-hidden rounded-full mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-10 rounded-full"></div>
                  {founder.name === "Torstein W. Thinn" ? <img src={founder.image} alt={founder.name} className="object-cover w-full h-full" style={{
                objectPosition: "center -20%",
                transform: "scale(1.7)"
              }} /> : founder.name === "Magnus Jones" ? <img src={founder.image} alt={founder.name} className="object-cover w-full h-full" style={{
                objectPosition: "center top",
                transform: "scale(1.5)"
              }} /> : founder.name === "Feliks Olko" ? <img src={founder.image} alt={founder.name} className="absolute w-full h-full object-cover" style={{
                top: "30%",
                transform: "scale(1.8) translateY(0)",
                objectFit: "cover"
              }} /> : founder.name === "Ruben Junger" ? <img src={founder.image} alt={founder.name} className="absolute w-full h-full object-cover" style={{
                top: "40%",
                transform: "scale(1.75)",
                objectFit: "cover"
              }} /> : <img src={founder.image} alt={founder.name} className="object-cover w-full h-full" />}
                </div>
                <h3 className={`text-[clamp(1rem,0.9rem+0.25vw,1.2rem)] font-semibold ${isDarkBackground ? 'text-white' : 'text-gray-800'}`}>
                  {founder.name}
                </h3>
                <div className="mt-1 text-[clamp(0.75rem,0.7rem+0.15vw,0.875rem)] font-medium text-[#cb46b3]">
                  {founder.role}
                </div>
                
                <p className={`mt-3 text-[clamp(0.8rem,0.75rem+0.2vw,1rem)] relative ${isDarkBackground ? 'text-gray-200' : 'text-gray-600'}`}>
                  {founder.bio}
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="text-[#cb46b3] hover:text-[#881ec9] ml-1 inline-flex items-center text-[clamp(0.8rem,0.75rem+0.2vw,1rem)] font-medium relative z-20">
                        more
                      </button>
                    </DialogTrigger>
                    <DialogContent className="bg-gradient-to-br from-[#000624] to-[#282c2f] border-none max-w-lg text-white">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-white">
                          {founder.name}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="mt-4">
                        <p className={`text-white/80 ${founder.name === "Magnus Jones" || founder.name === "Ruben Junger" ? "whitespace-pre-line" : ""}`}>
                          {founder.fullBio}
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </p>
                
                <div className="mt-4 flex space-x-3 justify-center relative z-20">
                  {founder.social.linkedin && <a href={founder.social.linkedin} className="text-gray-500 hover:text-blue-600 transition-colors" target="_blank" rel="noopener noreferrer">
                      <Linkedin size={18} />
                    </a>}
                  {founder.social.twitter && <a href={founder.social.twitter} className="text-gray-500 hover:text-blue-600 transition-colors" target="_blank" rel="noopener noreferrer">
                      <X size={18} />
                    </a>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>;
};

export default Founders;
