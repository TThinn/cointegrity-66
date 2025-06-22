
import { GlossaryTerm } from "./types";

export const crossChainTerms: GlossaryTerm[] = [
  {
    term: "Cross-Chain",
    definition: "Technology that enables different blockchain networks to communicate and transfer assets between each other.",
    categories: ["cross_chain"],
    related: ["Bridge", "Interoperability", "Multi-Chain"]
  },
  {
    term: "Bridge",
    definition: "A protocol that allows the transfer of tokens or data from one blockchain network to another.",
    categories: ["cross_chain"],
    related: ["Cross-Chain", "Wrapped Tokens", "Interoperability"]
  },
  {
    term: "Wrapped Token",
    definition: "A tokenized version of a cryptocurrency from another blockchain, allowing it to be used on different networks.",
    categories: ["cross_chain"],
    related: ["Bridge", "Cross-Chain", "Token Representation"]
  },
  {
    term: "Atomic Swap",
    definition: "A smart contract technology that enables the exchange of cryptocurrencies from different blockchains without intermediaries.",
    categories: ["cross_chain"],
    related: ["Cross-Chain", "Smart Contract", "Peer-to-Peer"]
  }
];
