
// Define the Partner type
export interface Partner {
  id: number;
  name: string;
  category: string;
  description: string;
}

// Export the partners data
export const partners: Partner[] = [
  {
    id: 1,
    name: "Blockchain Alliance",
    category: "Blockchain",
    description: "Leading consortium of blockchain technology providers."
  },
  {
    id: 2,
    name: "FinTech Innovators",
    category: "Finance",
    description: "Pioneering financial technology solutions for the digital age."
  },
  {
    id: 3,
    name: "Web3 Foundation",
    category: "Technology",
    description: "Supporting the development of decentralized web technologies."
  },
  {
    id: 4,
    name: "Global Regulatory Council",
    category: "Government",
    description: "Collaborative effort to establish consistent blockchain regulations."
  },
  {
    id: 5,
    name: "Crypto Research Institute",
    category: "Research",
    description: "Dedicated to advancing blockchain and cryptocurrency research."
  }
];
